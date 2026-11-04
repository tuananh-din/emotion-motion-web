# Emotion&Motion · Website — hướng dẫn làm việc

Đọc file này trước khi sửa bất cứ thứ gì. Nó đủ để làm việc mà không cần đọc lại cả dự án.
Viết cho Claude Code và cho người sửa web. Cập nhật mục "Nhật ký thay đổi" ở cuối mỗi lần sửa.

## 1. Tổng quan

- **Studio:** Emotion&Motion, chụp ảnh cưới và prewedding. Facebook `facebook.com/Emotionvnstudio`, Instagram `@emotionandmotion_wedding`, Zalo và điện thoại `083 774 4254`.
- **Web đang chạy:** https://tuananh-din.github.io/emotion-motion-web/ (GitHub Pages, lấy từ nhánh `main`, thư mục gốc).
- **Repo:** https://github.com/tuananh-din/emotion-motion-web
- **Bản kế hoạch gốc:** https://claude.ai/artifact/Whr2tjw4znieFoXipyK9bE
- **Khung thiết kế gốc:** https://claude.ai/artifact/YS286gTjJQpvgZ5eTwVTLY. Chỉ để tham khảo. Từ 2026-11-05 web đã sửa thêm nhiều chỗ, khung thiết kế **không** còn khớp.
- **Ngôn ngữ:** nội dung tiếng Việt, tiêu đề album và câu tuyên ngôn để tiếng Anh theo giọng của Page ("...!").

**Nguồn gốc của web là các file HTML trong repo. Sửa trực tiếp vào đó.** Không có bước build, không framework, không npm.
Trước đây HTML được dựng một lần từ khung thiết kế bằng script nằm ngoài repo. Đừng dựng lại từ khung thiết kế, sẽ mất các sửa đổi sau này.

## 2. Cấu trúc thư mục

| Đường dẫn | Là gì |
|---|---|
| `index.html` | Trang chủ |
| `story-hm.html` | Trang Story mẫu, album cưới H&M, 5 cảnh, 25 ảnh có xem phóng to |
| `dat-lich.html` | Trang Đặt lịch, form đầy đủ 11 mục |
| `quy-trinh.html` | Quy trình 9 bước và 4 gói chụp |
| `ve-chung-toi.html` | Về chúng tôi |
| `hoi-dap.html` | Hỏi đáp, 10 câu dạng mở ra đóng lại |
| `img/` | Toàn bộ ảnh, đã nén cho web |
| `tools/placeholders.py` | Liệt kê các ô chờ điền `[...]` còn sót |
| `tools/optimize_images.py` | Nén ảnh mới và chép vào `img/` |
| `tools/qc-audit.js` | Soát giao diện tự động ở cỡ điện thoại và máy tính |
| `docs/QC-giao-dien.md` | Báo cáo soát giao diện và danh sách kiểm tra |
| `.claude/launch.json` | Cấu hình máy chủ xem thử, tên `site`, cổng 8765 |
| `README.md` | Hướng dẫn ngắn cho người |

## 3. Bên trong một trang

Mỗi trang là một file HTML độc lập, theo cùng một khung:

1. `<head>` gồm: tiêu đề, mô tả, thẻ `robots noindex`, thẻ chia sẻ `og:*`, favicon, `theme-color`, font Google, rồi một khối `<style>`.
2. **Dòng đầu của khối `<style>`** là phần dùng chung đã thêm khi soát giao diện:
   - `[hidden]{display:none !important}`
   - `header nav a{padding-block:14px}`, nới vùng bấm của menu.
   - Trong `@media (max-width:760px)`: chữ nhỏ 10–11px được nâng lên 12px, và liên kết trong `main`, `section`, `footer` cao tối thiểu 44px.
3. Các khối `<style>` phía dưới là kiểu riêng của từng trang: hover, chuyển động, bố cục điện thoại.
4. Trong `<body>` gần như mọi kiểu đều viết thẳng ở thuộc tính `style="..."` của từng phần tử. Muốn đổi một chỗ thì sửa đúng `style` của phần tử đó.
5. Script nằm cuối `<body>`.

