const words = ["Blockchain", "Cryptocurrency", "SmartContracts", "DeFi", "DLT", "Wallets",
"P2PLending", "HFT", "RoboAdvisors", "RegTech", 
"InsurTech", "OpenBanking", "APIs", "Biometrics", "KYC", "AML", "PCIDSS",
"Tokenization", "Inclusion", "Microlending", "NeoBanking", "Crowdfunding",
"Gateways", "APIEconomy", "DarkWeb", "Analytics", 
"Cybersecurity", "MachineLearning", "NFTs", "APIaaS", "UX", "SaaS", "AI", 
"IoT", "RPA", "OCR", "API", "BigData", "Chatbots", "CloudComputing", 
"DataMining", "Encryption", "Fintech", "FraudDetection", 
"RiskManagement", "Scalability"];

let score = 0;
let selectedWords = selectWords();
let gridArray = [];

function selectWords() {
    const shuffledWords = words.sort(() => 0.5 - Math.random());
    return shuffledWords.slice(0, 14);
}

function createGrid() {
    const gridContainer = document.getElementById('word-grid');
    gridContainer.innerHTML = ''; // Clear previous grid if any
    gridArray = new Array(15 * 15).fill(null).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)));

    selectedWords.forEach((word, index) => {
        let position = index * 15; 
        for (let i = 0; i < word.length; i++) {
            gridArray[position + i] = word[i];
        }
    });

    gridArray.forEach((letter, index) => {
        let cell = document.createElement('div');
        cell.textContent = letter;
        cell.onclick = () => cellClick(index);
        gridContainer.appendChild(cell);
    });
}

function cellClick(index) {
    const cell = document.querySelectorAll('#word-grid div')[index];
    cell.classList.toggle('selected');
    checkSelection();
}

function checkSelection() {
    const selectedCells = document.querySelectorAll('#word-grid .selected');
    const selectedWord = Array.from(selectedCells).map(cell => cell.textContent).join('');

    if (selectedWords.includes(selectedWord)) {
        selectedCells.forEach(cell => {
            cell.classList.add('found');
            cell.classList.remove('selected');
        });
        updateScore();
        markWordAsFound(selectedWord);
    }
}

function markWordAsFound(foundWord) {
    const wordListItems = document.querySelectorAll('#word-list li');
    wordListItems.forEach(item => {
        if (item.textContent === foundWord) {
            item.classList.add('found');
        }
    });
}
function markGridAsFound(selectedCells) {
    selectedCells.forEach(cell => {
        cell.classList.add('found');
    });
}

function updateScore() {
    score++;
    document.getElementById('score').textContent = score; 
}

function displayWords() {
    const listContainer = document.getElementById('word-list').querySelector('ul');
    listContainer.innerHTML = '';
    selectedWords.forEach(word => {
        let listItem = document.createElement('li');
        listItem.textContent = word;
        listContainer.appendChild(listItem);
    });
}

function initGame() {
    createGrid();
    displayWords(selectedWords);
    document.getElementById('score').textContent = "Score: " + score;
}

window.onload = initGame;





