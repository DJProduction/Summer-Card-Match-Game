const finalMoves = sessionStorage.getItem("moves");
const finalStars = sessionStorage.getItem("stars");
document.querySelector('#moves').textContent = finalMoves;
document.querySelector('#stars').textContent = finalStars;
console.log("Moves: " + finalMoves + " and " + "Stars: " + finalStars);