let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food_G1U6tlb.mp3");
const gameOverSound = new Audio("gameover.wav");
const moveSound = new Audio("hybrid-monster-growl-90325 (2).mp3");
const musicSound = new Audio("snake.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let sankeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }
// Game Function
function main(currenttime) {
    window.requestAnimationFrame(main)
    if ((currenttime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currenttime
    gameEngine();
}
function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < sankeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    //   if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

function gameEngine() {
    // part 1 : Updating the snake array & Food
    if (isCollide(sankeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over. Press any key to play again!");
        sankeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // if you have eaten the food , increment the score and regenerate the food
    if (sankeArr[0].y === food.y && sankeArr[0].x === food.x) {
        foodSound.play();
        score += 1; 
        score.innerHTML = 'Socre: ' + score
        sankeArr.unshift({ x: sankeArr[0].x + inputDir.x, y: sankeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake

    for (let i = sankeArr.length - 2; i >= 0; i--) {
        sankeArr[i + 1] = { ...sankeArr[i] }
    }
    sankeArr[0].x += inputDir.x;
    sankeArr[0].y += inputDir.y;

    // part 2 : Display the snake and Food
    // Display the snake

    snakearea.innerHTML = "";
    sankeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        snakearea.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    snakearea.appendChild(foodElement);
}

// main Logic start here
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 1, y: 0 } // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRigth":
            console.log("ArrowRigth");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;

    }
})