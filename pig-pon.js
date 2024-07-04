const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
 
const paddleWidth = 10, paddleHeight = 100, ballRadius = 10;
const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 4 };
const ai = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 4 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballRadius, speed: 4, dx: 4, dy: -4 };

 
function drawPaddle(paddle) {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall(ball) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}


function movePaddle(paddle, upKey, downKey) {
    if (upKey && paddle.y > 0) {
        paddle.y -= paddle.dy;
    }
    if (downKey && paddle.y + paddle.height < canvas.height) {
        paddle.y += paddle.dy;
    }
}

 
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
 
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

 
    if (
        (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) ||
        (ball.x + ball.radius > ai.x && ball.y > ai.y && ball.y < ai.y + ai.height)
    ) {
        ball.dx *= -1;
    }

 
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx *= -1;
    }
}

 
let upPressed = false;
let downPressed = false;

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    }
    if (event.key === 'ArrowDown') {
        downPressed = true;
    }
});

document.addEventListener('keyup', event => {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    }
    if (event.key === 'ArrowDown') {
        downPressed = false;
    }
});

 
function update() {
    movePaddle(player, upPressed, downPressed);
    moveBall();
   
    if (ball.y < ai.y + ai.height / 2) {
        ai.y -= ai.dy;
    } else {
        ai.y += ai.dy;
    }
}

 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(player);
    drawPaddle(ai);
    drawBall(ball);
}

 
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

 
gameLoop();
