/* ===========================================================
   common.js  -  shared helpers used by every page
   (storage, dates, page navigation, teddies, floating hearts,
    confetti and the background music). You rarely need to edit it.
   Needs config.js to be loaded first.
   =========================================================== */

/* ---------- URL options (for testing) ----------
   ?day=5   pretend today is Day 5
   ?fresh=1 show the first-time intro even if she has visited
   ?reset=1 clear saved progress on this device               */
let Q = null;
try{ Q = new URLSearchParams(location.search); }catch(e){}

/* ---------- storage (falls back to memory if blocked) ---------- */
const mem = {};
function sget(k){ let v=null; try{ v=localStorage.getItem(k);}catch(e){} return v ?? mem[k] ?? null; }
function sset(k,v){ mem[k]=v; try{ localStorage.setItem(k,v);}catch(e){} }
function sdel(k){ delete mem[k]; try{ localStorage.removeItem(k);}catch(e){} }
const scratched = n => sget('akshu25_scratched_'+n) === '1';

if(Q && Q.has('reset')){
  for(let n=1;n<=TOTAL_DAYS;n++) sdel('akshu25_scratched_'+n);
  sdel('akshu25_seen'); sdel('akshu25_music');
}

/* ---------- dates ---------- */
function dayDate(n){ return new Date(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate() + n - 1); }
function fmt(n){ return dayDate(n).toLocaleDateString('en-IN',{day:'numeric',month:'short'}); }
function todayNum(){   // 0 = before Day 1, 1..25 = day number, 26+ = after the birthday
  if(Q && Q.has('day')) return parseInt(Q.get('day'),10);
  const now = new Date();
  const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((t0 - START_DATE) / 864e5) + 1;
}

/* ---------- navigation ----------
   Keeps ?day=... when moving between pages.
   Any element with data-go="page.html" becomes a link.      */
function pageUrl(page){
  let q = '';
  try{ const p = new URLSearchParams(location.search); p.delete('reset'); p.delete('fresh'); q = p.toString(); }catch(e){}
  return page + (q ? '?'+q : '');
}
function goTo(page){ location.href = pageUrl(page); }
document.querySelectorAll('[data-go]').forEach(el=> el.addEventListener('click',()=> goTo(el.dataset.go)));

