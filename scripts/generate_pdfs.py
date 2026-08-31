from __future__ import annotations

import html
import re
import shutil
import textwrap
from io import BytesIO
from pathlib import Path

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
DEEP = colors.HexColor("#0C292B")
INK = colors.HexColor("#172B28")
MUTED = colors.HexColor("#53615C")
ACCENT = colors.HexColor("#D66B3C")
CREAM = colors.HexColor("#F3EEE3")
SURFACE = colors.HexColor("#FFFAF0")
BORDER = colors.HexColor("#CFC8B9")


def register_fonts() -> tuple[str, str, str]:
    candidates = [
        ("C:/Windows/Fonts/georgia.ttf", "C:/Windows/Fonts/georgiab.ttf"),
        ("C:/Windows/Fonts/times.ttf", "C:/Windows/Fonts/timesbd.ttf"),
    ]
    for regular, bold in candidates:
        if Path(regular).exists() and Path(bold).exists():
            pdfmetrics.registerFont(TTFont("Editorial", regular))
            pdfmetrics.registerFont(TTFont("EditorialBold", bold))
            break
    else:
        return "Times-Roman", "Times-Bold", "Helvetica"

    sans_path = Path("C:/Windows/Fonts/arial.ttf")
    sans_bold_path = Path("C:/Windows/Fonts/arialbd.ttf")
    if sans_path.exists() and sans_bold_path.exists():
        pdfmetrics.registerFont(TTFont("Interface", str(sans_path)))
        pdfmetrics.registerFont(TTFont("InterfaceBold", str(sans_bold_path)))
        return "Editorial", "EditorialBold", "Interface"
    return "Editorial", "EditorialBold", "Helvetica"


DISPLAY, DISPLAY_BOLD, SANS = register_fonts()


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(
        name="DocTitle", fontName=DISPLAY_BOLD, fontSize=30, leading=31,
        textColor=DEEP, spaceAfter=10, alignment=TA_LEFT,
    ))
    styles.add(ParagraphStyle(
        name="DocSubtitle", fontName=SANS, fontSize=10, leading=15,
        textColor=ACCENT, uppercase=True, spaceAfter=16,
    ))
    styles.add(ParagraphStyle(
        name="H1Custom", fontName=DISPLAY_BOLD, fontSize=21, leading=24,
        textColor=DEEP, spaceBefore=12, spaceAfter=9, keepWithNext=True,
    ))
    styles.add(ParagraphStyle(
        name="H2Custom", fontName=DISPLAY_BOLD, fontSize=15, leading=18,
        textColor=INK, spaceBefore=9, spaceAfter=7, keepWithNext=True,
    ))
    styles.add(ParagraphStyle(
        name="H3Custom", fontName=SANS, fontSize=9.2, leading=12,
        textColor=ACCENT, spaceBefore=7, spaceAfter=4, keepWithNext=True,
    ))
    styles.add(ParagraphStyle(
        name="BodyCustom", fontName=SANS, fontSize=8.7, leading=13.2,
        textColor=INK, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        name="SmallCustom", fontName=SANS, fontSize=7.3, leading=10.5,
        textColor=MUTED, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        name="TableCustom", fontName=SANS, fontSize=6.8, leading=9,
        textColor=INK,
    ))
    styles.add(ParagraphStyle(
        name="TableHeader", fontName=SANS, fontSize=6.8, leading=9,
        textColor=SURFACE,
    ))
    styles.add(ParagraphStyle(
        name="CodeCustom", fontName="Courier", fontSize=6.4, leading=8.2,
        textColor=INK, leftIndent=7, rightIndent=7,
        borderPadding=8, backColor=CREAM, spaceBefore=3, spaceAfter=7,
    ))
    styles.add(ParagraphStyle(
        name="CoverKicker", fontName=SANS, fontSize=8, leading=11,
        textColor=ACCENT, spaceAfter=8,
    ))
    return styles


STYLES = build_styles()


