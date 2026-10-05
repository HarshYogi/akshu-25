/* ===========================================================
   config.js  -  THE FILE YOU EDIT MOST
   Change dates, cards, messages and her photo here.
   =========================================================== */

/* ---- Dates ----
   Month is 0-based in JavaScript: 0 = Jan ... 9 = Oct ... 11 = Dec.
   Day 1 is START_DATE. Each following day unlocks at midnight
   (on HER device's clock). */
const START_DATE = new Date(2026, 9, 6);          // Day 1  = 6 Oct 2026
const BIRTHDAY   = new Date(2026, 9, 30, 0, 0, 0); // Countdown target = 30 Oct 2026
const TOTAL_DAYS = 25;

/* ---- Her photo on the "welcome back" page ----
   Put a square-ish photo in the same folder (e.g. photo.jpg)
   and write: const PHOTO_SRC = 'photo.jpg';
   Leave it empty ('') to show the teddy girl instead. */
const PHOTO_SRC = '';

/* ---- The 25 cards ----
   emoji : big icon on the card
   title : heading
   text  : message. You may use HTML here, for example:
           'Listen: <a href="https://..." target="_blank">my song for you</a>'
           '<img src="photos/day3.jpg" alt="">'
           '<audio controls src="audio/day4.mp3"></audio>'
*/
const CARDS = [
  {
   emoji:'💌',
   title:'The Day You Were Born',
   text:'Today I will show you the sky above Banaras on the night you were born. Touch the stars and enjoy your sky.\n <a href="https://day-you-born.vercel.app" target="_blank" style="color: #fff; text-decoration: underline;">Open your sky ✦</a>',
  },
  {emoji:'🎁', title:'Surprise #2',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #3',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #4',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #5',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #6',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #7',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #8',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #9',  text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #10', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #11', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #12', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #13', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #14', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #15', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #16', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #17', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #18', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #19', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #20', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #21', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #22', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #23', text:'Your surprise for today goes here.'},
  {emoji:'🎁', title:'Surprise #24', text:'Your surprise for today goes here.'},
  {emoji:'🎂', title:'Happy 25th Birthday!', text:'The biggest surprise is saved for today. Happy birthday, Akshu!'}
];

/* ---- "Welcome back" messages (a different one each day) ---- */
const WB_MSGS = [
  "Missed you already. Your surprise is ready and waiting.",
  "Hope your day is going as sweet as you are. Today's card is ready.",
  "You came back, and that already made my day. Go on, scratch it.",
  "Someone has a little something for you today.",
  "Every day with you in it is a good one. Here's today's surprise.",
  "Smile first, then open your surprise. Deal?"
];
