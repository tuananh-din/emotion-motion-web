/* Soát giao diện tự động cho các trang, ở cỡ điện thoại 375px và máy tính 1440px.

   Cách dùng:
   1. Ở thư mục gốc repo chạy:  python -m http.server 8765
   2. Mở http://127.0.0.1:8765/index.html (hoặc trang thật trên GitHub Pages).
   3. Mở Console của trình duyệt, dán toàn bộ file này, rồi gõ:  await qcAudit()
      Thêm trang mới thì truyền danh sách: await qcAudit(['index.html', 'story-moi.html'])

   Kết quả: mỗi trang có "OK" hoặc danh sách lỗi cho từng cỡ màn hình. */
async function qcAudit(pages) {
  // Thêm trang mới vào SITE để phần kiểm tra liên kết biết trang đó có thật.
  const SITE = ['index.html', 'story-hm.html', 'dat-lich.html', 'quy-trinh.html', 've-chung-toi.html', 'hoi-dap.html'];
  pages = pages || SITE;
  const files = new Set(SITE.concat(pages));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const result = {};
  for (const [label, w, h] of [['phone', 375, 812], ['desktop', 1440, 900]]) {
    for (const p of pages) {
      const frame = document.createElement('iframe');
      frame.style.cssText = 'position:fixed;left:0;top:0;width:' + w + 'px;height:' + h + 'px;opacity:0;pointer-events:none;border:0';
      frame.src = p + '?qc=' + Date.now();
      document.body.appendChild(frame);
      await new Promise(r => { frame.onload = r; });
      await wait(800);
      const d = frame.contentDocument;
      const win = frame.contentWindow;
      const visible = el => {
        const cs = win.getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0 && !el.closest('[hidden]');
      };
      const issues = [];
      win.scrollTo(0, 2000);
      await wait(250);
      const over = d.documentElement.scrollWidth - d.documentElement.clientWidth;
      if (over > 0) issues.push('Tràn ngang ' + over + 'px');
      const header = d.querySelector('header');
      if (header && Math.round(header.getBoundingClientRect().top) !== 0) issues.push('Thanh đầu trang không bám khi cuộn');
      const h1 = d.querySelectorAll('h1').length;
      if (h1 !== 1) issues.push('Có ' + h1 + ' thẻ h1, cần đúng 1');
      const noAlt = Array.from(d.images).filter(i => !i.hasAttribute('alt')).length;
      if (noAlt) issues.push(noAlt + ' ảnh thiếu alt');
      Array.from(d.images).forEach(i => { i.loading = 'eager'; });
      await wait(1500);
      const broken = Array.from(d.images).filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));
      if (broken.length) issues.push('Ảnh lỗi: ' + broken.join(', '));
      Array.from(d.querySelectorAll('a[href]')).forEach(a => {
        const href = a.getAttribute('href');
        if (/^(https?:|mailto:|tel:)/.test(href)) return;
        const file = href.split('#')[0];
        if (file && !files.has(file)) issues.push('Liên kết tới trang không có trong danh sách: ' + href);
        const section = a.closest('section[id]');
        if (section && href === '#' + section.id && visible(a)) issues.push('Liên kết trỏ về chính nó: ' + a.textContent.trim().slice(0, 30));
      });
      if (label === 'phone') {
        const small = [];
        d.querySelectorAll('a[href], button, select, textarea, summary, input:not([type=hidden]):not([type=checkbox])').forEach(el => {
          if (!visible(el) || el.closest('#em-menu') || el.closest('#lb')) return;
          const r = el.getBoundingClientRect();
          if (r.height < 44 || r.width < 44) small.push((el.textContent.trim() || el.name || el.tagName).slice(0, 20) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
        });
        if (small.length) issues.push('Nút nhỏ hơn 44px: ' + small.join(' | '));
        const tiny = new Set();
        d.querySelectorAll('body *').forEach(el => {
          if (!visible(el)) return;
          const ownText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim().length > 2);
          if (ownText && parseFloat(win.getComputedStyle(el).fontSize) < 12) tiny.add(el.textContent.trim().slice(0, 20));
        });
        if (tiny.size) issues.push('Chữ dưới 12px: ' + Array.from(tiny).slice(0, 6).join(' | '));
        const zoom = Array.from(d.querySelectorAll('input:not([type=checkbox]):not([type=hidden]), select, textarea'))
          .filter(i => visible(i) && parseFloat(win.getComputedStyle(i).fontSize) < 16).length;
        if (zoom) issues.push(zoom + ' ô nhập dưới 16px, iPhone sẽ tự phóng to');
      }
      (result[p] = result[p] || {})[label] = issues.length ? issues : 'OK';
      frame.remove();
    }
  }
  return result;
}
