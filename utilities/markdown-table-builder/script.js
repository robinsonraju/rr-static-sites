document.addEventListener('DOMContentLoaded', () => {
    
    let rows = 4;
    let cols = 3;

    const theadRow = document.getElementById('table-head-row');
    const tbody = document.getElementById('table-body');
    const output = document.getElementById('markdown-output');
    const copyBtn = document.getElementById('copy-btn');

    // Initialize Table
    function renderTable() {
        theadRow.innerHTML = '';
        tbody.innerHTML = '';

        // Render Head
        for (let c = 0; c < cols; c++) {
            const th = document.createElement('th');
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'cell-input header-cell';
            input.placeholder = `Header ${c + 1}`;
            input.dataset.col = c;
            input.dataset.row = 'head';
            input.addEventListener('input', generateMarkdown);
            th.appendChild(input);
            theadRow.appendChild(th);
        }

        // Render Body
        for (let r = 0; r < rows; r++) {
            const tr = document.createElement('tr');
            for (let c = 0; c < cols; c++) {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'cell-input body-cell';
                input.placeholder = `...`;
                input.dataset.col = c;
                input.dataset.row = r;
                input.addEventListener('input', generateMarkdown);
                td.appendChild(input);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }

        generateMarkdown();
    }

    // Generator function
    function generateMarkdown() {
        // Find max width of each column to pad nicely
        const colWidths = new Array(cols).fill(0);
        
        // Check headers
        const headers = document.querySelectorAll('.header-cell');
        headers.forEach((h, i) => {
            const val = h.value || `Header ${i+1}`;
            if (val.length > colWidths[i]) colWidths[i] = val.length;
        });

        // Check body
        const bodyCells = document.querySelectorAll('.body-cell');
        bodyCells.forEach(c => {
            const colIdx = parseInt(c.dataset.col);
            const val = c.value || '';
            if (val.length > colWidths[colIdx]) colWidths[colIdx] = val.length;
        });

        // Enforce min width of 3 for the dash separator
        for(let i=0; i<cols; i++) {
            if (colWidths[i] < 3) colWidths[i] = 3;
        }

        let md = '';

        // Build Header Row
        let headerRow = '|';
        for (let c = 0; c < cols; c++) {
            const input = document.querySelector(`.header-cell[data-col="${c}"]`);
            const val = input.value || `Header ${c+1}`;
            headerRow += ` ${val.padEnd(colWidths[c], ' ')} |`;
        }
        md += headerRow + '\n';

        // Build Separator Row
        let sepRow = '|';
        for (let c = 0; c < cols; c++) {
            sepRow += ` ${'-'.repeat(colWidths[c])} |`;
        }
        md += sepRow + '\n';

        // Build Body Rows
        for (let r = 0; r < rows; r++) {
            let rowText = '|';
            for (let c = 0; c < cols; c++) {
                const input = document.querySelector(`.body-cell[data-row="${r}"][data-col="${c}"]`);
                const val = input ? input.value : '';
                rowText += ` ${val.padEnd(colWidths[c], ' ')} |`;
            }
            md += rowText + '\n';
        }

        output.value = md;
    }

    // Array modifications
    document.getElementById('add-row-btn').addEventListener('click', () => {
        rows++;
        renderTable();
    });

    document.getElementById('del-row-btn').addEventListener('click', () => {
        if (rows > 1) {
            rows--;
            renderTable();
        }
    });

    document.getElementById('add-col-btn').addEventListener('click', () => {
        cols++;
        renderTable();
    });

    document.getElementById('del-col-btn').addEventListener('click', () => {
        if (cols > 1) {
            cols--;
            renderTable();
        }
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
        const allInputs = document.querySelectorAll('.cell-input');
        allInputs.forEach(i => i.value = '');
        generateMarkdown();
    });

    copyBtn.addEventListener('click', () => {
        output.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = 'var(--success-color)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    });

    // Initial render
    renderTable();

});
