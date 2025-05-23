let allPossibleColors=["blue","grey","brown","pink","purple","yellow","green","red","black"];


let colorMapper={
    "blue": "#003399",
    "grey": "#737373",
    "brown": "#802b00",
    "pink": "#cc0052",
    "purple": "#7a0099",
    "yellow": "#b38f00",
    "green": "#009900",
    "red": "#b30000",
    "black": "#000000"
}

let allColors=[];
let cordToColor=new Map();
let isColored=new Map();
let gridSize=7;
let board;
const gridLayout=document.getElementById('grid');
const colorContainerLayout=document.getElementById('color-container');
const currentColorBtn=document.getElementById('currentColor');
const resetBtn=document.getElementById('reset-btn')
const solveBtn=document.getElementById('solve-btn')
const sizeBtn=document.getElementById('size-btn')
const crownImg = document.createElement('img');
crownImg.src = 'crown.png'
var currentColor=allPossibleColors[0]

resetBtn.addEventListener('click',()=>{
    window.location.reload();
})

solveBtn.addEventListener('click',()=>{
    solveGrid();
})

sizeBtn.addEventListener('click',()=>{
    if(gridSize===7) gridSize=8;
    else gridSize=7;

    gridSetup();
    gridLayout.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
})

let markColorToCord = (row,col)=>{
    let currPos=[row,col]
    let btnId=`${row}_${col}`
    let colorCode=colorMapper[currentColor]
    cordToColor.set(JSON.stringify(currPos),currentColor);
    document.getElementById(btnId).style.backgroundColor=colorCode;
    if(cordToColor.size==49) solveBtn.disabled=false
}

let setCurrentColor = (currentColorName)=>{
    let colorCode=colorMapper[currentColorName]
    currentColorBtn.style.backgroundColor=colorCode
    currentColor=currentColorName;
}

let setUpBoard = ()=>{
    board=Array.from({length: gridSize},()=>Array(gridSize).fill('.'));
}

let gridSetup = ()=>{
    gridLayout.innerHTML='';
    colorContainerLayout.innerHTML=''
    solveBtn.disabled=true
    setUpBoard();
    for(let i=0;i<gridSize;i++){
        for(let j=0;j<gridSize;j++){
            let gridBtn=document.createElement('button');
            gridBtn.classList.add("grid-btn")
            gridBtn.id=`${i}_${j}`
            // gridBtn.textContent=`${i},${j}`;
            gridBtn.onclick=()=>markColorToCord(i,j);
            gridLayout.appendChild(gridBtn);
        }
    }

    for(let i=0;i<allPossibleColors.length;i++){
        let colorName=allPossibleColors[i]
        let colorCode=colorMapper[colorName]
        let colorBtn=document.createElement('button');
        colorBtn.classList.add("color-btn");
        colorBtn.id=`${colorName}`;
        colorBtn.style.backgroundColor=colorCode;
        colorBtn.onclick=()=>setCurrentColor(colorName);
        colorContainerLayout.appendChild(colorBtn);
    }

    currentColorBtn.style.backgroundColor=colorMapper[allPossibleColors[0]];

}


gridSetup();


let solveGrid = ()=>{
    setUpBoard();
    let allColorsSet = new Set();
    for(let [k,v] of cordToColor){
        allColorsSet.add(v);
    }

    allColors=Array.from(allColorsSet);

    for(let col of allColors){
        isColored.set(col,false)
    }

    let isPossible=solve(0,gridSize,cordToColor,isColored,board)

    if(isPossible){
        for(let i=0;i<gridSize;i++){
            for(let j=0;j<gridSize;j++){
                if(board[i][j]=='X'){
                    // document.getElementById(`${i}_${j}`).textContent='X';
                    document.getElementById(`${i}_${j}`).innerHTML=`<img class="crown-img" src="crown.png">`
                }
            }
        }
    }
    else{
        alert("not possbile to place all queens")
    }
}

let isSafe = (row,col,gridSize,board,cordToColor,isColored)=>{
    let currPos=[row,col]
    let colorOfCord=cordToColor.get(JSON.stringify(currPos))

    if(isColored[colorOfCord]) return false;

    let r=row;
    while(r--){
        if(board[r][col]=='X') return false;
    }

    if(row>0 && col>0) if(board[row-1][col-1]=='X') return false;
    if(row>0 && col<gridSize) if(board[row-1][col+1]=='X') return false;

    return true;
}

let solve = (row,gridSize,cordToColor,isColored,board)=>{
    if(row==gridSize){
        return true;
    }

    for(let c=0;c<gridSize;c++){
        if(isSafe(row,c,gridSize,board,cordToColor,isColored)){
            let currPos=[row,c];
            let colorOfCord=cordToColor.get(JSON.stringify(currPos));
            board[row][c]='X';
            isColored[colorOfCord]=true;
            if(solve(row+1,gridSize,cordToColor,isColored,board)) return true;
            isColored[colorOfCord]=false;
            board[row][c]='.';
        }
    }

    return false;
}