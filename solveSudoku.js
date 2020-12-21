var {solve,randomArray,isSolved}=require('./sudoku')
//reading user input
var readline = require('readline');

//initializing global variables
var sudoku_arr = [];
var randomizedArray=[];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Enter sudoku : ctrl+D to stop taking input \n');

rl.prompt();

rl.on('line', function (cmd) {
    sudoku_arr.push(cmd.split(' ').map(a=>parseInt(a)));
});

rl.on('close', function (cmd) {
    var grid_size=sudoku_arr.length;
    randomizedArray=randomArray(grid_size);
    solve(0,0,grid_size,sudoku_arr,randomizedArray);
    if(isSolved(sudoku_arr)){
        console.log('\n!!solved sudoku!!\n');
        sudoku_arr.forEach(arr=>{
            arr.forEach(e=>{
                process.stdout.write(e+" ");
            })
            console.log('');
        })
    }else{
        console.log('Invalid Sudoku board');
    }
    process.exit(0);
});

