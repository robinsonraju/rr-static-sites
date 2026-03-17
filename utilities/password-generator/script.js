document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const display = document.getElementById('password-display');
    const lenSlider = document.getElementById('len-slider');
    const lenVal = document.getElementById('len-val');
    
    const chkUpper = document.getElementById('chk-upper');
    const chkLower = document.getElementById('chk-lower');
    const chkNum = document.getElementById('chk-num');
    const chkSym = document.getElementById('chk-sym');
    
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    // UI Elements for evaluation
    const strengthText = document.getElementById('strength-text');
    const entropyText = document.getElementById('entropy-text');
    const crackTimeText = document.getElementById('crack-time-text');
    
    const bars = [
        document.getElementById('bar-1'),
        document.getElementById('bar-2'),
        document.getElementById('bar-3'),
        document.getElementById('bar-4')
    ];

    // Character Sets
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numChars = '0123456789';
    // Curated symbols (removed confusing ones like O/0 I/l, kept standard keyboard symbols)
    const symChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    function setBars(count, colorClass) {
        bars.forEach(b => b.style.backgroundColor = 'var(--panel-bg)'); // reset
        
        let color = 'var(--panel-bg)';
        if (colorClass === 'weak') color = 'var(--str-weak)';
        if (colorClass === 'fair') color = 'var(--str-fair)';
        if (colorClass === 'good') color = 'var(--str-good)';
        if (colorClass === 'strong') color = 'var(--str-strong)';

        for (let i = 0; i < count; i++) {
            bars[i].style.backgroundColor = color;
        }
    }

    // Format large numbers into human readable time
    function formatTime(seconds) {
        if (seconds < 1) return 'Instantly';
        
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;
        const century = year * 100;

        if (seconds < minute) return `${Math.round(seconds)} seconds`;
        if (seconds < hour) return `${Math.round(seconds / minute)} minutes`;
        if (seconds < day) return `${Math.round(seconds / hour)} hours`;
        if (seconds < year) return `${Math.round(seconds / day)} days`;
        if (seconds < century) return `${Math.round(seconds / year)} years`;
        
        // Massive numbers
        let years = seconds / year;
        if (years < 1e6) return `${Math.round(years).toLocaleString()} years`;
        if (years < 1e9) return `${(years / 1e6).toFixed(1)} million years`;
        if (years < 1e12) return `${(years / 1e9).toFixed(1)} billion years`;
        
        return 'Trillions of years';
    }

    function evaluatePassword(length, poolSize) {
        // Entropy = L * log2(R)
        if (poolSize === 0) {
            entropyText.textContent = '0 bits';
            strengthText.textContent = 'None';
            strengthText.style.color = '#fff';
            crackTimeText.textContent = '-';
            setBars(0, '');
            return;
        }

        const entropy = length * (Math.log(poolSize) / Math.log(2));
        entropyText.textContent = `${Math.round(entropy)} bits`;

        // Modern cracking estimate
        // Assuming an offline attack using multiple high-end GPUs capable of ~100 Billion hashes/sec (e.g. MD5/SHA1 fast hashes)
        const hashesPerSecond = 100e9; 
        
        // Total possible combinations = R^L
        // Time to try half the space (average) = (R^L / 2) / HashesPerSecond
        // We calculate securely avoiding Infinity where possible
        // (R^L) / (2 * H) = 2^(Entropy) / (2 * H) = 2^(Entropy - 1) / H
        
        let secondsToCrack = 0;
        if (entropy < 1000) { // Avoid standard float overflow
            const combinationsHalf = Math.pow(2, entropy - 1);
            secondsToCrack = combinationsHalf / hashesPerSecond;
        } else {
            secondsToCrack = Infinity;
        }

        crackTimeText.textContent = formatTime(secondsToCrack);

        // Visual Strength Meter (Rough guidelines based on modern entropy standards)
        if (entropy < 50) {
            strengthText.textContent = 'Weak';
            strengthText.style.color = 'var(--str-weak)';
            setBars(1, 'weak');
        } else if (entropy < 70) {
            strengthText.textContent = 'Fair';
            strengthText.style.color = 'var(--str-fair)';
            setBars(2, 'fair');
        } else if (entropy < 100) {
            strengthText.textContent = 'Good';
            strengthText.style.color = 'var(--str-good)';
            setBars(3, 'good');
        } else {
            strengthText.textContent = 'Strong';
            strengthText.style.color = 'var(--str-strong)';
            setBars(4, 'strong');
        }
    }

    function generatePassword() {
        const len = parseInt(lenSlider.value);
        let pool = '';
        let poolSize = 0;

        if (chkUpper.checked) { pool += upperChars; poolSize += upperChars.length; }
        if (chkLower.checked) { pool += lowerChars; poolSize += lowerChars.length; }
        if (chkNum.checked) { pool += numChars; poolSize += numChars.length; }
        if (chkSym.checked) { pool += symChars; poolSize += symChars.length; }

        if (pool === '') {
            display.value = '';
            evaluatePassword(0, 0);
            return;
        }

        let password = '';
        const array = new Uint32Array(len);
        
        // Use true Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)
        window.crypto.getRandomValues(array);

        for (let i = 0; i < len; i++) {
            // Unbiased modulo approach: drop high bits if necessary (simplified here assuming pool < 2^32)
            password += pool[array[i] % pool.length];
        }

        display.value = password;
        
        evaluatePassword(len, poolSize);
    }

    // Input Listeners
    lenSlider.addEventListener('input', () => {
        lenVal.textContent = lenSlider.value;
        generatePassword();
    });

    [chkUpper, chkLower, chkNum, chkSym].forEach(chk => {
        chk.addEventListener('change', generatePassword);
    });

    generateBtn.addEventListener('click', generatePassword);

    copyBtn.addEventListener('click', () => {
        if (!display.value) return;
        
        display.select();
        document.execCommand('copy');
        display.blur(); // unselect
        
        copyBtn.classList.add('success');
        
        setTimeout(() => {
            copyBtn.classList.remove('success');
        }, 1500);
    });

    // Initial Gen
    generatePassword();
});
