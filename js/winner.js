//Get the number moves and stars.
//Display on the moves and stars elements in the winners page.
const finalMoves = sessionStorage.getItem("moves");
const finalStars = sessionStorage.getItem("stars");
document.querySelector('#moves').textContent = finalMoves;
document.querySelector('#stars').textContent = finalStars;

//Get the restart button.
//Add listener that waits for a click on the button to go back
//to retry tghe game.
const restartButton = document.querySelector('#restartButton');
restartButton.addEventListener('click', function () {
  window.location="index.html";
});