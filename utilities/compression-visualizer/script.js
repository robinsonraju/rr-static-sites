document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const algBtns = document.querySelectorAll('.alg-btn');
    const inputText = document.getElementById('input-text');
    const clearBtn = document.getElementById('clear-btn');
    const loadSampleBtn = document.getElementById('load-sample-btn');
    
    // TTTD Controls
    const tttdControls = document.getElementById('tttd-controls');
    const minInput = document.getElementById('tttd-min');
    const maxInput = document.getElementById('tttd-max');
    const mdivInput = document.getElementById('tttd-mdiv');
    const bdivInput = document.getElementById('tttd-bdiv');
    const valMin = document.getElementById('val-min');
    const valMax = document.getElementById('val-max');
    const valMdiv = document.getElementById('val-mdiv');
    const valBdiv = document.getElementById('val-bdiv');

    // Metrics
    const statOriginal = document.getElementById('stat-original');
    const statCompressed = document.getElementById('stat-compressed');
    const statRatio = document.getElementById('stat-ratio');

    // Output
    const textOutput = document.getElementById('text-output');
    const visualOutput = document.getElementById('visual-output');

    let currentAlgorithm = 'rle';

    // --- Utilities ---
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Helper to calc size in bytes (rudimentary, assuming 1 char = 1 byte for string length)
    // For algorithms that output arrays or bits, we calculate bytes more precisely.
    function formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function updateMetrics(originalBytes, compressedBytes) {
        statOriginal.textContent = formatBytes(originalBytes);
        statCompressed.textContent = formatBytes(compressedBytes);
        
        if (originalBytes === 0) {
            statRatio.textContent = '-';
            return;
        }
        
        const ratio = (compressedBytes / originalBytes) * 100;
        const savings = 100 - ratio;
        
        if (savings > 0) {
            statRatio.textContent = `${savings.toFixed(1)}% Smaller`;
            statRatio.style.color = 'var(--success-color)';
        } else if (savings < 0) {
            statRatio.textContent = `${Math.abs(savings).toFixed(1)}% Larger`;
            statRatio.style.color = 'var(--error-color)';
        } else {
            statRatio.textContent = '0%';
            statRatio.style.color = 'var(--text-primary)';
        }
    }

    // --- Algorithm 1: Run-Length Encoding (RLE) ---
    function processRLE(input) {
        if (!input) return { encoded: '', origSize: 0, compSize: 0, visual: '' };
        
        let encoded = '';
        let visualHtml = '';
        let count = 1;
        
        for (let i = 0; i < input.length; i++) {
            if (input[i] === input[i + 1]) {
                count++;
            } else {
                encoded += count + input[i];
                visualHtml += `<span class="visual-chip">${count}<strong>${escapeHtml(input[i])}</strong></span>`;
                count = 1;
            }
        }
        
        return {
            encoded: encoded,
            origSize: input.length,
            compSize: encoded.length,
            visual: visualHtml
        };
    }

    // --- Algorithm 2: Lempel-Ziv-Welch (LZW) ---
    function processLZW(input) {
        if (!input) return { encoded: '', origSize: 0, compSize: 0, visual: '' };

        // Initialize Dictionary
        let dict = {};
        for (let i = 0; i < 256; i++) {
            dict[String.fromCharCode(i)] = i;
        }
        
        let p = "";
        let result = [];
        let dictSize = 256;
        let visualHtml = `<table><thead><tr><th>Code</th><th>Sequence (p + c)</th><th>Output Code</th><th>New Dict Entry</th></tr></thead><tbody>`;

        for (let i = 0; i < input.length; i++) {
            let c = input[i];
            let pc = p + c;
            
            if (dict.hasOwnProperty(pc)) {
                p = pc;
            } else {
                result.push(dict[p]);
                // Add to dictionary
                dict[pc] = dictSize++;
                
                visualHtml += `<tr>
                    <td><code>${escapeHtml(p)}</code></td>
                    <td><code>${escapeHtml(pc)}</code></td>
                    <td class="dict-code">${dict[p]}</td>
                    <td><code>${dictSize - 1}: ${escapeHtml(pc)}</code></td>
                </tr>`;
                
                p = c;
            }
        }
        
        if (p !== "") {
            result.push(dict[p]);
            visualHtml += `<tr>
                <td><code>${escapeHtml(p)}</code></td>
                <td>EOF</td>
                <td class="dict-code">${dict[p]}</td>
                <td>-</td>
            </tr>`;
        }
        
        visualHtml += `</tbody></table>`;
        
        // Output array size * 2 bytes (assuming 16-bit codes for LZW)
        const compBytes = result.length * 2; 

        return {
            encoded: result.join(', '),
            origSize: input.length,
            compSize: compBytes,
            visual: visualHtml
        };
    }

    // --- Algorithm 3: Huffman Coding ---
    function processHuffman(input) {
        if (!input) return { encoded: '', origSize: 0, compSize: 0, visual: '' };

        // 1. Build Frequency Map
        const freqMap = {};
        for (let char of input) {
            freqMap[char] = (freqMap[char] || 0) + 1;
        }

        // 2. Build Priority Queue / Forest
        let forest = Object.keys(freqMap).map(char => ({ char: char, freq: freqMap[char], left: null, right: null }));
        if (forest.length === 0) return { encoded: '', origSize: 0, compSize: 0, visual: '' };

        // Handle single character case
        if (forest.length === 1) {
            forest.push({ char: null, freq: 0, left: null, right: null }); 
        }

        // 3. Build Tree
        while (forest.length > 1) {
            forest.sort((a, b) => a.freq - b.freq);
            const left = forest.shift();
            const right = forest.shift();
            
            const newNode = {
                char: null,
                freq: left.freq + right.freq,
                left: left,
                right: right
            };
            forest.push(newNode);
        }

        const root = forest[0];

        // 4. Generate Codes
        const codes = {};
        function generateCodes(node, currentCode) {
            if (!node) return;
            if (node.char !== null) {
                codes[node.char] = currentCode || '0';
            }
            generateCodes(node.left, currentCode + '0');
            generateCodes(node.right, currentCode + '1');
        }
        generateCodes(root, '');

        // 5. Encode Data
        let encodedBits = '';
        for (let char of input) {
            encodedBits += codes[char];
        }

        // 6. Visualization
        let visualHtml = '<div class="tree-container"><h3>Prefix Code Dictionary</h3>';
        
        // Sort keys by code length
        const sortedKeys = Object.keys(codes).sort((a, b) => codes[a].length - codes[b].length);
        
        sortedKeys.forEach(char => {
            const displayChar = char === ' ' ? 'SPACE' : (char === '\n' ? 'NEWLINE' : char);
            visualHtml += `
            <div class="tree-row">
                <span><code>'${escapeHtml(displayChar)}'</code> (Freq: ${freqMap[char]})</span>
                <span class="tree-code">${codes[char]}</span>
            </div>`;
        });
        visualHtml += '</div>';

        // Size calc: 1 byte per char original. Encoded is bits / 8 rounded up.
        // We *should* add the tree size overhead to the compSize, but for this viz we'll just show the payload size.
        const compBytes = Math.ceil(encodedBits.length / 8);

        return {
            encoded: encodedBits.match(/.{1,8}/g)?.join(' ') || '', // space out bytes
            origSize: input.length,
            compSize: compBytes,
            visual: visualHtml
        };
    }

    // --- Algorithm 4: TTTD (Content-Defined Chunking) ---
    // Two Thresholds, Two Divisors.
    // We'll use a very simple rolling XOR/Additive hash representing the sliding window content.
    function processTTTD(input) {
        if (!input) return { encoded: '', origSize: 0, compSize: 0, visual: '' };

        const min = parseInt(minInput.value);
        const max = parseInt(maxInput.value);
        const mdiv = parseInt(mdivInput.value);
        const bdiv = parseInt(bdivInput.value);

        // Simple rolling hash params
        const windowSize = 8;
        let chunks = [];
        let currentChunkStart = 0;
        
        let backupBoundary = -1;

        for (let i = 0; i < input.length; i++) {
            const currentChunkLength = i - currentChunkStart;
            
            // Reached absolute maximum limit
            if (currentChunkLength >= max) {
                if (backupBoundary !== -1) {
                    // We found a backup boundary, chunk there
                    chunks.push(input.substring(currentChunkStart, backupBoundary));
                    i = backupBoundary; // Rewind iterator
                    currentChunkStart = backupBoundary;
                    backupBoundary = -1;
                } else {
                    // No backup found, severe at max
                    chunks.push(input.substring(currentChunkStart, i));
                    currentChunkStart = i;
                }
                continue;
            }

            // Calculate rolling hash of current window
            if (currentChunkLength >= min && i >= windowSize) {
                let hash = 0;
                for (let w = 0; w < windowSize; w++) {
                    // Simple hash function for demonstration
                    hash = (hash * 31 + input.charCodeAt(i - windowSize + 1 + w)) % 0xFFFFFFFF;
                }

                // Primary Divisor Check
                if (hash % mdiv === mdiv - 1) { // Typical CDC standard
                    chunks.push(input.substring(currentChunkStart, i));
                    currentChunkStart = i;
                    backupBoundary = -1;
                    continue;
                }

                // Backup Divisor Check
                if (hash % bdiv === bdiv - 1) {
                    backupBoundary = i;
                }
            }
        }

        // Add remaining as final chunk
        if (currentChunkStart < input.length) {
            chunks.push(input.substring(currentChunkStart));
        }

        // Visualization
        let visualHtml = '';
        let chunkClassIndex = 0;
        chunks.forEach(chunk => {
            const cClass = `chunk-${chunkClassIndex % 5}`;
            visualHtml += `<span class="visual-chip chunk ${cClass}">${escapeHtml(chunk)}<br><small style="opacity:0.6">${chunk.length}B</small></span>`;
            chunkClassIndex++;
        });

        return {
            encoded: `Split into ${chunks.length} chunks.`,
            origSize: input.length,
            compSize: input.length, // TTTD doesn't compress, it chunks for deduplication
            visual: visualHtml
        };
    }


    // --- Main Dispatcher ---
    function runAlgorithm() {
        const text = inputText.value;
        const oArea = textOutput;
        const vArea = visualOutput;

        if (!text) {
            oArea.textContent = '';
            vArea.innerHTML = '<p class="empty-state">Enter text to see the algorithm visualization.</p>';
            updateMetrics(0, 0);
            return;
        }

        let result;

        switch (currentAlgorithm) {
            case 'rle':
                result = processRLE(text);
                break;
            case 'lzw':
                result = processLZW(text);
                break;
            case 'huffman':
                result = processHuffman(text);
                break;
            case 'tttd':
                result = processTTTD(text);
                break;
        }

        oArea.textContent = result.encoded;
        vArea.innerHTML = result.visual;
        
        // TTTD is for chunking/dedup, not direct byte compression
        if(currentAlgorithm === 'tttd') {
            statOriginal.textContent = formatBytes(result.origSize);
            statCompressed.textContent = `${result.origSize} B (Chunked)`;
            statRatio.textContent = 'Deduplication Prep';
            statRatio.style.color = 'var(--text-primary)';
        } else {
            updateMetrics(result.origSize, result.compSize);
        }
    }

    // --- Events ---
    // Text Input
    inputText.addEventListener('input', runAlgorithm);

    // Algorithm Selection
    algBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            algBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentAlgorithm = btn.dataset.alg;
            
            // Handle specific UI components (like sliders for TTTD)
            if (currentAlgorithm === 'tttd') {
                tttdControls.style.display = 'block';
            } else {
                tttdControls.style.display = 'none';
            }
            
            runAlgorithm();
        });
    });

    // TTTD Control Events
    function updateTttdLabels() {
        valMin.textContent = minInput.value;
        valMax.textContent = maxInput.value;
        valMdiv.textContent = mdivInput.value;
        valBdiv.textContent = bdivInput.value;
        
        // Ensure Min < Max
        if (parseInt(minInput.value) >= parseInt(maxInput.value)) {
            maxInput.value = parseInt(minInput.value) + 1;
            valMax.textContent = maxInput.value;
        }
    }
    
    [minInput, maxInput, mdivInput, bdivInput].forEach(inp => {
        inp.addEventListener('input', () => {
            updateTttdLabels();
            if(currentAlgorithm === 'tttd') runAlgorithm();
        });
    });

    // Actions
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        runAlgorithm();
    });

    loadSampleBtn.addEventListener('click', () => {
        let sample = '';
        switch(currentAlgorithm) {
            case 'rle':
                sample = 'AAAABBBCCDAA'; // Good for RLE
                break;
            case 'lzw':
                sample = 'TOBEORNOTTOBEORTOBEORNOT'; // Good for LZW
                break;
            case 'huffman':
                sample = 'this is an example for huffman encoding'; // Standard
                break;
            case 'tttd': // Needs longer text to chunk
                sample = `Data deduplication reduces storage costs by eliminating redundant data. Typical chunking algorithms like CDC divide files into variable-length chunks based on data content, rather than fixed sizes. TTTD uses two divisors and two thresholds to ensure chunk sizes remain reasonable, preventing edge cases where chunks become too large or too small. This makes deduplication highly efficient for backups and archival systems.`;
                break;
        }
        inputText.value = sample;
        runAlgorithm();
    });

});
