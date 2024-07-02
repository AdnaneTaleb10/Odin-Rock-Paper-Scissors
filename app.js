function getRandomChoiceNumber(){
    return randomValue = Math.floor(Math.random() * 3);
}

function capitalizeFirstLetter(choice) {
    return choice && choice.charAt(0).toUpperCase() + choice.slice(1);
}

function getComputerChoice() {
    let randomNumber = getRandomChoiceNumber();
    switch(randomNumber) {
        case 0: return "rock";
        case 1: return "paper";
        case 2: return "scissors";
    }
}

function playGame() {
    let gameState = {
        computerScore: 0,
        humanScore: 0,
        drawVal: 0,
        roundNumber: 1,
        gameplayEnabled: true,
        humanChoice: "",
        computerChoice: "",
    };

    const WIN_SCORE = 5;
    const CHOICES = ["rock", "paper", "scissors"];

    const humanChoices = document.querySelectorAll(".human-choices .choice");
    const computerChoiceImage = document.getElementById("computer-choice-image");
    const computerChoicePara = document.getElementById("computer-choice-text");
    const won = document.querySelector("span.won");
    const lost = document.querySelector("span.lost");
    const draw = document.querySelector("span.draw");
    const decision = document.querySelector(".decision");
    const playAgain = document.querySelector(".play-again");

/*     humanChoices.forEach((choice) => {
        choice.addEventListener("click" , () => {
            if(!gameState.gameplayEnabled) return;
            gameState.humanChoice = choice.querySelector(".choice-name").textContent.toLowerCase();
            gameState.computerChoice = getComputerChoice()
            updateComputerChoice();
            playRound();
        })
    }) */

    function handleClick(){
        if(!gameState.gameplayEnabled) return;
        gameState.humanChoice = event.currentTarget.querySelector(".choice-name").textContent.toLowerCase();
        gameState.computerChoice = getComputerChoice()
        updateComputerChoice();
        playRound();
    }

    humanChoices.forEach((choice) => {
        choice.addEventListener("click" , handleClick);
        choice.style.cursor = "pointer";

    })

    playAgain.addEventListener("click", () => {
        resetGame();
        playGame(); 
    });

    function updateComputerChoice() {
        computerChoiceImage.src = `images/${gameState.computerChoice}.png`; 
        computerChoicePara.textContent = capitalizeFirstLetter(gameState.computerChoice);
    }

    function playRound(){
        let roundLog = "";
        const {humanChoice , computerChoice} = gameState;

        if (
            (computerChoice === "rock" && humanChoice === "scissors") ||
            (computerChoice === "scissors" && humanChoice === "paper") ||
            (computerChoice === "paper" && humanChoice === "rock")
        ) {
            gameState.computerScore++;
            roundLog = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}`;
        } else if (computerChoice !== humanChoice) {
            gameState.humanScore++;
            roundLog = `You win! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}`;
        } else {
            gameState.drawVal++;
            roundLog = "It's a tie!";
        }

        updateScoresAndLog(roundLog);

        if(isGameOver()){
            decision.textContent = gameState.humanScore === WIN_SCORE ? "Congrats on winning the game!" : "You lost! Better luck next time";
            endGame();
        }
    }

    function updateScoresAndLog(roundLog){
        won.textContent = gameState.humanScore;
        lost.textContent = gameState.computerScore;
        draw.textContent = gameState.drawVal;
        decision.textContent = `Round ${gameState.roundNumber++}: ${roundLog}`;
    }

    function isGameOver() {
        return gameState.humanScore === WIN_SCORE || gameState.computerScore === WIN_SCORE;
    }

    function endGame(){
        gameState.gameplayEnabled = false;
        humanChoices.forEach((choice) => {
            choice.removeEventListener("click" , handleClick);
            choice.style.cursor = "not-allowed";
        });
        playAgain.style.display = "inline-block"
    }

    function resetGame(){
        gameState.computerScore = 0;
        gameState.humanScore = 0;
        gameState.drawVal = 0;
        gameState.roundNumber = 1;
        gameState.gameplayEnabled = true;
        won.textContent = "0";
        draw.textContent = "0";
        lost.textContent = "0";
        decision.textContent = "";
        playAgain.style.display = "none";
        computerChoiceImage.src = "";
        computerChoicePara.textContent = "";   
    }
}



playGame();