Mốc màn hình: `860px` (menu chuyển sang dạng điện thoại), `760px` (đa số bố cục về một cột), `560px` và `520px` (tinh chỉnh nhỏ).

Tiền tố class: `em-*` cho trang chủ và phần dùng chung, `st-*` cho đầu trang các trang phụ và trang Story, `bk-*` Đặt lịch, `pr-*` Quy trình, `ab-*` Về chúng tôi, `fq-*` Hỏi đáp.

## 4. Hệ thống thiết kế

| Tên | Mã màu | Dùng cho |
|---|---|---|
| Kem | `#F5F0E8` | Nền chính |
| Lanh | `#ECE4D7` | Nền phụ, khối cảm nhận, bảng giá |
| Mực | `#231F1C` | Chữ chính |
| Khói | `#6E655A` | Chữ phụ, chú thích |
| Chỉ | `#CFC6B8` | Đường kẻ 1px |
| Vang | `#6B2620` | Màu nhấn: nút Đặt lịch, chữ nghiêng nhấn, SCENE 0x |
| Rạp | `#14110F` | Nền tối: dải phim, cảnh 4–5 trang Story, chân trang trang chủ |
| Chữ trên nền tối | `#EDE6DA`, phụ `#A39886`, nhấn `#D38F7E` | |
| Tên album chưa chọn | `#8C8273` | Danh sách Stories ở trang chủ |

- **Font**, nạp từ Google Fonts ở `<head>` mỗi trang:
  - Tiêu đề: `Noto Serif Display`, nét 300, `font-stretch` 62.5–72%, bản nghiêng cho chữ nhấn.
  - Nội dung: `Be Vietnam Pro`, nét 300, 400, 500.
  - Nhãn, số cảnh, mã thời gian: `IBM Plex Mono`.
- **Nút oval:** bo tròn `999px`, chữ hoa 11px, giãn `.14em`. Dạng viền là nút phụ, dạng nền Vang là nút chính.
- **Nhãn trong ngoặc** như `(Đặt lịch)`: 13px, màu Khói. Nhãn số cảnh `SCENE 01`: chữ mono, màu Vang.
- **Đổi màu nhấn cho cả web:** thay `#6B2620` ở mọi file `*.html`, và `#D38F7E` cho chữ nhấn trên nền tối.

## 5. Phần lặp ở nhiều trang (sửa ở đâu thì phải sửa đủ chỗ đó)

| Phần | Nằm ở | Ghi chú |
|---|---|---|
| Menu đầu trang | 6 file | Trang chủ dùng `nav.em-nav` và một menu toàn màn hình `#em-menu`. 5 trang phụ dùng `nav.st-nav`. Mục đang mở có `aria-current="page"` và màu `#6B2620`. |
| Nút Đặt lịch ở đầu trang | 6 file | Trỏ tới `dat-lich.html`. |
| Chân trang | 6 file | Có danh sách liên kết các trang, Facebook, Instagram. Chân trang ở trang chủ là kiểu danh đề phim, nền tối. |
| Số điện thoại và Zalo | nhiều file | Tìm `083 774 4254` và `0837744254`. Link Zalo là `https://zalo.me/0837744254`. |
| Instagram, Facebook | nhiều file | Tìm `emotionandmotion_wedding` và `Emotionvnstudio`. |
| Email studio | ô chờ `[email theo tên miền]` | Ở `index.html` và `dat-lich.html`. |

Lệnh tìm nhanh: `grep -n "083 774 4254" *.html` hoặc `grep -n "st-nav" *.html`.

## 6. Công thức sửa thường gặp

### Điền thông tin thật (giá, số ngày, chính sách, ekip)
1. Chạy `python -X utf8 tools/placeholders.py` để thấy mọi ô `[...]` còn trống, theo từng trang. Lần đếm gần nhất là 51 ô.
2. Thay đúng chữ trong ngoặc vuông, bỏ luôn hai dấu ngoặc.
3. Các ô cùng nội dung ở nhiều trang như `[mức cọc]`, `[số ngày]`, `[số tuần]` phải điền giống nhau ở `quy-trinh.html`, `hoi-dap.html`, `dat-lich.html`, `index.html`.

