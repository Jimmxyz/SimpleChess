let logicGrid = [
    ["R","N","B","Q","K","B","N","R",],
    ["P","P","P","P","P","P","P","P",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    [" "," "," "," "," "," "," "," ",],
    ["p","p","p","p","p","p","p","p",],
    ["r","n","b","q","k","b","n","r",],
];
let selectedID = "Z0"; 
let selectedPiece = "v";
function pieceSearchVisual(id = null){
    if(id === null){return "error"}
    try{
        piece = document.getElementById(id).innerHTML;
    }
    catch (error){
        console.error("An error was detected : " + error + "\nThe program will continue to run");
        return "error"
    }
    if(piece === "" || piece === " "){piece = "v"};
    return piece ?? "error"
}
function piecePlaceVisual(idPiece,positionPiece){
    //Imfo : idPiece =  k : king, q : quee, r : rook, b : bishop, n : knight, p : pawn, Put the letters in upper case for black and lower case for white (and v for empty cell).
    //Info : positionPiece = A2 or F3 for exemple
    if(pieceSearchVisual(positionPiece) === "error"){return "error"};
    if(convertLetterToVisual(idPiece) === "error"){return "error"};
    if(convertLetterToVisual(idPiece) === "void"){document.getElementById(positionPiece).innerHTML = ""; return};
    document.getElementById(positionPiece).innerHTML = "<img src='" + convertLetterToVisual(idPiece) + "' alt='"+ idPiece +"'>"
}
function convertLetterToVisual(idPiece){
    if(idPiece === "K"){
        return "./item/black/Chess_black_king.svg"
    }
    else if(idPiece === "Q"){
        return "./item/black/Chess_black_queen.svg"
    }
    else if(idPiece === "R"){
        return "./item/black/Chess_black_rook.svg"
    }
    else if(idPiece === "B"){
        return "./item/black/Chess_black_bishop.svg"
    }
    else if(idPiece === "N"){
        return "./item/black/Chess_black_knight.svg"
    }
    else if(idPiece === "P"){
        return "./item/black/Chess_black_pawn.svg"
    }
    else if(idPiece === "k"){
        return "./item/white/Chess_white_king.svg"
    }
    else if(idPiece === "q"){
        return "./item/white/Chess_white_queen.svg"
    }
    else if(idPiece === "r"){
        return "./item/white/Chess_white_rook.svg"
    }
    else if(idPiece === "b"){
        return "./item/white/Chess_white_bishop.svg"
    }
    else if(idPiece === "n"){
        return "./item/white/Chess_white_knight.svg"
    }
    else if(idPiece === "p"){
        return "./item/white/Chess_white_pawn.svg"
    }
    else if(idPiece === "v"){
        //mean void
        return "void"
    }
    else{
        return "error"
    }
}
function stringToNumber(position){
    if (position.length !== 2) {
        return { error: "Too long (or too short) string" };
    }
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const letter = position[0].toUpperCase();
    const number = 8 - parseInt(position[1]);  
    const letterIndex = letters.indexOf(letter);
    if (letterIndex === -1) {
        return { error: "Not a valid letter" };
    }
    if (isNaN(number)) {
        return { error: "NaN" };
    }
    return [number,letterIndex]
}
function pieceSearchGrid(position) {
    index = stringToNumber(position);
    number = index[0];
    letterIndex = index[1];
    return logicGrid[number][letterIndex];
}
function piecePlaceGrid(idPiece,positionPiece) {
    //Imfo : idPiece =  k : king, q : quee, r : rook, b : bishop, n : knight, p : pawn, Put the letters in upper case for black and lower case for white (and v for empty cell).
    //Info : positionPiece = A2 or F3 for exemple
    index = stringToNumber(positionPiece);
    number = index[0];
    letterIndex = index[1];
    logicGrid[number][letterIndex] = idPiece;
    return
}
function logicGridConvertToVisualGrid(){
    //Warning : convert the entire grid
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for(let i = 63; i >= 0; i--){
        piecePlaceVisual(logicGrid[Math.floor(i / 8)][i % 8],String(columns[i % 8] + (8 - Math.floor(i / 8))))
    }
}

function select(cellID){
    if(cellID === selectedID){
        selectedID = "Z0";
    }
    else if(selectedID !== "Z0"){
        moveControl(selectedPiece,selectedID,cellID);
        selectedID = "Z0";
    }
    else{
        if(pieceSearchGrid(cellID) === "" || pieceSearchGrid(cellID) === " " || pieceSearchGrid(cellID) === "v"){
            return
        }
        selectedID = cellID;
        selectedPiece = pieceSearchGrid(cellID);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    logicGridConvertToVisualGrid();
});

