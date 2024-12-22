const game = require('../js_modules/game_components')
const board = game.gameBoard()

//Ship Module
test('Hp should drop from 5 to 1', ()=>{
    const battleship = new game.Ship(5)
    expect(battleship.isHit()).toBe(4)
})

test('Ship should be destroyed at 0 Hp', ()=>{
    const weakShip = new game.Ship(1)
    weakShip.isHit()
    expect(weakShip.isSunk()).toBe(true)
})

//GameBoard Module
test('Make sure board X dimension is right (10)', ()=>{
    expect(board.generateBoard().length).toBe(10)
})

test('Make sure board Y dimension is right (10)', ()=>{
    expect(board.generateBoard()[0].length).toBe(10)
})

test('Check if player move is added to played array', ()=>{
    expect(board.addToPlayed(1, 6)).toEqual([[1, 6]])
})


test('Check if attack at (4, 6) is valid', ()=>{
    const player = new game.Player()
    const ship = new game.Ship()
    player.board = board.generateBoard()
    board.placeShip(player, 4, 6, ship)
    expect(board.receiveAttack(player, 4, 6)).toBe("hit")
})

test('Check if attack at (1, 2) misses', ()=>{
    const player = new game.Player()
    const ship = new game.Ship()
    player.board = board.generateBoard()
    board.placeShip(player, 4, 6, ship)
    expect(board.receiveAttack(player, 1, 2)).toBe("miss")
})

test('Check that a ship is placed at location', ()=>{
    const ship = new game.Ship(1)
    const player = new game.Player()
    player.board = board.generateBoard()
    expect(board.placeShip(player, 0, 0, ship)).toEqual([{"Hp": 1,"destroyed": false,"length": 1,"name": "ship",}])
})
//Temporary Tests (function later returns random coordinates)
// test('Check if ship placement is OOB', ()=>{
//     const ship = new game.Ship(3)
//     const player = new game.Player()
//     player.board = board.generateBoard()
//     expect(board.placeShip(player, 8, 1, ship)).toBe('invalid')
// })

// test('Check if ship already exists at tile', ()=>{
//     const ship = new game.Ship(3)
//     const player = new game.Player()
//     player.board = board.generateBoard()
//     board.placeShip(player, 6, 1, ship)
//     expect(board.placeShip(player, 7, 1, ship)).toBe("invalid")
// })


//Player Module
test('Check if player loses ship', ()=>{
    const weakShip = new game.Ship(1)
    const player = new game.Player()
    weakShip.isHit()
    expect(player.checkShip(weakShip)).toBe(true)
})

test('Check if player has no more ships', ()=>{
    const player = new game.Player()
    player.ship_count = 0
    expect(player.checkPlayerShips()).toBe(true)
})






