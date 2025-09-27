// Character sets
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const NUMBERS = '0123456789';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Debugging function
function debugLog(message) {
    console.log(`[DEBUG] ${message}`);
}

// DOM Elements - akan diinisialisasi setelah DOM dimuat
let passwordCountInput, maxLengthInput, symbolCountInput, numberCountInput, 
    lowercaseCountInput, uppercaseCountInput, generateBtn, passwordResults;

// Function untuk menginisialisasi DOM Elements
function initDOMElements() {
    debugLog('Menginisialisasi DOM Elements...');
    
    passwordCountInput = document.getElementById('passwordCount');
    maxLengthInput = document.getElementById('maxLength');
    symbolCountInput = document.getElementById('symbolCount');
    numberCountInput = document.getElementById('numberCount');
    lowercaseCountInput = document.getElementById('lowercaseCount');
    uppercaseCountInput = document.getElementById('uppercaseCount');
    generateBtn = document.getElementById('generateBtn');
    passwordResults = document.getElementById('passwordResults');
    
    // Log hasil pencarian elemen
    debugLog(`passwordCountInput: ${passwordCountInput ? 'Ditemukan' : 'Tidak ditemukan'}`);
    debugLog(`maxLengthInput: ${maxLengthInput ? 'Ditemukan' : 'Tidak ditemukan'}`);
    debugLog(`symbolCountInput: ${symbolCountInput ? 'Ditemukan' : 'Tidak ditemukan'}`);
    debugLog(`numberCountInput: ${numberCountInput ? 'Ditemukan' : 'Tidak ditemukan'}`);
    debugLog(`lowercaseCountInput: ${lowercaseCountInput ? 'Ditemukan' : 'Tidak ditemukan'}`);
    debugLog(`uppercaseCountInput: ${uppercaseCountInput ? 'Ditemukan' : 'Tidak ditemukan'}`);
    debugLog(`generateBtn: ${generateBtn ? 'Ditemukan' : 'Tidak ditemukan'}`);
    debugLog(`passwordResults: ${passwordResults ? 'Ditemukan' : 'Tidak ditemukan'}`);
    
    // Cek apakah semua elemen ditemukan
    if (!passwordCountInput || !maxLengthInput || !symbolCountInput || 
        !numberCountInput || !lowercaseCountInput || !uppercaseCountInput || 
        !generateBtn || !passwordResults) {
        console.error('Salah satu elemen DOM tidak ditemukan!');
        return false;
    }
    
    return true;
}

// Function untuk menambah event listeners
function addEventListeners() {
    debugLog('Menambahkan event listeners...');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', generatePasswords);
        debugLog('Event listener untuk generateBtn berhasil ditambahkan');
    } else {
        console.error('generateBtn tidak ditemukan!');
    }
    
    // Add input validation
    const inputs = [symbolCountInput, numberCountInput, lowercaseCountInput, uppercaseCountInput];
    inputs.forEach((input, index) => {
        if (input) {
            input.addEventListener('input', validateInputs);
            debugLog(`Event listener untuk input ${index} berhasil ditambahkan`);
        } else {
            console.error(`Input ${index} tidak ditemukan!`);
        }
    });
}

function validateInputs() {
    debugLog('Validasi input...');
    
    if (!symbolCountInput || !numberCountInput || !lowercaseCountInput || 
        !uppercaseCountInput || !maxLengthInput) {
        console.error('Salah satu input tidak ditemukan saat validasi!');
        return;
    }
    
    const symbolCount = parseInt(symbolCountInput.value) || 0;
    const numberCount = parseInt(numberCountInput.value) || 0;
    const lowercaseCount = parseInt(lowercaseCountInput.value) || 0;
    const uppercaseCount = parseInt(uppercaseCountInput.value) || 0;
    const maxLength = parseInt(maxLengthInput.value) || 12;
    
    debugLog(`symbolCount: ${symbolCount}, numberCount: ${numberCount}, lowercaseCount: ${lowercaseCount}, uppercaseCount: ${uppercaseCount}, maxLength: ${maxLength}`);
    
    const totalChars = symbolCount + numberCount + lowercaseCount + uppercaseCount;
    
    if (totalChars > maxLength) {
        maxLengthInput.value = totalChars;
        debugLog(`Mengupdate maxLength menjadi ${totalChars}`);
    }
    
    // Ensure minimum values
    if (symbolCount < 1) {
        symbolCountInput.value = 1;
        debugLog('Mengupdate symbolCount menjadi 1');
    }
    if (numberCount < 1) {
        numberCountInput.value = 1;
        debugLog('Mengupdate numberCount menjadi 1');
    }
    if (lowercaseCount < 1) {
        lowercaseCountInput.value = 1;
        debugLog('Mengupdate lowercaseCount menjadi 1');
    }
    if (uppercaseCount < 1) {
        uppercaseCountInput.value = 1;
        debugLog('Mengupdate uppercaseCount menjadi 1');
    }
}

