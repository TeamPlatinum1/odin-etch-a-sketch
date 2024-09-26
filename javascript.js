const gridContainer = document.querySelector("#grid-container");

const maxWidth = +window.getComputedStyle(gridContainer).width.slice(0, -2);
const maxHeight = +window.getComputedStyle(gridContainer).height.slice(0, -2);
const gapSize = +window.getComputedStyle(gridContainer).gap.slice(0, -2);

generateGrid(16, 16);

function generateGridElement(elementXSize, elementYSize){
    let element = document.createElement("div");
    element.classList.add("box");
    element.style.width = elementXSize + "px";
    element.style.height = elementYSize + "px";
    return element;
}

function calculateSizeOfElements(width, height){
    let xSize = Math.floor((maxWidth-((width-1)*gapSize))/width);
    let ySize = Math.floor((maxHeight-((height-1)*gapSize))/height);
    return [xSize, ySize];
}

function generateGrid(width, height){
    let elementSize = calculateSizeOfElements(width, height);

    for(let i = 0; i < (width*height); i++){
        gridContainer.appendChild(generateGridElement(elementSize[0], elementSize[1]));
    }
}