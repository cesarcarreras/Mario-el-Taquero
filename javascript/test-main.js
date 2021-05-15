const canvas = document.getElementById("game"); 
const ctx = canvas.getContext("2d");

// Conseguir el tamaño de la pantalla
canvas.width = innerWidth; 
canvas.height = innerHeight;

// Almacenar las teclas pulsadas
const keys = [];

//Datos del jugador
const player = {
    x: 500, //posicion estandar en el eje X
    y: 500, // posicion estandar en el eje Y
    width: 40, 
    height: 56,
    frameX: 0, // El frame por defecto en el spriteSheet (Viendo de frente)
    frameY: 0, 
    speed: 9, //Velocidad de movimiento
    moving: false //Detener o parar el moiviento
}

// Iterar sobre el SpriteSheet
const playerSprite = new Image();
playerSprite.src = "/images/hulkspritesheet.png";

// Iterar sobre el Background
const background = new Image();
ºbackground.src = "/images/taco-stand.jpeg";

//Dibujar el spriteSheet: 
             // imagen, sourceX, sourceY, sourceW, sourceH, destinationX, destinationY, destinationW, destinationH
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH); //Dibujar dichos elementos
}

// SetInterval para reducir la velocidad del cambio de imagenes
setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height); // Actualizar el canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); //
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    movePlayer();
    handlePlayerFrame();
}, 40)

addEventListener("keydown", (event)=>{
    keys[event.keyCode] = true;
    player.moving = true;
  })

    addEventListener("keyup", (event) => {
    delete keys[event.keyCode];
    player.moving = false;
  })

  function movePlayer(){
      if(keys[38] && player.y > 10){
          player.y -= player.speed;
          player.frameY = 3;
          player.moving = true;
      }

      if(keys[37] && player.x > 0){
          player.x -= player.speed;
          player.frameY = 1;
          player.moving = true;
      }

      if(keys[40] && player.y < canvas.height - player.height){
          player.y += player.speed;
          player.frameY = 0;
          player.moving = true;
      }

      if(keys[39] && player.x < canvas.width - player.width){
          player.x += player.speed;
          player.frameY = 2;
          player.moving = true;
      }
  }

  function handlePlayerFrame(){
      if(player.frameX < 3 && player.moving){
          player.frameX++;
      } else {
          player.frameX = 0;
      }
  }

//   function animate(){
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//     drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
//     movePlayer();
//     handlePlayerFrame();
//     requestAnimationFrame(animate);

// }
// animate();

// let fps, fpsInterval, startTime, now, then, elapsed;

// function startAnimating(fps){
//     fpsInterval = 1000/fps;
//     then = Date.now();
//     startTime = then;
//     animate();
// }

// function animate(){
//     requestAnimationFrame(animate);
//     now = Date.now()
//     elapsed = now - then;
//     if (elapsed > fpsInterval){
//         then = now - (elapsed % fpsInterval);
//         ctx.clearRect(0,0,canvas.width,canvas.height);
//         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//         drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
//         movePlayer();
//         handlePlayerFrame();
//     }
// }

// startAnimating(50)