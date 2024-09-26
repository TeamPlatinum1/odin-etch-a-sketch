const gridContainer = document.querySelector("#grid-container");
const resizeBtn = document.querySelector("#resize-btn");

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

function generateGridElement(elementXSize, elementYSize){
    let element = document.createElement("div");
    element.classList.add("box");
    element.style.width = elementXSize + "px";
    element.style.height = elementYSize + "px";
    return element;
}

function calculateSizeOfElements(width, height){
    let xSize = ((maxWidth-((width-1)*gapSize))/width);
    let ySize = ((maxHeight-((height-1)*gapSize))/height);
    return [xSize, ySize];
}

function generateGrid(width, height){
    let elementSize = calculateSizeOfElements(width, height);

    for(let i = 0; i < (width*height); i++){
        gridContainer.appendChild(generateGridElement(elementSize[0], elementSize[1]));
    }
}

function deleteGrid(){
    const allGridElements = document.querySelectorAll("#grid-container > div.box");
    for(let gridElement of allGridElements){
        gridContainer.removeChild(gridElement);
    }
}