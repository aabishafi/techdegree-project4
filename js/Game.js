/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/*create a Game class methods for starting and ending the game, handling
interactions, getting a random phrase, checking for a win, and removing a life from the scoreboard*/
class Game {
    constructor() {
            this.missed = 5;
            this.phrases = [
                'Whatever you do do it well',
                'If you tell the truth you don not have to remember anything',
                'Be so good they can not ignore you',
                'Yesterday you said tomorrow Just do it',
                'Reality is wrong dreams are for real'
            ];
            this.activePhrase = null;
            this.gameWon = 0;
        }
        /*This method should select and then return a random
phrase from the array of phrases stored in the Game class’s `phrases` property. */
    getRandomPhrase() {
            return this.phrases[Math.floor(Math.random() * this.phrases.length)];
        }
        /*this method begins game by selecting a random phrase and displaying it to user */
    startGame() {
        this.reset();
        this.currentPhrase = new Phrase(this.getRandomPhrase());
        this.currentPhrase.addPhraseToDisplay();
    }

    /*this method will handle what will happen when the user interacts with onscreen keyboard*/
    handleInteraction(letter) {
            const keys = document.querySelectorAll('.key');
            if (this.currentPhrase.checkLetter(letter)) {
                //loop and add class
                for (let i = 0; i < keys.length; i++) {
                    if (letter === keys[i].textContent) {
                        keys[i].disabled = true;
                        keys[i].classList.add('chosen');
                    }
                }
                this.currentPhrase.showMatchedLetter(letter);
                this.checkForWin();
            } else {
                for (let i = 0; i < keys.length; i++) {
                    if (letter === keys[i].textContent) {
                        keys[i].disabled = true;
                        keys[i].classList.add('wrong');
                    }
                }
                this.removeLife();
            }
        }
        /**This method checks to see if the player has revealed all of the
letters in the active phrase. */
    checkForWin() {
            //loop through all li's, check txt content & class
            const lis = document.getElementById('phrase').firstElementChild.children;
            for (let i = 0; i < lis.length; i++) {
                if (lis[i].textContent === ' ' || lis[i].className === 'letter show') {
                    this.gameWon++;
                }
            }
            if (this.gameWon === this.currentPhrase.phrase.length) {
                this.gameOver('win', 'Woohoo! You Win!');
            } else {
                this.gameWon = 0;
            }
        }
        /**This method removes a life from the scoreboard, by replacing one
of the `liveHeart.png` images with a `lostHeart.png` image (found in the `images`
folder) and increments the `missed` property. */
    removeLife() {
            this.missed--;
            document.getElementsByTagName('img')[this.missed].src = '../images/lostHeart.png';
            if (this.missed === 0) {
                this.gameOver('lose', 'Oh Nooo... YOU LOSE');
            }
        }
        // Method will reset keyboard and lives, also remove all li's
    reset() {
        const keys = document.querySelectorAll('.key');
        for (let i = 0; i < keys.length; i++) {
            keys[i].disabled = false;
            keys[i].classList.remove('chosen', 'wrong');
        }
        const lives = document.querySelectorAll('img');
        for (let i = 0; i < lives.length; i++) {
            lives[i].src = 'images/liveHeart.png';
        }
        const ul = document.querySelector('#phrase').firstElementChild;
        while (ul.lastChild) {
            ul.removeChild(ul.lastChild);
        }

    }

    /**This method displays the original start screen overlay, and
depending on the outcome of the game, updates the overlay `h1` element with a
friendly win or loss message, and replaces the overlay’s `start` CSS class with
either the `win` or `lose` CSS class. */
    gameOver(result, message) {
        document.getElementById('overlay').className = result;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('game-over-message').textContent = message;
        document.getElementById('btn__reset').textContent = 'Play Again?';
    }
}