let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box

}

let direction = "right";
//randomizador da posição da comida
let food ={ 
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//cria o backgroun
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);

}
//cobra
function cobrinha(){
    for(i=0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//função da comida p2
function comida(){

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

}

//keybinds e movimentação
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down"
}
//inicia o jogo
function iniciarJogo(){

    //faz com que nós não podemos ficar offsreen
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //função de perder caso a cabeça se choque com o corpo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("game over");
        }
    }

//chamando os valores do background, cobra e da comida
    criarBG();
    cobrinha();
    comida();
//movimentação
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
//tamanho da cobra
    if(snakeX != food.x  || snakeY != food.y){
        snake.pop();
    }else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

    }


    let newhead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newhead);
}


//set interval de updates
let jogo = setInterval(iniciarJogo, 70);