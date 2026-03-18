document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('volumesGrid');
    const searchInput = document.getElementById('searchInput');

    function renderVolumes(volumes) {
        grid.innerHTML = '';
        if (volumes.length === 0) {
            grid.innerHTML = '<p style="text-align:center;width:100%;color:var(--text-secondary);font-size:1.1rem;margin-top:2rem;grid-column: 1 / -1;">No volumes found matching your search. Try another query.</p>';
            return;
        }

        volumes.forEach((vol, index) => {
            const card = document.createElement('div');
            card.className = 'volume-card';
            
            // First item is typically title or first author
            const mainTitle = vol.items[0] || 'Unknown Title';
            const remainingItems = vol.items.slice(1);

            let HTML = `
                <div class="volume-number">Volume ${vol.volume}</div>
                <h2 class="volume-title">${mainTitle}</h2>
                <ul class="works-list">
            `;

            remainingItems.forEach(item => {
                // Heuristically identify an author or subsection: parentheticals like "translated", "rendered", "edited"
                // Often these are authors/translators rather than specific book titles (which don't typically have these alone, though some do)
                // Another heuristic: lines that don't match typical book names might just look different.
                const isAuthor = item.includes('translated') || item.includes('rendered') || item.includes('edited');
                const liClass = isAuthor ? 'work-item author-item' : 'work-item';
                HTML += `<li class="${liClass}">${item}</li>`;
            });

            HTML += `</ul>`;
            card.innerHTML = HTML;
            
            // Assign stagger animation based on index
            card.style.animation = `slideUpFade 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards ${0.05 * (index % 12)}s`;

            grid.appendChild(card);
        });
    }

    // Initial render
    renderVolumes(greatBooks);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) {
            renderVolumes(greatBooks);
            return;
        }

        const filtered = greatBooks.filter(vol => {
            const volMatch = vol.volume.toString().includes(query);
            const itemsMatch = vol.items.some(item => item.toLowerCase().includes(query));
            return volMatch || itemsMatch;
        });

        renderVolumes(filtered);
    });
});
