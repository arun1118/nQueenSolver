let allColors=["blue","grey","brown","pink","purple","yellow","green"];
let cordToColor=new Map();
let isColored=new Map();
let gridSize=7;
let board=Array.from({length: gridSize},()=>Array(gridSize).fill('.'));

// level : difficult-53
cordToColor.set(JSON.stringify([0,0]),"brown");
cordToColor.set(JSON.stringify([0,1]),"brown");
cordToColor.set(JSON.stringify([0,2]),"brown");
cordToColor.set(JSON.stringify([0,3]),"green");
cordToColor.set(JSON.stringify([0,4]),"green");
cordToColor.set(JSON.stringify([0,5]),"green");
cordToColor.set(JSON.stringify([0,6]),"pink");

cordToColor.set(JSON.stringify([1,0]),"green");
cordToColor.set(JSON.stringify([1,1]),"green");
cordToColor.set(JSON.stringify([1,2]),"green");
cordToColor.set(JSON.stringify([1,3]),"green");
cordToColor.set(JSON.stringify([1,4]),"green");
cordToColor.set(JSON.stringify([1,5]),"green");
cordToColor.set(JSON.stringify([1,6]),"pink");

cordToColor.set(JSON.stringify([2,0]),"green");
cordToColor.set(JSON.stringify([2,1]),"green");
cordToColor.set(JSON.stringify([2,2]),"green");
cordToColor.set(JSON.stringify([2,3]),"green");
cordToColor.set(JSON.stringify([2,4]),"green");
cordToColor.set(JSON.stringify([2,5]),"blue");
cordToColor.set(JSON.stringify([2,6]),"pink");

cordToColor.set(JSON.stringify([3,0]),"green");
cordToColor.set(JSON.stringify([3,1]),"grey");
cordToColor.set(JSON.stringify([3,2]),"green");
cordToColor.set(JSON.stringify([3,3]),"green");
cordToColor.set(JSON.stringify([3,4]),"yellow");
cordToColor.set(JSON.stringify([3,5]),"blue");
cordToColor.set(JSON.stringify([3,6]),"pink");

cordToColor.set(JSON.stringify([4,0]),"green");
cordToColor.set(JSON.stringify([4,1]),"grey");
cordToColor.set(JSON.stringify([4,2]),"purple");
cordToColor.set(JSON.stringify([4,3]),"purple");
cordToColor.set(JSON.stringify([4,4]),"yellow");
cordToColor.set(JSON.stringify([4,5]),"pink");
cordToColor.set(JSON.stringify([4,6]),"pink");

cordToColor.set(JSON.stringify([5,0]),"green");
cordToColor.set(JSON.stringify([5,1]),"green");
cordToColor.set(JSON.stringify([5,2]),"purple");
cordToColor.set(JSON.stringify([5,3]),"purple");
cordToColor.set(JSON.stringify([5,4]),"yellow");
cordToColor.set(JSON.stringify([5,5]),"yellow");
cordToColor.set(JSON.stringify([5,6]),"yellow");

cordToColor.set(JSON.stringify([6,0]),"green");
cordToColor.set(JSON.stringify([6,1]),"green");
cordToColor.set(JSON.stringify([6,2]),"green");
cordToColor.set(JSON.stringify([6,3]),"purple");
cordToColor.set(JSON.stringify([6,4]),"yellow");
cordToColor.set(JSON.stringify([6,5]),"yellow");
cordToColor.set(JSON.stringify([6,6]),"yellow");



isSafe = (row,col,gridSize,board,cordToColor,isColored)=>{
    var currPos=[row,col]
    var colorOfCord=cordToColor.get(JSON.stringify(currPos))

    if(isColored[colorOfCord]) return false;

    var r=row;
    while(r--){
        if(board[r][col]=='X') return false;
    }

    if(row>0 && col>0) if(board[row-1][col-1]=='X') return false;
    if(row>0 && col<gridSize) if(board[row-1][col+1]=='X') return false;

    return true;
}

solve = (row,gridSize,cordToColor,isColored,board)=>{
    if(row==gridSize){
        return true;
    }

    for(var c=0;c<gridSize;c++){
        if(isSafe(row,c,gridSize,board,cordToColor,isColored)){
            var currPos=[row,c];
            var colorOfCord=cordToColor.get(JSON.stringify(currPos));
            board[row][c]='X';
            isColored[colorOfCord]=true;
            if(solve(row+1,gridSize,cordToColor,isColored,board)) return true;
            isColored[colorOfCord]=false;
            board[row][c]='.';
        }
    }

    return false;
}


for(var col of allColors){
    isColored.set(col,false)
}

let isPossible=solve(0,gridSize,cordToColor,isColored,board)

if(isPossible){
    for(var i=0;i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            if(board[i][j]=='X') console.log(i+","+j)
        }
    }
}
else{
    console.log("not possbile to place all queens")
}
