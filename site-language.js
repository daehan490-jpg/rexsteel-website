/* Static, locally authored language editions. No translation service requests. */
(() => {
  const lang = document.documentElement.lang;
  const choice = document.getElementById('site-language-select');
  choice?.addEventListener('change', () => {
    const next = new URL(choice.value, location.href);
    next.search = location.search;
    next.hash = location.hash;
    location.assign(next.href);
  });
  const labels = {
    en: {'원본 크기':'Original size','화면에 맞추기':'Fit to screen','WONDER ARCH · 박람회 안내':'WONDER ARCH · Exhibition information'},
    'zh-Hant': {'원본 크기':'原始尺寸','화면에 맞추기':'符合畫面','WONDER ARCH · 박람회 안내':'WONDER ARCH · 展會資訊'},
    tr: {'원본 크기':'Özgün boyut','화면에 맞추기':'Ekrana sığdır','WONDER ARCH · 박람회 안내':'WONDER ARCH · Fuar bilgileri'},
    ar: {'원본 크기':'الحجم الأصلي','화면에 맞추기':'ملاءمة للشاشة','WONDER ARCH · 박람회 안내':'WONDER ARCH · معلومات المعرض'}
  };
  window.siteText = text => labels[lang]?.[text] || text;
  // A preview link may start at the new fourth photo; normal visits keep the cycle.
  if (new URL(location.href).searchParams.get('hero') === 'wonderarch') {
    requestAnimationFrame(() => {
      document.querySelectorAll('.hero .slide').forEach(slide => {
        slide.getAnimations().forEach(animation => { animation.currentTime = 26000; });
      });
    });
  }
})();
