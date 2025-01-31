function gridPrinter(){
    const grid = document.getElementById('grid');
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
        const row = Math.floor(i / 8);
        const col = i % 8;
        cell.id = columns[col] + (8 - row);
        cell.onclick = function() {
            select(String(columns[col] + (8 - row))); // cellId sera comme 'A1', 'B2', etc.
        };
        if ((row + col) % 2 === 0) {
            cell.classList.add('white');
        } else {
            cell.classList.add('black');
        }
        grid.appendChild(cell);
    }
}

gridPrinter()