### Form đặt lịch, gửi về email qua Web3Forms
- Có form ở `index.html` (phần `#book`) và ở `dat-lich.html`. Cả hai dùng chung một đoạn script cuối trang.
- **Gắn key:** trong cả hai file, tìm `var KEY = '';` và dán access key Web3Forms vào giữa hai dấu nháy. Key được thiết kế để nằm công khai.
- Khi chưa có key, bấm gửi sẽ hiện "Form đang được cập nhật. Bạn nhắn Zalo..." chứ không báo đã gửi.
- `LABELS` trong script đổi tên trường sang tiếng Việt cho thư gửi về.
- Ô `botcheck` ẩn dùng để chặn spam. Nếu spam nhiều, Web3Forms khuyên gắn hCaptcha.
- Các mốc trạng thái: `#em-form-wrap` là form, `#em-sent` là thông báo "Đã nhận...!", `#em-error` là thông báo lỗi.
- Thử gửi thật một lần sau khi gắn key, rồi xem hộp thư của email đã đăng ký với Web3Forms.
- FormSubmit đã thử trước đó nhưng sập, lỗi 522, nên đã bỏ.

### Thêm một album Story mới
1. Nén ảnh: `python -X utf8 tools/optimize_images.py "<thư mục ảnh gốc>" <tiền tố>`, ví dụ tiền tố `cn` cho album C&N. Ảnh ra `img/cn-01.jpg` trở đi.
2. Chép `story-hm.html` thành `story-<tên-không-dấu>.html`.
3. Trong file mới, sửa:
   - `<title>`, `meta description`, `og:title`, `og:url`, `og:image`.
   - Tiêu đề `h1`, dòng thông tin, lời dẫn.
   - Các cảnh `section#s1` đến `#s5` và thanh mục lục cảnh `nav.st-index`.
4. Mỗi ảnh là một `<button class="st-zoom" data-lb="N">` bọc `<img>`. Đánh số N liên tục từ 0, trong đó 0 là ảnh bìa, đúng thứ tự xuất hiện.
5. Mảng `SCENES` trong script cuối trang phải có đúng một dòng cho mỗi ảnh, cùng thứ tự với `data-lb`. Đây là nhãn cảnh hiện khi xem ảnh lớn.
6. Ảnh dưới màn hình đầu giữ `loading="lazy" decoding="async"`. Ảnh bìa dùng `fetchpriority="high"`.
7. Nối từ trang chủ, trong `index.html`:
   - Thêm một `<li>` vào danh sách Stories, chép từ dòng có sẵn, đặt `data-story` tiếp theo.
   - Thêm một `<img data-story-img="...">` vào khung xem trước.
   - Thêm một phần tử vào mảng `CAPS` và mảng `HREFS` trong script.
   - Trong `HREFS`, trang có Story riêng thì ghi tên file, chưa có thì ghi `'#stories'`. Với `'#stories'` nút "Xem câu chuyện" tự ẩn.
8. Thêm trang mới vào chân trang của 6 file nếu muốn, và vào mảng `SITE` trong `tools/qc-audit.js`.
9. Chạy soát giao diện ở mục 8.

### Đổi ảnh
- Thay file trong `img/` nhưng giữ nguyên tên, và giữ tỉ lệ gần giống ảnh cũ. Chỗ hiển thị đều cắt theo `aspect-ratio` kèm `object-fit: cover`.
- Muốn dời điểm cắt thì sửa `object-position` trong `style` của thẻ `<img>`.
- Thẻ `<img>` luôn có `alt` tiếng Việt mô tả ảnh.

### Thêm trang mới
Chép một trang phụ đơn giản như `hoi-dap.html` làm khuôn. Thêm liên kết vào menu và chân trang của cả 6 file. Thêm vào `SITE` trong `tools/qc-audit.js`.

### Ra mắt thật
1. Xin phép các cặp đôi có ảnh trên web.
2. Xoá dòng `<meta name="robots" content="noindex, nofollow">` ở mọi trang.
3. Nếu có tên miền riêng:
   - Thêm file `CNAME` chứa tên miền.
   - Cấu hình DNS theo hướng dẫn GitHub Pages.
   - Đổi địa chỉ `https://tuananh-din.github.io/emotion-motion-web/` trong các thẻ `og:url` và `og:image` của 6 file.

