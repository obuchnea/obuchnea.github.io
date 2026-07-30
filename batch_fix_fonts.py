import fontforge
import os
import glob

input_dir = "fonts/Helvetica"
output_dir = "fonts/Helvetica-fixed"

os.makedirs(output_dir, exist_ok=True)

font_files = glob.glob(os.path.join(input_dir, "*.otf"))

for path in font_files:
    filename = os.path.basename(path)
    print(f"Processing: {filename}")

    try:
        font = fontforge.open(path)
        output_path = os.path.join(output_dir, filename)
        font.generate(output_path)
        font.close()
        print(f"  → Saved: {output_path}")
    except Exception as e:
        print(f"  ✗ Failed on {filename}: {e}")

print(f"\nDone. Processed {len(font_files)} fonts.")