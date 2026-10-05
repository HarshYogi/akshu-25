/* index.js - splash page (index.html) */
/* Returning visitors skip straight to the welcome-back page */
if(sget('akshu25_seen') === '1' && !(Q && Q.has('fresh'))){
  location.replace(pageUrl('welcome.html'));
}
document.getElementById('openBtn').addEventListener('click',()=>{
  sset('akshu25_music','on');
  startMusic();
  goTo('landing.html');
});
