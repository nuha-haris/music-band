const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing is a skill that improves with daily practice.",
    "Consistency and focus are the keys to mastering speed typing.",
    "A smooth sea never made a skilled sailor.",
    "Discipline is the bridge between goals and accomplishment."
];

const sentenceDisplay = document.getElementById('sentence');
const typingInput = document.getElementById('typingInput');
const timeLeftDisplay = document.getElementById('timeLeft');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const resetBtn = document.getElementById('resetBtn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const timeSelect = document.getElementById('timeSelect');

let timer = null;
let timeLeft = 30;
let startTime = null;
let typedChars = 0;
let correctChars = 0;
let testStarted = false;

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function resetTest() {
    typingInput.value = "";
    sentenceDisplay.textContent = getRandomSentence();
    clearInterval(timer);
    timeLeft = parseInt(timeSelect.value);
    timeLeftDisplay.textContent = `${timeLeft}s`;
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "0%";
    typedChars = 0;
    correctChars = 0;
    testStarted = false;
    popup.classList.add('hidden');
}

function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showPopup();
            typingInput.disabled = true;
        }
    }, 1000);
}

function showPopup() {
    popup.classList.remove('hidden');
}

function calculateStats() {
    const typedText = typingInput.value;
    typedChars = typedText.length;

    const correctText = sentenceDisplay.textContent.slice(0, typedText.length);
    correctChars = [...typedText].filter((ch, i) => ch === correctText[i]).length;

    const wordsTyped = typedText.trim().split(/\s+/).length;
    const timeElapsed = (parseInt(timeSelect.value) - timeLeft) / 60;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
}

typingInput.addEventListener('input', () => {
    if (!testStarted) {
        testStarted = true;
        typingInput.disabled = false;
        startTimer();
    }
    calculateStats();
});

resetBtn.addEventListener('click', resetTest);
closePopup.addEventListener('click', resetTest);
window.onload = resetTest;
