"""Generate public/og.png — 1200x630 social preview card for CUVETSMO Labs.

Run: python scripts/make-og.py
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent.parent / "public" / "og.png"
LOGO = Path(__file__).parent.parent / "public" / "smo-logo.png"

W, H = 1200, 630
BRAND = (3, 105, 161)        # sky-700
BRAND_DARK = (12, 74, 110)
BG = (250, 250, 249)         # stone-50
TEXT = (28, 25, 23)          # stone-900
MUTED = (87, 83, 78)         # stone-600

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Subtle radial-ish backdrop using a few translucent ellipses (PIL has no
# radial gradient primitive; this approximates it).
overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for r, alpha in [(620, 18), (480, 24), (340, 36)]:
    od.ellipse(
        (W // 2 - r, -r // 2, W // 2 + r, r),
        fill=(BRAND[0], BRAND[1], BRAND[2], alpha),
    )
img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
draw = ImageDraw.Draw(img)


def load_font(size: int, *, bold: bool = False):
    candidates = (
        ["seguisb.ttf", "seguibl.ttf", "arialbd.ttf", "Arial Bold.ttf"]
        if bold
        else ["segoeui.ttf", "arial.ttf", "Arial.ttf"]
    )
    for name in candidates:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


title_font = load_font(108, bold=True)
sub_font = load_font(36)
small_font = load_font(26)
chip_font = load_font(22, bold=True)
icon_font = load_font(72)

# Logo
try:
    logo = Image.open(LOGO).convert("RGBA").resize((96, 96), Image.LANCZOS)
    img.paste(logo, ((W - 96) // 2, 90), logo)
except FileNotFoundError:
    pass

# Title
title = "CUVETSMO Labs"
tb = draw.textbbox((0, 0), title, font=title_font)
tw, th = tb[2] - tb[0], tb[3] - tb[1]
draw.text(
    ((W - tw) // 2, 215),
    title,
    fill=BRAND_DARK,
    font=title_font,
)

# Subtitle (Thai)
sub = "เครื่องมือทดลองของนิสิตสัตวแพทย์ จุฬาฯ"
sb = draw.textbbox((0, 0), sub, font=sub_font)
sw = sb[2] - sb[0]
draw.text(((W - sw) // 2, 350), sub, fill=TEXT, font=sub_font)

# Subtitle (English)
sub2 = "Experimental tools by Chula Vet students"
s2 = draw.textbbox((0, 0), sub2, font=small_font)
s2w = s2[2] - s2[0]
draw.text(((W - s2w) // 2, 405), sub2, fill=MUTED, font=small_font)

# Lab icon row
icons = ["📷", "⛓", "🤖", "🦾"]
labels = ["Imaging", "Web3", "AI", "Robotics"]
n = len(icons)
gap = 60
# measure each cell
cells = []
for icon, label in zip(icons, labels):
    ib = draw.textbbox((0, 0), icon, font=icon_font)
    iw = ib[2] - ib[0]
    lb = draw.textbbox((0, 0), label, font=chip_font)
    lw = lb[2] - lb[0]
    cells.append((icon, label, max(iw, lw)))

row_w = sum(c[2] for c in cells) + gap * (n - 1)
x = (W - row_w) // 2
y_row = 480
for icon, label, cell_w in cells:
    ib = draw.textbbox((0, 0), icon, font=icon_font)
    iw = ib[2] - ib[0]
    draw.text((x + (cell_w - iw) // 2, y_row), icon, fill=BRAND_DARK, font=icon_font)
    lb = draw.textbbox((0, 0), label, font=chip_font)
    lw = lb[2] - lb[0]
    draw.text(
        (x + (cell_w - lw) // 2, y_row + 78),
        label,
        fill=BRAND_DARK,
        font=chip_font,
    )
    x += cell_w + gap

# Bottom hairline + domain
draw.rectangle((60, H - 60, W - 60, H - 59), fill=BRAND)
domain = "labs.cuvetsmo.com"
db = draw.textbbox((0, 0), domain, font=small_font)
dw = db[2] - db[0]
draw.text(((W - dw) // 2, H - 48), domain, fill=BRAND, font=small_font)

img.save(OUT, "PNG", optimize=True)
print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")
