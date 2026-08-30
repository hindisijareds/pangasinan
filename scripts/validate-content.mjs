import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile("src/data/heritageSites.ts", "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { exports: module.exports, module });
const { heritageSites } = module.exports;

const duplicates = (values) => {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].filter(([, count]) => count > 1);
};

const invalidCoordinates = heritageSites.filter(({ coordinates }) => coordinates && (
  coordinates.lat < 15 || coordinates.lat > 17.5 ||
  coordinates.lng < 117 || coordinates.lng > 122.5
));

console.log(JSON.stringify({
  total: heritageSites.length,
  imageRecords: heritageSites.filter((site) => site.image).map(({ name, image, slug }) => ({ name, image, slug })),
  featuredRecords: heritageSites.filter((site) => site.featured).map(({ name, slug }) => ({ name, slug })),
  classes: [...new Set(heritageSites.map((site) => site.heritageClass))].sort(),
  types: [...new Set(heritageSites.map((site) => site.heritageType))].sort(),
  locations: [...new Set(heritageSites.map((site) => site.location))].sort(),
  duplicateIds: duplicates(heritageSites.map((site) => site.id)),
  duplicateSlugs: duplicates(heritageSites.map((site) => site.slug)),
  duplicateNames: duplicates(heritageSites.map((site) => site.name)),
  invalidCoordinates: invalidCoordinates.map(({ coordinates, name, slug }) => ({ coordinates, name, slug })),
  missingSources: heritageSites.filter((site) => !site.sourceUrl).map(({ name, slug }) => ({ name, slug })),
  veryShortSummaries: heritageSites.filter((site) => site.shortDescription.length < 40).map(({ name, shortDescription, slug }) => ({ name, shortDescription, slug })),
}, null, 2));
