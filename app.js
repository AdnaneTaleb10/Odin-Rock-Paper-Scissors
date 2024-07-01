function getComputerChoice(){
    const randomValue = Math.floor(Math.random() * 3);
    const computerChoiceImage = document.getElementById('computer-choice-image');
    const computerChoiceText = document.getElementById('computer-choice-text');

    let computerChoice;

    if(randomValue === 0){
        computerChoice = "Rock";
        computerChoiceText.textContent = computerChoice;
        computerChoiceImage.src = "images/rock.png";
        return computerChoice;
    } else if(randomValue === 1){
        computerChoice = "Paper";
        computerChoiceText.textContent = computerChoice;
        computerChoiceImage.src = "images/paper.png";
        return computerChoice;
    } else {
        computerChoice = "Scissors";
        computerChoiceText.textContent = computerChoice;
        computerChoiceImage.src = "images/scissors.png";
        return computerChoice;
    }
}


