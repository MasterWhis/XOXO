const Gameboard =(() => {
   const board = ['','','','','','','','',''];

   function getBoard(){
    return board;
   };
   function placeMark(index, mark){
    if (board[index] != ''){return}
        else{board[index] = mark};
   };
   function reset(){
    board.fill('');
   };
    return {
        getBoard(){
            return getBoard()
        },
        placeMark(index, mark){
            placeMark(index, mark)
        },
        reset(){
            reset()
        }
    }


})()

function Player(name, mark){
    let score = 0;
    return {name, mark, score};
};

let playerOneName;
let playerTwoName;
let playerOne;
let playerTwo;
document.getElementById('mySubmit').onclick = function(){
    playerOneName = document.getElementById('player1').value;
    console.log(playerOneName);
    playerTwoName = document.getElementById('player2').value;
    console.log(playerTwoName)
    playerOne = Player(playerOneName, 'X');
    playerTwo = Player(playerTwoName, 'O');

    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => cell.style.pointerEvents = 'auto');
}

const GameController =(() => {
    function reset(){
        Gameboard.reset();
        gameOver = false;
        currentPlayer = 'X';
    }

    let currentPlayer = 'X'
    let gameOver = false;
    const statusText = document.querySelector('.status-text');
    function playRound(index){
        if(!playerOne || !playerTwo) return
        if (gameOver) return
        Gameboard.placeMark(index, currentPlayer);
        
        if(checkWinner()){
            gameOver = true;
            
            statusText.textContent = `${playerOne.name}: ${playerOne.score}, ${playerTwo.name}: ${playerTwo.score}`;

            if(playerOne.score === 5){
                playerTwo.score = 0;
                playerOne.score = 0;
                alert(`${playerOne} has won!`);             
            } else if(playerTwo.score === 5){
                playerTwo.score = 0;
                playerOne.score = 0;
                alert(`${playerTwo} has won!`);
            }
            reset()
        };
        if(Gameboard.getBoard().every(cell => cell !== '')) {
            console.log("It's a tie!");
            gameOver = true;
            reset()
            return
        }
        switchPlayer();
    };
    
    function switchPlayer(){
        currentPlayer === playerOne.mark ? currentPlayer = playerTwo.mark : currentPlayer = playerOne.mark;
    }
    function checkWinner(){
        const winCon = [
            [0,1,2], [3,4,5], [6,7,8],  // rows
            [0,3,6], [1,4,7], [2,5,8],  // columns
            [0,4,8], [2,4,6]            // diagonals
        ]
        for(const combo of winCon){
            const [a, b, c] = combo;
            const board = Gameboard.getBoard();
            if(board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {   
                if(playerOne.mark === currentPlayer){
                    playerOne.score += 1
                } else {playerTwo.score += 1}
                return board[a]
            }
        }
        return;
        
    }
    return {
        playRound(index){
            playRound(index);
        },
        switchPlayer(){
            switchPlayer();
        },
        reset() { reset();

        },
        getCurrentPlayer(){
            return currentPlayer
        }
    }
})();

const DisplayController =(() => {
    const playBtn = document.querySelector('.play-game');
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach(cell => cell.style.pointerEvents = 'none');
    cellClicked()


    function cellClicked(){    
        cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            GameController.playRound(cell.getAttribute('cellIndex'));
            renderBoard()
});
        });
    };
    function renderBoard(){
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index]
        });
        }
    
    playBtn.addEventListener('click', () => {
        GameController.reset();
        renderBoard();
    });
    return {
        cellClicked(){
            cellClicked()
        }
    }
    
})();