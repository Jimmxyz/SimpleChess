function moveOrder(pieceID,moveStartID,moveEndID){
    //Warning : do verification before calling this function
    console.log(pieceID + "\n" + moveStartID + " -> " + moveEndID)
    piecePlaceGrid(" ",moveStartID);
    piecePlaceGrid(pieceID,moveEndID);
    //Visual part
    piecePlaceVisual("v",moveStartID);
    piecePlaceVisual(pieceID,moveEndID);
};
function moveControl(pieceID,moveStartID,moveEndID){
    if(pieceID === "k" || pieceID === "q" || pieceID === "r" || pieceID === "n" || pieceID === "b" || pieceID === "p" && turn === "w"){        
        moveOrder(pieceID,moveStartID,moveEndID);
        refresh()
        scanColorShow()
        turn = "b";
        document.getElementById('turnInfo').innerText = "Black turn"
    }
    else if(pieceID === "K" || pieceID === "Q" || pieceID === "R" || pieceID === "N" || pieceID === "B" || pieceID === "P" && turn === "b"){
        moveOrder(pieceID,moveStartID,moveEndID);
        refresh()
        scanColorShow()
        turn = "w";
        document.getElementById('turnInfo').innerText = "White turn"
    }
};
//LOGIC SCAN ACTION
//Scan grid
let scanGrid = [
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
];
function refresh(){
    scanGrid = [
        [" "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," ",],
        [" "," "," "," "," "," "," "," ",],
    ];
}
//Pawn system
function pawnScan(type,position){
    //type : w for white and b for black
    //position in form A2
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    if(type === "w"){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1]) === "v" && indexMainPosition[1] - 1 >= 0){
            scanGrid[indexMainPosition[0] - 1][indexMainPosition[1]] = "?"
            if(indexMainPosition[0] === 6 && getType(indexMainPosition[0] - 2,indexMainPosition[1]) === "v"){
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1]] = "?"
            }
        }
        if(logicGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] !== " " && getType(indexMainPosition[0] - 1,indexMainPosition[1] + 1) === "b"  && indexMainPosition[1] - 1 >= 0){
            scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] = "!";
        }
        if(logicGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] !== " " && getType(indexMainPosition[0] - 1,indexMainPosition[1] - 1) === "b" && indexMainPosition[1] - 1 >= 0){
            scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] = "!";
        }
    }
    else if(type === "b"){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1]) === "v" && indexMainPosition[1] + 1 <= 7){
            scanGrid[indexMainPosition[0] + 1][indexMainPosition[1]] = "?"
            if(indexMainPosition[0] === 1 && getType(indexMainPosition[0] + 2,indexMainPosition[1]) === "v"){
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1]] = "?"
            }
        }
        if(logicGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] !== " " && getType(indexMainPosition[0] + 1,indexMainPosition[1] + 1) === "w" && indexMainPosition[1] + 1 <= 7){
            scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] = "!"
        }
        if(logicGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] !== " " && getType(indexMainPosition[0] + 1,indexMainPosition[1] - 1) === "w" && indexMainPosition[1] + 1 <= 7){
            scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] = "!"
        }
    }
}
function knightScan(type,position){
    //type : w for white and b for black
    //position in form A2
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] - 2 >= 0){
        if(getType(indexMainPosition[0] - 2,indexMainPosition[1] - 1) !== type){
            if(getType(indexMainPosition[0] - 2,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0] - 2 >= 0){
        if(getType(indexMainPosition[0] - 2,indexMainPosition[1] + 1) !== type){
            if(getType(indexMainPosition[0] - 2,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 2 >= 0 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 2) !== type){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 2) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 2] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 2] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 2 <= 7 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 2) !== type){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 2) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 2] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 2] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] + 2 <= 7){
        if(getType(indexMainPosition[0] + 2,indexMainPosition[1] - 1) !== type){
            if(getType(indexMainPosition[0] + 2,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0] + 2 <= 7){
        if(getType(indexMainPosition[0] + 2,indexMainPosition[1] + 1) !== type){
            if(getType(indexMainPosition[0] + 2,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 2 >= 0 && indexMainPosition[0] + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 2) !== type){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 2) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 2] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 2] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 2 <= 7 && indexMainPosition[0] + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] + 2) !== type){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1] + 2) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 2] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 2] = "?"
            }
        }
    }
}
function kingScan(type,position){
    //type : w for white and b for black
    //position in form A2
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 1) !== type){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1]) !== type){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1]) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1]] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1]] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 1) !== type){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0]){
        if(getType(indexMainPosition[0],indexMainPosition[1] - 1) !== type){
            if(getType(indexMainPosition[0],indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0]][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0]][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0]){
        if(getType(indexMainPosition[0],indexMainPosition[1] + 1) !== type){
            if(getType(indexMainPosition[0],indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0]][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0]][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 1) !== type){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] && indexMainPosition[0]  + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1]) !== type){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1]) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1]] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1]] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0]  + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] + 1) !== type){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] = "?"
            }
        }
    }
}