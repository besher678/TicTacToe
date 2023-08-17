game = {
    playerOne: {
        name: "",
        mark: "X",
        playing: true,

    },
    playerTwo: {
        name: "",
        mark: "O",
        playing: false,

    },
    winner: "",
    started: false,
    turn: "playerOne",
}

document.querySelectorAll(".box").forEach(box => box.addEventListener('click', handleCellClick));


const gameBoard = [
"", "", "",
"", "", "",
"", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


document.querySelector('.sub').addEventListener('click', function (){
   const player1 = document.querySelector('.player_one').value;
   const player2 = document.querySelector('.player_two').value;
   game.playerOne.name = player1;
   game.playerTwo.name = player2;
   game.started = true;

   document.querySelector('.game').classList.add('hidden');
});
function loadBoard(click){
    let mark = game[game.turn].mark;
    const node = document.createTextNode(`${mark}`);
    click.appendChild(node);
}

function handleCellClick(clickedCellEvent){
    if(game.started === true){

    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameBoard[clickedCellIndex-1] === ''){
        gameBoard[clickedCellIndex-1] = game[game.turn].mark;
        loadBoard(clickedCell);
        handleResultValidation();
        switchPlayer();
    }
    }
}



function switchPlayer(){
    let currentTurn = game.turn;
    if(currentTurn === "playerOne"){
        game.turn = "playerTwo";
    } else{
        game.turn = "playerOne";
    }
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameEnded();
            roundWon = true;
            game.started = false;
            break
        }
    }
    if (roundWon) {
        roundWon = false;
    }
}

function gameEnded(){
    const div = document.createElement("div");
    div.classList.add("restart-div")
    const h1 = document.createElement("h1");
    const button = document.createElement('button');
    const container = document.querySelector('.container');
    button.classList.add('restart');
    button.textContent = "Restart Game";
    h1.textContent = `Winner: ${game[game.turn].name}`;
    div.appendChild(h1);
    div.appendChild(button);
    container.appendChild(div);
    document.querySelector('.restart').addEventListener('click', () =>{
        restartGame();
        gameBoard.fill("", 0, 8);
        console.log(gameBoard);
    })
}
function resetBoard(){
    document.querySelectorAll('.box').forEach(board => board.textContent = "");
}

function restartGame(){
    document.querySelector('.game').classList.remove('hidden');
    document.querySelector('.restart-div').classList.add('hidden');
    resetBoard();
    game.started = false;
}
