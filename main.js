let panacek = document.getElementById("panacek");
let panacekX;
let panacekY;
let panacekSirka = 65;
let panacekVyska = 70;
let mince = document.getElementById("mince");
let minceX = mince.offsetLeft;
let minceY = mince.offsetTop;
let minceSirka = 40;
let minceVyska = 40;
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;
let randomTop = nahodneCislo(0, winHeight);
let randomLeft = nahodneCislo(0, winWidth);
let pohnout = 35;
let obrazek = document.querySelector("panacek");
let skoreElem = document.getElementById("score");
let skore = 0;
let pisen = document.getElementById("hudba");
let cinknuti = document.getElementById("zvukmince");
let fanfara = document.getElementById("zvukfanfara");

function nahodneCislo(min, max) {
  return Math.random() * (max - min) + min;
}

function priNacteniStranky() {
  panacek.style.position = "absolute";
  panacek.style.top = winHeight / 2 + "px";
  panacek.style.left = winWidth / 2 + "px";

  panacekX = panacek.offsetLeft;
  panacekY = panacek.offsetTop;

  mince.style.position = "absolute";

  novaMince();
}

function umistiPanacka() {
  panacek.style.top = panacekY + "px";
  panacek.style.left = panacekX + "px";
}

function novaMince() {
  minceX = Math.round(Math.random() * (winWidth - minceSirka));
  minceY = Math.round(Math.random() * (winHeight - minceVyska));
  mince.style.left = minceX + "px";
  mince.style.top = minceY + "px";
}

function priStiskuKlavesy(event) {
  let keyCode = event.keyCode;
  if (keyCode == 37) {
    jitVlevo();
  } else if (keyCode == 39) {
    jitVpravo();
  } else if (keyCode == 38) {
    jitNahoru();
  } else if (keyCode == 40) {
    jitDolu();
  }

  otestujKolizi();
  pustitHudbu();
}
function jitVlevo() {
  let panacekVlevo = parseInt(panacek.style.left);
  panacek.style.left = panacekVlevo - pohnout + "px";
  document.getElementById("panacek").src = "obrazky/panacek-vlevo.png";
  if (panacekVlevo < 0) {
    panacek.style.left = 0;
  }
  panacekX = panacek.offsetLeft;
}
function jitVpravo() {
  let panacekVpravo = parseInt(panacek.style.left);
  panacek.style.left = panacekVpravo + pohnout + "px";
  document.getElementById("panacek").src = "obrazky/panacek-vpravo.png";
  if (panacekVpravo < 0) {
    panacek.style.left = 0;
  }
  panacekX = panacek.offsetLeft;
}
function jitNahoru() {
  let panacekNahoru = parseInt(panacek.style.top);
  panacek.style.top = panacekNahoru - pohnout + "px";
  document.getElementById("panacek").src = "obrazky/panacek-nahoru.png";
  if (panacekNahoru < 0) {
    panacek.style.top = 0;
  }
  panacekY = panacek.offsetTop;
}
function jitDolu() {
  let panacekDolu = parseInt(panacek.style.top);
  panacek.style.top = panacekDolu + pohnout + "px";
  document.getElementById("panacek").src = "obrazky/panacek.png";
  if (panacekDolu < 0) {
    panacek.style.top = 0;
  }
  panacekY = panacek.offsetTop;
}

function otestujKolizi() {
  if (
    !(
      panacekX + panacekSirka < minceX ||
      minceX + minceSirka < panacekX ||
      panacekY + panacekVyska < minceY ||
      minceY + minceVyska < panacekY
    )
  ) {
    console.log("tačnul mincu");
    novaMince();
    skore = skore + 1;
    if (skore + 1) {
      cinknuti.play();
      cinknuti.volume = 0.5;
    }
    skoreElem.textContent = skore;
    if (skore == 5) {
      skoreElem.innerHTML = "Jsi vítěz!";
      fanfara.play();
    }
  }
}

function pustitHudbu() {
  pisen.play();
  pisen.volume = 0.5;
}
