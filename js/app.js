// Holds cards from the "deck" list
let cardNodelist = document.querySelectorAll('.card');
let cardsArray = Array.from(cardNodelist);

//Holds the complete deck container
let deckNodeList = document.querySelector('.deck');
//Shuffles the origionally created array of cards into new array
let cardsArrayShuffled = shuffle(cardsArray);

// Array will hold the created elements
let newCardList = [];
// Array will hold the cards opened
let openedCardList = [];

// Holds number of moves element
const movesCounter = document.querySelector('.moves');
// Hold the amount of moves performed in one game
let numberOfMoves = 0;

// Holds the scores rating stars
let scoreStars = document.querySelector('.stars');
const fullStar = "fa fa-star";
const halfStar = "fa fa-star-half-full";
const emptyStar = "fa fa-star-o";

// Holds length of time after cards do not match
const noMatchTimeDelay = 800;

/*------------------------------GAME START----------------------------*/

// Create new ArrayList update with the cardsArrayShuffled
// Loops through each card and create its HTML
// This is necessary because cardsArrayShuffled is not in sync with the new positions.
// cardsArrayShuffled[0] COULD be pointing to the last row card
// This makes everything more organized. Ex: newCardList[0] = top left card
createCardArrayList(newCardList,cardsArrayShuffled);
// Clears out old deckNodeList. To be replaced by newCardList
removeCardNodeList(deckNodeList);
// Adds newCardList array to deckNodeList to display shuffled cards to the screen
addCardNodeList(newCardList,deckNodeList);

/************** EventListeners ***********************/

document.querySelector('.deck').addEventListener('click', cardSelected);
document.querySelector('.restart').addEventListener('click', restartGame);

/* EventListener Functions */

function cardSelected(event) {
    if(event.target.className === "card" ||
    event.target.className === "card closed" ) {
        increaseNumberofMoves();
        checkStarRating(numberOfMoves);
        changeBackground(numberOfMoves);
        displayCard(event);
        addToOpenedCardList(event,openedCardList);
        // Continue to the checking portion when openedCardList holds an even amount of cards
        if(openedCardList.length%2 === 0 ) {
            // If the 2 cards match
            if (openedCardList[openedCardList.length-2].innerHTML === openedCardList[openedCardList.length-1].innerHTML) {
                matchFound(openedCardList);
                // Function is set here because the document does not need to check
                // during each card selection. This function is only important
                // when a match is found.
                winGameCheck(openedCardList);
            }
            // If cards do not match
            else {
                // Suspend face down cards so that the user
                // does not select any other card quickly
                suspendNonMatchedCardActions();
                matchNotFound(openedCardList);
            }
        }
    }
  }

// Display currently selected card
function displayCard(event) {
    event.target.className = "card open show";
}

// Adds card to an array list
function addToOpenedCardList(event, openCardList) {
    openCardList.push(event.target);
}

// Changes element class of the last two cards in the opened list to show as a match
function matchFound(openCardList) {
    openCardList[openCardList.length-2].className = "card match";
    openCardList[openCardList.length-1].className = "card match";
}

// Removes last two cards from the opened list
// Stalls any eventListeners
// Flips the 2 cards face down
function matchNotFound(openCardList) {
    openCardList[openCardList.length - 2].className = "card no-match";
    openCardList[openCardList.length - 1].className = "card no-match";
    setTimeout(function () {
        for (let i = 0; i < 2; i++) {
            openCardList[openCardList.length - 1].className = "card closed";
            openCardList.pop();
        }
        // Restore event listener back to face down cards
        // when delay animation finishes
        restoreNonMatchedCardActions();
    }, noMatchTimeDelay)
}

// Suspends actions for the array of cards.
// Used mainly when animations are occuring
function suspendNonMatchedCardActions() {
    for(let i=0; i < newCardList.length; i++ ) {
        // if Statement does not need to check of "matched" because
        // the beginning if statement in event handler will check for "matched"
        if(!newCardList[i].classList.contains("open")) {
            newCardList[i].classList.add("suspended-actions");
        }
    }
}

// Restores actions to the suspended array of cards.
// Used mainly when animations are occuring
function restoreNonMatchedCardActions() {
    for(let i=0; i < newCardList.length; i++ ) {
        if(newCardList[i].classList.contains("suspended-actions")) {
            newCardList[i].classList.remove("suspended-actions");
        }
    }
}

// Increment and update the number of monves
function increaseNumberofMoves() {
    numberOfMoves++;
    movesCounter.textContent = numberOfMoves;
}

// Measure number of stars shown based on the number of moves
function checkStarRating(amountOfMoves) {
    switch(amountOfMoves) {
        case 24:
        scoreStars.children[2].children[0].className = halfStar;
        break;
        case 30:
        scoreStars.children[2].children[0].className = emptyStar;
        break;
        case 35:
        scoreStars.children[1].children[0].className = halfStar;
        break;
        case 40:
        scoreStars.children[1].children[0].className = emptyStar;
        break;
        case 45:
        scoreStars.children[0].children[0].className = halfStar;
        break;
    }
}

// matches openedCardList to the newCardList to make sure that all
// the cards were successfully matches.
function winGameCheck(openCardList) {
    // if(openCardList.length === newCardList.length) {
    if(openCardList.length === cardsArrayShuffled.length) {
        sessionStorage.setItem("moves", numberOfMoves);
        let numberOfStars = countStars(scoreStars);
        sessionStorage.setItem("stars", numberOfStars);
        window.location.href="winner.html";
    }
}

// Use the scoreStars list to count and return the number of stars
function countStars(scoreStars) {
    let starCount = 0;
    for(let i=0; i<scoreStars.childElementCount; i++) {
        if(scoreStars.children[i].children[0].className == fullStar) {
            starCount++;
        }
        else if(scoreStars.children[i].children[0].className == halfStar) {
            starCount=starCount+0.5;
        }
        else{
            console.log("Start " + i + "is empty star");
        }
    }
    return starCount;
}

// Change background according to the number of moves
function changeBackground(amountOfMoves) {
    if(amountOfMoves === 30) {
        document.querySelector('.deck').style.background = 'linear-gradient(160deg, #fff06b 40%, #dd9b0d 60%)';
    }
    else if(amountOfMoves === 40) {
        document.querySelector('.deck').style.background = 'linear-gradient(160deg, #e4944a 40%, #bb2c2c 60%)';
    }
}

// Resets the game by reloading the page
function restartGame() {
    location.reload();
}

/* General Card Functions */

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
        origionalDeckNodeList.children[i].remove();
    }
}

// Adds randomized array of cards to the origionalDeckNodeList
function addCardNodeList( randomizedArrayList, origionalDeckNodeList) {
    for (let i = 0; i < randomizedArrayList.length; i++) {
        origionalDeckNodeList.appendChild(randomizedArrayList[i]);
    }
}