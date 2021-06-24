/*
----------------
main js
06 3 2021
----------------
*/

const selections = document.querySelectorAll('[move-id]')
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const roundDescriptionP = document.getElementById("p-round-descrition");
const computerSelectionI = document.getElementById("computer-selection-icon");

const SELECTIONS = [
    {
        name: 'rock',
        winsAgainst: 'scissors',
        iClass: ['far', 'fa-hand-rock']
    }, {
        name: 'paper',
        winsAgainst: 'rock',
        iClass: ["far", "fa-paper-plane"]
    }, {
        name: 'scissors',
        winsAgainst: 'paper',
        iClass: ["far", "fa-hand-scissors"]
    }

]

selections.forEach(el => el.addEventListener('click', event => {

    el.classList.add("move-pressed"); // Add class of move-pressed to el when it is clicked. Scales the el.

    const playerMove = el.getAttribute('move-id');
    // Set player and computer equal to appropriate objects in SELECTIONS (value of name of object matches playerMove)
    const player = SELECTIONS.find(el => el.name === playerMove);
    const computer = SELECTIONS[Math.floor(Math.random() * 3)];
    // Reset class of computerSelectionI
    computerSelectionI.classList = '';
    // Update computerSelectionI class with appropriate classes - makes icon show up
    computer.iClass.forEach(el => computerSelectionI.classList.add(el));

    updateScore(player, computer)
}));

// Call removeTransition anytime an el from selections has ended a transition
selections.forEach(el => el.addEventListener('transitionend', removeTransition));

//----
// Updates span in HTML which holds scores
function updateScore(player, computer) {
    // Updates score and displays description message of round
    if (player.name === computer.name) {
        roundDescriptionP.innerHTML = `DRAW. ${player.name} vs ${computer.name}.`;
        return;
    }
    if (player.winsAgainst === computer.name) {
        playerScoreSpan.innerHTML = parseInt(playerScoreSpan.innerHTML, 10) + 1;
        roundDescriptionP.innerHTML = `You WIN, ${player.name} beats ${computer.name}. Keep it up!`;

    }
    else if (computer.winsAgainst === player.name) {
        computerScoreSpan.innerHTML = parseInt(computerScoreSpan.innerHTML, 10) + 1;
        roundDescriptionP.innerHTML = `You LOSE, ${player.name} can't beat ${computer.name}. Better luck next time!`;

    }
}
//----

// Remove move-pressed class from div after it's transition has ended
function removeTransition(event) {
    if (event.propertyName !== 'transform') return;
    this.classList.remove('move-pressed');
}




