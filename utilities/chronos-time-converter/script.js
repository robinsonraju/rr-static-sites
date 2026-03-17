document.addEventListener('DOMContentLoaded', () => {
    
    // --- Realtime Epoch Clock ---
    const epochSecsEl = document.getElementById('current-epoch-secs');
    const epochMsEl = document.getElementById('current-epoch-ms');
    const isoEl = document.getElementById('current-iso');

    function updateClocks() {
        const now = new Date();
        const ms = now.getTime();
        const s = Math.floor(ms / 1000);
        
        epochSecsEl.textContent = s;
        epochMsEl.textContent = ms;
        isoEl.textContent = now.toISOString();
        
        requestAnimationFrame(updateClocks);
    }
    updateClocks();

    // --- Epoch to Human ---
    const epochInput = document.getElementById('epoch-input');
    const epochToHumanBtn = document.getElementById('epoch-to-human-btn');
    const resGmt = document.getElementById('result-gmt');
    const resLocal = document.getElementById('result-local');
    const resRelative = document.getElementById('result-relative');

    function formatRelative(date) {
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
        const daysDifference = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        
        if (Math.abs(daysDifference) > 365) {
            return rtf.format(Math.round(daysDifference / 365), 'year');
        } else if (Math.abs(daysDifference) > 30) {
            return rtf.format(Math.round(daysDifference / 30), 'month');
        }
        return rtf.format(daysDifference, 'day');
    }

    function processEpochToHuman() {
        const val = epochInput.value.trim();
        if(!val) return;
        
        let num = Number(val);
        // Heuristic: if it's < 10,000,000,000, it's probably seconds.
        if (num < 10000000000) {
            num = num * 1000;
        }

        const date = new Date(num);
        if (isNaN(date.getTime())) {
            resGmt.textContent = 'Invalid Date';
            resLocal.textContent = 'Invalid Date';
            resRelative.textContent = '-';
            return;
        }

        resGmt.textContent = date.toUTCString();
        resLocal.textContent = date.toString();
        resRelative.textContent = formatRelative(date);
    }

    epochToHumanBtn.addEventListener('click', processEpochToHuman);
    epochInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') processEpochToHuman(); });

    // --- Human to Epoch ---
    const humanInput = document.getElementById('human-input');
    const humanToEpochBtn = document.getElementById('human-to-epoch-btn');
    const resEpochS = document.getElementById('result-epoch-s');
    const resEpochMs = document.getElementById('result-epoch-ms');

    function processHumanToEpoch() {
        const val = humanInput.value.trim();
        if(!val) return;

        const date = new Date(val);
        if (isNaN(date.getTime())) {
            resEpochMs.textContent = 'Invalid Formatted Date';
            resEpochS.textContent = 'Invalid Formatted Date';
            return;
        }

        resEpochMs.textContent = date.getTime();
        resEpochS.textContent = Math.floor(date.getTime() / 1000);
    }

    humanToEpochBtn.addEventListener('click', processHumanToEpoch);
    humanInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') processHumanToEpoch(); });

    // --- Cron Converter ---
    const cronInput = document.getElementById('cron-input');
    const cronHuman = document.getElementById('cron-human');
    const cronError = document.getElementById('cron-error');

    function processCron() {
        const val = cronInput.value.trim();
        cronError.textContent = '';
        cronHuman.textContent = '';

        if (!val) {
            cronHuman.textContent = 'Enter a cron expression';
            return;
        }

        if (typeof window.cronstrue !== 'undefined') {
            try {
                const humanTarget = window.cronstrue.toString(val, { throwExceptionOnParseError: true });
                cronHuman.textContent = humanTarget;
            } catch(e) {
                cronError.textContent = e;
            }
        } else {
            cronError.textContent = 'Cronstrue library failed to load.';
        }
    }

    cronInput.addEventListener('input', processCron);
    // initial process
    processCron();
});
