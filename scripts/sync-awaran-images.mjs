import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const dataPath = path.join(projectRoot, "src/data/heritageSites.ts");
const imageDirectory = path.join(projectRoot, "public/images/heritage");
const manifestPath = path.join(projectRoot, "tmp/image-research/heritage-image-manifest.json");
const userAgent = "PangasinanHeritageEducationalProject/1.0 (https://github.com/hindisijareds/pangasinan)";

await mkdir(imageDirectory, { recursive: true });
await mkdir(path.dirname(manifestPath), { recursive: true });

const dataSource = await readFile(dataPath, "utf8");
const entryPattern = /  \{\r?\n    id: "awaran-([^"]+)",([\s\S]*?)\r?\n  \},/g;
const entries = [...dataSource.matchAll(entryPattern)].map((match) => {
  const body = match[2];
  return {
    externalId: match[1],
    image: body.match(/\r?\n    image: (null|"[^"]+")/)?.[1] ?? "null",
    name: body.match(/\r?\n    name: "([^"]+)"/)?.[1] ?? match[1],
    slug: body.match(/\r?\n    slug: "([^"]+)"/)?.[1] ?? match[1],
  };
});

const missingEntries = entries.filter((entry) => entry.image === "null");
const slugCounts = entries.reduce((counts, entry) => {
  counts.set(entry.slug, (counts.get(entry.slug) ?? 0) + 1);
  return counts;
}, new Map());

const archiveResponse = await fetch("https://www.awaran.net/archive", {
  headers: { "user-agent": userAgent },
});
if (!archiveResponse.ok) throw new Error(`AWARAN archive returned ${archiveResponse.status}`);
const archiveHtml = await archiveResponse.text();

const fetchBuffer = async (url, accept) => {
  const response = await fetch(url, {
    headers: { accept, "user-agent": userAgent },
    redirect: "follow",
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    contentType: response.headers.get("content-type") ?? "",
  };
};

const awaranImageUrl = (originalUrl, width, quality) => {
  const url = new URL("https://www.awaran.net/_next/image");
  url.searchParams.set("url", originalUrl);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality));
  return url.toString();
};

const commonsThumbnail = async (width) => {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|size|extmetadata");
  api.searchParams.set("iiurlwidth", String(width));
  api.searchParams.set("titles", "File:Balungao-bridge-Mt.jf6077 13.JPG");
  const { buffer } = await fetchBuffer(api, "application/json");
  const data = JSON.parse(buffer.toString("utf8"));
  const page = Object.values(data.query.pages)[0];
  return page.imageinfo[0];
};

const records = [];
for (const entry of missingEntries) {
  const duplicateSuffix = (slugCounts.get(entry.slug) ?? 0) > 1
    ? `-${entry.externalId.slice(0, 8)}`
    : "";
  const fileBase = `${entry.slug}${duplicateSuffix}`;

  if (entry.externalId === "balungao") {
    const [fullInfo, smallInfo] = await Promise.all([
      commonsThumbnail(1920),
      commonsThumbnail(640),
    ]);
    const [full, small] = await Promise.all([
      fetchBuffer(fullInfo.thumburl, "image/jpeg"),
      fetchBuffer(smallInfo.thumburl, "image/jpeg"),
    ]);
    await writeFile(path.join(imageDirectory, `${fileBase}.jpg`), full.buffer);
    await writeFile(path.join(imageDirectory, `${fileBase}-640.jpg`), small.buffer);
    records.push({
      id: entry.externalId,
      image: `/images/heritage/${fileBase}.jpg`,
      name: entry.name,
      original: fullInfo.url,
      source: fullInfo.descriptionurl,
      sourceKind: "Wikimedia Commons",
    });
    continue;
  }

  const marker = `\\"id\\":\\"${entry.externalId}\\"`;
  const recordStart = archiveHtml.indexOf(marker);
  if (recordStart < 0) throw new Error(`Could not find AWARAN record ${entry.externalId}`);
  const recordSegment = archiveHtml.slice(recordStart, recordStart + 16000);
  const originalUrl = recordSegment
    .match(/heritageImages\\":\[\{\\"url\\":\\"(https:[^"]+)/)?.[1]
    ?.replace(/\\+$/, "");
  if (!originalUrl) throw new Error(`Could not find an image for ${entry.name}`);

  const [full, small] = await Promise.all([
    fetchBuffer(awaranImageUrl(originalUrl, 1920, 85), "image/jpeg"),
    fetchBuffer(awaranImageUrl(originalUrl, 640, 80), "image/jpeg"),
  ]);
  const extension = "jpg";
  if (!full.contentType.includes("image/jpeg") || !small.contentType.includes("image/jpeg")) {
    throw new Error(`Unsupported image types ${full.contentType}/${small.contentType} for ${entry.name}`);
  }
  await writeFile(path.join(imageDirectory, `${fileBase}.${extension}`), full.buffer);
  await writeFile(path.join(imageDirectory, `${fileBase}-640.${extension}`), small.buffer);
  records.push({
    id: entry.externalId,
    image: `/images/heritage/${fileBase}.${extension}`,
    name: entry.name,
    original: originalUrl,
    source: "https://www.awaran.net/archive",
    sourceKind: "AWARAN Heritage Archive",
  });
  console.log(`Downloaded ${records.length}/${missingEntries.length}: ${entry.name}`);
}

await writeFile(manifestPath, `${JSON.stringify(records, null, 2)}\n`);
console.log(`Saved ${records.length} image pairs and ${manifestPath}`);
console.log("Dataset assignments:");
for (const record of records) console.log(`${record.id}\t${record.image}`);
