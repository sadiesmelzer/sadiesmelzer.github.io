const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// // function resizeCanvas() {
// //   //fit canvas to window and fix issues with canvas blur on zoom
// //   canvas.style.width = window.innerWidth + "px";
// //   canvas.style.height = window.innerHeight + "px";
// //   const scale = window.devicePixelRatio;
// //   canvas.width = window.innerWidth * scale;
// //   canvas.height = window.innerHeight * scale;
// //   ctx.scale(scale, scale);
// // }
// // resizeCanvas();
// // // window.addEventListener("resize", resizeCanvas);

// // //canvas commands  https://www.w3schools.com/tags/ref_canvas.asp
// // //example drawings
// // ctx.strokeStyle = "SeaGreen"

// // ctx.fillStyle = "Coral"
// // ctx.lineWidth = 1;
// // ctx.beginPath();
// // ctx.moveTo(20, 20);
// // ctx.lineTo(20, 100);
// // ctx.lineTo(70, 100);
// // ctx.lineTo(20, 20);
// // ctx.stroke();

// // ctx.fillText("left", 5, 200);
// // ctx.font = '70px serif';
// // ctx.textAlign = "right";
// // ctx.fillText("right", window.innerWidth, 170);

// // ctx.fillStyle = "Coral"
// // ctx.fillRect(window.innerWidth-50, window.innerHeight-50, 45, 45);

// ctx.strokeStyle = "SeaGreen"
// ctx.beginPath();
// ctx.arc(50, 50, 50, 0, 2 * Math.PI);
// ctx.arc(50, 50, 3, 0, 2 * Math.PI);
// ctx.stroke();

// const size = ctx.canvas.height
// for (let y = 0; y < size; y+=30) {
//     for (let x = 0; x < size; x+=30) {
//         ctx.fillStyle = `hsl(${x+y},90%,50%)`
//         ctx.fillRect(x, y, 30, 30)
//     }
// }

//___________________get mouse input___________________

// window.addEventListener("keyup", function(event) {
//     switch (event.code) {
//         case "ArrowRight":
//             right = false
//             break;
//         case "ArrowLeft":
//             left = false
//             break;
//         case "ArrowUp":
//             up = false
//             break;
//         case "ArrowDown":
//             down = false
//             break;
//     }
// });

// window.addEventListener("keydown", function(event) {
//        switch (event.code) {
//         case "ArrowRight":
//             right = true
//             break
//         case "ArrowLeft":
//             left = true
//             break
//         case "ArrowUp":
//             up = true
//             break
//         case "ArrowDown":
//             down = true
//             break
//     }
// })

//___________________animation loop ___________________
let xCircle = 290;
let yCircle = 240;
let Vx = 1;
let Vy = 1;
let move = 0;
let isMoving = false;
let youLose=false;
let loseText=false
let youWin = false
let winText=false


let arm = {
  xTop: 225,
  yTop: 183,
  xBottom: 281,
  yBottom: 236
};

let mouse = {
  down: false,
  x: 0,
  y: 0
};

function cycle() {
  ctx.fillStyle = "#b8cff5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
//ground
  ctx.fillStyle = 'white'
  ctx.fillRect(0,300,canvas.width, canvas.height/2)
  
  // Snowman Shadow
ctx.fillStyle = "rgba(0, 0, 0, 0.2)";  
ctx.beginPath();
ctx.ellipse(190, 338, 70, 15, 0, 0, Math.PI * 2); 
ctx.fill();

 
  // Snowman
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(190, 280, 60, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(190, 210, 45, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(190, 155, 30, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  
  //nose
ctx.fillStyle='orange';
ctx.beginPath();
ctx.moveTo(260, 155);   
ctx.lineTo(220, 160);    
ctx.lineTo(220, 150);   
ctx.closePath();
ctx.fill();

// Eye
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(200, 150, 3, 0, 2 * Math.PI); 
ctx.fill();

//Eyebrow 
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(195, 140);  
ctx.lineTo(205, 145);  
ctx.stroke();



  // Arms
  ctx.beginPath();
  ctx.moveTo(arm.xTop, arm.yTop);
  ctx.lineTo(arm.xBottom, arm.yBottom);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#5e4b28";
  ctx.stroke();
  //useless arm
  ctx.beginPath();
  ctx.moveTo(150, 190);
  ctx.lineTo(90, 250);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#5e4b28";
  ctx.stroke();
  //circle
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(xCircle, yCircle, 10, 0, 2 * Math.PI);
  ctx.fill();
  //target
  ctx.fillStyle = "#bfb89b";
  ctx.beginPath();
  ctx.fillRect(800, 100, 50, 50);
ctx.lineWidth = 3;               
ctx.strokeStyle = "#8a7b66";       
ctx.strokeRect(800, 100, 50, 50);

  //velocity upon release
  if (isMoving) {
    xCircle += Vx;
    // console.log(xCircle);
  } else {
    Vx = 0;
  }
  
  //walls
  if(xCircle > 1000 && yCircle > 140 || xCircle > 1000 && yCircle<100 ){
    Vx=0
    youLose=true
  } 
  
  // ctx.strokeStyle = "white";
  // ctx.beginPath();
  // ctx.moveTo(825, 350);
  // ctx.lineTo(825, 150);
  // ctx.stroke();
if(youLose){
  ctx.fillStyle = '#8db8a3';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  loseText = true;
}

if(loseText){
  ctx.font = 'bold 60px Arial';     // Correct font syntax
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("You Lose!", canvas.width / 2, canvas.height / 2); // Actually draw the text
}
//win
  if(xCircle > 800 && xCircle < 850 && yCircle > 100 && yCircle<150) {
    Vx=0
    youWin=true
    console.log(youWin)
  } 
if(youWin){
  ctx.fillStyle = 'pink';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  winText = true;
}

if(winText){
  ctx.font = 'bold 60px Arial';     // Correct font syntax
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText("Good Job! You win!", canvas.width / 2, canvas.height / 2); // Actually draw the text
}

//   console.log(clearMessage)
// }
// if(clearMessage){
//   ctx.strokeStyle='blue'
//   ctx.fillRect(200,100,100,50)
// }
  

  
  
  requestAnimationFrame(cycle);
}
// Mouse events
// Mouse events
canvas.addEventListener("mousemove", (event) => {
  if (mouse.down) {
    xCircle = event.clientX;
    yCircle = event.clientY;
    arm.xBottom = event.clientX;
    arm.yBottom = event.clientY;
  }
});

canvas.addEventListener("mousedown", (event) => {
  mouse.down = true;
});

canvas.addEventListener("mouseup", () => {
  mouse.down = false;
  isMoving = true;
  Vx=5
});

requestAnimationFrame(cycle); // only one call, no extra }