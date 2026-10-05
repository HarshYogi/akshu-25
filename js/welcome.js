/* welcome.js - "here comes my babygirl" page for returning visits */
/* If she hasn't said "Yes" yet (or you used ?fresh=1 / ?reset=1), show the full intro instead */
if((Q && Q.has('fresh')) || sget('akshu25_seen') !== '1'){
  location.replace('index.html' + (location.search || ''));
}
initMusic();
const t = todayNum();
document.getElementById('wbPhoto').innerHTML = PHOTO_SRC
  ? `<img src="${PHOTO_SRC}" alt="Akshu">`
  : `<div class="ph">${GIRL()}</div>`;
document.getElementById('wbMsg').textContent = t < 1
  ? "Your surprises start on " + fmt(1) + ". Hold on tight, it's almost time!"
  : WB_MSGS[(Math.max(t,1)-1) % WB_MSGS.length];
document.getElementById('wbBtn').textContent = t < 1 ? "See the cards 🧸" : "Show today's surprise 🎁";
document.getElementById('wbBtn').addEventListener('click',(e)=>{
  burst(e.clientX, e.clientY);
  setTimeout(()=> goTo('cards.html'), 250);
});
