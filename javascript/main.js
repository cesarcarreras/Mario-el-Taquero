const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 700;

let frames  = 0;

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "/images/otso-background.jpeg"
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
    }

    draw(){
        if(frames % 25 === 0){
           this.image = this.image === this.image1 ? this.image2 : this.image1
        }
         
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        
    }

}

class Bullet{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.image = new Image()
        this.image.src = "https://mexicobakery.us/wp-content/uploads/2020/07/bolillo1.png"
    }

    draw(){
        this.x +=2;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

const marioImgs = [
    "/images/mario1.png",
    "/images/mario2.png"
]

let bullets = []

const mario = new Mario(800, 400,150,150,marioImgs);
const background = new Background()
const instructions = new Instructions(100,100,600,100)
const arrows = new Arrows(100, 330, 300, 150)

function animate(){
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    background.draw()
    mario.draw()
    instructions.draw()
    arrows.draw()
    requestAnimationFrame(animate)
}

function generateBullet(){
    const bullet = new Bullet(mario.x + mario.width, mario.y)
        bullets = [...bullets,bullet]

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
    if(event.keyCode === 38){
        mario.y -= 60;
    }
    //Down
    if(event.keyCode === 40 && mario.y < canvas.height - mario.height -100){
        mario.y += 60;
    }
    //
    if(event.keyCode === 32){
        generateBullet()
    }
})