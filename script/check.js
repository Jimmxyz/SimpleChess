function firstLevelScan(){
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
                if (logicGrid[row][col] === 'K') {
                    if(secondLevelScan(row,col,"w") === true){
                        return true;
                    }
                } else if (logicGrid[row][col] === 'k') {
                    if(secondLevelScan(row,col,"b")){
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
    }
    if(oponent === "w"){
        type = "b"
    }
    let check = false
    if(oponent === "b"){
        if(logicGrid[row - 1][col - 1] === "P"){
            check = true
        }
        if(logicGrid[row - 1][col + 1] === "P"){
            check = true
        }
    }
    if(oponent === "w"){
        if(logicGrid[row + 1][col - 1] === "p"){
            check = true
        }
        if(logicGrid[row + 1][col + 1] === "p"){
            check = true
        }
    }
    //Rook/Bishop or queen verification
    //TOP
    index = 1;
    while(index > 0 && index < 8){
        if(row - index >= 0){
            if(getType(row - col) !== type){
                if(getType(row - index,col) === oponent){
                    check = true
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
                if(getType(row + index,col) === oponent){
                    check = true
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
                if(getType(row,col - index) === oponent){
                    check = true
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
                if(getType(row,col + index) === oponent){
                    check = true
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
                if(getType(row - index,col - index) === oponent){
                    check = true
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
                if(getType(row - index,col + index) === oponent){
                    check = true
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
                if(getType(row + index,col - index) === oponent){
                    check = true
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
                if(getType(row + index,col + index) === oponent){
                    check = true
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