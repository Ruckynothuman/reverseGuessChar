
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

const popUpElements = document.querySelectorAll('.pop-up');

window.addEventListener('scroll', () => {
    popUpElements.forEach(popUpElement => {
        if (isInViewport(popUpElement)) {
            popUpElement.classList.add('visible');
            popUpElement.classList.remove('hidden');
        }
    });
});

const characters = [
    { name: 'Vertin', Damage: 'Uknown', Afflatus: 'UKnown', initials: 'V' },
    { name: 'Druvis', Damage: 'Mental', Afflatus: 'Plant', initials: 'D' },
    { name: 'Sonetto', Damage: 'Reality', Afflatus: 'Mineral', initials: 'S' },
    { name: 'Schneider', Damage: 'Mental', Afflatus: 'Beast', initials: 'S' },
    { name: 'Regulus', Damage: 'Mental', Afflatus: 'Star', initials: 'R' }
];

let guessesLeft = 5;
let currentCharacter = characters[Math.floor(Math.random() * characters.length)];

function checkGuess() {
    let guessInput = document.getElementById("guess");
    let resultElement = document.getElementById("result");
    let remainingGuessesElement = document.getElementById("remaining-guesses");
    
    let guess = guessInput.value.trim();
    if (!guess) {
        resultElement.textContent = 'Masukkan tebakan terlebih dahulu!';
        return;
    }
    
    let clues = [];
    
    if (guess.toLowerCase() === currentCharacter.name.toLowerCase()) {
        resultElement.style.color = "green";
        resultElement.innerHTML = `Benar! Nama karakter adalah ${currentCharacter.name}. Game direset.`;
        resetGame();
        return;
    } else {
        let clue = `Petunjuk: `;
        clue += guess.toLowerCase()[0] === currentCharacter.name.toLowerCase()[0] ? 'Inisial benar, ' : 'Inisial salah, ';
        clue += currentCharacter.Damage === characters.find(c => c.name.toLowerCase() === guess.toLowerCase())?.Damage ? 'Damage benar, ' : 'Damage salah, ';
        clue += currentCharacter.Afflatus === characters.find(c => c.name.toLowerCase() === guess.toLowerCase())?.Afflatus ? 'Afflatus benar' : 'Afflatus salah';
        clues.push(clue);
    }
    
    guessesLeft--;
    remainingGuessesElement.textContent = guessesLeft;
    resultElement.innerHTML = clues.join('<br>');
    
    if (guessesLeft === 0) {
        resultElement.style.color = "red";
        resultElement.innerHTML += '<br><strong>Game Over! Karakter yang benar adalah ' + currentCharacter.name + '. Game direset.</strong>';
        resetGame();
    }
    
    guessInput.value = "";
}

function resetGame() {
    console.log("Mulai...");
    
    setTimeout(() => {
        console.log("Game direset setelah 2 detik...");
        
        guessesLeft = 5;
        currentCharacter = characters[Math.floor(Math.random() * characters.length)];
        document.getElementById("remaining-guesses").textContent = guessesLeft;
        document.getElementById("result").textContent = "";
        document.getElementById("guess").value = "";
    }, 5000); // 2 detik
}
