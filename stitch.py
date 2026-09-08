import numpy as np
from PIL import Image

def stitch_images():
    print("Loading images...")
    img1 = Image.open('Group 1.jpg').convert('RGB')
    img2 = Image.open('Group 2.png').convert('RGB')

    w, h1 = img1.size
    w2, h2 = img2.size

    # Best alignment found:
    # Overlap height: 456
    # Horizontal shift: 10 (img2 is shifted by 10 pixels relative to img1)
    overlap = 456
    x_shift = 10

    # Output canvas size:
    # Width: 4107 - 10 = 4097 (the common width)
    # Height: h1 + h2 - overlap = 2308 + 2322 - 456 = 4174
    out_w = w - abs(x_shift)
    out_h = h1 + h2 - overlap

    print(f"Output image size: {out_w}x{out_h}")

    # Crop the overlapping region horizontally
    # Since x_shift = 10, img1 is cropped on the left: columns 10 to w
    # img2 is cropped on the right: columns 0 to w - 10
    c_img1 = img1.crop((x_shift, 0, w, h1))
    c_img2 = img2.crop((0, 0, w - x_shift, h2))

    # Create the new canvas
    stitched = Image.new('RGB', (out_w, out_h))

    # Paste the non-overlapping top part of img1
    top_part = c_img1.crop((0, 0, out_w, h1 - overlap))
    stitched.paste(top_part, (0, 0))

    # Paste the non-overlapping bottom part of img2
    bottom_part = c_img2.crop((0, overlap, out_w, h2))
    stitched.paste(bottom_part, (0, h1))

    # Create the blended overlap region
    overlap_img1 = np.array(c_img1.crop((0, h1 - overlap, out_w, h1))).astype(float)
    overlap_img2 = np.array(c_img2.crop((0, 0, out_w, overlap))).astype(float)

    # Create linear gradient mask
    # 1.0 at the top (img1 only), 0.0 at the bottom (img2 only)
    mask = np.linspace(1.0, 0.0, overlap).reshape(overlap, 1, 1)
    
    # Perform blend
    blended_overlap = (overlap_img1 * mask + overlap_img2 * (1.0 - mask)).astype(np.uint8)
    blended_overlap_img = Image.fromarray(blended_overlap)

    # Paste the blended overlap region
    stitched.paste(blended_overlap_img, (0, h1 - overlap))

    # Save the final high-resolution stitched image
    stitched.save('portrait_stitched_full.png', 'PNG')
    print("Saved portrait_stitched_full.png")

    # Resize to match a target width (e.g. 1366 px like the original portrait.png)
    # Keeping the aspect ratio
    target_w = 1366
    target_h = int(out_h * target_w / out_w)
    resized = stitched.resize((target_w, target_h), Image.Resampling.LANCZOS)
    resized.save('portrait.png', 'PNG')
    print(f"Saved resized portrait.png (size: {target_w}x{target_h})")

if __name__ == '__main__':
    stitch_images()