function getRandomCharacter(charSet) {
    return charSet[Math.floor(Math.random() * charSet.length)];
}

function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function generateSinglePassword() {
    const symbolCount = parseInt(symbolCountInput.value);
    const numberCount = parseInt(numberCountInput.value);
    const lowercaseCount = parseInt(lowercaseCountInput.value);
    const uppercaseCount = parseInt(uppercaseCountInput.value);
    const maxLength = parseInt(maxLengthInput.value);
    
    let password = '';
    
    // Add required characters
    for (let i = 0; i < symbolCount; i++) {
        password += getRandomCharacter(SYMBOLS);
    }
    
    for (let i = 0; i < numberCount; i++) {
        password += getRandomCharacter(NUMBERS);
    }
    
    for (let i = 0; i < lowercaseCount; i++) {
        password += getRandomCharacter(LOWERCASE);
    }
    
    for (let i = 0; i < uppercaseCount; i++) {
        password += getRandomCharacter(UPPERCASE);
    }
    
    // Fill remaining characters with random mix
    const remainingLength = maxLength - password.length;
    if (remainingLength > 0) {
        const allChars = SYMBOLS + NUMBERS + LOWERCASE + UPPERCASE;
        for (let i = 0; i < remainingLength; i++) {
            password += getRandomCharacter(allChars);
        }
    }
    
    // Shuffle the password to randomize character positions
    return shuffleString(password);
}

function generatePasswords() {
    debugLog('Menggenerate passwords...');
    
    if (!passwordCountInput) {
        console.error('passwordCountInput tidak ditemukan!');
        return;
    }
    
    const count = parseInt(passwordCountInput.value);
    const passwords = [];
    
    for (let i = 0; i < count; i++) {
        passwords.push(generateSinglePassword());
    }
    
    displayPasswords(passwords);
}

function displayPasswords(passwords) {
    if (!passwordResults) {
        console.error('passwordResults tidak ditemukan!');
        return;
    }
    
    passwordResults.innerHTML = '';
    
    passwords.forEach((password, index) => {
        const passwordItem = document.createElement('div');
        passwordItem.className = 'password-item';
        
        const passwordText = document.createElement('span');
        passwordText.className = 'password-text';
        passwordText.textContent = password;
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Salin';
        
        copyBtn.addEventListener('click', () => copyToClipboard(password, copyBtn));
        
        passwordItem.appendChild(passwordText);
        passwordItem.appendChild(copyBtn);
        passwordResults.appendChild(passwordItem);
    });
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        // Update button appearance
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Tersalin';
        button.classList.add('copied');
        
        // Show toast notification
        showToast('Password berhasil disalin!');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin password:', err);
        showToast('Gagal menyalin password!', 'error');
    });
}

function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    if (type === 'error') {
        toast.style.background = 'rgba(244, 67, 54, 0.9)';
        toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    } else {
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    }
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    debugLog('DOM telah dimuat sepenuhnya');
    
    // Inisialisasi DOM Elements
    if (initDOMElements()) {
        // Tambah event listeners
        addEventListeners();
        
        // Validasi input awal
        validateInputs();
        
        debugLog('Inisialisasi selesai');
    } else {
        console.error('Inisialisasi gagal!');
    }
});

// Fallback: coba inisialisasi lagi jika DOMContentLoaded tidak bekerja
window.addEventListener('load', () => {
    if (!passwordCountInput) {
        debugLog('Mencoba inisialisasi ulang...');
        if (initDOMElements()) {
            addEventListeners();
            validateInputs();
        }
    }
});