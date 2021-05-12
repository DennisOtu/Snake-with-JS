const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakeBody{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 5;

let tileCount = 20;
let tileSize = canvas.width / tileCount -2;

let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

let foodX = 5;
let foodY = 5; 

//game loop
function drawGame(){
    changeSnakePosition();

    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();

    checkFoodCollision();

    drawFood();
    drawSnake();
    drawScore();
 
    setTimeout(drawGame, 1000/ speed);

    faster();
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity == 0 && xVelocity == 0) {
       return false;
    }
    //wall collision
    if (headX < 0 || headY < 0) {
        gameOver = true;
    }
    else if (headX === tileCount || headY === tileCount) {
        gameOver = true;        
    }
    
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
           gameOver = true;
           break;           
        }
    }

    if (gameOver) {
        ctx.fillstyle = 'red';
        ctx.font = '50px Verdana';
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana'
    ctx.fillText('Score: ' + score, canvas.width-65, 10);
}

function faster(){
    if (score >= 5) {
        speed = 7;
    }
    if (score >= 10) {
        speed = 9;     
    }
    if (score >= 20) {
        speed = 11;     
    }
    if (score >= 35) {
        speed = 13;     
    }
    
}


function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'green'
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);   
    }

    snakeParts.push(new SnakeBody(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();        
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawFood(){
    ctx.fillStyle = 'orange'
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize)
}

function checkFoodCollision() {
    if (foodX == headX && foodY == headY) {
        foodX = Math.floor(Math.random() * tileCount)
        foodY = Math.floor(Math.random() * tileCount) 
        tailLength++;
        score++;    
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up = 'i' key
    if(event.keyCode == 73){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }

    //down = 'k' key
    if(event.keyCode == 75){
        if(yVelocity == -1)
            return;
        yVelocity = +1;
        xVelocity = 0;
    }

    //left = 'j' key
    if(event.keyCode == 74){
        if(xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right = 'l' key
    if(event.keyCode == 76){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = +1;
    }
}


drawGame();