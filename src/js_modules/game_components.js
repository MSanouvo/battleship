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
        if(this.Hp <= 0) return this.destroyed = true
        else return this.destroyed = false
    }
}

//Player/Cpu Class and methods
class Player{
    constructor(name='player'){
        this.name = name
        this.board = null
        //this.played = []
        this.ship_count = 5
        this.ships = []
    }

    //used by NPC
    pickTile(){
        return Math.floor(Math.random()*10)
    }

    checkShip(ship){
        if(ship.isSunk() === true){
            this.ship_count -= 1
            return true
        } 
    }

    checkPlayerShips(){
        if(this.ship_count === 0) return true
    }
}

// Need to assign gameboard to player
//Game Board Functionality
function gameBoard(){
    const playedTiles = []
    const generateBoard=()=>{
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
    const board = generateBoard()

    const placeShip=(player, x, y, ship)=>{
        player.board[x][y].push(ship)
        return player.board[x][y]
    }

    const addToPlayed=(x, y)=>{
        playedTiles.push([x, y])
        return playedTiles
    }

    const checkTile=(x, y)=>{
        let i = 0
        while(i<playedTiles.length){
            if(playedTiles[i][0] === x && playerTiles[i][1] === y){
                return true
            }
            i++
        }
    }

    const receiveAttack=(player, x, y)=>{
        if(player.board[x][y].length != 0) {
            player.board[x][y][0].isHit()
            player.board[x][y][0].isSunk()
            addToPlayed(x, y)
            if(player.checkShip(player.board[x][y][0]) === true) return 'sunk'
            return 'hit'
        }
        else{
            addToPlayed(x, y)
            return 'miss'
        } 
    }

    const playTurn=(player, x, y)=>{
        if(checkTile(player, x, y) === true) return 'played'
        return receiveAttack(player, x, y)
    }
    return{
        generateBoard,
        playTurn,
        receiveAttack,
        placeShip,
        addToPlayed
    }
}

export {
    Ship,
    Player,
    gameBoard
}