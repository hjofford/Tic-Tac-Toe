# Tic-Tac-Toe
First Project - Unit 1 GA

Web-based version of the classic 'Tic-Tac-Toe' game using HTML, CSS, and JS

<h2>How to Play:</h2>
Tic-tac-toe, noughts and crosses, or Xs and Os, is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner. It is a solved game with a forced draw assuming best play from both players. 
<h6>Source: https://en.wikipedia.org/wiki/Tic-tac-toe</h6>

HTML
    - Simple header and content layout
    - Scoreboard using grid template
    - Reset page hyperlink calls reload() function in JS
    - popup message divs to call in JS depending on game mode and win type
CSS
    - Created board using CSS
    - Created 'X' and 'O' using raw css
    - Created Draw/Win/double points message

JS
    - Track possible winning combos using variable array
    - Double points for diagonal win
    - Click handles and event listeners linked to hover class and on-clicks
    - 1v1 Game mode
    - Vs Computer Game mode
    - Check draw/win/double points and display draw/win/double points message, with a restart game option
    - Track Game wins/points and assign new value to appropriate player
    - Popup Game start message on page load with two game modes = 1v1 or Vs Computer

Tutorial used to build base code:
https://www.youtube.com/watch?v=Y-GkMjUZsmM&t=2201s

Need to complete:
    - When playing Vs Comp Game Mode, JS checks and tracks wins and diagonal double points for both Player (x) and Computer (o). If the board is full (ie: draw OR x places final mark for a win), the computer gets stuck in an infinite loop trying to make its next turn, with no available cells.
    Tried to fix using If statement in compGame(), breaks, seperate isBoardFull() function using .filter() method, but my logic was unsuccessful.