/* cards.js - the 25 scratch cards */
initMusic();

let cur = 1;
const TOTAL = TOTAL_DAYS;

function openedCount(){
  const t = todayNum(); let c = 0;
  for(let n=1;n<=TOTAL;n++){ if(n<t) c++; else if(n===t && scratched(n)) c++; }
  return c;
}
function statusOf(n){
  const t = todayNum();
  if(n<t) return 'open';                                   // past days: always visible
  if(n===t) return scratched(n) ? 'open' : 'scratch';      // today: scratch it
  return 'locked';                                         // future: locked
}

function renderAll(){ renderProgress(); renderDots(); renderCard(); }

function renderProgress(){
  const c = openedCount(), t = todayNum();
  document.getElementById('progLabel').textContent = `Opened ${c} of ${TOTAL}`;
  document.getElementById('barFill').style.width = (c/TOTAL*100)+'%';
  document.getElementById('todayLabel').textContent =
    t<1 ? 'Starts '+fmt(1) : (t>TOTAL ? 'All done 🎉' : `Today: Day ${t}`);
}

function renderDots(){
  const box = document.getElementById('dots'); box.innerHTML='';
  const t = todayNum();
  for(let n=1;n<=TOTAL;n++){
    const b = document.createElement('button');
    const st = statusOf(n);
    b.className = 'dot'+(st==='open'?' open':'')+(n===t?' today':'')+(n===cur?' cur':'');
    b.setAttribute('aria-label',`Day ${n}${st==='open'?' (opened)':st==='locked'?' (locked)':''}`);
    b.onclick = ()=> go(n);
    box.appendChild(b);
  }
}

function go(n, dir){
  if(n<1||n>TOTAL) return;
  const d = dir ?? (n>cur?1:-1);
  cur = n; renderDots(); renderCard(d);
}
document.getElementById('prev').onclick = ()=> go(cur-1,-1);
document.getElementById('next').onclick = ()=> go(cur+1,1);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft') go(cur-1,-1);
  if(e.key==='ArrowRight') go(cur+1,1);
});
(function swipe(){
  const st = document.getElementById('stage'); let x0=null;
  st.addEventListener('touchstart',e=>{ x0 = e.target.closest('canvas') ? null : e.touches[0].clientX; },{passive:true});
  st.addEventListener('touchend',e=>{
    if(x0===null) return; const dx = e.changedTouches[0].clientX - x0; x0=null;
    if(dx<-50) go(cur+1,1); else if(dx>50) go(cur-1,-1);
  },{passive:true});
})();

function renderCard(dir){
  const n = cur, c = CARDS[n-1], st = statusOf(n), t = todayNum();
  const box = document.getElementById('cardbox');
  let face;
  if(st==='locked'){
    face = `<div class="face"><span class="daytag">Day ${n}</span><div class="emoji">🔒</div>
      <h3>Not yet!</h3><p>This surprise opens on <b>${fmt(n)}</b>. Come back then 🤫</p></div>`;
  }else{
    face = `<div class="face"><span class="daytag">Day ${n} · ${fmt(n)}</span><div class="emoji">${c.emoji}</div>
      <h3>${c.title}</h3><p>${c.text}</p></div>`;
  }
  box.innerHTML = `<div class="card ${st}">${face}${st==='open'?'<span class="stamp">opened ✓</span>':''}${st==='scratch'?'<canvas class="scratch" aria-label="Scratch to reveal today\'s surprise"></canvas>':''}</div>`;
  if(dir){ box.firstElementChild.animate([{opacity:0,transform:`translateX(${dir*28}px)`},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'}); }
  document.getElementById('prev').disabled = n<=1;
  document.getElementById('next').disabled = n>=TOTAL;
  document.getElementById('hint').textContent =
    st==='scratch' ? "Scratch the card with your finger 👆" :
    st==='locked'  ? (t<1 ? "The fun starts on "+fmt(1)+". Almost there! 🧸" : "Locked until its day. No peeking! 😉") :
    (n===t ? "Come back tomorrow for the next one 💕" : "");
  if(st==='scratch') requestAnimationFrame(()=> setupScratch(box.querySelector('canvas'), n));
}

/* ---------- the scratch layer ---------- */
function setupScratch(cv, n){
  const r = cv.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio||1, 2);
  cv.width = Math.round(r.width*dpr); cv.height = Math.round(r.height*dpr);
  const g = cv.getContext('2d'); g.scale(dpr,dpr);
  const W = r.width, H = r.height;
  const grd = g.createLinearGradient(0,0,W,H);
  grd.addColorStop(0,'#f6a8c1'); grd.addColorStop(.5,'#f8d3b2'); grd.addColorStop(1,'#e98fb2');
  g.fillStyle = grd; g.fillRect(0,0,W,H);
  g.globalAlpha = .4; g.fillStyle = '#fff'; g.font = '20px sans-serif'; g.textAlign='center';
  for(let y=26;y<H;y+=44){ for(let x=(y/44%2?20:42);x<W;x+=44){ g.fillText('♥',x,y); } }
  g.globalAlpha = 1;
  g.font = '64px sans-serif'; g.fillText('🧸', W/2, H/2-6);
  g.fillStyle = '#8a2650'; g.font = '700 24px Pacifico, cursive'; g.fillText('Scratch me!', W/2, H/2+44);
  g.font = '700 14px Quicksand, sans-serif'; g.fillText(`Day ${n} surprise`, W/2, H/2+70);

  let drawing=false, last=null, moves=0, done=false;
  const pos = e => { const b=cv.getBoundingClientRect(); return {x:e.clientX-b.left, y:e.clientY-b.top}; };
  function stroke(p){
    g.globalCompositeOperation='destination-out';
    g.lineWidth=46; g.lineCap='round'; g.lineJoin='round';
    g.beginPath(); g.moveTo(last.x,last.y); g.lineTo(p.x,p.y); g.stroke();
    g.beginPath(); g.arc(p.x,p.y,23,0,Math.PI*2); g.fill();
    last = p;
  }
  function check(){          // reveal automatically once about half is scratched off
    if(done) return;
    const d = g.getImageData(0,0,cv.width,cv.height).data;
    let clear=0, total=0;
    for(let i=3;i<d.length;i+=4*29){ total++; if(d[i]<128) clear++; }
    if(clear/total > 0.5) reveal();
  }
  function reveal(){
    done = true; drawing = false;
    cv.style.transition='opacity .7s'; cv.style.opacity='0'; cv.style.pointerEvents='none';
    sset('akshu25_scratched_'+n,'1');
    const b = cv.getBoundingClientRect();
    burst(b.left+b.width/2, b.top+b.height/2);
    renderProgress(); renderDots();
    document.getElementById('hint').textContent = "Come back tomorrow for the next one 💕";
    setTimeout(()=>{ if(cur===n) renderCard(); }, 750);
  }
  cv.addEventListener('pointerdown',e=>{ if(done) return; drawing=true; cv.setPointerCapture(e.pointerId); last=pos(e); stroke(last); e.preventDefault(); });
  cv.addEventListener('pointermove',e=>{ if(!drawing||done) return; stroke(pos(e)); if(++moves%10===0) check(); });
  const end = ()=>{ if(drawing){ drawing=false; check(); } };
  cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end);
}

/* ---------- start: open on today's card ---------- */
cur = Math.min(TOTAL, Math.max(1, todayNum()));
renderAll();
