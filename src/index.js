import "./style.css"
import { renderBoards, renderShip1, renderShip2 } from "./js_modules/game_manager"
import { Player } from "./js_modules/game_components"

const player1 = new Player('Player 1')
player1.ship_count = 1
export const player2 = new Player('Opponent')

const board_1 = document.querySelector('#board_1')
const board_2 = document.querySelector('#board_2')
renderBoards(player1, board_1)
export const opponentBoard = renderBoards(player2, board_2)

renderShip1(player1, board_1)
renderShip2(player2, board_2)
console.log(player1)