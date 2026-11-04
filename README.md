# Emotion&Motion · Website

Website chụp ảnh cưới của Emotion&Motion, chạy trên GitHub Pages:
https://tuananh-din.github.io/emotion-motion-web/

## Bắt đầu trên máy mới

```bash
git clone https://github.com/tuananh-din/emotion-motion-web.git C:/Work/emotion-motion-web
cd C:/Work/emotion-motion-web
python -m http.server 8765
```

Mở http://127.0.0.1:8765/ để xem thử.

**Sửa web bằng Claude Code:** mở thư mục này trong Claude Code. Claude tự đọc `CLAUDE.md`, nơi ghi đủ cấu trúc, cách sửa từng phần và cách đưa lên mạng.

## Các trang

| File | Trang |
|---|---|
| `index.html` | Trang chủ |
| `story-hm.html` | Story album cưới H&M |
| `dat-lich.html` | Đặt lịch |
| `quy-trinh.html` | Quy trình và chi phí |
| `ve-chung-toi.html` | Về chúng tôi |
| `hoi-dap.html` | Hỏi đáp |

## Ghi chú

- Trang đang gắn thẻ `noindex` để Google chưa đưa vào kết quả tìm kiếm. Bỏ thẻ này khi ra mắt thật.
- Form đặt lịch gửi về email qua Web3Forms, cần gắn access key. Xem `CLAUDE.md` mục 6.
- Ảnh lấy từ các bài công khai trên Page Facebook của studio. Xin phép các cặp đôi trước khi ra mắt.
- Kết quả soát giao diện: `docs/QC-giao-dien.md`.
