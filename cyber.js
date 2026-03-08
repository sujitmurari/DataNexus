(function(){
'use strict';

/* ── CURSOR ── */
const cur = document.getElementById('cur');
if(cur){
  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX; my=e.clientY;
    cur.style.left=mx+'px'; cur.style.top=my+'px';
  });
  document.querySelectorAll('a,button,.pcard,.conn-a,.proc-row,.sk-row,.course-row').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.classList.add('lnk'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('lnk'));
  });
}

/* ── MATRIX RAIN ── */
const cv = document.getElementById('mx');
if(cv){
  const ctx = cv.getContext('2d');
  function rsz(){cv.width=window.innerWidth;cv.height=window.innerHeight;}
  rsz(); window.addEventListener('resize',rsz);
  const cols = Math.floor(window.innerWidth/16);
  const drops = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*スジット分析データSQL>_{}[]|';
  function mat(){
    ctx.fillStyle='rgba(6,6,8,0.05)'; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle='#00ff41'; ctx.font='14px "Courier Prime",monospace';
    drops.forEach((y,i)=>{
      const ch=chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(ch,i*16,y*16);
      if(y*16>cv.height&&Math.random()>.975)drops[i]=0;
      drops[i]++;
    });
  }
  setInterval(mat,55);
}

/* ── CLOCKS ── */
function tick(){
  const n=new Date();
  const t=[n.getHours(),n.getMinutes(),n.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':');
  const d=[n.getDate(),n.getMonth()+1,n.getFullYear()].map(x=>String(x).padStart(2,'0')).join('/');
  ['mbclk','sbtime','ib-time'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=t;});
  ['ib-date'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=d;});
}
tick(); setInterval(tick,1000);

/* ── SKILL BARS ── */
const so = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    e.target.querySelectorAll('.sk-fill').forEach((b,i)=>{
      const w=parseFloat(b.dataset.w||0);
      setTimeout(()=>{
        b.style.transition='transform 1.1s cubic-bezier(.4,0,.2,1)';
        b.style.transform=`scaleX(${w})`;
      },i*65);
    });
    so.unobserve(e.target);
  });
},{threshold:.1});
document.querySelectorAll('.sk-section').forEach(el=>so.observe(el));

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);}
  });
},{threshold:.06});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ── CONTACT FORM ── */
const cf = document.getElementById('cf');

if(cf){
  cf.addEventListener('submit', async function(e){

    e.preventDefault();

    const data = new FormData(cf);

    try{

      const response = await fetch(cf.action,{
        method:'POST',
        body:data,
        headers:{'Accept':'application/json'}
      });

      if(response.ok){

        const status=document.getElementById('form-status');
        if(status){
          status.textContent="✓ MESSAGE TRANSMITTED — CONNECTION SECURE";
          status.style.color="#00ff41";
        }

        cf.reset();

      }

    }catch(err){

      const status=document.getElementById('form-status');
      if(status){
        status.textContent="✖ NETWORK ERROR";
      }

    }

  });
}
/* ── BARCODE ── */
document.querySelectorAll('.barcode').forEach(el=>{
  el.innerHTML='';
  [1,.4,.7,.3,1,.5,.8,.3,.6,.4,.9,.5,.7,.35,1,.4,.75,.5,.9,.4].forEach(h=>{
    const s=document.createElement('span');
    s.style.height=Math.round(h*20)+'px';
    el.appendChild(s);
  });
});

})();
