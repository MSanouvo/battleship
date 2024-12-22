#BattleShip

- A simple rendition of the classic board game (project courtesy of The Odin Project)

Upon loading the page, players will be prompted to place their ships (5 ships total). Once last ship has been placed, players will then be asked to start the game via start button and being playing. Once the game is over, a button will allow users to play again (by reloading the page)

Rules follow the basic game logic:
- click a tile and see if it has a ship or not
- wait for the opponent's turn
- players cannot hit the same tile twice
- once all spaces of a ship has been hit, it is sunk
- once all of a player's ship has been sunk, that player loses

Unlike other projects, this one was my first attempt at trying to solve everything myself. This meant that aside from looking up some documentation for very basic code, I tried my best to think through the problems and solutions myself. While that feels vindicating, I can't help but feel like my code is very inefficient (check out the renderBoard event listener for example). That's okay though, a win is a win !

While I did my best to keep the experience intuitive and simple, there are still improvements that can be made.
- improve ship placement to require gaps between each ship (allows for faster games/less total clicks as once a ship is destroyed, direct neighbors can be ruled out immediately)
- better message display
- improved opponent logic
- add ship orientation (spoilers, all ships are placed vertically !)
- bug testing/fixing (currently a known bug that allows randomly placed ships to overlap, preventing the player to win)

This is a definately a project to look back on to refine/refactor my code and improve the user experience. Maybe I'll add sound effects and animation one day !
