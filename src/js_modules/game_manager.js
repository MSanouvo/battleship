import { Ship, gameBoard} from "./game_components"
import { player2, opponentBoard } from ".."
// Module for Doms Content and handling gameplay

let turn = 'player'
let game = gameBoard()

function gameManager(){
    const renderBoards=(player, parent, npc=true)=>{
        const user = npc
        const board = document.createElement('div')
        board.className = 'game_board'
        //player.board = board
        player.board = game.generateBoard()
        let x = 0
        let y = 0
        while(x<10){
            while(y<10){
                const tile = document.createElement('div')
                tile.className = 'tile'
                tile.title = [x, y]
                if(user != true){
                    tile.addEventListener('click', (e)=>{
                        const display = document.querySelector('#messages')
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
                        } else{
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
        renderBoards
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
function renderShip1(player, board){
    const playerBoard = board.querySelectorAll('.tile')
    const ship = new Ship('battleship', 5)
    const ship_0 = "1,2"
    const ship_1 = "1,3"
    const ship_2 = "1,4"
    const ship_3 = "1,5"
    const ship_4 = "1,6"

    player.ships.push(ship)
    player.board[1][2].push(ship)
    player.board[1][3].push(ship)
    player.board[1][4].push(ship)
    player.board[1][5].push(ship)
    player.board[1][6].push(ship)
    playerBoard.forEach(element => {
        if(element.title === ship_0) element.classList.add('ship')
        if(element.title === ship_1) element.classList.add('ship')
        if(element.title === ship_2) element.classList.add('ship')
        if(element.title === ship_3) element.classList.add('ship')
        if(element.title === ship_4) element.classList.add('ship')
    });
}

function renderShip2(player, board){
    const playerBoard = board.querySelectorAll('.tile')
    const ship = new Ship('battleship', 3)
    const ship_0 = "6,2"
    const ship_1 = "7,2"
    const ship_2 = "8,2"
    player.ships.push(ship)
    playerBoard.forEach(element => {
        if(element.title === ship_0) element.classList.add('ship')
        if(element.title === ship_1) element.classList.add('ship')
        if(element.title === ship_2) element.classList.add('ship')
    });
}

export {
    gameManager,
    renderShip1,
    renderShip2
}