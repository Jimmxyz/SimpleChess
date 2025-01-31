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
    moveOrder(pieceID,moveStartID,moveEndID);
};