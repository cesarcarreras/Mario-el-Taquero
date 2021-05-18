const canvas = document.getElementById("intro");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let frames  = 0;

const audioStart = new Audio();
audioStart.src = "/audios/start.wav"


class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "/images/mexico-background.jpeg"
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


const marioImgs = [
    "/images/mario1.png",
    "/images/mario2.png"
]
let bullets = [];
const mario = new Mario(130, 100, 300, 300, marioImgs);
const background = new Background()

function animate(){
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    background.draw()
    mario.draw()

    requestAnimationFrame(animate)
}

animate()

addEventListener("keydown", (event)=>{
    if(event.keyCode === 13){
        setTimeout(() => { 
            window.location.replace("/game1.html");  
            audioStart.play()
        }, 1200);
        audioStart.play()
    }
})