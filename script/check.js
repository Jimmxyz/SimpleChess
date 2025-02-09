function checkScan(){
    if(turn === "w"){
        if(firstLevelScan("k","b") === true){
            console.log("Check for white");
            document.body.style.backgroundColor = "rgb(220, 53, 69)";
        }
    }
    if(turn === "b"){
        if(firstLevelScan("K","w") === true){
            console.log("Check for black");
            document.body.style.backgroundColor = "rgb(220, 53, 69)";
        }
    }
}
function firstLevelScan(id,oponent){
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
                if (logicGrid[row][col] === id) {
                    if(secondLevelScan(row,col,oponent) === true){
                        return true;
                    }
                }
            }
    }
    return false;
}
function secondLevelScan(row,col,oponent){
    //oponent = "b" or "w"
    //pawn verification
    let type;
    if(oponent === "b"){
        type = "w"
        bishopID = "B"
        queenID = "Q"
        rookID = "R"
    }
    else if(oponent === "w"){
        type = "b"
        bishopID = "b"
        queenID = "q"
        rookID = "r"
    };
    let check = false
    if(oponent === "b"){
        if(logicGrid[row - 1][col - 1] === "P"){
            check = true
            //Solved
        }
        if(logicGrid[row - 1][col + 1] === "P"){
            check = true
            //Solved
        }
    }
    if(oponent === "w"){
        if(logicGrid[row + 1][col - 1] === "p"){
            check = true
            //Solved
        }
        if(logicGrid[row + 1][col + 1] === "p"){
            check = true
            //Solved
        }
    }
    //Rook/Bishop or queen verification
    //TOP
    index = 1;
    while(index > 0 && index < 8){
        if(row - index >= 0){
            if(getType(row - index, col) !== type){
                if(getType(row - index,col) === oponent && (logicGrid[row - index][col] === rookID || logicGrid[row - index][col] === queenID)){
                    check = true
                    //solved
                    index = 0;
                    break
                }
                else if(getType(row - index,col) !== "v" && (logicGrid[row - index][col] !== rookID && logicGrid[row - index][col] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //DOWN
    index = 1;
    while(index > 0 && index < 8){
        if(row + index <= 7){
            if(getType(row + index,col) !== type){
                if(getType(row + index,col) === oponent && (logicGrid[row + index][col] === rookID || logicGrid[row + index][col] === queenID)){
                    check = true
                    //solved
                    
                    index = 0;
                    break
                }
                else if(getType(row + index,col) !== "v" && (logicGrid[row + index][col] !== rookID && logicGrid[row + index][col] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //LEFT
    index = 1;
    while(index > 0 && index < 8){
        if(row - index >= 0){
            if(getType(row,col - index) !== type){
                if(getType(row,col - index) === oponent && (logicGrid[row][col - index] === rookID || logicGrid[row][col - index] === queenID)){
                    check = true
                    //solved
                    
                    index = 0;
                    break
                }
                else if(getType(row,col - index) !== "v" && (logicGrid[row][col - index] !== rookID && logicGrid[row][col - index] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //RIGHT
    index = 1;
    while(index > 0 && index < 8){
        if(col  + index <= 7){
            if(getType(row,col + index) !== type){
                if(getType(row,col + index) === oponent && (logicGrid[row][col + index] === rookID || logicGrid[row][col + index] === queenID)){
                    check = true
                    //solved
                    
                    index = 0;
                    break
                }
                else if(getType(row,col + index) !== "v" && (logicGrid[row][col + index] !== rookID && logicGrid[row][col + index] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //TOP-LEFT
    index = 1;
    while(index > 0 && index < 8){
        if(col - index >= 0 && row - index >= 0){
            if(getType(row - index,col - index) !== type){
                if(getType(row - index,col - index) === oponent && (logicGrid[row - index][col - index] === bishopID || logicGrid[row - index][col - index] === queenID)){
                    check = true
                    //solved
                    index = 0;
                    break
                }
                else if(getType(row - index, col - index) !== "v" && (logicGrid[row - index][col - index] !== bishopID && logicGrid[row - index][col - index] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //TOP-RIGHT
    index = 1;
    while(index > 0 && index < 8){
        if(col  + index <= 7 && row - index >= 0){
            if(getType(row - index,col + index) !== type){
                if(getType(row - index,col + index) === oponent && (logicGrid[row - index][col + index] === bishopID || logicGrid[row - index][col + index] === queenID)){
                    check = true
                    //solved

                    index = 0;
                    break
                }
                else if(getType(row - index, col + index) !== "v" && (logicGrid[row - index][col + index] !== bishopID && logicGrid[row - index][col + index] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //DOWN-LEFT
    index = 1;
    while(index > 0 && index < 8){
        if(col  - index >= 0 && row + index <= 7){
            if(getType(row + index,col - index) !== type){
                if(getType(row + index,col - index) === oponent && (logicGrid[row + index][col - index] === bishopID || logicGrid[row + index][col - index] === queenID)){
                    check = true
                    //solved

                    index = 0;
                    break
                }
                else if(getType(row + index, col - index) !== "v" && (logicGrid[row + index][col - index] !== bishopID && logicGrid[row + index][col - index] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //DOWN-RIGHT
    index = 1;
    while(index > 0 && index < 8){
        if(col  + index <= 7 && row + index <= 7){
            if(getType(row + index,col + index) !== type){
                if(getType(row + index,col + index) === oponent && ( logicGrid[row + index][col + index] === bishopID || logicGrid[row + index][col + index] === queenID )){
                    check = true
                    //solved

                    index = 0;
                    break
                }
                else if(getType(row + index, col + index) !== "v" && (logicGrid[row + index][col + index] !== bishopID && logicGrid[row + index][col + index] !== queenID)){
                    index = 0;
                    break
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
    //End
    if(check === true){return true}
    else{return false}
}