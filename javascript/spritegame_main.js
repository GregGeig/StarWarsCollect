/***********************************
 * INIT
 * **********************************/

let holo = [
  "./images/jedi.webp",
  "./images/jedi.webp",
  "./images/jedi.webp",
  "./images/sith.webp",
  "./images/jedi.webp",
  "./images/jedi.webp",
  "./images/jedi.webp",
  "./images/jedi.webp",
];

let audios = [
  new Audio("./audio/audio1.mp3"),
  new Audio("./audio/audio2.mp3"),
  new Audio("./audio/audio3.mp3"),
  new Audio("./audio/audio4.mp3"),
  new Audio("./audio/audio5.mp3"),
  new Audio("./audio/audio6.mp3"),
  new Audio("./audio/audio7.mp3"),
  new Audio("./audio/audio8.mp3"),
  new Audio("./audio/audio9.mp3"),
  new Audio("./audio/audio10.mp3"),
  new Audio("./audio/audio11.mp3"),
  new Audio("./audio/pickup.mp3"),
];

let counter = 0;
let player = document.getElementById("player");
let spriteImg = document.getElementById("spriteImg");
let surface = document.getElementById("surface");
let gameContainer = document.getElementById("surface");

let startButton = document.getElementById("startButton");
let debug_output = document.getElementById("debug_output");

let entercounter = 0;
document.getElementById("content").style.display = "block";
document.getElementById("content2").style.display = "none";

let scapes2 = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
];

let counter1 = 0;
let input = document.getElementById("input");
let eventcounter = 1;
let mlpValid = false;

addEventListener("keydown", function (event) {
  if (
    event.key === "Enter" &&
    input.value != "" &&
    input.style.display != "none" &&
    eventcounter == 1
  ) {
    var inputValue = input.value;
    if (inputValue === "MLP" && eventcounter == 1) {
      audios[10].loop = false
      audios[10].pause()
      console.log("MLP activated");
      switchArea();
      surface.style.background = "url(images/img10.jpg)";
      surface.style.backgroundSize = "cover";
      mlpValid = true;
    }
    console.log(inputValue);
    document.getElementById("input").style.display = "none";
    document.getElementById("hidden").style.opacity = 1;
    if(!mlpValid){
    audios[10].play();
    audios[10].loop = true;
    }
    eventcounter = 2;
  } else if (event.key === "Enter" && eventcounter == 2) {
    audios[10].pause();
    switchArea();
    eventcounter = 3;
  } else if (event.key === "Enter" && eventcounter == 3) {
    startGame();
  }
});

function nextscape() {
  if (counter1 == scapes2.length - 1) {
    counter1 = counter1 - 7;
  } else {
    counter1++;
  }
  for (let index = 0; index < audios.length; index++) {
    audios[index].pause();
  }
  audios[10].pause();
  audios[10].loop = false;
  audios[counter1].play();
  document.getElementById("scapes").src = scapes2[counter1];
}

function lastscape() {
  if (counter1 == 0) {
    counter1 = counter1 + 7;
  } else {
    counter1--;
  }
  for (let index = 0; index < audios.length; index++) {
    audios[index].pause();
  }
  audios[10].pause();
  audios[10].loop = false;
  audios[counter1].play();
  document.getElementById("scapes").src = scapes2[counter1];
}
let cantinamusic = document.getElementById("cantina");
function switchArea() {
  document.getElementById("content").style.display = "none";
  document.getElementById("content2").style.display = "block";
  document.getElementById("surface").style.height = "580px";
  document.getElementById("surface").style.width = "1200px";
  document.getElementById("surface").style.background =
    "url(" + scapes2[counter1] + ")";
  audios[10].pause()
  audios[counter1].play();
  document.getElementById("surface").style.backgroundSize = "cover";
}
document.addEventListener("keydown", function (event) {
  if (
    input.style.display == "none" &&
    document.getElementById("content").style.display != "none"
  )
    if (event.key === "ArrowLeft") {
      lastscape();
    } else if (event.key === "ArrowRight") {
      nextscape();
    }
});

// Scale the surface to 80% of the screen width
let surface_scale = 0.8 * (window.innerWidth / surface.clientWidth);
surface.style.transform = `scale(${surface_scale})`;

/***********************************
 * GAME CONFIG
 * **********************************/
