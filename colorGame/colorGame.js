var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var colorPicked = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var numsquares = 6;
colorDisplay.textContent = colorPicked;

easyBtn.addEventListener("click", function(){
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    numsquares = 3;
    colors = generateRandomColors(numsquares);
    colorPicked = pickColor();
    colorDisplay.textContent = colorPicked;
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numsquares = 6;
    colors = generateRandomColors(numsquares);
    colorPicked = pickColor();
    colorDisplay.textContent = colorPicked;
    for(var i = 0; i < squares.length; i++){
            squares[i].style.backgroundColor = colors[i]
            squares[i].style.display = "block";
    }
});

function generateRandomColors(num){
    var arr = []
    for(var i = 0; i < num; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}

function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

resetButton.addEventListener("click", function(){
    colors = generateRandomColors(numsquares);
    colorPicked = pickColor();
    colorDisplay.textContent = colorPicked;
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
});

for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === colorPicked){
            messageDisplay.textContent = "Correct!";
            changeColors(colorPicked);
            h1.style.backgroundColor = clickedColor;
            resetButton.textContent = "Play Again?";
        }
        else{
            messageDisplay.textContent = "Try Again";
            this.style.backgroundColor = "#232323";
        }
    });
}