var birdy           = document.getElementById('birdy');

//--------------------- CREATE ANIMATION ---------------------//
var sprite          = document.getElementById('sprite');
var spriteStepWidth = 100;
var spriteSteps     = 2;
var step            = 0;




// step = 2
function animateSprite () {

  // (-2 * 92) + 'px' -> -184px
  sprite.style.left= -step * spriteStepWidth + 'px';

  // if ( 2 == 2 ) -> Si à la marelle ciel == ciel
  if (step == spriteSteps) {
    step = 0;
  }

  else {
    // step = 2 -> j'avance de 1
    step++;
  }

}

//---------------- SPRITE ------------------//
// La variable up est initiée à false;
var up = false;

// Si j'appuie sur espace la variable up passe à true
document.onkeydown = function (e) {
  if ( e.keyCode == 32 ) {
    up = true;
  }
}

// Si je lache espace la variable up passaà false
document.onkeyup = function (e) {
  if ( e.keyCode == 32 ) {
    up = false;
  }
}


//---------------- FLY -------------------//

function animateFly () {

  // offsetTop -> valeur en pixel de la position top de mon element html
  var fall = birdy.offsetTop;

  // Si je suis en train d'appuyer sur espace, up == true et donc je monte.
  if (up == true) {
    birdy.style.top = (fall - 20) + 'px';
  }
  // Sinon, up == false et donc je monte.
  else {
    birdy.style.top = (fall + 12) + 'px';
  }

}

//-------------------- PIPES -------------------//

var pipes = document.getElementsByClassName('pipe');
var pipeWidth = pipes[0].offsetWidth;

function updateHeight (up, down) {
   var obstacle = 70;
   var blockObstacle = obstacle / 3;
   var random = Math.floor( Math.random() * blockObstacle ); // 20%
   var upObstacle = blockObstacle + random; // 30% + 20%
   var downObstacle = blockObstacle + (blockObstacle - random); // 30% + (30% -20%) -> 30% + 10%

   up.style.height = upObstacle + '%';
   down.style.height = downObstacle + '%';
}

function animatePipes () {

  Array.prototype.forEach.call( pipes, function (pipe) {
    var left = pipe.offsetLeft;
    pipe.style.left = left - 10 + 'px';
    if (left < -pipeWidth) {
      updateHeight(pipe.children[0], pipe.children[1]);
      pipe.style.left = 100 + '%';
      pipe.children[0].style.backgroundColor = "green";
      pipe.children[1].style.backgroundColor = "green";
    }
    function touchPipe() {
      var bec = birdy.offsetLeft + birdy.offsetWidth;
      var queue = birdy.offsetLeft;
      var patte = birdy.offsetTop + birdy.offsetHeight;
      var tete = birdy.offsetTop;

      var pipeLeft = pipe.offsetLeft;
      var pipeRight = pipe.offsetLeft + pipe.offsetWidth;
      var pipeUp = pipe.children[0].offsetTop + pipe.children[0].offsetHeight;
      var pipeDown = pipe.children[1].offsetTop;

      if(bec > pipeLeft && queue < pipeRight) {
        if(patte > pipeDown) {
          pipe.children[1].style.backgroundColor = "red";
        console.log("DIE BITCH");
      }
        if(tete < pipeUp) {
          pipe.children[0].style.backgroundColor = "red";
        console.log("GAME OVER");
      }
      }
    }
    touchPipe(pipe);
  });

}
//-----------------------------------------------------------
// COLISION
//-----------------------------------------------------------



// function animatePipe(){
//   pipes.forEach(function(pipe){
//     touchPipe(pipe);
//   });
// }
//
// function action() {
//   animatePipe();
// }
//
//
// window.setInterval(action,80);
//--------------------- GLOBAL -----------------//

function animateScene () {
  animateSprite();
  animateFly();
  animatePipes();
}


//-----------------------------------------------------------
// LAUNCH SCENE
//-----------------------------------------------------------

var animationInstance = window.setInterval(animateScene, 80);