let spriteImgNumber = 0; // current animation part of sprite image
let gameSpeed = 24; // game loop refresh rate (pictures per second)
let characterSpeed = 7; // move offset in PX

/***********************************
 * EVENT LISTENER
 * **********************************/
document.onkeydown = keydown_detected;
document.onkeyup = keyup_detected;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;
let downArrow = false;

function keydown_detected(e) {
  //console.log(e);
  //console.log(e.keyCode);
  if (!e) {
    e = window.event; //Internet Explorer
  }
  if (e.keyCode == 37) {
    // leftArrow
    leftArrow = true;
  }
  if (e.keyCode == 38) {
    //upArrow
    upArrow = true;
  }
  if (e.keyCode == 39) {
    // rightArrow
    rightArrow = true;
  }
  if (e.keyCode == 40) {
    // downArrow
    downArrow = true;
  }
}
function keyup_detected(e) {
  //console.log(e);
  //console.log(e.keyCode);
  if (!e) {
    e = window.event; //Internet Explorer
  }
  if (e.keyCode == 37) {
    // leftArrow
    leftArrow = false;
  }
  if (e.keyCode == 38) {
    //upArrow
    upArrow = false;
  }
  if (e.keyCode == 39) {
    // rightArrow
    rightArrow = false;
  }
  if (e.keyCode == 40) {
    // downArrow
    downArrow = false;
  }
}

/***********************************
 * GAME LOOP
 * **********************************/
function startGame() {
  player.style.left = "590px"; // starting position
  player.style.top = "295px"; // starting position
  player.style.opacity = "1"; // show player
  spriteImg.style.right = "0px"; // starting animation

  startButton.innerHTML = "STARTED";
  startButton.removeAttribute("onclick");
  document.getElementById("dashboard").innerHTML = `<div id="counter">
  <h1>points: ${counter}</h1>
  </div>`;

  gameLoop();
}

function gameLoop() {
  if (leftArrow && parseFloat(player.style.left) <= 0) {
    animatePlayer();
    movePlayer(1165, 0, -1);
  } else if (leftArrow) {
    movePlayer(-1 * characterSpeed, 0, -1);
    animatePlayer();
  }
  if (rightArrow && parseFloat(player.style.left) >= 1165) {
    animatePlayer();
    movePlayer(-1165, 0, -1);
  } else if (rightArrow) {
    movePlayer(characterSpeed, 0, 1);
    animatePlayer();
  }
  if (upArrow && parseFloat(player.style.top) <= 5) {
    animatePlayer();
    movePlayer(0, 545, 0);
  } else if (upArrow) {
    movePlayer(0, -1 * characterSpeed, 0);
    animatePlayer();
  }
  if (downArrow && parseFloat(player.style.top) >= 555) {
    movePlayer(0, -550, 0);
    animatePlayer();
  } else if (downArrow) {
    movePlayer(0, characterSpeed, 0);
    animatePlayer();
  }

  setTimeout(gameLoop, 1000 / gameSpeed); // async recursion
}

/***********************************
 * MOVE
 * **********************************/
/**
 * @param {number} dx - player x move offset in pixel
 * @param {number} dy - player y move offset in pixel
 * @param {number} dr - player heading direction (-1: move left || 1: move right || 0: no change)
 */
let collectible = document.getElementById("collectible");
function movePlayer(dx, dy, dr) {
  audios[counter1].play();
  // current position
  let x = parseFloat(player.style.left);
  let y = parseFloat(player.style.top);

  // calc new position
  x += dx;
  y += dy;

  // assign new position
  player.style.left = x + "px";
  player.style.top = y + "px";

  // handle direction

  if (dr != 0) {
    player.style.transform = `scaleX(${dr})`;
  }
  if (isColliding(player, collectible, 5)) {
    let collectiblem = collectible.dataset.value;
    collectiblem = parseInt(collectiblem);
    counter = counter + collectiblem;
    audios[counter1].pause();
    audios[audios.length -1].play();
    if (counter >= 1000){
      document.getElementById("counter").innerHTML = `<h1>points: max</h1>`;
      counter = 999;
    } else {
    document.getElementById("counter").innerHTML = `
    <h1>points: ${counter}</h1>`;
    }
    collectible.style.display = "none";
    setTimeout(() => {
      placeCollectible();

      audios[counter1].play();
    }, 1000);
  }

  // output in debugger box
}

