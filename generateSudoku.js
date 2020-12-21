var {solve,randomArray,isSolved} = require('./sudoku');

var readline = require('readline');

//global variables
var grid_size;
var emptyBoard=[];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Enter the grid size of sudoku : ctrl+D to stop taking input\n');

rl.prompt();

rl.on('line', function (input) {
    grid_size=parseInt(input);
});

rl.on('close', function (cmd) {
    for(let i=0;i<grid_size;i++){
        let temp=[];
        for(let j=0;j<grid_size;j++){
            temp.push(parseInt(0));
        }
        emptyBoard.push(temp);
    }
    emptyBoard=solve(0,0,grid_size,emptyBoard,randomArray(grid_size))

    //removing numbers from board
    for(let i=0;i<((3*(grid_size*grid_size))/4)/2;i++){
        var row=parseInt((Math.random()*(grid_size-1))+1);
        var col=parseInt((Math.random()*(grid_size-1))+1);
        //removing symetric numbers
        emptyBoard[row][col]=0
        emptyBoard[Math.abs(grid_size-row-1)][Math.abs(grid_size-col-1)]=0
    }
    console.log(' board generated ');
    console.log(' ');
    emptyBoard.forEach(arr=>{
        arr.forEach(e=>{
            process.stdout.write(e+" ");
        })
        console.log('');
    })
});


