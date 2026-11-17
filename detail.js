const toggle=document.querySelector('.mobile-toggle'),menu=document.querySelector('#mobile-nav');
toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');}));
const film=document.querySelector('#detail-film');
if(film){const video=film.querySelector('video');document.querySelector('[data-detail-film]')?.addEventListener('click',()=>{video.src='assets/wonderarch.mp4';film.showModal();video.play().catch(()=>{});});film.querySelector('button').addEventListener('click',()=>film.close());film.addEventListener('close',()=>{video.pause();video.removeAttribute('src');video.load();});}

const procurementSearch=document.getElementById('procurement-search');
if(procurementSearch){procurementSearch.addEventListener('input',()=>{const query=procurementSearch.value.trim().toLowerCase();let count=0;document.querySelectorAll('#procurement tbody tr').forEach(row=>{row.hidden=!row.textContent.toLowerCase().includes(query);if(!row.hidden)count++});document.getElementById('procurement-count').textContent=count+'개 모델';});}
