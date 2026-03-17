document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const btnGen = document.getElementById('gen-array-btn');
    const btnSort = document.getElementById('sort-btn');
    const sliderSize = document.getElementById('size-slider');
    const sliderSpeed = document.getElementById('speed-slider');
    
    const valSize = document.getElementById('size-val');
    const valSpeed = document.getElementById('speed-val');
    const algBtns = document.querySelectorAll('.alg-btn');
    
    const container = document.getElementById('array-container');
    const sortStatus = document.getElementById('sort-status');

    // State
    let array = [];
    let isSorting = false;
    let currentAlgorithm = 'bubble';
    
    // Colors aligning with CSS
    const COLORS = {
        unsorted: 'var(--bar-unsorted)',
        comparing: 'var(--bar-comparing)',
        swapping: 'var(--bar-swapping)',
        sorted: 'var(--bar-sorted)'
    };

    // --- Helpers ---
    
    // Configurable delay based on slider (1 = slow, 100 = fast)
    function sleep() {
        // Range 1 to 100. Let's map it inversely. 
        // Speed 100 -> ~1ms delay. Speed 1 -> 500ms delay.
        const speed = parseInt(sliderSpeed.value);
        let ms = 500 - (speed * 4.9);
        if (ms < 1) ms = 1;
        
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Swaps elements in array and updates DOM height
    function swap(i, j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        
        const bars = container.children;
        // height in %
        bars[i].style.height = `${array[i]}%`;
        bars[j].style.height = `${array[j]}%`;
    }
    
    // Helper specifically for DOM writes from Merge Sort
    function writeValue(i, val) {
        array[i] = val;
        const bars = container.children;
        bars[i].style.height = `${val}%`;
    }

    function setColor(i, colorKey) {
        const bars = container.children;
        if(bars[i]) {
            bars[i].style.backgroundColor = COLORS[colorKey];
        }
    }

    function generateArray() {
        if (isSorting) return;
        
        const size = parseInt(sliderSize.value);
        array = [];
        container.innerHTML = '';
        
        for (let i = 0; i < size; i++) {
            // Random value between 5 and 100 (for height percentage)
            const val = Math.floor(Math.random() * 95) + 5;
            array.push(val);
            
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${val}%`;
            // Set dynamic width based on available space
            bar.style.width = `${100 / size}%`;
            
            container.appendChild(bar);
        }
        
        valSize.textContent = size;
        sortStatus.textContent = 'Ready to sort';
        sortStatus.style.color = 'var(--text-primary)';
    }

    // --- Sorting Algorithms ---

    async function bubbleSort() {
        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!isSorting) return; // Exit if interrupted normally
                
                setColor(j, 'comparing');
                setColor(j + 1, 'comparing');
                await sleep();

                if (array[j] > array[j + 1]) {
                    setColor(j, 'swapping');
                    setColor(j + 1, 'swapping');
                    swap(j, j + 1);
                    await sleep();
                }

                setColor(j, 'unsorted');
                setColor(j + 1, 'unsorted');
            }
            // Last element is now sorted
            setColor(n - i - 1, 'sorted');
        }
        setColor(0, 'sorted');
    }

    async function partition(low, high) {
        let pivot = array[high];
        setColor(high, 'swapping'); // Highlight pivot
        
        let i = low - 1;
        
        for (let j = low; j <= high - 1; j++) {
            if (!isSorting) return -1;
            
            setColor(j, 'comparing');
            await sleep();

            if (array[j] < pivot) {
                i++;
                if (i !== j) {
                    setColor(i, 'swapping');
                    setColor(j, 'swapping');
                    swap(i, j);
                    await sleep();
                    setColor(i, 'unsorted');
                }
            }
            setColor(j, 'unsorted');
        }
        
        if (i + 1 !== high) {
            setColor(i + 1, 'swapping');
            setColor(high, 'swapping');
            swap(i + 1, high);
            await sleep();
            setColor(i + 1, 'unsorted');
        }
        
        setColor(high, 'unsorted');
        return i + 1;
    }

    async function quickSort(low, high) {
        if (!isSorting) return;
        if (low < high) {
            let pi = await partition(low, high);
            if (pi === -1) return; // Exited
            
            // Mark pivot as sorted
            setColor(pi, 'sorted');
            
            await quickSort(low, pi - 1);
            await quickSort(pi + 1, high);
        } else if (low >= 0 && low < array.length) {
             // single element is sorted
             setColor(low, 'sorted');
        }
    }

    async function merge(l, m, r) {
        if (!isSorting) return;
        
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = array[l + i];
        for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (!isSorting) return;
            
            // Visualize comparison area
            setColor(l + i, 'comparing');
            setColor(m + 1 + j, 'comparing');
            await sleep();
            
            if (L[i] <= R[j]) {
                setColor(k, 'swapping');
                writeValue(k, L[i]);
                i++;
            } else {
                setColor(k, 'swapping');
                writeValue(k, R[j]);
                j++;
            }
            await sleep();
            
            // Remove highlighting unless it's in a final settled state
            // (Merge sort colors the whole block sorted at the end)
            setColor(k, 'unsorted');
            k++;
        }

        while (i < n1) {
            if (!isSorting) return;
            setColor(k, 'swapping');
            writeValue(k, L[i]);
            await sleep();
            setColor(k, 'unsorted');
            i++; k++;
        }

        while (j < n2) {
            if (!isSorting) return;
            setColor(k, 'swapping');
            writeValue(k, R[j]);
            await sleep();
            setColor(k, 'unsorted');
            j++; k++;
        }
    }

    async function mergeSort(l, r) {
        if (l >= r || !isSorting) return;
        
        let m = l + Math.floor((r - l) / 2);
        
        await mergeSort(l, m);
        await mergeSort(m + 1, r);
        await merge(l, m, r);
        
        // If this is the highest level, mark everything sorted as we go
        if (l === 0 && r === array.length - 1 && isSorting) {
            for(let i=0; i < array.length; i++) {
                setColor(i, 'sorted');
            }
        }
    }

    // --- Controls Logic ---
    
    function setUIState(sorting) {
        isSorting = sorting;
        btnGen.disabled = sorting;
        btnSort.disabled = sorting;
        sliderSize.disabled = sorting;
        algBtns.forEach(b => b.disabled = sorting);
        
        if (sorting) {
            sortStatus.textContent = `Sorting using ${currentAlgorithm.toUpperCase()}...`;
            sortStatus.style.color = 'var(--accent-color)';
        } else {
            sortStatus.textContent = 'Sort Complete';
            sortStatus.style.color = 'var(--bar-sorted)';
            
            // Safety paint all green when done successfully
            for(let i=0; i<array.length; i++) setColor(i, 'sorted');
        }
    }

    btnSort.addEventListener('click', async () => {
        if (isSorting) return;
        setUIState(true);
        
        try {
            switch(currentAlgorithm) {
                case 'bubble':
                    await bubbleSort();
                    break;
                case 'quick':
                    await quickSort(0, array.length - 1);
                    break;
                case 'merge':
                    await mergeSort(0, array.length - 1);
                    break;
            }
        } catch (e) {
            console.error('Sorting interrupted or failed', e);
        } finally {
            if (isSorting) { // only if not externally aborted
                setUIState(false);
            }
        }
    });

    sliderSize.addEventListener('input', generateArray);
    
    sliderSpeed.addEventListener('input', () => {
        const val = parseInt(sliderSpeed.value);
        let text = 'Normal';
        if (val < 25) text = 'Very Slow';
        else if (val < 45) text = 'Slow';
        else if (val > 85) text = 'Lightning';
        else if (val > 65) text = 'Fast';
        valSpeed.textContent = text;
    });

    btnGen.addEventListener('click', generateArray);

    algBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isSorting) return;
            algBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentAlgorithm = btn.dataset.alg;
        });
    });

    // Initial setup
    valSpeed.textContent = 'Normal';
    generateArray();
});