def inline_markup(text: str) -> str:
    text = html.escape(text, quote=True)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`(.+?)`", r'<font name="Courier" size="7.2">\1</font>', text)

    def link(match: re.Match[str]) -> str:
        label, url = match.group(1), html.unescape(match.group(2))
        return f'<a href="{html.escape(url, quote=True)}" color="#0B6A78"><u>{label}</u></a>'

    return re.sub(r"\[(.+?)\]\((.+?)\)", link, text)


def page_decor(canvas, doc):
    canvas.saveState()
    width, height = A4
    if doc.page > 1:
        canvas.setFillColor(DEEP)
        canvas.rect(0, height - 12 * mm, width, 12 * mm, fill=1, stroke=0)
        canvas.setFillColor(SURFACE)
        canvas.setFont(SANS, 6.8)
        canvas.drawString(18 * mm, height - 7.5 * mm, doc.report_name.upper())
    canvas.setStrokeColor(BORDER)
    canvas.line(18 * mm, 13 * mm, width - 18 * mm, 13 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(SANS, 6.5)
    canvas.drawString(18 * mm, 8.5 * mm, "PANGASINAN HERITAGE DIGITAL SHOWCASE")
    canvas.drawRightString(width - 18 * mm, 8.5 * mm, f"{doc.page:02d}")
    canvas.restoreState()


class HeritageDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str, report_name: str):
        super().__init__(
            filename,
            pagesize=A4,
            rightMargin=18 * mm,
            leftMargin=18 * mm,
            topMargin=20 * mm,
            bottomMargin=18 * mm,
            title=report_name,
            author="Pangasinan Heritage Digital Showcase",
        )
        self.report_name = report_name
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates(PageTemplate(id="document", frames=[frame], onPage=page_decor))


def image_flowable(image_path: Path):
    with PILImage.open(image_path) as picture:
        width, height = picture.size
        max_width = 170 * mm
        is_route_viewport = image_path.stem.endswith("-viewport")
        max_height = (160 if is_route_viewport else 82) * mm
        scale = min(max_width / width, max_height / height)

        # ReportLab otherwise embeds each full-resolution PNG even when it is
        # printed as a small crop. Rasterize at roughly 160 dpi and encode once
        # as a high-quality JPEG so the submission PDF stays practical to upload.
        target_width = max(1, min(width, round(width * scale * 2.2)))
        target_height = max(1, min(height, round(height * scale * 2.2)))
        rendered = picture.convert("RGB")
        if rendered.size != (target_width, target_height):
            rendered = rendered.resize((target_width, target_height), PILImage.Resampling.LANCZOS)
        buffer = BytesIO()
        rendered.save(buffer, format="JPEG", quality=88, optimize=True, progressive=True)
        buffer.seek(0)

    flowable = Image(buffer, width=width * scale, height=height * scale)
    flowable.hAlign = "LEFT"
    return KeepTogether([flowable, Spacer(1, 3 * mm)])


def table_flowable(rows: list[list[str]]):
    if not rows:
        return Spacer(1, 1)
    columns = max(len(row) for row in rows)
    usable = 174 * mm
    if columns >= 6:
        widths = [usable * 0.28] + [usable * 0.144] * 5
    elif columns == 5:
        widths = [usable * 0.32] + [usable * 0.17] * 4
    elif columns == 2:
        widths = [usable * 0.30, usable * 0.70]
    else:
        widths = [usable / columns] * columns
    data = [
        [
            Paragraph(inline_markup(cell), STYLES["TableHeader" if row_index == 0 else "TableCustom"])
            for cell in row
        ]
        for row_index, row in enumerate(rows)
    ]
    table = Table(data, colWidths=widths[:columns], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), DEEP),
        ("TEXTCOLOR", (0, 0), (-1, 0), SURFACE),
        ("FONTNAME", (0, 0), (-1, 0), SANS),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.35, BORDER),
        ("BACKGROUND", (0, 1), (-1, -1), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, CREAM]),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return table


