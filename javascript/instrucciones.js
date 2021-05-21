//CANVAS
const canvas = document.getElementById("instrucciones");
const ctx = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 700;

// VALUES
let frames  = 0;
let requestID = true;

//AUDIOS
const audioStart = new Audio();
audioStart.src = "./audios/start.wav";

const audioLevel = new Audio();
audioLevel.src = "./audios/level-waiting.ogg";


// FUNCTIONS
function animate(){
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(requestID){
        requestAnimationFrame(animate);
    } else {
        return undefined;
    };
};

function gameStarts(){
    let image = new Image();
    image.src = "./images/instrucciones.png"; 
    image.addEventListener('load', function(){
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        audioLevel.play();
    });
};

gameStarts();


//CONTROLLERS
addEventListener("keydown", (event)=>{
    //Start game
    if(event.keyCode === 13){
        setTimeout(() => { 
           window.location.replace("./levels/game-1.html");  
       }, 1000);
       audioStart.play();
       };
});