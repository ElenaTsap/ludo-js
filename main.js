// new version - transforming the object into an array
// arrays are good to use for similar types of elements while objects are good to hold different types of keys

// part1 - logic

let initialDOM = document.getElementById("main-board").innerHTML;
localStorage.setItem("initialDOM", initialDOM); 



let players = [
    {
        userName: 'Antonis',
        color: 'red',
        positions: [0,0,0,0],
        allAtHome: true
    },
    {
        userName: 'James',
        color: 'green',
        positions: [0,0,0,0],
        allAtHome: true
    },
    {
        userName: 'Nikolaos',
        color: 'yellow',
        positions: [0,0,0,0],
        allAtHome: true
    },
    {
        userName: 'Pio',
        color: 'blue',
        positions: [0,0,0,0],
        allAtHome: true
    }
]


let currentPlayer = 0;

function rollDice() {
    const dice = Math.floor(Math.random() * 6 + 1);
    return dice;
}

function diceChecker(dice) {
    homeChecker();
    
    if (dice < 6 && players[currentPlayer]['allAtHome']) {
        alert('Hey ' + players[currentPlayer]['userName'] + ' please wait for 6! You have ' + dice);
    } else if (dice == 6 && players[currentPlayer]['allAtHome']) {
        players[currentPlayer]['positions'] = [1,0,0,0];
        alert('Hey ' + players[currentPlayer]['userName'] + ' Congrats! You can move ' + dice + ' spaces!');
        render();
    } else {
        alert('Hey ' + players[currentPlayer]['userName'] + ' Congrats! You can move ' + dice + ' spaces!');
        movePlayer(dice);
        render();
    }

    console.log(players[0].positions);
}


function movePlayer(dice) {
    players[currentPlayer].positions[0] += dice;
}

function showDice() {
    diceChecker(rollDice());
}



function homeChecker() {
    for (let index = 0; index < players.length; index++) {
        const player = players[index];

        if (player.positions.reduce((a,b) => a + b, 0) == 0) {
            player.allAtHome = true;
        } else {
            player.allAtHome = false;
        }

        console.log(player.allAtHome);
    }
}



// part2 - DOM manipulation

function render() {

    document.getElementById('main-board').innerHTML = localStorage.getItem("initialDOM");

    alert('render starts!');
    for (let index = 0; index < players.length; index++) {
        const player = players[index];// player constant hold the array index number for each player. has data type: object
        
        for (let i = 0; i < player.positions.length; i++) {
            const position = player.positions[i]; //item hold the array index number of the position

            //if the position of the current item is not 0 - so it is out
            if (position > 0) {
                document.getElementById(`pos`+position).innerHTML = `<i class= "fas fa-chess-pawn"></i>`;
                document.getElementById(`pos`+position).classList.remove(`white`);
                document.getElementById(`pos`+position).classList.remove(`red`);
                document.getElementById(`pos`+position).classList.remove(`green`);
                document.getElementById(`pos`+position).classList.remove(`blue`);
                document.getElementById(`pos`+position).classList.remove(`yellow`);
                document.getElementById(`pos`+position).classList.add(player.color);
            } else {
                document.getElementById('initial-' + player.color + '-' + i).innerHTML = '<i class="fas fa-chess-pawn"></i>';
            }
        }
    }
}   

render();






