function IsPat(type){
    if(type === "w"){
        if(logicGrid.some(row => row.includes('q'))){
            console.log("PAT_DETECTION : queen was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "q") {
                            if(rookScan("w",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : queen can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : queen can't move");
        }
        if(logicGrid.some(row => row.includes('n'))){
            console.log("PAT_DETECTION : knight was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "n") {
                            if(rookScan("w",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : knight can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : kngiht can't move");
        }
        if(logicGrid.some(row => row.includes('b'))){
            console.log("PAT_DETECTION : bishop was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "b") {
                            if(rookScan("w",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : bishop can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : bishop can't move");
        }
        if(logicGrid.some(row => row.includes('r'))){
            console.log("PAT_DETECTION : rook was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "r") {
                            if(rookScan("w",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : rook can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : rook can't move");
        }
        if(logicGrid.some(row => row.includes('p'))){
            console.log("PAT_DETECTION : pawn was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "p") {
                            if(pawnScan("w",listToString([row,col])) === true){
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
                        if (logicGrid[row][col] === "k") {
                            if(kingScan("w",listToString([row,col])) === false){
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
                        if (logicGrid[row][col] === "k") {
                            if(kingScan("w",listToString([row,col])) === false){
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
    if(type === "b"){
        if(logicGrid.some(row => row.includes('Q'))){
            console.log("PAT_DETECTION : queen was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "Q") {
                            if(rookScan("b",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : queen can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : queen can't move");
        }
        if(logicGrid.some(row => row.includes('N'))){
            console.log("PAT_DETECTION : knight was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "N") {
                            if(rookScan("b",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : knight can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : kngiht can't move");
        }
        if(logicGrid.some(row => row.includes('B'))){
            console.log("PAT_DETECTION : bishop was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "B") {
                            if(rookScan("b",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : bishop can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : bishop can't move");
        }
        if(logicGrid.some(row => row.includes('R'))){
            console.log("PAT_DETECTION : rook was find");
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                        if (logicGrid[row][col] === "R") {
                            if(rookScan("b",listToString([row,col])) === true){
                                console.log("PAT_DETECTION : rook can move");
                                console.log("PAT_DETECTION : No Pat Detected")
                                return false
                            }
                        }
                    }
            }
            console.log("PAT_DETECTION : rook can't move");
        }
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