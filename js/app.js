/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game;
let keyCodes = [];
//function to remove overlay.
const resetDisplay = () => {
    document.getElementById('overlay').style.display = 'none';
};
// Mark button function will be called when  key is selected, 
//it will call the handleInteraction method and pass in a single letter as an argument
const markButton = (evt) => {
    game.handleInteraction(evt);
};
//grab start button
const startButton = document.getElementById('btn__reset');
//attach event listener to start button
startButton.addEventListener('click', () => {
        resetDisplay();
        keyCodes = [];
        game = new Game();
        game.startGame();
    })
    //attach event listener to onscreen keyboard buttons
const keyboardButtons = document.getElementById('qwerty');
keyboardButtons.addEventListener('click', (event) => {
    if (event.target.className === 'key') {
        markButton(event.target.textContent);
        keyCodes.push(event.target.textContent);
    }
});


//set up listener on keydown. Keys inbetween 65&90 are letters, if keyCode array includes the letter then it means has already been pressed/clicked
window.addEventListener('keydown', (event) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (!keyCodes.includes(event.key.toLowerCase())) {
            markButton(event.key.toLowerCase());
            keyCodes.push(event.key.toLowerCase());
        }
    }
});
//Event listener on mousedown to stop players being able to cheat by highlighting the list
document.addEventListener('mousedown', (event) => {
    event.preventDefault();
})