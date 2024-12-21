import { Ship, gameBoard} from "./game_components"
import { player2, opponentBoard } from ".."
// Module for Doms Content and handling gameplay

let turn = ''
let game = gameBoard()

function gameManager(){
    const placementButton = document.querySelector('#placement')
    const display = document.querySelector('#messages')
    const startPlacement=()=>{
        placementButton.addEventListener('click', ()=>{
            const message = document.createElement('span')
            message.className = 'message'
            message.textContent = 'Place Ship'
            display.appendChild(message)            
            turn = 'placement'
        })
    }
    const renderBoards=(player, parent, npc=true)=>{
        const user = npc
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
                if(user != true){
                    tile.addEventListener('click', (e)=>{
                        if(turn ==='placement'){
                            resetContent(display)
                            placement_counter = renderShipPlacement(player, board, tile.title.charAt(0), tile.title.charAt(2), placement_counter, display)
                            console.log(placement_counter)
                            if(placement_counter === 5){
                                //generate opponent ship placements
                                //make start game button pop up
                                //button switches turn to player
                            } 
                        }
                        if(turn === 'player'){
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
                                    opponentsTurn(player2, opponentBoard, display)
                                }, 2000)
                            }
                        } 
                        if(turn ==='opponent'){
                            resetContent(display)
                            const wait = document.createElement('span')
                            wait.textContent = 'Please wait for your turn'
                            wait.className = 'message'
                            display.appendChild(wait)
        
                        }
                        
                    })
                }
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

    const renderPlayerName=(player, parent)=>{
        const head = document.createElement('h2')
        head.textContent = player.name
        parent.appendChild(head)
    }

    const renderShipPlacement=(player, board, x, y, placement_counter, display)=>{
        //valid moves will keep function 
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
        //static placements for testing purposes
        game.placeShip(player, 1, 2, game.carrier())
        game.placeShip(player, 2, 4, game.battleship())
        game.placeShip(player, 4, 1, game.destroyer())
        game.placeShip(player, 6, 5, game.submarine())
        game.placeShip(player, 3, 9, game.patrol())
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

//     const head = document.createElement('h2')
//     head.textContent = player.name
//     parent.appendChild(head)
// }

// function turnResult(tile, result, display){
//     const message = document.createElement('span')
//     message.className = 'message'
//     resetContent(display)
//     switch(result){
//         case 'hit':
//             console.log('hit')
//             tile.classList.add('hit')
//             message.textContent = "Hit"
//             display.appendChild(message)
//             break
//         case 'miss':
//             tile.classList.add('played')
//             message.textContent = 'Miss'
//             display.appendChild(message)
//             break
//         case 'played':
//             message.textContent = "Tile has already been attacked"
//             display.appendChild(message)
//             break
//         case 'sunk':
//             message.textContent = 'Ship Sunk'
//             tile.classList.add('hit')
//             display.appendChild(message)
//             break
//     }
// }

// function resetContent(parent){
//     while(parent.firstChild){
//         parent.removeChild(parent.lastChild)
//     }
// }




//Test static ships
// function renderShip1(player, board){
//     const playerBoard = board.querySelectorAll('.tile')
//     const ship = new Ship(5)
//     const ship_0 = "1,2"
//     const ship_1 = "1,3"
//     const ship_2 = "1,4"
//     const ship_3 = "1,5"
//     const ship_4 = "1,6"

//     player.ships.push(ship)
//     player.board[1][2].push(ship)
//     player.board[1][3].push(ship)
//     player.board[1][4].push(ship)
//     player.board[1][5].push(ship)
//     player.board[1][6].push(ship)
//     playerBoard.forEach(element => {
//         if(element.title === ship_0) element.classList.add('ship')
//         if(element.title === ship_1) element.classList.add('ship')
//         if(element.title === ship_2) element.classList.add('ship')
//         if(element.title === ship_3) element.classList.add('ship')
//         if(element.title === ship_4) element.classList.add('ship')
//     });
// }

// function renderShip2(player, board){
//     const playerBoard = board.querySelectorAll('.tile')
//     const ship = new Ship(3)
//     const ship_0 = "6,2"
//     const ship_1 = "7,2"
//     const ship_2 = "8,2"
//     player.ships.push(ship)
//     playerBoard.forEach(element => {
//         if(element.title === ship_0) element.classList.add('ship')
//         if(element.title === ship_1) element.classList.add('ship')
//         if(element.title === ship_2) element.classList.add('ship')
//     });
// }

export {
    gameManager,
    // renderShip1,
    // renderShip2
}