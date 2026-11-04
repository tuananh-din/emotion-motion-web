# Soát giao diện · 2026-11-05

Soát 6 trang ở cỡ điện thoại 375 × 812 và máy tính 1440 × 900, bằng máy chủ xem thử và script `tools/qc-audit.js`, kèm xem bằng mắt.

## Kết quả sau khi sửa

| Trang | Điện thoại | Máy tính |
|---|---|---|
| `index.html` | OK | OK |
| `story-hm.html` | OK | OK |
| `dat-lich.html` | OK | OK |
| `quy-trinh.html` | OK | OK |
| `ve-chung-toi.html` | OK | OK |
| `hoi-dap.html` | OK | OK |

"OK" nghĩa là đạt mọi mục ở phần "Tiêu chí" bên dưới.

## Lỗi tìm thấy và đã sửa

| Vấn đề | Ảnh hưởng tới người dùng | Đã sửa |
|---|---|---|
| Trên điện thoại, 5 trang phụ không có menu | Muốn sang Quy trình hay Hỏi đáp phải quay về trang chủ rồi mở menu | Menu hiện thành hàng thứ hai dưới logo, đủ Stories, Process, About, FAQ |
| Thanh đầu trang không bám khi cuộn | Cuộn xuống là mất menu và nút Đặt lịch | Đổi `overflow-x: hidden` thành `overflow-x: clip` ở khung ngoài cùng |
| Khung video mở màn rộng 908px trên điện thoại | Mất chú thích và mã thời gian | Thêm `width: 100%` |
| Nút và liên kết nhỏ | Logo 37 × 32px, chân trang và liên kết lẻ cao 11–20px, ô nhập 43px, dễ bấm trượt | Tối thiểu 44px trên điện thoại, ô nhập 46px |
| Chữ dưới 12px trên điện thoại | Nhãn, chú thích, menu 10–11px khó đọc | Tự nâng lên 12px trên điện thoại |
| Liên kết không đi đâu | "Tất cả câu chuyện" và "Xem câu chuyện" của album chưa có trang | "Xem album H&M" dẫn tới trang Story, "Xem câu chuyện" chỉ hiện khi album có trang |
| "VI / EN" và "Films" | Trông bấm được nhưng chưa có bản tiếng Anh và trang phim | Gỡ khỏi menu |
| Chân trang thiếu đường đi | Cuối trang chỉ có Facebook, Instagram | Thêm liên kết tới cả 6 trang |
| Form khi chưa có dịch vụ email | Có thể báo "Đã nhận" trong khi không gửi đi đâu | Chưa có key thì báo khách nhắn Zalo |
| Font tải chậm | Chữ hiện muộn ở lần đầu | Thêm `preconnect` tới Google Fonts |
| Ảnh nặng | Trang chủ hơn 5 MB ảnh | Ảnh dưới màn hình đầu chỉ tải khi cuộn tới |

## Tiêu chí

| Mục | Điện thoại | Máy tính |
|---|---|---|
| Không tràn ngang | có | có |
| Thanh đầu trang bám khi cuộn | có | có |
| Đúng 1 thẻ `h1` | có | có |
| Ảnh có `alt`, không ảnh lỗi | có | có |
| Không liên kết tới trang không tồn tại, không liên kết trỏ về chính nó | có | có |
| Nút và liên kết cao rộng từ 44px | có | |
| Chữ từ 12px | có | |
| Ô nhập từ 16px để iPhone không tự phóng to | có | |
| Menu đi được tới mọi trang | có, menu hàng hai hoặc menu toàn màn hình | có |
| Form: đang gửi, đã nhận, lỗi | đã thử bằng phản hồi giả lập | đã thử bằng phản hồi giả lập |

## Còn lưu ý

- Còn 51 ô chờ điền dạng `[...]`, chạy `python -X utf8 tools/placeholders.py` để xem. Khách xem sẽ thấy các ngoặc vuông này, cần điền trước khi ra mắt thật.
- Form chưa gửi được email cho tới khi gắn access key Web3Forms, xem `CLAUDE.md` mục 6.
- Phần mở màn ở trang chủ vẫn là ảnh tĩnh, chờ clip video.
- Trên máy tính, nhãn chữ mono 11px là chủ ý thiết kế.

## Cách soát lại

Xem `CLAUDE.md` mục 8.