## 7. Xem thử, đưa lên và quy ước git

- **Xem thử trong máy:** ở thư mục gốc chạy `python -m http.server 8765` rồi mở http://127.0.0.1:8765/. Trong Claude Code thì dùng máy chủ xem thử tên `site`.
- **GitHub CLI trên Windows:** nếu lệnh `gh` chưa có trong PATH, gọi đường dẫn đầy đủ `"C:\Program Files\GitHub CLI\gh.exe"`. Máy mới cần đăng nhập một lần: `gh auth login --hostname github.com --git-protocol https --web`.
- **Quy trình chủ studio đã chọn:** mỗi đợt sửa làm trên một nhánh mới, rồi push, mở pull request và merge vào `main`. GitHub Pages tự dựng lại sau khoảng 1 phút.
- **Tên người commit trong repo này:** `tuananh-din` với email `210796181+tuananh-din@users.noreply.github.com`, là email ẩn danh của GitHub để không lộ email thật. Trên máy mới, đặt bằng `git config user.name` và `git config user.email`.
- **Windows giới hạn độ dài đường dẫn,** nên clone vào thư mục ngắn, ví dụ `C:\Work\emotion-motion-web`.

## 8. Soát giao diện sau mỗi lần sửa

1. Chạy máy chủ xem thử, mở trang chủ, dán nội dung `tools/qc-audit.js` vào Console rồi gõ `await qcAudit()`.
2. Mọi trang phải ra `OK` ở cả `phone` và `desktop`.
3. Script kiểm tra:
   - Không tràn ngang, thanh đầu trang bám khi cuộn.
   - Đúng 1 thẻ `h1`, ảnh có `alt` và không lỗi, liên kết không trỏ tới trang không tồn tại.
   - Trên điện thoại: nút cao rộng từ 44px, chữ từ 12px, ô nhập từ 16px.
4. Bằng mắt thì xem thêm: trang chủ, một trang phụ, form đặt lịch, và bấm thử xem ảnh lớn ở trang Story.
5. Chi tiết và kết quả lần soát gần nhất nằm trong `docs/QC-giao-dien.md`.

## 9. Quyết định đã chốt

- **Hướng đi "Cinematic Editorial":** học bố cục tạp chí của Emotions & Math và độ ấm của Nirav Patel. Không chép các chi tiết nhận diện của Emotions & Math vì tên hai bên rất giống nhau: chấm đỏ góc trang, tên thương hiệu chữ Times khổng lồ ở chân trang, bìa giả Vogue.
- **Ảnh** lấy từ các bài công khai trên Page Facebook của studio.
- **"VI / EN" và "Films"** đã gỡ khỏi menu cho tới khi có bản tiếng Anh và có phim thật.
- **Video mở màn** ở trang chủ hiện là ảnh tĩnh hoàng hôn Phú Quý, chờ clip 8–10 giây không tiếng.

## 10. Việc còn chờ chủ studio

- Access key Web3Forms để form gửi được email.
- Nội dung thật cho 51 ô chờ, xem bằng `tools/placeholders.py`: giá, cọc, thời gian giao ảnh, chính sách, ekip, ekip của album H&M, lời cảm nhận thật.
- Quyết định: có quay phim không, có cần bản tiếng Anh không, có mua tên miền riêng không, ngày ra mắt.
- Các bước sau đó: thêm Story cho album Phú Quý và T&L, mục Journal để lên Google, gắn đo lượt truy cập.

## Nhật ký thay đổi

- **2026-11-04:** dựng trang chủ, đưa lên GitHub Pages, thêm trang Story H&M (pull request #1).
- **2026-11-05:**
  - Thêm Đặt lịch, Quy trình, Về chúng tôi, Hỏi đáp, tối ưu cho điện thoại (pull request #2).
  - Nối form FormSubmit (pull request #3), dịch vụ sập.
  - Chuyển sang Web3Forms, chờ key.
  - Soát giao diện, xem `docs/QC-giao-dien.md`. Viết file hướng dẫn này.
