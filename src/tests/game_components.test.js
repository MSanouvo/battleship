const game = require('../js_modules/game_components')

test('Hp should drop from 5 to 1', ()=>{
    const battleship = new game.Ship('battleship', 5)
    expect(battleship.isHit()).toBe(4)
})

test('Ship should be destroyed at 0 Hp', ()=>{
    const weakShip = new game.Ship('weak', 1)
    weakShip.isHit()
    expect(weakShip.isSunk()).toBe(true)
})

test('Make sure board X dimension is right (10)', ()=>{
    expect(game.generateBoard().length).toBe(10)
})

test('Make sure board Y dimension is right (10)', ()=>{
    expect(game.generateBoard()[0].length).toBe(10)
})

test('Check if player loses ship', ()=>{
    const weakShip = new game.Ship('weak', 1)
    const player = new game.Player()
    weakShip.isHit()
    expect(game.checkShip(player, weakShip)).toBe(4)
})

test('Check if player has no more ships', ()=>{
    const player = new game.Player()
    player.ship_count = 0
    expect(game.checkPlayerShips(player)).toBe('Game Over')
})

test('Check if player move is added to played array', ()=>{
    const player = new game.Player()
    expect(player.addToPlayed(1, 6)).toEqual([[1, 6]])
})

test('Check that a ship is placed at location', ()=>{
    const ship = 'ship'
    const player = new game.Player()
    player.board = game.generateBoard()
    expect(game.placeShip(player, 4, 6, ship)).toEqual(['ship'])
})

test('Check if attack at (4, 6) is valid', ()=>{
    const player = new game.Player()
    const ship = new game.Ship()
    player.board = game.generateBoard()
    game.placeShip(player, 4, 6, ship)
    expect(game.receiveAttack(player, 4, 6)).toBe(true)
})

test('Check if attack at (1, 2) misses', ()=>{
    const player = new game.Player()
    const ship = new game.Ship()
    player.board = game.generateBoard()
    game.placeShip(player, 4, 6, ship)
    expect(game.receiveAttack(player, 1, 2)).toBe(false)
})