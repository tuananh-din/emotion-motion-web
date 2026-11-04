"""Liệt kê các ô chờ điền dạng [ ... ] còn sót trong các trang HTML.

Chạy ở thư mục gốc repo:
    python -X utf8 tools/placeholders.py
"""
import glob
import re

PATTERN = re.compile(r"\[(?!['\"]|data-|open\]|class\]|key\]|current\]|hidden\]|style)[^\]\[<>{}=*\"]{3,}\]")

total = 0
for path in sorted(glob.glob('*.html')):
    found = sorted(set(PATTERN.findall(open(path, encoding='utf-8').read())))
    total += len(found)
    if found:
        print(path)
        for item in found:
            print('   ', item)
print('Tổng:', total, 'ô chờ điền')
