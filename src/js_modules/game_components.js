//Ship Class and methods
class Ship{
    constructor(name, length){
        this.name = name
        this.length = length
        this.Hp = length
        this.destroyed = false
        this.location = []
    }

    isHit(){
        return this.Hp -= 1
    }

    isSunk(){
        if(this.Hp <= 0) return this.destroyed = true
        else return this.destroyed = false
    }
}

//Player/Cpu Class
class Player{
    constructor(name='player'){
        this.name = name
        this.board = null
        this.played = []
        this.ship_count = 5
        this.ships = []
    }
    addToPlayed(x, y){
        this.played.push([x, y])
        return this.played
    }

    //used by NPC
    pickTile(){
        return Math.floor(Math.random()*10)
    }
}

function checkShip(player, ship){
    if(ship.isSunk() === true) return player.ship_count -= 1
}

//Game Over condition
function checkPlayerShips(player){
    if(player.ship_count === 0) return 'Game Over'
}

//Game Board Functionality
function generateBoard(){
    let x = 0
    let y = 0
    const board = []
    while(x<10){
        const spaceX = new Array(0)
        board.push(spaceX)
        while(y<10){
            const spaceY = new Array(0)
            spaceX.push(spaceY)
            y++
        }
        y = 0
        x++
    }
    //console.log(board)
    return board
}

function placeShip(player, x, y, ship){
    player.board[x][y].push(ship)
    return player.board[x][y]
}

function checkTile(player, x, y){
    let i = 0
    while(i<player.played.length){
        if(player.played[i][0] === x && player.played[i][1] === y){
            console.log(true)
            console.log(player.played)
            return true
        }
        i++
    }
}

function playTurn(player, x, y){
    if(checkTile(player, x, y) === true) return console.log('already played tile')
    receiveAttack(player, x, y)
}

function receiveAttack(player, x, y){
    if(player.board[x][y].length != 0) {
        player.board[x][y][0].isHit()
        player.board[x][y][0].isSunk()
        player.addToPlayed(x, y)
        console.log(player.board[x][y][0])
        return true
    }
    else{
        player.addToPlayed(x, y)
        return false
    } 
}

export {
    Ship,
    Player,
    generateBoard,
    placeShip,
    checkPlayerShips,
    checkShip,
    receiveAttack,
    playTurn
}