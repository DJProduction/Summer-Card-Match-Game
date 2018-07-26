// Holds cards from the "deck" list
let cardNodelist = document.querySelectorAll('.card');
let cardsArray = Array.from(cardNodelist);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let deckNodeList = document.querySelector('.deck');
let cardsArrayShuffled = shuffle(cardsArray);
// Array will hold the created elements
let newCardList = [];


// Hold the amount of moves performed in one game
let numberOfMoves = 0;
// Holds the number of cards flipped by user. This value should never reach over 2.
let cardsFlipped = 0;
// Holds the number of current matches found by the user
let currentNumberofMatches = 0;
// Holds the number of matches needed to win the game
let numberOfMatchesToWin = cardsArray.length/2;

createCardArrayList(newCardList,cardsArrayShuffled);
removeCardNodeList(deckNodeList);
addCardNodeList(newCardList,deckNodeList);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.querySelector('.deck').addEventListener('click', cardSelected);

function cardSelected(event) {
    if(event.target.className === "card") {
        displayCard(event);
    }
  }

function displayCard(event) {
    event.target.className = "card open show";
}

 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Creates new array list of card elements
// The origionalArrayList represents the cardsArrayShuffled
function createCardArrayList(newArraylist, origionalArrayList ) {
    for(let i = 0; i < origionalArrayList.length; i++) {
        newArraylist.push(document.createElement(origionalArrayList[i].tagName));
        newArraylist[i].className = origionalArrayList[i].className;
        newArraylist[i].innerHTML = origionalArrayList[i].innerHTML;
    }
}

// Cycles through Nodelist and removes each element until the
// element count reaches 0.
function removeCardNodeList( origionalDeckNodeList ) {
    let i = 0;
    while(origionalDeckNodeList.childElementCount != 0) {
        console.log(origionalDeckNodeList.children[i]);
        origionalDeckNodeList.children[i].remove();
    }
}

// Adds randomized array of cards to the origionalDeckNodeList
function addCardNodeList( randomizedArrayList, origionalDeckNodeList) {
    for (let i = 0; i < randomizedArrayList.length; i++) {
        console.log(randomizedArrayList[i]);
        origionalDeckNodeList.appendChild(randomizedArrayList[i]);
    }
}