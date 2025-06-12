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
            select(String(columns[col] + (8 - row)));
        };
        if ((row + col) % 2 === 0) {
            cell.classList.add('white');
        } else {
            cell.classList.add('black');
        }
        grid.appendChild(cell);
    };
}
function scanColorShow(){
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
            const cellId = columns[col] + (8 - row);
            const cell = document.getElementById(cellId);
            cell.classList.remove('cell-blue', 'cell-yellow', 'cell-red');
            if (scanGrid[row][col] === " ") {
                continue;
            }
            switch(scanGrid[row][col]) {
                case "$":
                    cell.classList.add('cell-blue');
                    break;
                case "?":
                    cell.classList.add('cell-yellow');
                    break;
                case "#":
                    cell.classList.add('cell-yellow');
                    break;
                case "!":
                    cell.classList.add('cell-red');
                    break;
            }
        }
    }
}
function showEatedPiece(){
    for (let i of pieceEated) {
       //Nothing here (yet)
    }
}
function showResult(){
    document.getElementById('endMatchWindow').style.display = 'block';
    document.getElementById('globalContainer').style.display = 'none';
}
function closeResult(){
    document.getElementById('endMatchWindow').style.display = 'none';
    document.getElementById('globalContainer').style.display = 'block';
}
function back(){
    window.location.replace("./index.html");
}

let timer;
let blackTimer;
let whiteTimer;
let timerState = false
function timerLaunch(){
    blackTimer = 600
    whiteTimer = 600
    timerState = true
    timer = setInterval(() => {
        if(turn === "w"){
            whiteTimer--;
        }
        else if(turn === "b"){
            blackTimer--;
        }
        else{
            endTimer()
        }
        showTimer()
    },1000)
}
function endTimer(){
    clearInterval(timer);
    timerState = false
}
function showTimer(){
    if(whiteTimer <= 0){
        document.getElementById('winner').innerText = "Defeat";
        document.getElementById('typeOfEnding').innerText = "White is out of time";
        endTimer()
        showResult()
        reset()
    }
    let secW = whiteTimer % 60
    let minW = parseInt((whiteTimer - secW)/60)
    if(secW < 10){
        secW = "0" + String(secW)
    }
    else{
        secW = String(secW)
    }
    if(minW < 10){
        minW = "0" + String(minW)
    }
    else{
        minW = String(minW)
    }
    if(turn === "w"){
        document.getElementById('timerInfoActive').innerText = minW + ":" + secW;
    }
    else{
        document.getElementById('timerInfoSleep').innerText = "/" + minW + ":" + secW;
    }
    if(blackTimer <= 0){
        document.getElementById('winner').innerText = "Victory";
        document.getElementById('typeOfEnding').innerText = "Black is out of time";
        endTimer()
        showResult()
        reset()
    }
    let secB = blackTimer % 60
    let minB = parseInt((blackTimer - secB)/60)
    if(secB < 10){
        secB = "0" + String(secB)
    }
    else{
        secB = String(secB)
    }
    if(minB < 10){
        minB = "0" + String(minB)
    }
    else{
        minB = String(minB)
    }
    if(turn === "b"){
        document.getElementById('timerInfoActive').innerText = minB + ":" + secB;
    }
    else{
        document.getElementById('timerInfoSleep').innerText = "/" + minB + ":" + secB;
    }
}
function backToHome(){
  window.location.replace("./index.html");
}
gridPrinter()