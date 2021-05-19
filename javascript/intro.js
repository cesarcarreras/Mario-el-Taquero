const canvas = document.getElementById("intro");
const ctx = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 700;

let frames  = 0;

const audioStart = new Audio();
audioStart.src = "../audios/start.wav";

const audiointro = new Audio();
audiointro.src = "../audios/intro.mp3";
audiointro.loop = true;


class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "../images/mexico-background2.jpg";

        this.logoImage = new Image();
        this.logoImage.src = "../images/logo.png";
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.logoImage, 350, 50, 450, 300);
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
           this.image = this.image === this.image1 ? this.image2 : this.image1;
        }  
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}

const marioImgs = [
    "../images/mario1.png",
    "../images/mario2.png"
];

const mario = new Mario(500, 400, 250, 250, marioImgs);
const background = new Background();

function animate(){
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    background.draw();
    mario.draw();
    audiointro.play();
    requestAnimationFrame(animate);
}

animate();

addEventListener("keydown", (event)=>{
    if(event.keyCode === 13){
        setTimeout(() => { 
            window.location.replace("../levels/game-1.html");  
            audioStart.play();
        }, 1200);
        audioStart.play();
    };
});