/* landing.js - countdown to the birthday */
initMusic();
function pad(n){ return String(n).padStart(2,'0'); }
function tick(){
  const left = BIRTHDAY - new Date();
  if(left <= 0){
    document.getElementById('count').style.display = 'none';
    document.getElementById('untilText').textContent = "It's your day! 🎉🎂";
    return;
  }
  const s = Math.floor(left/1000);
  document.getElementById('cd-d').textContent = pad(Math.floor(s/86400));
  document.getElementById('cd-h').textContent = pad(Math.floor(s%86400/3600));
  document.getElementById('cd-m').textContent = pad(Math.floor(s%3600/60));
  document.getElementById('cd-s').textContent = pad(s%60);
}
tick(); setInterval(tick,1000);
