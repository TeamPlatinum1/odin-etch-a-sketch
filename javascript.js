const gridContainer = document.querySelector("#grid-container");
const resizeBtn = document.querySelector("#resize-btn");
const body = document.querySelector("body");

const maxWidth = +window.getComputedStyle(gridContainer).width.slice(0, -2);
const maxHeight = +window.getComputedStyle(gridContainer).height.slice(0, -2);
const gapSize = +window.getComputedStyle(gridContainer).gap.slice(0, -2);

generateGrid(16, 16);

resizeBtn.addEventListener('click', () => {
    
    let userInput;
    do {
        userInput = getUserInput();
    } while(!userInputIsValid(userInput));

    deleteGrid();
    generateGrid(userInput, userInput);
});


function getUserInput(){
    return +prompt("Enter new grid size!");
}

function userInputIsValid(userInput){
    if(userInput > 0 && userInput <= 70)
        return true;
    alert("Input a number between 1 and 70!");
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
    let xSize = ((maxWidth-((width-1)*gapSize))/width);
    let ySize = ((maxHeight-((height-1)*gapSize))/height);
    return [xSize, ySize];
}

function generateGridElement(elementXSize, elementYSize){
    let element = document.createElement("div");
    element.classList.add("box");
    element.style.width = elementXSize + "px";
    element.style.height = elementYSize + "px";
    element.addEventListener("mouseover", setRandomColorToElement);
    element.addEventListener("mouseout", restoreBackgroundColor)
    return element;
}

function setRandomColorToElement(event){
    event.target.style.backgroundColor = getRandomColor();
}

function restoreBackgroundColor(event){
    event.target.style.backgroundColor = body.style.backgroundColor;
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