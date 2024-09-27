const body = document.querySelector("body");
const gridContainer = document.querySelector("#grid-container");
const resizeBtn = document.querySelector("#resize-btn");
const brushTypeBtns = document.querySelector("#brush-types");
const clearBtn = document.querySelector("#clear-btn");
const gridLineToggleBtn = document.querySelector("#grid-line-btn");

const maxWidth = +window.getComputedStyle(gridContainer).width.slice(0, -2);
const maxHeight = +window.getComputedStyle(gridContainer).height.slice(0, -2);

const maxPixels = 100;

const brushTypes = {
    BLACK: "black",
    OPACITY: "shadow",
    RANDOM: "rainbow",
    ERASE: "eraser"
};

let gridLinesOn = true;
let currentBrushType = brushTypes.BLACK;
toggleButton(document.getElementById(currentBrushType));
generateGrid(16, 16);

gridContainer.addEventListener("mouseover", handlePixelHover);

resizeBtn.addEventListener('click', () => {
    let userInput;
    do {
        userInput = getUserInput();
    } while(!userInputIsValid(userInput));

    deleteGrid();
    generateGrid(userInput, userInput);
});

brushTypeBtns.addEventListener("click", (event) => {
    unToggleButton(document.getElementById(currentBrushType));
    toggleButton(event.target);
    currentBrushType = event.target.id;
});

clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".box").forEach(element => {
        element.style.backgroundColor = body.style.backgroundColor;
    });
});

gridLineToggleBtn.addEventListener("click", () => {
    let newBorderValue = gridLinesOn ? "0" : "1px solid black";
    document.querySelectorAll(".box").forEach(element => {
        element.style.border = newBorderValue;
    });
    gridLinesOn = !gridLinesOn;
});

function toggleButton(btn){
    btn.style.backgroundColor = "blue";
}

function unToggleButton(btn){
    btn.style.backgroundColor = "lightblue";
}

function getUserInput(){
    return +prompt("Enter new grid size!");
}

function userInputIsValid(userInput){
    if(userInput > 0 && userInput <= maxPixels)
        return true;
    alert(`Input a number between 1 and ${maxPixels}!`);
    return false;
}

function deleteGrid(){
    const allGridElements = document.querySelectorAll("#grid-container > div.box");
    for(let gridElement of allGridElements){
        gridContainer.removeChild(gridElement);
    }
}

function generateGrid(width, height){
    let elementSize = calculateSizeOfElements(width, height);

    for(let i = 0; i < (width*height); i++){
        gridContainer.appendChild(generateGridElement(elementSize[0], elementSize[1]));
    }
}

function calculateSizeOfElements(width, height){
    let xSize = (maxWidth/width);
    let ySize = (maxHeight/height);
    return [xSize, ySize];
}

function generateGridElement(elementXSize, elementYSize){
    let element = document.createElement("div");
    element.classList.add("box");
    element.style.width = elementXSize + "px";
    element.style.height = elementYSize + "px";
    element.style.border = gridLinesOn ? "1px solid black" : "0";
    return element;
}

function handlePixelHover(event){
    if(event.target.id == gridContainer.id)
        return;

    switch(currentBrushType){
        case brushTypes.BLACK:
            event.target.style.backgroundColor = "black";
            break;
        case brushTypes.OPACITY:
            event.target.style.backgroundColor = "black";
            break;
        case brushTypes.RANDOM:
            event.target.style.backgroundColor = getRandomColor();
            break;
        case brushTypes.ERASE:
            event.target.style.backgroundColor = gridContainer.style.backgroundColor;
            break;
                        
    }
}

function getRandomColor(){
    let color = "#";
    color += getRandomColorHexValue();
    color += getRandomColorHexValue();
    color += getRandomColorHexValue();
    return color;
}

function getRandomColorHexValue(){
    return getRandomNumber(256).toString(16);
}

function getRandomNumber(max){
    return Math.floor(Math.random()*max);
}