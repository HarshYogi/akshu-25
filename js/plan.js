/* plan.js - "Are you excited?" (Yes -> cards, No -> angry page) */
initMusic();
document.getElementById('yesBtn').addEventListener('click',()=>{
  sset('akshu25_seen','1');          // from now on she lands on the welcome-back page
  goTo('cards.html');
});
document.getElementById('noBtn').addEventListener('click',()=> goTo('no.html'));
