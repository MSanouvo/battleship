import { gameBoard} from "./game_components"
import { player2, playerBoard, player1 } from ".."
// Module for Doms Content and handling gameplay

let turn = ''
let game = gameBoard()

function gameManager(){
    const startButton = document.querySelector('#start')
    const placementButton = document.querySelector('#placement')
    const display = document.querySelector('#messages')

    const startPlacement=()=>{
        placementButton.addEventListener('click', ()=>{
            generateOpponentShips(player2)
            const message = document.createElement('span')
            message.className = 'message'
            message.textContent = 'Place Ship'
            display.appendChild(message)            
            turn = 'placement'
        })
    }
    const startGame=(parent)=>{   
        startButton.addEventListener('click', ()=>{
            turn = 'player'
            resetContent(parent)
            const message = document.createElement('span')
            message.className = 'message'
            message.textContent = "Click Opponent's Tile to attack"
            parent.appendChild(message) 
        })  
    }

    const renderBoards=(player, parent)=>{
        const board = document.createElement('div')
        board.className = 'game_board'
        //player.board = board
        player.board = game.generateBoard()
        let x = 0
        let y = 0
        let placement_counter = 0
        while(x<10){
            while(y<10){
                const tile = document.createElement('div')
                tile.className = 'tile'
                tile.title = [x, y]
                tile.addEventListener('click', (e)=>{
                    if(turn ==='placement'){
                        //prevents us from placing ship on opponent board
                        if(player.name === 'Opponent') return
                        resetContent(display)
                        placement_counter = renderShipPlacement(player, board, tile.title.charAt(0), tile.title.charAt(2), placement_counter, display)
                        console.log(placement_counter)
                        if(placement_counter === 5){
                            resetContent(display)
                            const startMessage = document.createElement('span')
                            startMessage.className = 'message'
                            startMessage.textContent = 'Press "Start Game" to continue'
                            display.appendChild(startMessage)
                            startGame(display) 
                        } 
                    }
                    if(turn === 'player'){
                        //prevents us from attacking our board
                        if(player.name != 'Opponent') return
                        let result = game.playTurn(player, tile.title.charAt(0), tile.title.charAt(2), e.target)
                        turnResult(player, e.target, result, display)
                        if(player.checkPlayerShips() === true){
                            //Need to check this way so return can stop the function
                            resetContent(display)
                            const message = document.createElement('span')
                            message.className = 'message'
                            message.textContent = 'Game Over'
                            display.appendChild(message)
                            return
                        }
                        if(result != 'played'){
                            turn = 'opponent'
                            setTimeout(() =>{
                                opponentsTurn(player1, playerBoard, display)
                            }, 2000)
                        }
                    } 
                    if(turn ==='opponent'){
                        setTimeout(() =>{
                            waitTurnMessage(display)
                        }, 1000)
                        
    
                    }
                    
                })
                board.appendChild(tile)
                y++
            }
            y = 0
            x++
        }
        renderPlayerName(player,parent)
        //temporary ships
        parent.appendChild(board)
        return board
    }

    const waitTurnMessage=(parent)=>{
        resetContent(parent)
        const wait = document.createElement('span')
        wait.textContent = 'Please wait for your turn'
        wait.className = 'message'
        parent.appendChild(wait)
    }
    const renderPlayerName=(player, parent)=>{
        const head = document.createElement('h2')
        head.textContent = player.name
        parent.appendChild(head)
    }

    const renderShipPlacement=(player, board, x, y, placement_counter, display)=>{
        //move stays valid as long as nothing goes wrong with ship placement
        let move = 'valid'
        const playerBoard = board.querySelectorAll('.tile')
        const message = document.createElement('span')
        message.className = 'message'
        let x_coor = Number(x)
        let y_coor = Number(y)
        switch(placement_counter){
            case 0:
                //OOB check
                if((x_coor + 4) > 9){
                    resetContent(display)
                    message.textContent = 'Invalid tile, ship out of bounds'
                    display.appendChild(message)
                    return 0
                }
                const carrier_0 = x_coor+","+y_coor
                const carrier_1 = x_coor+1+","+y_coor
                const carrier_2 = x_coor+2+","+y_coor
                const carrier_3 = x_coor+3+","+y_coor
                const carrier_4 = x_coor+4+","+y_coor
                //No need for checks since it is the first ship placed
                playerBoard.forEach(element => {
                    if(element.title === carrier_0) element.classList.add('ship')
                    if(element.title === carrier_1) element.classList.add('ship')
                    if(element.title === carrier_2) element.classList.add('ship')
                    if(element.title === carrier_3) element.classList.add('ship')
                    if(element.title === carrier_4) element.classList.add('ship')
                });
                game.placeShip(player, x, y, game.carrier())
                return 1
            case 1:
                //OOB check
                if((x_coor + 3) > 9){
                    resetContent(display)
                    message.textContent = 'Invalid tile, ship out of bounds'
                    display.appendChild(message)
                    return 1
                }
                const battleship_0 = x_coor+","+y_coor
                const battleship_1 = x_coor+1+","+y_coor
                const battleship_2 = x_coor+2+","+y_coor
                const battleship_3 = x_coor+3+","+y_coor
                //Check if any tiles have ship already
                playerBoard.forEach(element => {
                    if(element.title === battleship_0){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                    if(element.title === battleship_1){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                    if(element.title === battleship_2){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                    if(element.title === battleship_3){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                });
                if(move != 'invalid') {
                    game.placeShip(player, x, y, game.battleship())
                    playerBoard.forEach(element => {
                        if(element.title === battleship_0) element.classList.add('ship')
                        if(element.title === battleship_1) element.classList.add('ship')
                        if(element.title === battleship_2) element.classList.add('ship')
                        if(element.title === battleship_3) element.classList.add('ship')
                    });
                    return 2
                } else return 1
            case 2:
                //OOB check
                if((x_coor + 2) > 9){
                    resetContent(display)
                    message.textContent = 'Invalid tile, ship out of bounds'
                    display.appendChild(message)
                    return 2
                }
                const destroyer_0 = x_coor+","+y_coor
                const destroyer_1 = x_coor+1+","+y_coor
                const destroyer_2 = x_coor+2+","+y_coor
                // Check if any tiles already has a ship
                playerBoard.forEach(element => {
                    if(element.title === destroyer_0){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                    if(element.title === destroyer_1){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                    if(element.title === destroyer_2){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                });
                if(move != 'invalid'){
                    game.placeShip(player, x, y, game.destroyer())
                    playerBoard.forEach(element => {
                        if(element.title === destroyer_0) element.classList.add('ship')
                        if(element.title === destroyer_1) element.classList.add('ship')
                        if(element.title === destroyer_2) element.classList.add('ship')
                    });
                    return 3
                } else return 2
                    
            case 3:
                //OOB check
                if((x_coor + 2) > 9){
                    resetContent(display)
                    message.textContent = 'Invalid tile, ship out of bounds'
                    display.appendChild(message)
                    return 3
                }
                const submarine_0 = x_coor+","+y_coor
                const submarine_1 = x_coor+1+","+y_coor
                const submarine_2 = x_coor+2+","+y_coor
                // Check if any tiles already has a ship
                playerBoard.forEach(element => {
                    if(element.title === submarine_0){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                    if(element.title === submarine_1){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                    if(element.title === submarine_2){
                        if(element.classList.contains('ship')) move = 'invalid'
                    }
                });
                if(move != 'invalid'){
                    game.placeShip(player, x, y, game.submarine())
                    playerBoard.forEach(element => {
                        if(element.title === submarine_0) element.classList.add('ship')
                        if(element.title === submarine_1) element.classList.add('ship')
                        if(element.title === submarine_2) element.classList.add('ship')
                    });
                    return 4
                } else return 3
                
            case 4:
                //OOB check
                if((x_coor + 1) > 9){
                    resetContent(display)
                    message.textContent = 'Invalid tile, ship out of bounds'
                    display.appendChild(message)
                    return 4
                }
                const patrol_0 = x_coor+","+y_coor
                const patrol_1 = x_coor+1+","+y_coor
               // Check if any tiles already has a ship
               playerBoard.forEach(element => {
                if(element.title === patrol_0){
                    if(element.classList.contains('ship')) move = 'invalid'
                }
                if(element.title === patrol_1){
                    if(element.classList.contains('ship')) move = 'invalid'
                }
            });
                if(move != 'invalid'){
                    game.placeShip(player, x, y, game.patrol())
                    playerBoard.forEach(element => {
                        if(element.title === patrol_0) element.classList.add('ship')
                        if(element.title === patrol_1) element.classList.add('ship')
                    });
                    return 5 
                } else return 4
                
        }
        console.log(player.board)
        resetContent(display)
        const startMessage = document.createElement('span')
        startMessage.className = 'message'
        startMessage.textContent = 'Press "Start Game" to continue'
        display.appendChild(startMessage)
    }

    const turnResult=(player, tile, result, display)=>{
        const message = document.createElement('span')
        message.className = 'message'
        resetContent(display)
        switch(result){
            case 'hit':
                console.log('hit')
                tile.classList.add('hit')
                message.textContent = player.name+" Hit"
                display.appendChild(message)
                break
            case 'miss':
                tile.classList.add('played')
                message.textContent = player.name+' Miss'
                display.appendChild(message)
                break
            case 'played':
                message.textContent = player.name+" Tile has already been attacked"
                display.appendChild(message)
                break
            case 'sunk':
                message.textContent = player.name+' Ship Sunk'
                tile.classList.add('hit')
                display.appendChild(message)
                break
        }
    }

    function generateOpponentShips(player){
        game.placeShip(player, player.pickTile(), player.pickTile(), game.carrier())
        game.placeShip(player, player.pickTile(), player.pickTile(), game.battleship())
        game.placeShip(player, player.pickTile(), player.pickTile(), game.destroyer())
        game.placeShip(player, player.pickTile(), player.pickTile(), game.submarine())
        game.placeShip(player, player.pickTile(), player.pickTile(), game.patrol())
        console.log(player.board)
    }

    const resetContent=(parent)=>{
        while(parent.firstChild) parent.removeChild(parent.lastChild)
    }

    const opponentsTurn=(player, board, display)=>{
        let x = player.pickTile()
        let y = player. pickTile()
        const tiles = board.querySelectorAll('.tile')
        tiles.forEach(tile =>{
            if(tile.title === x+','+y){
                let opponentResult = game.playTurn(player, x, y)
                turnResult(player, tile, opponentResult, display)
                if(player.checkPlayerShips() === true){
                    //Need to check this way so return can stop the function
                    resetContent(display)
                    const message = document.createElement('span')
                    message.className = 'message'
                    message.textContent = 'Game Over'
                    display.appendChild(message)
                    return
                }
                if(opponentResult === 'played'){
                    console.log('try again')
                    opponentsTurn(player, board, display)
                } 
            }
        })
        turn = 'player'
    }

    return{
        renderBoards,
        startPlacement
    }
}


export {
    gameManager
}