/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//create a Phrase class to handle the creation of phrases.
class Phrase {
    constructor(phrase) {
            this.phrase = phrase;
        }
        /*This method adds letter placeholders to the display when the game starts. creates li and adds to ul */
    addPhraseToDisplay() {
            //grab ul to append
            const ul = document.getElementById('phrase').firstElementChild;
            //loop through this.phrase
            for (let i = 0; i < this.phrase.length; i++) {
                //for each letter create an li and set textcontent to phrase index
                let li = document.createElement('li');
                li.textContent = this.phrase[i];
                //adding hide and space classes if there is a space or ''
                if (li.textContent === ' ') {
                    li.classList.add('hide', 'space');
                } else {
                    li.classList.add('hide', 'letter')
                }
                //append to ul
                ul.appendChild(li);
            }
        }
        /**`this method Checks to see if the letter selected by the player matches a letter in the phrase. */
    checkLetter(letterToCheck) {
            //loop thorough phrase
            let checkForMatch = 0;
            //check letterToCheck vs this.phrase[i]
            //if no match
            for (let i = 0; i < this.phrase.length; i++) {
                if (letterToCheck === this.phrase[i].toLowerCase()) {
                    checkForMatch++
                }
            }
            if (checkForMatch > 0) {
                return true;
            } else {
                return false;
            }
        }
        /**this method reveals the letter(s) on the board that matches the
player's selection */
    showMatchedLetter(letter) {
        const lis = document.getElementById('phrase').firstElementChild.children;
        for (let i = 0; i < lis.length; i++) {
            if (lis[i].textContent.toLowerCase() === letter) {
                lis[i].classList.add('show');
                lis[i].classList.remove('hide');
            }
        }
    }
}