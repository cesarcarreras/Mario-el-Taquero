//CANVAS
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 700;

// VALUES
let frames  = 0;
let requestID = true;
let points = 20;
let enemies = []
let tacos = []
ctx.font ="60px VT323";
ctx.fillStyle = "#2b2828";

//AUDIOS 
const audioStart = new Audio();
audioStart.src = "../audios/start.wav";

const audioGameOver = new Audio();
audioGameOver.src = "../audios/mario-dies.wav";

const audioShoot = new Audio();
audioShoot.src = "../audios/shoot.wav";

const audioCollision =  new Audio();
audioCollision.src = "../audios/collision.mp3";

const audioWinner = new Audio();
audioWinner.src = "../audios/winner.wav";

const audioLevel = new Audio();
audioLevel.src = "../audios/level-waiting.ogg";

// BACKGROUND
class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "../images/otso-background.jpeg";
    };

    gameOver(){
        let img = new Image();
        img.src = "../images/game-over.png";
        setTimeout(() => { 
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }, 700);
        audioGameOver.play();
    };

    levelUp(){
        let image = new Image();
        image.src = "../images/esochavo.png"; 
        setTimeout(() => { 
         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }, 700);
        audioWinner.play();
    };

    draw(){
        this.x -= 2;
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(
            this.image,
            this.x + canvas.width,
            this.y,
            this.width,
            this.height
        );
      };
};
const background = new Background();

// PLAYER
class Mario{
    constructor(x,y,w,h,imgs){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.image1 = new Image();
        this.image1.src = imgs[0];

        this.image2 = new Image();
        this.image2.src = imgs[1];

        this.image = this.image1;
    }

    draw(){
        if(frames % 25 === 0){
           this.image = this.image === this.image1 ? this.image2 : this.image1;
        };
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    };

    collision(ensalada){
        return(
            this.x < ensalada.x + ensalada.width &&
            this.x + this.width > ensalada.x  &&
            this.y < ensalada.y + ensalada.height &&
            this.y + this.height > ensalada.y
        );
    };
};

const marioImgs = [
    "../images/mario1.png",
    "../images/mario2.png"
];
const mario = new Mario(100, 470, 120, 120, marioImgs);

// SHOOTS
class Tacos{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 35;
        this.image = new Image();
        this.image.src = "../images/taco.png";
    };

    draw(){
        this.x +=2;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    };

    collision(ensalada){
        return(
            this.x < ensalada.x + ensalada.width &&
            this.x + this.width > ensalada.x  &&
            this.y < ensalada.y + ensalada.height &&
            this.y + this.height > ensalada.y
        );
    };
};

// ENEMIES
class Ensaladas{
    constructor(){
        this.x = canvas.width;
        this.y = 400;
        this.width = 80;
        this.height = 70;
        this.image = new Image();
        this.image.src = "../images/angry-salad.png";
    };

    draw(){
        if(frames % 10) this.x -= 3.5;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    };

};

class Brocolis{
    constructor(){
        this.x = canvas.width;
        this.y = 500;
        this.width = 80;
        this.height = 70;
        this.image = new Image();
        this.image.src = "../images/angry-brocoli.png";
    };

    draw(){
        if(frames % 10) this.x -= 3.5;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    };

};

// FUNCTIONS
function animate(){
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    background.draw();
    generateSalads();
    generateBrocolis();
    drawEnemies();
    mario.draw();
    ctx.fillText(`Enemigos: ${points}`, 50, 80);
    ctx.fillText(`Nivel: 2`, 850, 80);
    levelUp();
    if(requestID){
        requestAnimationFrame(animate);
    } else {
        return undefined;
    };
};

function generateTacos(){
    const taco = new Tacos(mario.x + mario.width, mario.y + 50);
    tacos = [...tacos, taco];
};

function generateSalads(){
    if(frames % 59 === 0 || frames % 110 === 0){
        let randomSalad = Math.floor(Math.random() * 300);
        let s = Math.floor(Math.random() * canvas.width - 600);
        const ensalada = new Ensaladas(randomSalad, s);
        enemies = [...enemies,ensalada];
    };
};

function generateBrocolis(){
    if(frames % 180 === 0 || frames % 600 === 0){
        let randomBrocoli = Math.floor(Math.random() * 300);
        let b = Math.floor(Math.random() * canvas.width - 600);
        const brocoli = new Brocolis(randomBrocoli, b);
        enemies = [...enemies,brocoli];
    };
};

function drawEnemies(){
    enemies.forEach((ensalada,index_enemies)=>{
     ensalada.draw();

        tacos.forEach((taco,index_taco)=>{
          taco.draw();
        
            if(taco.collision(ensalada)){
             enemies.splice(index_enemies,1);
             tacos.splice(index_taco,1);
             points -= 1;
             audioCollision.play();
            };

            if(taco.x + taco.width > canvas.width){
                tacos.splice(index_taco,1);
            };
        });

     if(mario.collision(ensalada)){
       gameOver();
    };

    if(ensalada.x + ensalada.width <= 0 ){
       gameOver();
       enemies.splice(index_enemies,1);
      };
    });
};


function gameOver(){
    background.gameOver();
    requestID = false;
};

function resetGame(){
    points = 0;
    animate();
};

function levelUp(){
    if(points <= 0){
        background.levelUp();
        requestID = false;
        addEventListener('keydown', (event) => {
            if(event.keyCode === 13){
             setTimeout(() => { 
                window.location.replace("../levels/game-3.html");  
            }, 1000);
            audioStart.play();
            };
        });
    };
};


function gameStarts(){
    let image = new Image();
    image.src = "../images/nivel2.png"; 
    image.addEventListener('load', function(){
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        audioLevel.play();
    });
    setTimeout(() => { 
        animate();
    }, 2000);
};

gameStarts();


//CONTROLLERS
addEventListener("keydown", (event)=>{
    //Left
    if(event.keyCode === 37 && mario.x > 0){
        mario.x -= 100;
    };
    //Right
    if(event.keyCode === 39 && mario.x < canvas.width - mario.width){
        mario.x += 100;
    };
    //Up
    if(event.keyCode === 38 && mario.y > canvas.height - mario.height -200){
        mario.y -= 100;
    };
    //Down
    if(event.keyCode === 40 && mario.y < canvas.height - mario.height -110){
        mario.y += 100;
    };
    //Shoot
    if(event.keyCode === 32){
        generateTacos();
        audioShoot.play();
    };
    //Try again
    if(event.keyCode === 82){
        location.reload();
    };

        // CHEAT CODES

    //Win
    if(event.keyCode === 87){
        levelUp();
        points = 0;
    };

    //loose
    if(event.keyCode === 76){
        gameOver();
    };
});