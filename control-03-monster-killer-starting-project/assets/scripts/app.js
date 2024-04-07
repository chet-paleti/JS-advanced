const NORMAL_ATTACK_VALUE = 10
const STRONG_ATTACK_VALUE = 15
const PLAYER_ATTACK_VALUE = 13
const HEAL_VALUE = 10
const NORMAL_PLAYER_ATTACK = 'Player Attacked-Normal'
const STRONG_PLAYER_ATTACK = 'Player Attacked-Strong'
const MONSTER_ATTACK = 'Monster Attacked'
const PLAYER_HEAL = 'Player Healed'
const GAME_OVER ='Game Over !'
//let initial_health = 100
let hasBonus = true
let event_log = []

let initial_health = parseInt(prompt('Enter value for initial health', '100'))
if(isNaN(initial_health) || (initial_health <0)) {
    initial_health=100
}
let monster_health = initial_health
let player_health = initial_health

adjustHealthBars(initial_health)

function attack_handler(mode) {
    let monster_damage
    let attack_mode
    if(mode==0) {
        monster_damage = dealMonsterDamage(NORMAL_ATTACK_VALUE)
        attack_mode = NORMAL_PLAYER_ATTACK
    } else if (mode==1) {
        monster_damage = dealMonsterDamage(STRONG_ATTACK_VALUE)
        attack_mode = STRONG_PLAYER_ATTACK
    }
    monster_health -= monster_damage
    log_event(attack_mode,monster_damage,player_health,monster_health)

    endround()
    
}

function normal_attack () {
    attack_handler(0)    
}

function strong_attack () {
    attack_handler(1)    
}

function endround() {
    let current_player_health = player_health
    let player_damage = dealPlayerDamage(PLAYER_ATTACK_VALUE)
    player_health -= player_damage 
    log_event(MONSTER_ATTACK,player_damage,player_health,monster_health)

    if((player_health <= 0) && hasBonus) {
        alert('You are saved by ur bonus life !')
        hasBonus = false
        removeBonusLife()
        player_health = current_player_health
        setPlayerHealth(player_health)

    }

    if (monster_health <= 0 && player_health > 0) {
        log_event(GAME_OVER,'Player Won',player_health,monster_health)
        alert('You won !')
    }
    else if (player_health <= 0 && monster_health >0) {
        log_event(GAME_OVER,'Monster Won',player_health,monster_health)
        alert('Monster won')
    }
    else if (player_health <=0 && monster_health <= 0) {
        log_event(GAME_OVER,'Draw',player_health,monster_health)
        alert('Game drawn !')
    }

    if((player_health <= 0) || (monster_health <= 0)) {
        reset()
    }
}

function heal_player() {
    let heal_value
    if((initial_health - player_health) <= HEAL_VALUE) {
        alert('Player will be healed to initial value')
        heal_value = (initial_health - player_health)
    }else {
        heal_value = HEAL_VALUE
    }
    increasePlayerHealth(heal_value)
    player_health += heal_value
    log_event(PLAYER_HEAL,heal_value,player_health,monster_health)
    endround()
}

function reset() {
    monster_health = initial_health
    player_health = initial_health
    resetGame(initial_health)
}

function log_event(event, event_val,player_val,monster_val) {
    let log_object = {
        event : event,
        damage : event_val,
        player_health : player_val,
        monster_health : monster_val
    }
    event_log.push(log_object)
}

function write_log() {
    
    for (const i of event_log) 
    {
        for (const j in i) {
            console.log(`${j} : ${i[j]}`)
        }
    }
    
}

attackBtn.addEventListener('click', normal_attack)
strongAttackBtn.addEventListener('click',strong_attack)
healBtn.addEventListener('click',heal_player)
logBtn.addEventListener('click', write_log)

