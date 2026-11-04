"""Nén ảnh mới cho web rồi chép vào img/ với tên đánh số.

Chạy ở thư mục gốc repo:
    python -X utf8 tools/optimize_images.py <thư mục ảnh gốc> <tiền tố>
Ví dụ:
    python -X utf8 tools/optimize_images.py "D:/Album/CN Phu Quy" cn
    -> img/cn-01.jpg, img/cn-02.jpg, ...

Quy tắc: ảnh dọc cạnh dài 1600px, ảnh ngang rộng tối đa 2048px, JPEG chất lượng 82, progressive.
Ảnh lưu lại không còn dữ liệu EXIF (vị trí GPS, máy ảnh), giữ đúng chiều xoay.
Cần thư viện Pillow: pip install pillow
"""
import os
import sys

from PIL import Image, ImageOps

if len(sys.argv) != 3:
    sys.exit(__doc__)
source, prefix = sys.argv[1], sys.argv[2]
out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'img')
names = sorted(n for n in os.listdir(source) if n.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')))
if not names:
    sys.exit('Không thấy ảnh nào trong ' + source)
for index, name in enumerate(names, 1):
    image = ImageOps.exif_transpose(Image.open(os.path.join(source, name))).convert('RGB')
    limit = 2048 if image.width > image.height else 1600
    image.thumbnail((limit, limit))
    dest = os.path.join(out_dir, '%s-%02d.jpg' % (prefix, index))
    if os.path.exists(dest):
        sys.exit('Đã có file ' + os.path.basename(dest) + ', đổi tiền tố khác để không ghi đè.')
    image.save(dest, 'JPEG', quality=82, optimize=True, progressive=True)
    print('%-14s %4dx%-4d %4d KB  (từ %s)' % (os.path.basename(dest), image.width, image.height,
                                             os.path.getsize(dest) // 1024, name))