def parse_markdown(source: Path):
    lines = source.read_text(encoding="utf-8").splitlines()
    story = []
    paragraph: list[str] = []
    first_heading = True
    index = 0

    def flush_paragraph():
        if paragraph:
            joined = " ".join(item.strip() for item in paragraph)
            story.append(Paragraph(inline_markup(joined), STYLES["BodyCustom"]))
            paragraph.clear()

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()

        if stripped == "<!-- PAGEBREAK -->":
            flush_paragraph()
            story.append(PageBreak())
            index += 1
            continue

        if stripped.startswith("```"):
            flush_paragraph()
            code: list[str] = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code.append(lines[index])
                index += 1
            wrapped: list[str] = []
            for code_line in code:
                wrapped.extend(textwrap.wrap(code_line, width=88, subsequent_indent="    ", replace_whitespace=False) or [""])
            story.append(Preformatted("\n".join(wrapped), STYLES["CodeCustom"]))
            index += 1
            continue

        image_match = re.fullmatch(r"!\[(.*?)\]\((.*?)\)", stripped)
        if image_match:
            flush_paragraph()
            image_path = (source.parent / image_match.group(2)).resolve()
            story.append(image_flowable(image_path))
            story.append(Paragraph(inline_markup(image_match.group(1)), STYLES["SmallCustom"]))
            index += 1
            continue

        if stripped.startswith("|") and stripped.endswith("|"):
            flush_paragraph()
            table_lines: list[str] = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index].strip())
                index += 1
            rows: list[list[str]] = []
            for table_line in table_lines:
                cells = [cell.strip() for cell in table_line.strip("|").split("|")]
                if all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells):
                    continue
                rows.append(cells)
            story.extend([table_flowable(rows), Spacer(1, 3 * mm)])
            continue

        if stripped.startswith("- "):
            flush_paragraph()
            bullets: list[str] = []
            while index < len(lines) and lines[index].strip().startswith("- "):
                bullets.append(lines[index].strip()[2:])
                index += 1
            items = [ListItem(Paragraph(inline_markup(item), STYLES["BodyCustom"]), leftIndent=10) for item in bullets]
            story.append(ListFlowable(items, bulletType="bullet", leftIndent=16, bulletColor=ACCENT))
            story.append(Spacer(1, 2 * mm))
            continue

        if stripped.startswith("### "):
            flush_paragraph()
            story.append(Paragraph(inline_markup(stripped[4:]), STYLES["H3Custom"]))
        elif stripped.startswith("## "):
            flush_paragraph()
            if first_heading:
                story.append(Paragraph(inline_markup(stripped[3:]), STYLES["DocSubtitle"]))
            else:
                story.append(Paragraph(inline_markup(stripped[3:]), STYLES["H1Custom"]))
        elif stripped.startswith("# "):
            flush_paragraph()
            story.append(Spacer(1, 18 * mm))
            story.append(Paragraph(inline_markup(stripped[2:]), STYLES["DocTitle"]))
            first_heading = False
        elif stripped == "---":
            flush_paragraph()
            story.extend([Spacer(1, 2 * mm), Table([[""]], colWidths=[174 * mm], rowHeights=[0.5], style=[("BACKGROUND", (0, 0), (-1, -1), ACCENT)]), Spacer(1, 3 * mm)])
        elif not stripped:
            flush_paragraph()
        else:
            paragraph.append(line)
        index += 1

    flush_paragraph()
    return story


def generate(source_relative: str, output_relative: str, report_name: str):
    source = ROOT / source_relative
    output = ROOT / output_relative
    output.parent.mkdir(parents=True, exist_ok=True)
    document = HeritageDocTemplate(str(output), report_name)
    document.build(parse_markdown(source))
    final_copy = ROOT / "output" / "pdf" / output.name
    final_copy.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(output, final_copy)
    submission_folder = ROOT / "Activity-1.1-Lastname-Firstname"
    submission_section = "report" if output.name == "Framework-Selection-Report.pdf" else "documentation"
    submission_copy = submission_folder / submission_section / output.name
    submission_copy.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(output, submission_copy)
    print(f"Generated {output.relative_to(ROOT)}")


generate(
    "report/Framework-Selection-Report.md",
    "report/Framework-Selection-Report.pdf",
    "Framework Selection Report",
)
generate(
    "documentation/Atomic-Design-System-Manual.md",
    "documentation/Atomic-Design-System-Manual.pdf",
    "Atomic Design System Manual",
)
