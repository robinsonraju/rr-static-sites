document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const regexInput = document.getElementById('regex-input');
    const regexFlags = document.getElementById('regex-flags');
    const regexError = document.getElementById('regex-error');
    const regexFieldWrapper = document.querySelector('.regex-field-wrapper');
    
    const testStringInput = document.getElementById('test-string-input');
    const testStringHighlight = document.getElementById('test-string-highlight');
    
    const matchCountBadge = document.getElementById('match-count');
    const resultsContainer = document.getElementById('results-container');

    // Sync scrolling between textarea and highlight div
    testStringInput.addEventListener('scroll', () => {
        testStringHighlight.scrollTop = testStringInput.scrollTop;
        testStringHighlight.scrollLeft = testStringInput.scrollLeft;
    });

    // Escape HTML to prevent injection in the highlight div
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Process the regex and update the UI
    function processRegex() {
        const pattern = regexInput.value;
        const flags = regexFlags.value;
        const text = testStringInput.value;

        // Reset state
        regexFieldWrapper.classList.remove('has-error');
        regexError.textContent = '';
        
        if (!pattern) {
            testStringHighlight.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
            matchCountBadge.textContent = '0 Matches';
            matchCountBadge.classList.remove('has-matches');
            resultsContainer.innerHTML = '<p class="empty-state">Enter a regex pattern to see results.</p>';
            return;
        }

        let regex;
        try {
            // Attempt to create the regex
            // Always ensure 'd' flag is included for match indices if supported (helpful for groups, but we'll keep it simple for now)
            regex = new RegExp(pattern, flags);
        } catch (e) {
            regexFieldWrapper.classList.add('has-error');
            regexError.textContent = e.message;
            testStringHighlight.innerHTML = escapeHtml(text).replace(/\n/g, '<br>');
            matchCountBadge.textContent = 'Invalid Regex';
            matchCountBadge.classList.remove('has-matches');
            resultsContainer.innerHTML = '<p class="empty-state">Invalid regular expression.</p>';
            return;
        }

        // We need to handle matching carefully to prevent infinite loops with empty matches
        let match;
        let highlightedHtml = '';
        let lastIndex = 0;
        let matchCount = 0;
        let resultsHtml = '';

        // If not global, max 1 match
        const isGlobal = flags.includes('g');
        const matches = [];

        // Reset lastIndex for a fresh start
        regex.lastIndex = 0;

        while ((match = regex.exec(text)) !== null) {
            matchCount++;
            
            // Prevent infinite loops on zero-length matches (like /.*/ or /^/)
            if (match.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // Store the match data
            matches.push(match);

            // Add text before the match
            const beforeMatch = text.substring(lastIndex, match.index);
            highlightedHtml += escapeHtml(beforeMatch);

            // Add the highlighted match
            const matchText = match[0];
            const matchClass = matchCount % 2 === 0 ? 'match-even' : 'match-odd';
            
            // If it's an empty match (e.g. \b), show a tiny visual indicator instead of nothing
            if (matchText === '') {
                highlightedHtml += `<span class="match ${matchClass}" style="border-left: 2px solid var(--accent-color);"></span>`;
            } else {
                highlightedHtml += `<span class="match ${matchClass}">${escapeHtml(matchText)}</span>`;
            }

            lastIndex = match.index + matchText.length;

            if (!isGlobal) break; // Only loop once if not global
        }

        // Add the remaining text after the last match
        const afterLastMatch = text.substring(lastIndex);
        highlightedHtml += escapeHtml(afterLastMatch);

        // Crucial: preserve newlines in the highlighted HTML
        testStringHighlight.innerHTML = highlightedHtml.replace(/\n/g, '<br>');

        // Update statistics and results panel
        matchCountBadge.textContent = `${matchCount} Match${matchCount !== 1 ? 'es' : ''}`;
        if (matchCount > 0) {
            matchCountBadge.classList.add('has-matches');
            
            // Generate Detailed Results
            matches.forEach((m, idx) => {
                let groupsHtml = '';
                // m.length starts at 1 (the full match). Anything > 1 is a capture group.
                if (m.length > 1) {
                    groupsHtml = '<div class="match-groups">';
                    for (let i = 1; i < m.length; i++) {
                        const groupVal = m[i] === undefined ? '<em>undefined</em>' : escapeHtml(m[i]);
                        groupsHtml += `<div class="match-group-item"><strong>Group ${i}:</strong> ${groupVal}</div>`;
                    }
                    groupsHtml += '</div>';
                }

                resultsHtml += `
                    <div class="match-result-item">
                        <div class="match-index">#${idx + 1}</div>
                        <div>
                            <div class="match-value"><code>${escapeHtml(m[0])}</code></div>
                            ${groupsHtml}
                        </div>
                    </div>
                `;
            });
            
            resultsContainer.innerHTML = resultsHtml;
        } else {
            matchCountBadge.classList.remove('has-matches');
            resultsContainer.innerHTML = '<p class="empty-state">No matches found in the test string.</p>';
        }
    }

    // Event Listeners
    regexInput.addEventListener('input', processRegex);
    regexFlags.addEventListener('input', processRegex);
    testStringInput.addEventListener('input', processRegex);

    // Initial Processing
    processRegex();
});
