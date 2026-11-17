(() => {
  const notice = document.getElementById('exhibition-notice');
  if (!notice) return;
  if (Date.now() >= new Date(2026, 11, 12).getTime()) return;
  const storageKey = 'rexsteel:exhibition:k-dex-2026:6-C09:hidden-until';
  let hiddenUntil = 0;
  try { hiddenUntil = Number(localStorage.getItem(storageKey)) || 0; } catch (_) {}
  if (hiddenUntil > Date.now()) return;
  notice.querySelectorAll('[data-exhibition-close]').forEach(button => {
    button.addEventListener('click', () => notice.close());
  });
  notice.querySelector('[data-exhibition-hide-today]').addEventListener('click', () => {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    try { localStorage.setItem(storageKey, String(midnight.getTime())); } catch (_) {}
    notice.close();
  });
  notice.addEventListener('keydown', event => {
    if (event.key === 'Escape') notice.close();
  });
  notice.show();
})();
