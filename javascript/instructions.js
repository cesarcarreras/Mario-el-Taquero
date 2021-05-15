const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 700;

let frames  = 0;
let requestID;

const audioGameOver = new Audio();
audioGameOver.src = "/Audio/game-over.wav"

const audioShoot = new Audio();
audioShoot.src = "/Audio/shoot.wav"

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "/images/otso-background.jpeg"
    }

    gameOver(){
        let img = new Image() 
        img.src = "/images/game-over.png"; 
        img.onload = function (){
            ctx.drawImage(img,0,0,canvas.width,canvas.height)
            console.log("si funciona")
            audioGameOver.play()
        }
       
}

    draw(){
        this.x --;
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        ctx.drawImage(
            this.image,
            this.x + canvas.width,
            this.y,
            this.width,
            this.height
        )
    }

}

class Instructions{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = new Image();
        this.image.src = "https://fontmeme.com/permalink/210512/9eb9aee28521e0ab486f092b48f57a61.png"
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Arrows{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.image = new Image();
        this.image.src = "/images/arrows-removebg-preview.png"
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Mario{
    constructor(x,y,w,h,imgs){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        //imagenes
        this.image1 = new Image();
        this.image1.src = imgs[0];

        this.image2 = new Image();
        this.image2.src = imgs[1];

        this.image = this.image1

        let moveSpeed = 0;
        let Accel = 2;
        let maxSpeed = 100;
    }

    draw(){
        if(frames % 25 === 0){
           this.image = this.image === this.image1 ? this.image2 : this.image1
        } 
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
    }

    collision(ensalada){
        return(
            this.x < ensalada.x + ensalada.width &&
            this.x + this.width > ensalada.x  &&
            this.y < ensalada.y + ensalada.height &&
            this.y + this.height > ensalada.y
        ) 
    }
}

class Ensaladas{
    constructor(){
        this.x = canvas.width;
        this.y = 400;
        this.width = 60;
        this.height = 60;
        //imagen
        this.image = new Image();
        this.image.src = "/images/salad.png";
    }

    draw(){
        if(frames % 10 ) this.x -= 5;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

}

class Knifes{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 30;
        this.image = new Image()
        this.image.src = "/images/knife.png"
    }

    draw(){
        this.x +=2;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

    collision(ensalada){
        return(
            this.x < ensalada.x + ensalada.width &&
            this.x + this.width > ensalada.x  &&
            this.y < ensalada.y + ensalada.height &&
            this.y + this.height > ensalada.y
        ) 
    }
}

const marioImgs = [
    "/images/mario1.png",
    "/images/mario2.png"
]

let ensaladas = []
let knifes = []
let mario = new Mario(800, 400,150,150,marioImgs);
const background = new Background()
const instructions = new Instructions(100,100,600,100)
const arrows = new Arrows(100, 330, 300, 150)

function animate(){
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    background.draw()
    generateSalads()
    drawSalads()
    mario.draw()
    instructions.draw()
    arrows.draw()
    requestAnimationFrame(animate)
}

function generateKnifes(){
    const knife = new Knifes(mario.x + mario.width, mario.y)
    knifes = [...knifes, knife]
}

function generateSalads(){
    if(frames % 200 === 0 || frames % 280 === 0 || frames % 340 ===  0){
        let randomSalad = Math.floor(Math.random() * 300)
        let x = Math.floor(Math.random() * canvas.width - 600 )
        const ensalada = new Ensaladas(randomSalad, x)
        ensaladas = [...ensaladas,ensalada]
    }
}

function drawSalads(){
  ensaladas.forEach((ensalada,index_ensaladas)=>{
     ensalada.draw()
        
        knifes.forEach((knife,index_knife)=>{
          knife.draw()

            if(knife.collision(ensalada)){
             ensaladas.splice(index_ensaladas,1)
             knifes.splice(index_knife,1)
            }

            if(knife.x + knife.width > canvas.width){
                knifes.splice(index_knife,1)
            }
        })

     if(mario.collision(ensalada)){
        gameOver()
    }

    if(ensalada.x + ensalada.width <= 0 ){
        ensaladas.splice(index_ensaladas,1)
      }
    })
}

function gameOver(){
    background.gameOver()
    requestID = undefined
}


animate()

addEventListener("keydown", (event)=>{
    //Left
    if(event.keyCode === 37 && mario.x > 0){
        mario.x -= 60;
    }
    //Right
    if(event.keyCode === 39 && mario.x < canvas.width - mario.width){
        mario.x += 60;
    }
    //Up
    if(event.keyCode === 38 && mario.y > canvas.height - mario.height -300){
        mario.y -= 60;
    }
    //Down
    if(event.keyCode === 40 && mario.y < canvas.height - mario.height -100){
        mario.y += 60;
    }
    //Shoot
    if(event.keyCode === 32){
        generateKnifes()
        audioShoot.play()
    }
    //Game Starts
    if(event.keyCode === 13){
        gameStarts()
    }
})