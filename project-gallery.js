(() => {
  const viewer = document.getElementById('project-viewer');
  if (!viewer) return;
  let source;
  const image = viewer.querySelector('img');
  document.querySelectorAll('.pg-gallery img,.project-grid img').forEach(photo => {
    photo.tabIndex = 0;
    photo.setAttribute('role','button');
    photo.setAttribute('aria-haspopup','dialog');
    const open = () => {
      source = photo;
      image.src = photo.currentSrc || photo.src;
      image.alt = photo.alt;
      viewer.querySelector('p').textContent = photo.closest('figure')?.querySelector('figcaption')?.textContent || photo.alt;
      viewer.showModal();
    };
    photo.addEventListener('click',open);
    photo.addEventListener('keydown',event => {
      if(event.key==='Enter'||event.key===' '){event.preventDefault();open();}
    });
  });
  viewer.querySelector('[data-project-close]').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('click',event=>{
    if(event.target!==viewer)return;
    const r=viewer.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close();
  });
  viewer.addEventListener('close',()=>source?.focus({preventScroll:true}));
})();
