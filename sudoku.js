//solving a grid_size by grid_size board
//checking if "n" is valid placement or not
var isvalid=(row,col,n,grid_size,sudoku_board)=>{
    let subgrid_row_start = row-row%Math.sqrt(grid_size);
    let subgrid_col_start = col-col%Math.sqrt(grid_size);
    // checking subgrid
    for(let i=subgrid_row_start;i<subgrid_row_start+Math.sqrt(grid_size);i++){
        for(let j=subgrid_col_start;j<subgrid_col_start+Math.sqrt(grid_size);j++){
            if(n===sudoku_board[i][j]){
                return false;
            }
        }
    }
    // checking column
    for(let i=0;i<grid_size;i++){
        if(n===sudoku_board[row][i]){
            return false;
        }
    }
    // checking row
    for(let i=0;i<grid_size;i++){
        if(n===sudoku_board[i][col]){
            return false;
        }
    }
    return true
}

//main solve function
var flag=0;
var solve=(row,col,grid_size,sudoku_board,randomizedArray)=>{
    if(row===grid_size){
        flag=1;
        return sudoku_board;
    }else if(col===grid_size){
        solve(row+1,0,grid_size,sudoku_board,randomizedArray);
    }else if(sudoku_board[row][col]!==0){
        solve(row,col+1,grid_size,sudoku_board,randomizedArray);
    }else{
        
        for(let i=0;i<grid_size;i++){
            if(isvalid(row,col,randomizedArray[i],grid_size,sudoku_board)){
                //console.log('setting a number')
                //console.log(row,col,randomizedArray[i])
                sudoku_board[row][col]=randomizedArray[i];
                solve(row,col+1,grid_size,sudoku_board,randomizedArray);
            }
        }
        if(flag==0){
            //console.log('could not set a valid number')
            //console.log('backtracking')
            //console.log(row,col,0);
            sudoku_board[row][col]=0;
        }else{
            //console.log('completed the sudoku')
            return sudoku_board;
        }
    }
}

//This checks that "n" is in given array or not
var inArray = (arr,n)=>{
    for(let i=0;i<arr.length;i++){
        if(n==arr[i]){
            return true;
        }
    }
    return false;
}

//This function generates an array of non-repetive random numbers from 1 to n
var randomArray=(n)=>{
    let arr=[]
    let rand=parseInt((Math.random()*n)+1);
    while(arr.length<n){
        if(!inArray(arr,rand)){
            arr.push(rand);
        }
        rand=parseInt((Math.random()*n)+1);
    }
    return arr;
}

//this function returns true if sudoku is solved else false
var isSolved=(sudoku_board)=>{
    for(let i=0;i<sudoku_board.length;i++){
        for(let j=0;j<sudoku_board.length;j++){
            if(sudoku_board[i][j]===0){
                return false;
            }
        }
    }
    return true;
}

module.exports={solve,isvalid,randomArray,inArray,isSolved};
