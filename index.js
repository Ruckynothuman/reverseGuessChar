// Function to detect when an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Menangani semua elemen dengan kelas 'pop-up'
const popUpElements = document.querySelectorAll('.pop-up');

// Listen for scroll events dan periksa jika elemen-elemen masuk ke viewport
window.addEventListener('scroll', () => {
    popUpElements.forEach(popUpElement => {
        if (isInViewport(popUpElement)) {
            // Menambahkan kelas 'visible' saat elemen masuk ke viewport
            popUpElement.classList.add('visible');
            // Menghapus kelas 'hidden' jika ada
            popUpElement.classList.remove('hidden');
        }
    });
});




const characters = [
    { gender: 'Laki-laki', yearOfBirth: 1995, initials: 'A' },
    { gender: 'Perempuan', yearOfBirth: 1998, initials: 'B' },
    { gender: 'Laki-laki', yearOfBirth: 2000, initials: 'C' },
    { gender: 'Perempuan', yearOfBirth: 2002, initials: 'D' },
    { gender: 'Laki-laki', yearOfBirth: 1997, initials: 'E' }
];

let guessesLeft = 5;
let currentCharacterIndex = Math.floor(Math.random() * characters.length);

function checkGuess() {
    const guess = document.getElementById('guess').value.trim().toLowerCase();
    if (!guess) {
        document.getElementById('result').textContent = "Masukkan tebakan terlebih dahulu!";
        return;
    }

    const guessParts = guess.split(' ');
    if (guessParts.length !== 3) {
        document.getElementById('result').textContent = "Format salah! Contoh: Laki-laki 1995 A";
        return;
    }

    const guessedGender = guessParts[0];
    const guessedYear = parseInt(guessParts[1]);
    const guessedInitial = guessParts[2].toUpperCase();

    const character = characters[currentCharacterIndex];
    let clues = [];

    if (guessedGender === character.gender.toLowerCase()) {
        clues.push("✔ Gender benar");
    }
    if (guessedYear === character.yearOfBirth) {
        clues.push("✔ Tahun lahir benar");
    }
    if (guessedInitial === character.initials) {
        clues.push("✔ Inisial benar");
    }

    if (clues.length === 3) {
        document.getElementById('result').innerHTML = '<span class="correct">🎉 Tebakan Benar! Karakter ditemukan.</span>';
        resetGame();
    } else {
        guessesLeft--;
        document.getElementById('result').innerHTML = clues.length > 0 
            ? `<span class="correct">Tebakan Salah! Tetapi kamu mendapatkan petunjuk: ${clues.join(', ')}</span>` 
            : '<span class="wrong">Tebakan Salah! Tidak ada yang benar.</span>';
        
        document.getElementById('remaining-guesses').textContent = guessesLeft;

        if (guessesLeft <= 0) {
            document.getElementById('result').innerHTML = '<span class="wrong">Game Selesai! Karakter berganti.</span>';
            resetGame();
        }
    }

    document.getElementById('guess').value = ''; // Reset input
}

function resetGame() {
    guessesLeft = 5;
    currentCharacterIndex = Math.floor(Math.random() * characters.length);
    document.getElementById('remaining-guesses').textContent = guessesLeft;
}
 