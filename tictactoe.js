const container = document.getElementById("container")
let squares = []

//if true next click on board is X
//if false next click on board is 0
var isXturn = true
const isX = (square) => square.classList.contains('x');
const isO = (square) => square.classList.contains('o');
const isEmpty = (square) => isX(square) == false && isO(square) == false;
let gameWon = false;

//creating gameboard
for (row = 1; row <=3; row ++) {
    var newRow = document.createElement("div");
    newRow.className = "row";
    container.appendChild(newRow)

    var r =[]

    for(col = 1; col<=3; col++) {
        const newCol =  document.createElement("div");
        newCol.className = "column"
        newCol.id = "r" + row + "c" + col
        
        newCol.addEventListener('click', function(){ 
            setSquare(newCol);
        }, false);

        newRow.appendChild(newCol)
        r.push(newCol)
 
    }
    squares.push(r)
}


function setSquare(square){
    // console.log (isX,row, col)
    //dont set a square if it is already set
    // if (isX(square) || isO(square)) {
    //     return
    // }

    if (isXturn){
        square.classList.remove("o")
        square.classList.add("x")
    } else {
        square.classList.remove("x")
        square.classList.add("o")
    }
    isXturn = !isXturn
    checkForWin()
    let firstEmpty = findFirstEmpty();
    if (firstEmpty == undefined){
        // draw
        onDraw()
        return
    }

    if (gameWon == false && isXturn==false) {
        computerTurn();
    }
}

function findFirstEmpty(){
    for(i = 0; i<=2; i ++) {
        let row = squares[i];

        for(j = 0; j<=2; j ++) {
            let square = row[j];

            if (isEmpty(square)){
                return square
            }
        }
    }
}
//ai opponent
function computerTurn(){
    let firstEmpty = findFirstEmpty();
    let topbottom =[squares[0][0],squares[2][0]];
    let middle = [squares[1][0]];
    
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    topbottom = [squares[0][0],squares[0][2]];
    middle = [squares[0][1]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }

    topbottom = [squares[1][0],squares[1][2]];
    middle = [squares[1][1]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    topbottom = [squares[2][0],squares[2][2]];
    middle = [squares[2][1]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }

    //diagonals
    topbottom = [squares[0][2],squares[2][2]];
    middle = [squares[1][2]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    topbottom = [squares[0][0],squares[2][2]];
    middle = [squares[1][1]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }

    topbottom = [squares[0][2],squares[2][0]];
    middle = [squares[1][1]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
//top2
    topbottom = [squares[0][0],squares[1][0]];
    middle = [squares[2][0]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    topbottom = [squares[0][1],squares[1][1]];
    middle = [squares[2][1]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    topbottom = [squares[0][2],squares[1][2]];
    middle = [squares[2][2]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }

    //bottom2
    topbottom = [squares[0][2],squares[0][1]];
    middle = [squares[0][0]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    topbottom = [squares[2][1],squares[1][1]];
    middle = [squares[0][1]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    topbottom = [squares[2][2],squares[1][2]];
    middle = [squares[0][2]];
    if (topbottom.every(isX) && middle.every(isO) == false){
        setSquare (middle[0]);
        return
    }
    setSquare(firstEmpty);
}




//check win
function checkForWin() {
    // console.log(squares)

    //check top row
    let top = squares[0]

    if (top.every(isX)) {

        onWin();
    } else if (top.every(isO)){
        onLose();
    }

//check middle row
    let middle = squares[1]

    if (middle.every(isX)){

        onWin();
    } else if (middle.every(isO)){
        onLose();
    }
    //check last row
    let bottom = squares[2]

    if (bottom.every(isX)) {

        onWin();
    }
    else if(bottom.every(isO)){
        onLose();
    }

    //check first col
    let first = [squares[0][0],squares[1][0],squares[2][0]]
    if (first.every(isX)) {

        onWin();
    }
    else if(first.every(isO)){
        onLose();
    }
    //check second col
    let second = [squares[0][1],squares[1][1],squares[2][1]]
    if (second.every(isX)) {

        onWin();
    }
    else if(second.every(isO)){
        onLose();
    }
    //check third col
    let third = [squares[0][2],squares[1][2],squares[2][2]]
    if (third.every(isX)) {

        onWin();
    }
    else if(third.every(isO)){
        onLose();
    }
    //check right diag
    let rdiag = [squares[0][0],squares[1][1],squares[2][2]]
    if (rdiag.every(isX)) {

        onWin();
    }
    else if(rdiag.every(isO)){
        onLose();
    }
    //check left diag
    let ldiag = [squares[0][2],squares[1][1],squares[2][0]]
    if (ldiag.every(isX)) {

        onWin();
    }
    else if(ldiag.every(isO)){
        onLose();
    }
}


//Do something when someone wins

function onWin() {
    gameWon = true;
    setTimeout(function(){
        alert("You won!");
   },800); 
   setTimeout(function(){
    let shouldRestart = confirm("Play again?");
     
    if (shouldRestart) {
        restart();
    }
    // alert(restart);//true if OK is pressed
    },1000) ; 
}



function onDraw(){
    gameWon = false;
    setTimeout(function(){
        alert("It's a Draw!");
   },800); 
   setTimeout(function(){
    let shouldRestart = confirm("Play again?");

    if (shouldRestart) {
        restart();
    }
    // alert(restart);//true if OK is pressed
    },1000) ; 
}



function onLose(){
    gameWon = false;
    setTimeout(function(){
        alert("You Lose!");
   },800); 
   setTimeout(function(){
    let shouldRestart = confirm("Play again?");

    if (shouldRestart) {
        restart();
    }
    // alert(restart);//true if OK is pressed
    },1000) ; 
}





// //restart


function restart() {
    gameWon = false;
    isXturn = true;
    for (i = 0; i<=2; i ++) {
        let row = squares[i];

        for (j = 0; j<=2; j ++) {
            let square = row[j];
            square.classList.remove("x");
            square.classList.remove("o");
        }
    }
}