/* ---------- teddies ---------- */
function teddy(o){
  const {fur, belly, acc, mood='happy'} = o;
  const dark = '#3b2218';
  const eyes = mood==='angry'
    ? `<circle cx="78" cy="80" r="6" fill="${dark}"/><circle cx="122" cy="80" r="6" fill="${dark}"/>
       <path d="M60 62 L92 74" stroke="${dark}" stroke-width="6" stroke-linecap="round"/>
       <path d="M140 62 L108 74" stroke="${dark}" stroke-width="6" stroke-linecap="round"/>`
    : `<circle cx="78" cy="78" r="7" fill="${dark}"/><circle cx="122" cy="78" r="7" fill="${dark}"/>
       <circle cx="80" cy="75" r="2.4" fill="#fff"/><circle cx="124" cy="75" r="2.4" fill="#fff"/>`;
  const mouth = mood==='angry'
    ? `<path d="M84 116 Q100 100 116 116" fill="none" stroke="${dark}" stroke-width="5" stroke-linecap="round"/>
       <path d="M74 92 q-9 16 0 22 q9 -6 0 -22z" fill="#6ec3f5"/><path d="M126 92 q-9 16 0 22 q9 -6 0 -22z" fill="#6ec3f5"/>`
    : `<path d="M100 101 V107 M100 107 Q91 116 83 109 M100 107 Q109 116 117 109" fill="none" stroke="${dark}" stroke-width="3.5" stroke-linecap="round"/>`;
  const cheeks = mood==='angry'
    ? `<circle cx="64" cy="100" r="9" fill="#ff4d4d" opacity=".55"/><circle cx="136" cy="100" r="9" fill="#ff4d4d" opacity=".55"/>`
    : `<circle cx="62" cy="98" r="9" fill="#ff8fb3" opacity=".65"/><circle cx="138" cy="98" r="9" fill="#ff8fb3" opacity=".65"/>`;
  const bow = (c,c2) => `<path d="M0 0 L-24 -15 L-24 15 Z" fill="${c}"/><path d="M0 0 L24 -15 L24 15 Z" fill="${c}"/><circle r="7" fill="${c2}"/>`;
  const accessory = acc==='bow'
    ? `<g transform="translate(142 36) rotate(24)">${bow('#ff5e8e','#d9366b')}</g>`
    : `<g transform="translate(100 146) scale(.85)">${bow('#4f8fe0','#2f63b5')}</g>`;
  return `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Teddy bear">
    <ellipse cx="100" cy="228" rx="62" ry="6" fill="#000" opacity=".12"/>
    <ellipse cx="62" cy="206" rx="25" ry="18" fill="${fur}"/><ellipse cx="138" cy="206" rx="25" ry="18" fill="${fur}"/>
    <ellipse cx="62" cy="210" rx="12" ry="8" fill="${belly}"/><ellipse cx="138" cy="210" rx="12" ry="8" fill="${belly}"/>
    <ellipse cx="100" cy="165" rx="52" ry="52" fill="${fur}"/>
    <ellipse cx="100" cy="172" rx="32" ry="35" fill="${belly}"/>
    <ellipse cx="46" cy="152" rx="17" ry="30" fill="${fur}" transform="rotate(28 46 152)"/>
    <ellipse cx="154" cy="152" rx="17" ry="30" fill="${fur}" transform="rotate(-28 154 152)"/>
    <circle cx="48" cy="46" r="24" fill="${fur}"/><circle cx="152" cy="46" r="24" fill="${fur}"/>
    <circle cx="48" cy="46" r="12" fill="${belly}"/><circle cx="152" cy="46" r="12" fill="${belly}"/>
    <circle cx="100" cy="85" r="60" fill="${fur}"/>
    <ellipse cx="100" cy="104" rx="27" ry="21" fill="${belly}"/>
    <ellipse cx="100" cy="94" rx="10" ry="7" fill="${dark}"/>
    ${eyes}${cheeks}${mouth}${accessory}
  </svg>`;
}
const BOY   = () => teddy({fur:'#b9794a', belly:'#f3d4b4', acc:'tie'});
const GIRL  = () => teddy({fur:'#d99a6c', belly:'#f9e2c8', acc:'bow'});
const ANGRY = () => teddy({fur:'#d99a6c', belly:'#f9e2c8', acc:'bow', mood:'angry'});
/* In any HTML page: <div data-teddy="couple"></div>  (or "girl", "boy", "angry") */
document.querySelectorAll('[data-teddy]').forEach(el=>{
  const t = el.dataset.teddy;
  el.innerHTML = t==='couple' ? `<div class="boy">${BOY()}</div><span class="love" aria-hidden="true">💗</span><div class="girl">${GIRL()}</div>`
               : t==='girl' ? GIRL() : t==='boy' ? BOY() : ANGRY();
});

/* ---------- floating hearts in the background ---------- */
(function(){
  const box = document.createElement('div'); box.id='floaters'; box.setAttribute('aria-hidden','true');
  const icons = ['💗','🧸','💕','✨','🎀','💖'];
  for(let i=0;i<16;i++){
    const s = document.createElement('span');
    s.textContent = icons[i % icons.length];
    s.style.left = (Math.random()*96)+'%';
    s.style.fontSize = (16+Math.random()*22)+'px';
    s.style.animationDuration = (12+Math.random()*12)+'s';
    s.style.animationDelay = (-Math.random()*20)+'s';
    box.appendChild(s);
  }
  document.body.prepend(box);
})();

/* ---------- confetti hearts ---------- */
function burst(x,y){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const icons = ['💖','🧸','✨','💕','🎀','💗'];
  for(let i=0;i<26;i++){
    const s = document.createElement('span');
    s.className='fly'; s.textContent = icons[i%icons.length];
    s.style.left = x+'px'; s.style.top = y+'px';
    document.body.appendChild(s);
    const a = Math.random()*Math.PI*2, d = 90+Math.random()*170;
    const an = s.animate([
      {transform:'translate(-50%,-50%) scale(.4)',opacity:1},
      {transform:`translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d-40}px)) scale(1.2) rotate(${Math.random()*360}deg)`,opacity:0}
    ],{duration:900+Math.random()*700,easing:'cubic-bezier(.2,.7,.3,1)'});
    an.onfinish = ()=> s.remove();
  }
}

/* ---------- background music (a music-box lullaby made with Web Audio) ----------
   Browsers only allow sound after a tap. Each new page tries to continue the music;
   if the browser blocks it, the first tap anywhere on the page starts it.            */
