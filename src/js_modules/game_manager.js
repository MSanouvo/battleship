import { Ship, generateBoard, receiveAttack, placeShip, playTurn } from "./game_components"

// Module for Doms Content and handling gameplay

function renderBoards(player, parent){
    const board = document.createElement('div')
    board.className = 'game_board'
    //player.board = board
    player.board = generateBoard()
    let x = 0
    let y = 0
    while(x<10){
        while(y<10){
            const tile = document.createElement('div')
            tile.className = 'tile'
            tile.title = [x, y]
            tile.addEventListener('click', (e)=>{
                playTurn(player, tile.title.charAt(0), tile.title.charAt(2))
                tile.classList.add('played')
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
    
    //console.log(player)
}

function renderPlayerName(player, parent){
    const head = document.createElement('h2')
    head.textContent = player.name
    parent.appendChild(head)
}

// //test attack function
// function attackTile(board, x, y){
//     if(x > 9 || y > 9) return console.log('Tile is OOB')
//     const board = player.board.querySelectorAll('.tile')
//     board.forEach(tile =>{
//         // should progess with using backend board array to track ships
//         // alternatively can match titles/tile and check for ship class
//     })
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

    ship.location.push(ship_0)
    ship.location.push(ship_1)
    ship.location.push(ship_2)
    ship.location.push(ship_3)
    ship.location.push(ship_4)

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
    renderBoards,
    renderShip1,
    renderShip2
}