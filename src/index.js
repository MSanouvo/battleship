import "./style.css"
import { gameManager } from "./js_modules/game_manager"
import { Player } from "./js_modules/game_components"

//Set game manager, players, and boards
const game = gameManager()
export const player1 = new Player('Player 1')
export const player2 = new Player('Opponent')

const board_1 = document.querySelector('#board_1')
const board_2 = document.querySelector('#board_2')
export const playerBoard = game.renderBoards(player1, board_1, false)
const opponentBoard = game.renderBoards(player2, board_2)
game.startPlacement()

//console.log(player1)