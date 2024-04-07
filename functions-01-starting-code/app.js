const startGameBtn = document.getElementById('start-game-btn');
let start_ind = false
const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'
const DRAW = 'had a draw'
const PLAYER_WIN = 'won'
const SYSTEM_WIN ='lost'

const player_turn = function(){
    let player_choice = prompt((`${ROCK},${PAPER} or ${SCISSORS} ?`),'').toUpperCase()
    
    if (player_choice !== ROCK && 
        player_choice !== PAPER &&
        player_choice !== SCISSORS)
        {
            player_choice=ROCK
        }
    return player_choice
}

const system_turn = function(){
 const system_choice = Math.random()
 if (system_choice < 0.34) {
    return ROCK
 } else if (system_choice < 0.67) {
    return PAPER
 } else {
    return SCISSORS
 }
}

const find_result = function(player, system){
if (player === system){
    return DRAW
} else if (
    (player == ROCK && system == PAPER) ||
    (player == PAPER && system == SCISSORS) ||
    (player == SCISSORS && system == ROCK)
) {
    return SYSTEM_WIN
} else {
    return PLAYER_WIN
}
}

const start_game = function(){
    if(start_ind) {
        return;
    }
    console.log('Game Started ... ')
    start_ind = true
    let player_choice = player_turn()
    let system_choice = system_turn()
    let result = find_result(player_choice,system_choice)
    let message = `You drew ${player_choice} and system drew ${system_choice} so you ${result}`
    console.log(message)
    start_ind = false
}

startGameBtn.addEventListener('click', start_game)