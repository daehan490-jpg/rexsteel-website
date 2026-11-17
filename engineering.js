
const engineeringViewer=document.getElementById('engineering-viewer');
if(engineeringViewer){
 const canvas=engineeringViewer.querySelector('.engineering-viewer-canvas'),image=canvas.querySelector('img'),original=engineeringViewer.querySelector('[data-original]');let previousOverflow='';
 document.querySelectorAll('[data-engineering-image]').forEach(button=>button.addEventListener('click',()=>{image.src=button.dataset.engineeringImage;image.alt=button.dataset.caption;engineeringViewer.querySelector('h2').textContent=button.dataset.caption;canvas.classList.remove('original');original.setAttribute('aria-pressed','false');original.textContent=window.siteText?.('원본 크기')||'원본 크기';previousOverflow=document.body.style.overflow;engineeringViewer.showModal();document.body.style.overflow='hidden';canvas.scrollTo(0,0)}));
 original.addEventListener('click',()=>{const full=canvas.classList.toggle('original');original.setAttribute('aria-pressed',String(full));original.textContent=window.siteText?.(full?'화면에 맞추기':'원본 크기')||(full?'화면에 맞추기':'원본 크기')});
 engineeringViewer.querySelector('[data-close-engineering]').addEventListener('click',()=>engineeringViewer.close());engineeringViewer.addEventListener('close',()=>{document.body.style.overflow=previousOverflow});engineeringViewer.addEventListener('click',event=>{if(event.target!==engineeringViewer)return;const r=engineeringViewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)engineeringViewer.close()});
}
