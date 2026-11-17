
const toggle=document.querySelector('.mobile-toggle'),mobile=document.querySelector('#mobile-nav');
if(toggle&&mobile){toggle.addEventListener('click',()=>{mobile.hidden=!mobile.hidden;toggle.setAttribute('aria-expanded',String(!mobile.hidden))});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;toggle.setAttribute('aria-expanded','false')}))}
const picture=document.getElementById('wonder-image');
if(picture){document.querySelectorAll('#gallery figure img,#product figure img,#double-wave figure img,#blast-evidence figure img,#research-evidence .wa-analysis-plot').forEach(img=>{const open=()=>{picture.querySelector('img').src=img.src;picture.querySelector('img').alt=img.alt;picture.querySelector('p').textContent=img.alt;picture.showModal()};img.tabIndex=0;img.style.cursor='zoom-in';img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});picture.querySelector('button').addEventListener('click',()=>picture.close());picture.addEventListener('click',e=>{if(e.target===picture)picture.close()})}
function bars(){const height=(document.querySelector('.hdr')?.offsetHeight||0)+(document.querySelector('.subnav')?.offsetHeight||0)+12;document.documentElement.style.scrollPaddingTop=height+'px'}
addEventListener('load',bars);addEventListener('resize',bars);bars();

const filmDialog=document.getElementById('wonder-film');
if(filmDialog){
 const filmVideo=filmDialog.querySelector('video');
 const openFilm=(button,automatic=false)=>{
  if(filmDialog.open)return;
  filmDialog.show();
  const filmSource=button.dataset.filmSrc||'assets/wonderarch.mp4';
  if(filmVideo.getAttribute('src')!==filmSource)filmVideo.src=filmSource;
  else filmVideo.currentTime=0;
  filmVideo.muted=false;
  filmVideo.play().catch(()=>{if(automatic&&filmDialog.open){filmVideo.muted=true;filmVideo.play().catch(()=>{});}});
 };
 document.querySelectorAll('[data-wonder-film]').forEach(button=>button.addEventListener('click',()=>openFilm(button)));
 const entryURL=new URL(location.href);
 if(entryURL.searchParams.get('film')==='1'){
  openFilm(document.querySelector('.has-hero [data-wonder-film]'),true);
  entryURL.searchParams.delete('film');
  history.replaceState(null,'',entryURL.pathname+entryURL.search+entryURL.hash);
 }
 filmDialog.querySelector('[data-film-close]').addEventListener('click',()=>filmDialog.close());
 filmDialog.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.fullscreenElement){event.preventDefault();filmDialog.close();}});
 filmDialog.addEventListener('click',event=>{
  if(event.target!==filmDialog)return;
  const r=filmDialog.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)filmDialog.close();
 });
 filmDialog.addEventListener('close',()=>{
  filmVideo.pause();
  filmVideo.currentTime=0;
 });
}

// Wait for preceding images before jumping, so late image sizing cannot displace the gallery.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',async event=>{
 const hash=link.getAttribute('href');const target=document.getElementById(hash.slice(1));
 if(!target)return;
 event.preventDefault();
 const preceding=Array.from(document.querySelectorAll('main img')).filter(img=>img.compareDocumentPosition(target)&Node.DOCUMENT_POSITION_FOLLOWING);
 await Promise.all(preceding.map(img=>{img.loading='eager';return img.decode().catch(()=>{})}));
 bars();history.pushState(null,'',hash);target.scrollIntoView({behavior:'instant',block:'start'});
}));
