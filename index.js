
const reset = document.querySelector('#reset')
const turn = document.querySelector('.whosTurn')
const sets = document.querySelectorAll('.set')
const boxes = document.querySelectorAll('.box')
const player1 = true;
const player2 = false;
let gameActive = true;
let winner = document.querySelector('.winner')
let stats = ["", "", "", "", "", "", "", "", ""]
let currentTurn = "X"
const possibleWins = [ 
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
let wim = false

const playNow = (event) => {
    // based on current turn place an x or o in box clicked
    if (event.target.childNodes[1] !== undefined) {
        if (event.target.childNodes[1].innerHTML == '' ) {
            // using a funtion with to variables, one grabs its current position variable is placed in, the second states if its x or o
            event.target.childNodes[1].innerHTML = currentTurn
            updateStats(event.target.getAttribute('data-position'), currentTurn)
            handlePlayerChange()
            checkWinner()
        }
    }
}

function updateStats(position, value) {
    // stores the position value in the stats array
    stats[position] = value
}
// displays whos turn it is
 function displayTurn() {
    turn.innerHTML = 'Current turn is ' + currentTurn;
 } 

function handlePlayerChange() {
//  if else statment saying 
    currentTurn = currentTurn === "X" ? "O" : "X";
    displayTurn()
}

function checkWinner() {
    let position1 = ''
    let position2 = ''
    let position3 = ''
    // check if each of the win conditions is full with whats needed to win
    possibleWins.forEach (function (possibility) {
         position1 = possibility[0]
         position2 = possibility[1]
         position3 = possibility[2]
    
         if (stats[position1] == stats[position2]  
            && stats[position1]  == stats[position3] 
            && stats[position2] == stats[position3] 
            && stats[position1] != '') {
             wim = true
            winner.innerHTML = 'Player ' + stats[position1] + ' has won'
            boxes.forEach(item => {
                item.removeEventListener('click', playNow)
            })
            return
        }

    }) 
    // create a constant to figure out if its a draw
    let count = 0
    stats.forEach (function (stat) {
        // adds 1 to count everytime there is an x or o in stat
        if (stat != '' && wim === false) {
            count = count + 1
        }
    })
    // when it reaches 9 aka all boxes have an x or o its a draw
    if (count == 9) {
        winner.innerHTML = 'Draw no one wins'
    }
}

const resetGame = () => {
     wim = false
    // starts at X
    currentTurn = "X"
    // restets stored data back to nothing
    stats = ["", "", "", "", "", "", "", "", ""]
    // no winner
    winner.innerHTML = ''
    // clears boxes of x and o
    sets.forEach(function (set){
        set.innerHTML = ''
        
    })
    // restarts the ability to click boxes
    boxes.forEach(item => {
        item.addEventListener('click',  playNow)
    })
}
reset.addEventListener('click', resetGame)


document.addEventListener('DOMContentLoaded', () => {
    displayTurn()
})
boxes.forEach(item => {
    item.addEventListener('click',  playNow)
})