/***********************************
 * ANIMATE PLAYER
 * **********************************/
function animatePlayer() {
  if (spriteImgNumber < 7) {
    // switch to next sprite position
    spriteImgNumber++;
    let x = parseFloat(spriteImg.style.right);
    x += 39; // ANPASSEN!
    spriteImg.style.right = x + "px";
  } else {
    // animation loop finished: back to start animation
    spriteImg.style.right = "0px";
    spriteImgNumber = 0;
  }
}

function isColliding(div1, div2, tolerance = 0) {
  let d1OffsetTop = div1.offsetTop;
  let d1OffsetLeft = div1.offsetLeft;
  let d1Height = div1.clientHeight;
  let d1Width = div1.clientWidth;
  let d1Top = d1OffsetTop + d1Height;
  let d1Left = d1OffsetLeft + d1Width;

  let d2OffsetTop = div2.offsetTop;
  let d2OffsetLeft = div2.offsetLeft;
  let d2Height = div2.clientHeight;
  let d2Width = div2.clientWidth;
  let d2Top = d2OffsetTop + d2Height;
  let d2Left = d2OffsetLeft + d2Width;

  let distanceTop = d2OffsetTop - d1Top;
  let distanceBottom = d1OffsetTop - d2Top;
  let distanceLeft = d2OffsetLeft - d1Left;
  let distanceRight = d1OffsetLeft - d2Left;

  return !(
    tolerance < distanceTop ||
    tolerance < distanceBottom ||
    tolerance < distanceLeft ||
    tolerance < distanceRight
  );
}

function placeCollectible() {
  // calculate random position
  let maxX = gameContainer.clientWidth - collectible.clientWidth;
  let maxY = gameContainer.clientHeight - collectible.clientHeight;
  audios[audios.length -1].pause();
  let randomX = Math.floor(Math.random() * maxX);
  while (randomX < 0 || randomX > 1180) {
    randomX = Math.floor(Math.random() * maxX);
  }
  let randomY = Math.floor(Math.random() * maxY);
  while (randomY < 0 || randomY > 580) {
    randomY = Math.floor(Math.random() * maxY);
  }

  // assign new position to collectible
  document.getElementById("collectible").style.marginLeft = randomX + "px";
  document.getElementById("collectible").style.marginTop = randomY + "px";

  document.getElementById("collectible").innerHTML =
    '<img class="collectible" id="image" src="" alt="">';
  let rand = Math.floor(Math.random() * holo.length);
  document.getElementById("image").src = holo[rand];
  if (rand == 3) {
    document.getElementById("collectible").dataset.value = "5";
  } else {
    document.getElementById("collectible").dataset.value = "1";
  }

  // show the collectible
  collectible.style.display = "block";
}

placeCollectible();



function idset(id, string) {
  document.getElementById(id).innerHTML = string;
}

var stoppuhr = (function() {
  var stop = 1;
  var days = 0;
  var hrs = 0;
  var mins = 0;
  var secs = 0;
  var msecs = 0;
  return {
    start: function() {
      stop = 0;
    },
    stop: function() {
      stop = 1;
    },
    clear: function() {
      stoppuhr.stop();
      days = 0;
      hrs = 0;
      mins = 0;
      secs = 0;
      msecs = 0;
      stoppuhr.html();
    },
    restart: function() {
      stoppuhr.clear();
      stoppuhr.start();
    },
    timer: function() {
      if (stop === 0) {
        msecs++;
        if (msecs === 100) {
          secs ++;
          msecs = 0;
        }
        if (secs === 60) {
          mins++;
          secs = 0;
        }
        if (mins === 60) {
          hrs++;
          mins = 0;
        }
        if (hrs === 24) {
          days++;
          hrs = 0;
        }
        stoppuhr.html();
      }
    },
    
    set: function(tage, stunden, minuten, sekunden, msekunden) {
      stoppuhr.stop();
      days = tage;
      hrs = stunden;
      mins = minuten;
      secs = sekunden;
      msecs = msekunden;
      stoppuhr.html();
    },
    html: function() {
      idset("tage", days);
      idset("stunden", hrs);
      idset("minuten", mins);
      idset("sekunden", secs);
      idset("msekunden", msecs);
    }
  }
})();
setInterval(stoppuhr.timer, 10);
