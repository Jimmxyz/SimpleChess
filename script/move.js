function moveOrder(pieceID,moveStartID,moveEndID){
    //Warning : do verification before calling this function
    console.log(pieceID + "\n" + moveStartID + " -> " + moveEndID)
    piecePlaceGrid(" ",moveStartID);
    piecePlaceGrid(pieceID,moveEndID);
    //Visual part
    piecePlaceVisual("v",moveStartID);
    piecePlaceVisual(pieceID,moveEndID);
    selectedID = "Z0";
};
function moveControl(pieceID,moveStartID,moveEndID){
    indexID = stringToNumber(moveEndID);
    if(getType(indexID[0],indexID[1]) !== "v"){
        pieceEated.push(logicGrid[indexID[0]][indexID[1]])
    }
    if(scanGrid[indexID[0]][indexID[1]] === "?" || scanGrid[indexID[0]][indexID[1]] === "!"){
        if(pieceID === "k" || pieceID === "q" || pieceID === "r" || pieceID === "n" || pieceID === "b" || pieceID === "p" && turn === "w"){        
            moveOrder(pieceID,moveStartID,moveEndID);
            refresh()
            scanColorShow()
            turn = "b";
            document.body.style.backgroundColor = "rgb(52, 52, 52)";
            pawnToQueen()
            checkScan()
            if(IsPat("b") === true){
                alert("Pat for black");
                reset()
            }
            document.getElementById('turnInfo').innerText = "Black turn"
        }
        else if(pieceID === "K" || pieceID === "Q" || pieceID === "R" || pieceID === "N" || pieceID === "B" || pieceID === "P" && turn === "b"){
            moveOrder(pieceID,moveStartID,moveEndID);
            refresh()
            scanColorShow()
            turn = "w";
            document.body.style.backgroundColor = "rgb(52, 52, 52)";
            pawnToQueen()
            checkScan()
            if(IsPat("w") === true){
                alert("Pat for white");
                reset()
            }
            document.getElementById('turnInfo').innerText = "White turn"
        }
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
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1]) === "v" && indexMainPosition[0] - 1 >= 0){
            if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 1,indexMainPosition[1],"b") === false){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1]] = "?"
            };
            if(indexMainPosition[0] === 6 && getType(indexMainPosition[0] - 2,indexMainPosition[1]) === "v" && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 2,indexMainPosition[1],"b") === false){
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1]] = "?"
            }
        }
        if(logicGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] !== " " && getType(indexMainPosition[0] - 1,indexMainPosition[1] + 1) === "b"  && indexMainPosition[1] + 1 <= 7 && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 1,indexMainPosition[1] + 1,"b") === false){
            scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] = "!";
        }
        if(logicGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] !== " " && getType(indexMainPosition[0] - 1,indexMainPosition[1] - 1) === "b" && indexMainPosition[1] - 1 >= 0 && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 1,indexMainPosition[1] - 1,"b") === false){
            scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] = "!";
        }
    }
    else if(type === "b"){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1]) === "v" && indexMainPosition[0] + 1 <= 7){
            if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 1,indexMainPosition[1],"w") === false){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1]] = "?"
            };
            if(indexMainPosition[0] === 1 && getType(indexMainPosition[0] + 2,indexMainPosition[1]) === "v" && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 2,indexMainPosition[1],"w") === false){
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1]] = "?"
            }
        }
        if(logicGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] !== " " && getType(indexMainPosition[0] + 1,indexMainPosition[1] + 1) === "w" && indexMainPosition[1] + 1 <= 7 && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 1,indexMainPosition[1] + 1,"w") === false){
            scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] = "!"
        }
        if(logicGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] !== " " && getType(indexMainPosition[0] + 1,indexMainPosition[1] - 1) === "w" && indexMainPosition[1] - 1 >= 0 && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 1,indexMainPosition[1] - 1,"w") === false){
            scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] = "!"
        }
    };
    if(scanGrid.some(row => row.includes('?')) || scanGrid.some(row => row.includes('!'))){return true}
    else{return false}
};
function knightScan(type,position){
    //type : w for white and b for black
    //position in form A2
    let oponent;
    if(type === "b"){oponent = "w"}
    else{ oponent = "b" };
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] - 2 >= 0){
        if(getType(indexMainPosition[0] - 2,indexMainPosition[1] - 1) !== type && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 2,indexMainPosition[1] - 1,oponent) === false){
            if(getType(indexMainPosition[0] - 2,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0] - 2 >= 0){
        if(getType(indexMainPosition[0] - 2,indexMainPosition[1] + 1) !== type && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 2,indexMainPosition[1] + 1,oponent) === false){
            if(getType(indexMainPosition[0] - 2,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 2][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 2 >= 0 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 2) !== type  && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 1,indexMainPosition[1] - 2,oponent) === false){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 2) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 2] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 2] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 2 <= 7 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 2) !== type  && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - 1,indexMainPosition[1] + 2,oponent) === false){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 2) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 2] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 2] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] + 2 <= 7){
        if(getType(indexMainPosition[0] + 2,indexMainPosition[1] - 1) !== type  && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 2,indexMainPosition[1] - 1,oponent) === false){
            if(getType(indexMainPosition[0] + 2,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0] + 2 <= 7){
        if(getType(indexMainPosition[0] + 2,indexMainPosition[1] + 1) !== type  && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 2,indexMainPosition[1] + 1,oponent) === false){
            if(getType(indexMainPosition[0] + 2,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 2][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 2 >= 0 && indexMainPosition[0] + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 2) !== type  && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 1,indexMainPosition[1] - 2,oponent) === false){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 2) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 2] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 2] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 2 <= 7 && indexMainPosition[0] + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] + 2) !== type  && setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + 1,indexMainPosition[1] + 2,oponent) === false){
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
    let oponent;
    if(type === "b"){
        oponent = "w"
    } else{ oponent = "b"}
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 1) !== type && secondLevelScan(indexMainPosition[0] - 1,indexMainPosition[1] - 1,oponent,logicGrid) === false){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1]) !== type && secondLevelScan(indexMainPosition[0] - 1,indexMainPosition[1],oponent,logicGrid) === false){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1]) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1]] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1]] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0] - 1 >= 0){
        if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 1) !== type && secondLevelScan(indexMainPosition[0] - 1,indexMainPosition[1] + 1,oponent,logicGrid) === false){
            if(getType(indexMainPosition[0] - 1,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] - 1][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 1 >= 0){
        if(getType(indexMainPosition[0],indexMainPosition[1] - 1) !== type && secondLevelScan(indexMainPosition[0],indexMainPosition[1] - 1,oponent,logicGrid) === false){
            if(getType(indexMainPosition[0],indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0]][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0]][indexMainPosition[1] - 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7){
        if(getType(indexMainPosition[0],indexMainPosition[1] + 1) !== type && secondLevelScan(indexMainPosition[0],indexMainPosition[1] + 1,oponent,logicGrid) === false){
            if(getType(indexMainPosition[0],indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0]][indexMainPosition[1] + 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0]][indexMainPosition[1] + 1] = "?"
            }
        }
    }
    if(indexMainPosition[1] - 1 >= 0 && indexMainPosition[0] + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 1) !== type && secondLevelScan(indexMainPosition[0] + 1,indexMainPosition[1] - 1,oponent,logicGrid) === false){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1] - 1) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] = "!"
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] - 1] = "?"
            }
        } 
    }
    if(indexMainPosition[0]  + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1]) !== type && secondLevelScan(indexMainPosition[0] + 1,indexMainPosition[1],oponent,logicGrid) === false){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1]) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1]] = "!";
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1]] = "?";
            }
        }
    }
    if(indexMainPosition[1] + 1 <= 7 && indexMainPosition[0]  + 1 <= 7){
        if(getType(indexMainPosition[0] + 1,indexMainPosition[1] + 1) !== type && secondLevelScan(indexMainPosition[0] + 1,indexMainPosition[1] + 1,oponent,logicGrid) === false){
            if(getType(indexMainPosition[0] + 1,indexMainPosition[1] + 1) !== "v"){
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] = "!";
            }
            else{
                scanGrid[indexMainPosition[0] + 1][indexMainPosition[1] + 1] = "?";
            }
        }
    }
    if(scanGrid.some(row => row.includes('?')) || scanGrid.some(row => row.includes('!'))){return true}
    else{return false}
}
function rookScan(type,position){
    //type : w for white and b for black
    //position in form A2
    let index;
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    let oponent;
    if(type === "b"){
        oponent = "w"
    } else{ oponent = "b"}
    //TOP
    index = 1;
    while(index > 0 && index < 8){
        
        if(indexMainPosition[0] - index >= 0){
            
            if(getType(indexMainPosition[0] - index,indexMainPosition[1]) !== type){
                if(getType(indexMainPosition[0] - index,indexMainPosition[1]) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1],oponent) === false){
                        scanGrid[indexMainPosition[0] - index][indexMainPosition[1]] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1],oponent) === false){
                    scanGrid[indexMainPosition[0] - index][indexMainPosition[1]] = "?"
                    index++;
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
        if(indexMainPosition[0] + index <= 7){
            if(getType(indexMainPosition[0] + index,indexMainPosition[1]) !== type){
                if(getType(indexMainPosition[0] + index,indexMainPosition[1]) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1],oponent) === false){
                        scanGrid[indexMainPosition[0] + index][indexMainPosition[1]] = "!"
                    }
                    index = 0;
                    break
                }
                else if (setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1],oponent) === false){
                    scanGrid[indexMainPosition[0] + index][indexMainPosition[1]] = "?"
                    index++;
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
        if(indexMainPosition[1]  - index >= 0){
            if(getType(indexMainPosition[0],indexMainPosition[1] - index) !== type){
                if(getType(indexMainPosition[0],indexMainPosition[1] - index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] - index,oponent) === false){
                        scanGrid[indexMainPosition[0]][indexMainPosition[1] - index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] - index,oponent) === false){
                    scanGrid[indexMainPosition[0]][indexMainPosition[1] - index] = "?"
                    index++;
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
        if(indexMainPosition[1]  + index <= 7){
            if(getType(indexMainPosition[0],indexMainPosition[1] + index) !== type){
                if(getType(indexMainPosition[0],indexMainPosition[1] + index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] + index,oponent) === false){
                        scanGrid[indexMainPosition[0]][indexMainPosition[1] + index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] + index,oponent) === false){
                    scanGrid[indexMainPosition[0]][indexMainPosition[1] + index] = "?"
                    index++;
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
}
function bishopScan(type,position){
    //type : w for white and b for black
    //position in form A2
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    let index;
    let oponent;
    if(type === "b"){
        oponent = "w"
    } else{ oponent = "b"}
    //TOP-LEFT
    index = 1;
    while(index > 0 && index < 8){
        if(indexMainPosition[1] - index >= 0 && indexMainPosition[0] - index >= 0){
            if(getType(indexMainPosition[0] - index,indexMainPosition[1] - index) !== type){
                if(getType(indexMainPosition[0] - index,indexMainPosition[1] - index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] - index,oponent) === false){
                        scanGrid[indexMainPosition[0] - index][indexMainPosition[1] - index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] - index,oponent) === false){
                    scanGrid[indexMainPosition[0] - index][indexMainPosition[1] - index] = "?"
                    index++;
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
        if(indexMainPosition[1]  + index <= 7 && indexMainPosition[0] - index >= 0){
            if(getType(indexMainPosition[0] - index,indexMainPosition[1] + index) !== type){
                if(getType(indexMainPosition[0] - index,indexMainPosition[1] + index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] + index,oponent) === false){
                        scanGrid[indexMainPosition[0] - index][indexMainPosition[1] + index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] + index,oponent) === false){
                    scanGrid[indexMainPosition[0] - index][indexMainPosition[1] + index] = "?"
                    index++;
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
        if(indexMainPosition[1]  - index >= 0 && indexMainPosition[0] + index <= 7){
            if(getType(indexMainPosition[0] + index,indexMainPosition[1] - index) !== type){
                if(getType(indexMainPosition[0] + index,indexMainPosition[1] - index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] - index,oponent) === false){
                        scanGrid[indexMainPosition[0] + index][indexMainPosition[1] - index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] - index,oponent) === false){
                    scanGrid[indexMainPosition[0] + index][indexMainPosition[1] - index] = "?"
                    index++;
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
        if(indexMainPosition[1]  + index <= 7 && indexMainPosition[0] + index <= 7){
            if(getType(indexMainPosition[0] + index,indexMainPosition[1] + index) !== type){
                if(getType(indexMainPosition[0] + index,indexMainPosition[1] + index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] + index,oponent) === false){
                        scanGrid[indexMainPosition[0] + index][indexMainPosition[1] + index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] + index,oponent) === false){
                    scanGrid[indexMainPosition[0] + index][indexMainPosition[1] + index] = "?"
                    index++;
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
}
function queenScan(type,position){
    //type : w for white and b for black
    //position in form A2
    refresh();
    let indexMainPosition = stringToNumber(position);
    scanGrid[indexMainPosition[0]][indexMainPosition[1]] = "$";
    let oponent;
    if(type === "b"){
        oponent = "w"
    } else{ oponent = "b"}
    let index;
    //TOP
    index = 1;
    while(index > 0 && index < 8){
        if(indexMainPosition[0] - index >= 0){
            if(getType(indexMainPosition[0] - index,indexMainPosition[1]) !== type){
                if(getType(indexMainPosition[0] - index,indexMainPosition[1]) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1],oponent) === false){
                        scanGrid[indexMainPosition[0] - index][indexMainPosition[1]] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1],oponent) === false){
                    scanGrid[indexMainPosition[0] - index][indexMainPosition[1]] = "?"
                    index++;
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
        if(indexMainPosition[0] + index <= 7){
            if(getType(indexMainPosition[0] + index,indexMainPosition[1]) !== type){
                if(getType(indexMainPosition[0] + index,indexMainPosition[1]) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1],oponent) === false){
                        scanGrid[indexMainPosition[0] + index][indexMainPosition[1]] = "!"
                    }
                    index = 0;
                    break
                }
                else if (setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1],oponent) === false){
                    scanGrid[indexMainPosition[0] + index][indexMainPosition[1]] = "?"
                    index++;
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
        if(indexMainPosition[1]  - index >= 0){
            if(getType(indexMainPosition[0],indexMainPosition[1] - index) !== type){
                if(getType(indexMainPosition[0],indexMainPosition[1] - index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] - index,oponent) === false){
                        scanGrid[indexMainPosition[0]][indexMainPosition[1] - index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] - index,oponent) === false){
                    scanGrid[indexMainPosition[0]][indexMainPosition[1] - index] = "?"
                    index++;
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
        if(indexMainPosition[1]  + index <= 7){
            if(getType(indexMainPosition[0],indexMainPosition[1] + index) !== type){
                if(getType(indexMainPosition[0],indexMainPosition[1] + index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] + index,oponent) === false){
                        scanGrid[indexMainPosition[0]][indexMainPosition[1] + index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0],indexMainPosition[1] + index,oponent) === false){
                    scanGrid[indexMainPosition[0]][indexMainPosition[1] + index] = "?"
                    index++;
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
        if(indexMainPosition[1] - index >= 0 && indexMainPosition[0] - index >= 0){
            if(getType(indexMainPosition[0] - index,indexMainPosition[1] - index) !== type){
                if(getType(indexMainPosition[0] - index,indexMainPosition[1] - index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] - index,oponent) === false){
                        scanGrid[indexMainPosition[0] - index][indexMainPosition[1] - index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] - index,oponent) === false){
                    scanGrid[indexMainPosition[0] - index][indexMainPosition[1] - index] = "?"
                    index++;
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
        if(indexMainPosition[1]  + index <= 7 && indexMainPosition[0] - index >= 0){
            if(getType(indexMainPosition[0] - index,indexMainPosition[1] + index) !== type){
                if(getType(indexMainPosition[0] - index,indexMainPosition[1] + index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] + index,oponent) === false){
                        scanGrid[indexMainPosition[0] - index][indexMainPosition[1] + index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] - index,indexMainPosition[1] + index,oponent) === false){
                    scanGrid[indexMainPosition[0] - index][indexMainPosition[1] + index] = "?"
                    index++;
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
        if(indexMainPosition[1]  - index >= 0 && indexMainPosition[0] + index <= 7){
            if(getType(indexMainPosition[0] + index,indexMainPosition[1] - index) !== type){
                if(getType(indexMainPosition[0] + index,indexMainPosition[1] - index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] - index,oponent) === false){
                        scanGrid[indexMainPosition[0] + index][indexMainPosition[1] - index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] - index,oponent) === false){
                    scanGrid[indexMainPosition[0] + index][indexMainPosition[1] - index] = "?"
                    index++;
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
        if(indexMainPosition[1]  + index <= 7 && indexMainPosition[0] + index <= 7){
            if(getType(indexMainPosition[0] + index,indexMainPosition[1] + index) !== type){
                if(getType(indexMainPosition[0] + index,indexMainPosition[1] + index) !== "v"){
                    if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] + index,oponent) === false){
                        scanGrid[indexMainPosition[0] + index][indexMainPosition[1] + index] = "!"
                    }
                    index = 0;
                    break
                }
                else if(setInCheckVerification(indexMainPosition[0],indexMainPosition[1],indexMainPosition[0] + index,indexMainPosition[1] + index,oponent) === false){
                    scanGrid[indexMainPosition[0] + index][indexMainPosition[1] + index] = "?"
                    index++;
                }
                else{
                    index++;
                }
            }
            else{index = 0; break}
        }
        else{index = 0; break}
    }
}
function pawnToQueen(){
    //What?
    //PAWN is evolving!
    //Congratulation! Your PAWN evolved into QUEEN !
    for(let i = 0; i < 8; i++){
        if(logicGrid[0][i] === "p"){
            logicGrid[0][i] = "q";
        }
    }
    for(let i = 0; i < 8; i++){
        if(logicGrid[7][i] === "P"){
            logicGrid[7][i] = "Q";
        }
    }
    logicGridConvertToVisualGrid()
}