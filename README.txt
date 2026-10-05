25 SURPRISES FOR AKSHU - how this folder works
================================================

index.html     Splash ("Open"). Returning visitors are sent to welcome.html
landing.html   Happy Birthday + countdown
plan.html      "Here's the plan" + Are you excited? (Yes / No)
no.html        The angry teddy ("HOW DARE YOU!")
welcome.html   "Here comes my babygirl" page for return visits
cards.html     The 25 scratch cards

css/style.css  All the styling and colours (colours are at the very top)
js/config.js   EDIT THIS: dates, the 25 cards, welcome messages, her photo
js/common.js   Shared helpers: storage, teddies, music, confetti
js/*.js        One small script per page

TO CHANGE A CARD:   open js/config.js and edit the CARDS list.
TO ADD HER PHOTO:   copy photo.jpg into this folder, then in js/config.js
                    set  const PHOTO_SRC = 'photo.jpg';

TESTING (add to the end of the address in your browser):
  ?day=5      pretend today is Day 5
  ?reset=1    clear saved progress on this device
  ?fresh=1    show the first-time intro again (skips the welcome-back page)
Example:  index.html?day=5&reset=1

DEPLOYING: upload the whole folder (keep the css and js folders) to
Netlify Drop, GitHub Pages, Cloudflare Pages or Vercel.
Do NOT send her a link that contains ?day=...
