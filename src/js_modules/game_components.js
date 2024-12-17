//Ship Class and methods
class Ship{
    constructor(name, length){
        this.name = name
        this.length = length
        this.Hp = length
        this.destroyed = false
    }

    isHit(){
        return this.Hp -= 1
    }

    isSunk(){
        if(this.Hp === 0) return this.destroyed = true
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

function placeShip(x, y, object){
    const gameboard = generateBoard()
    gameboard[x][y].push(object)
    return gameboard[x][y]
}

module.exports = {
    Ship:Ship,
    Player:Player,
    generateBoard: generateBoard,
    placeShip: placeShip,
    checkShip:checkShip,
    checkPlayerShips:checkPlayerShips
}
export {Ship}