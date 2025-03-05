function IsPat(type){
    if(type === "w"){
        if(logicGrid.some(row => row.includes('q'))){return false}
        if(logicGrid.some(row => row.includes('n'))){return false}
        if(logicGrid.some(row => row.includes('b'))){return false}
        if(logicGrid.some(row => row.includes('r'))){return false}
        if(logicGrid.some(row => row.includes('p'))){
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "p") {
                            if(pawnScan("w",listToString([row,col])) === true){
                                return false
                            }
                        }
                    }
            }
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "k") {
                            if(kingScan("w",listToString([row,col])) === false){
                                return true
                            }
                        }
                    }
            }
            return false;
        }
        else{
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "k") {
                            if(kingScan("w",listToString([row,col])) === false){
                                return true
                            }
                        }
                    }
            }
            return false;
        }
    }
    if(type === "b"){
        if(logicGrid.some(row => row.includes('Q'))){console.log("PAT_DETECTION : queen was find");console.log("PAT_DETECTION : No Pat Detected"); return false}
        if(logicGrid.some(row => row.includes('N'))){console.log("PAT_DETECTION : knight was find");console.log("PAT_DETECTION : No Pat Detected"); return false}
        if(logicGrid.some(row => row.includes('B'))){console.log("PAT_DETECTION : bishop was find");console.log("PAT_DETECTION : No Pat Detected"); return false}
        if(logicGrid.some(row => row.includes('R'))){console.log("PAT_DETECTION : rook was find");console.log("PAT_DETECTION : No Pat Detected"); return false}
        if(logicGrid.some(row => row.includes('P'))){
            console.log("PAT_DETECTION : pawn was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "P") {
                            if(pawnScan("b",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : pawn can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : pawn can't move");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "K") {
                            if(kingScan("b",listToString([row,col])) === false){
                                console.log("PAT_DETECTION : king can't move");
                                console.log("PAT_DETECTION : Pat Detected")
                                return true
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : king can move");
            console.log("PAT_DETECTION : No Pat Detected")
            return false;
        }
        else{
            console.log("PAT_DETECTION : only king was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "K") {
                            if(kingScan("b",listToString([row,col])) === false){
                                console.log("PAT_DETECTION : king can't move");
                                console.log("PAT_DETECTION : Pat Detected")
                                return true
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : king can move");
            console.log("PAT_DETECTION : No Pat Detected")
            return false;
        }
    }
}