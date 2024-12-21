import "./style.css"
import { gameManager, renderShip1, renderShip2 } from "./js_modules/game_manager"
import { Player } from "./js_modules/game_components"

const game = gameManager()
const player1 = new Player('Player 1')
player1.ship_count = 1
export const player2 = new Player('Opponent')

const board_1 = document.querySelector('#board_1')
const board_2 = document.querySelector('#board_2')
game.renderBoards(player1, board_1, false)
export const opponentBoard = game.renderBoards(player2, board_2)
game.startPlacement()

// renderShip1(player1, board_1)
// renderShip2(player2, board_2)
console.log(player1)