let ac=null, master=null, musicOn=false, sched=null, nextT=0, stepI=0;
const mtof = m => 440*Math.pow(2,(m-69)/12);
const CHORDS = [
  {arp:[60,64,67,72], bass:48, mel:[76,79,84,79]},   // C
  {arp:[57,60,64,69], bass:45, mel:[81,79,76,null]}, // Am
  {arp:[57,60,65,69], bass:41, mel:[77,81,84,81]},   // F
  {arp:[59,62,67,71], bass:43, mel:[83,81,79,74]},   // G
  {arp:[60,64,67,72], bass:48, mel:[76,79,84,79]},   // C
  {arp:[59,64,67,71], bass:40, mel:[83,79,76,79]},   // Em
  {arp:[57,60,65,69], bass:41, mel:[77,81,84,81]},   // F
  {arp:[59,62,67,71], bass:43, mel:[83,79,74,79]}    // G
];
const ARP = [0,1,2,3,2,1,2,1];
const EIGHTH = 0.4;   // seconds per note: bigger = slower music
function note(midi, t, dur, vol, type){
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type==='bass' ? 'sine' : (type||'sine'); o.frequency.value = mtof(midi);
  g.gain.setValueAtTime(0.0001,t);
  g.gain.exponentialRampToValueAtTime(vol,t+0.012);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+0.05);
  if(type!=='bass'){
    const o2=ac.createOscillator(), g2=ac.createGain();
    o2.type='sine'; o2.frequency.value=mtof(midi)*3;
    g2.gain.setValueAtTime(0.0001,t);
    g2.gain.exponentialRampToValueAtTime(vol*0.18,t+0.008);
    g2.gain.exponentialRampToValueAtTime(0.0001,t+dur*0.4);
    o2.connect(g2); g2.connect(master); o2.start(t); o2.stop(t+dur*0.4+0.05);
  }
}
function schedule(){
  while(nextT < ac.currentTime + 0.8){
    const bar = Math.floor(stepI/8) % CHORDS.length, pos = stepI % 8, c = CHORDS[bar];
    note(c.arp[ARP[pos]], nextT, 1.4, 0.16, 'triangle');
    if(pos===0) note(c.bass, nextT, 2.4, 0.2, 'bass');
    if(pos%2===0){ const m=c.mel[pos/2]; if(m) note(m, nextT, 2.0, 0.11, 'sine'); }
    nextT += EIGHTH; stepI++;
  }
}
function armResume(){
  const evs = ['pointerdown','keydown','touchstart'];
  const h = ()=>{ if(musicOn && ac && ac.state!=='running') ac.resume(); evs.forEach(e=>document.removeEventListener(e,h)); };
  evs.forEach(e=>document.addEventListener(e,h));
}
function startMusic(){
  try{
    if(!ac){
      ac = new (window.AudioContext||window.webkitAudioContext)();
      master = ac.createGain(); master.gain.value = 0;
      const delay = ac.createDelay(); delay.delayTime.value = 0.42;
      const fb = ac.createGain(); fb.gain.value = 0.38;
      const wet = ac.createGain(); wet.gain.value = 0.45;
      master.connect(ac.destination);
      master.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(ac.destination);
    }
    ac.resume();
    master.gain.cancelScheduledValues(ac.currentTime);
    master.gain.linearRampToValueAtTime(0.7, ac.currentTime+2);
    if(!sched){ nextT = ac.currentTime+0.1; sched = setInterval(schedule,200); }
    musicOn = true;
    if(ac.state!=='running') armResume();
  }catch(e){ musicOn=false; }
  paintMusic();
}
function stopMusic(){
  if(ac && master){ master.gain.cancelScheduledValues(ac.currentTime); master.gain.linearRampToValueAtTime(0, ac.currentTime+0.6); }
  clearInterval(sched); sched=null; musicOn=false; paintMusic();
}
function paintMusic(){ const b=document.getElementById('music'); if(b) b.textContent = musicOn ? '🎵' : '🔇'; }
/* Call on pages that show the music button (every page except index.html) */
function initMusic(){
  const b = document.createElement('button');
  b.id='music'; b.className='iconbtn'; b.setAttribute('aria-label','Music on/off'); b.title='Music on/off';
  b.addEventListener('click',()=>{
    if(musicOn && ac && ac.state!=='running'){ ac.resume(); return; }
    if(musicOn){ stopMusic(); sset('akshu25_music','off'); } else { startMusic(); sset('akshu25_music','on'); }
  });
  document.body.appendChild(b);
  if(sget('akshu25_music') !== 'off') startMusic(); else paintMusic();
}
document.addEventListener('visibilitychange',()=>{ if(!ac) return; if(document.hidden) ac.suspend(); else if(musicOn) ac.resume(); });
