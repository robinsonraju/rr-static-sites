document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const btnCompare = document.getElementById('compare-btn');
    const btnClear = document.getElementById('clear-btn');
    const btnEdit = document.getElementById('edit-btn');
    
    const viewSplit = document.getElementById('view-split');
    const viewUnified = document.getElementById('view-unified');
    
    const inputSection = document.getElementById('input-section');
    const outputSection = document.getElementById('output-section');
    const txtOriginal = document.getElementById('text-original');
    const txtModified = document.getElementById('text-modified');
    const diffOutput = document.getElementById('diff-output');

    let currentMode = 'split'; // 'split' | 'unified'

    // --- Events ---
    
    btnClear.addEventListener('click', () => {
        txtOriginal.value = '';
        txtModified.value = '';
    });

    btnCompare.addEventListener('click', () => {
        renderDiff();
        inputSection.style.display = 'none';
        outputSection.style.display = 'flex';
    });

    btnEdit.addEventListener('click', () => {
        outputSection.style.display = 'none';
        inputSection.style.display = 'grid'; // Note: it's a grid in CSS
    });

    viewSplit.addEventListener('click', () => setMode('split'));
    viewUnified.addEventListener('click', () => setMode('unified'));

    function setMode(mode) {
        currentMode = mode;
        if (mode === 'split') {
            viewSplit.classList.add('active');
            viewUnified.classList.remove('active');
        } else {
            viewSplit.classList.remove('active');
            viewUnified.classList.add('active');
        }
        
        // Only re-render if we're currently looking at the output
        if (outputSection.style.display === 'flex') {
            renderDiff();
        }
    }

    // --- Diff Rendering Logic ---

    // Sanitize HTML
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function renderDiff() {
        if (typeof Diff === 'undefined') {
            diffOutput.innerHTML = '<div style="padding:1rem;color:var(--error-color)">Error: Diff library failed to load. Please check your internet connection.</div>';
            return;
        }

        const original = txtOriginal.value;
        const modified = txtModified.value;

        // Perform line diff
        const diffResults = Diff.diffLines(original, modified);

        if (currentMode === 'unified') {
            renderUnified(diffResults);
        } else {
            renderSplit(diffResults);
        }
    }

    // --- Unified View ---
    function renderUnified(diffResults) {
        let html = '<div class="diff-table">';
        
        let oldLine = 1;
        let newLine = 1;

        diffResults.forEach(part => {
            // A part can span multiple lines
            const lines = part.value.replace(/\\n$/, '').split('\\n');
            // Remove the last empty string if it ended with a newline
            if(lines[lines.length-1] === '') lines.pop();
            
            lines.forEach(lineText => {
                const escapedText = escapeHtml(lineText) || ' '; // force space for empty lines
                
                if (part.added) {
                    html += `
                    <div class="diff-row added">
                        <div class="diff-num"></div>
                        <div class="diff-num">${newLine++}</div>
                        <div class="diff-text">+ ${escapedText}</div>
                    </div>`;
                } else if (part.removed) {
                    html += `
                    <div class="diff-row removed">
                        <div class="diff-num">${oldLine++}</div>
                        <div class="diff-num"></div>
                        <div class="diff-text">- ${escapedText}</div>
                    </div>`;
                } else {
                    html += `
                    <div class="diff-row">
                        <div class="diff-num">${oldLine++}</div>
                        <div class="diff-num">${newLine++}</div>
                        <div class="diff-text">  ${escapedText}</div>
                    </div>`;
                }
            });
        });

        html += '</div>';
        diffOutput.innerHTML = html;
    }

    // --- Split View ---
    function renderSplit(diffResults) {
        
        let leftLines = [];
        let rightLines = [];
        let leftLineNum = 1;
        let rightLineNum = 1;

        // Construct aligned arrays for left and right
        diffResults.forEach(part => {
             const lines = part.value.split('\\n');
             if(lines[lines.length-1] === '') lines.pop(); // trailing newline fix

             if (part.added) {
                 // Addition only goes on the right
                 lines.forEach(line => {
                     // Add dummy line to left to keep alignment if we are purely adding
                     // (Slightly simplified alignment matching vs full git diff)
                     leftLines.push({ type: 'empty', num: '', text: '' });
                     rightLines.push({ type: 'added', num: rightLineNum++, text: line });
                 });
             } else if (part.removed) {
                 // Removal only goes on the left
                 lines.forEach(line => {
                     leftLines.push({ type: 'removed', num: leftLineNum++, text: line });
                     rightLines.push({ type: 'empty', num: '', text: '' });
                 });
             } else {
                 // Unchanged goes on both
                 lines.forEach(line => {
                     leftLines.push({ type: 'unchanged', num: leftLineNum++, text: line });
                     rightLines.push({ type: 'unchanged', num: rightLineNum++, text: line });
                 });
             }
        });

        // Some diffs might do removed then added immediately (a modification).
        // A true split view tries to align them on the same vertical Y axis.
        // We do a brief pass to collapse empty+added and removed+empty sequences.
        let optimizedLeft = [];
        let optimizedRight = [];
        
        for(let i=0; i < leftLines.length; i++) {
            // Look for a Removed on left, followed immediately by Added on right but empty on left
            if (i < leftLines.length - 1 &&
                leftLines[i].type === 'removed' && rightLines[i].type === 'empty' &&
                leftLines[i+1].type === 'empty' && rightLines[i+1].type === 'added') {
                
                // Align them onto the same row!
                optimizedLeft.push(leftLines[i]);
                optimizedRight.push(rightLines[i+1]);
                i++; // skip the next pair
            } else {
                optimizedLeft.push(leftLines[i]);
                optimizedRight.push(rightLines[i]);
            }
        }

        // Build HTML
        let leftHtml = '<div class="split-side left">';
        let rightHtml = '<div class="split-side right">';

        for(let i=0; i < optimizedLeft.length; i++) {
            const l = optimizedLeft[i];
            const r = optimizedRight[i];
            
            // Left Side
            const leftClasses = l.type === 'empty' ? 'split-line empty' 
                              : l.type === 'removed' ? 'split-line removed' 
                              : 'split-line';
            const lPrefix = l.type === 'removed' ? '- ' : '  ';
            leftHtml += `
            <div class="${leftClasses}">
                <div class="diff-num">${l.num}</div>
                <div class="diff-text">${l.type === 'empty' ? '' : escapeHtml(lPrefix + l.text) || ' '}</div>
            </div>`;

            // Right Side
            const rightClasses = r.type === 'empty' ? 'split-line empty' 
                               : r.type === 'added' ? 'split-line added' 
                               : 'split-line';
            const rPrefix = r.type === 'added' ? '+ ' : '  ';
            rightHtml += `
            <div class="${rightClasses}">
                <div class="diff-num">${r.num}</div>
                <div class="diff-text">${r.type === 'empty' ? '' : escapeHtml(rPrefix + r.text) || ' '}</div>
            </div>`;
        }

        leftHtml += '</div>';
        rightHtml += '</div>';

        diffOutput.innerHTML = `<div class="split-table">${leftHtml}${rightHtml}</div>`;
    }

});
