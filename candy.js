var candy=["Blue","Green","Orange","Purple","Red","Yellow"];
var board=[];
var row=9;
var columns=9;
var score=0;

var currentTile;
var otherTile;

window.onload=function(){
    startGame();

    //1/10th of a second
    window.setInterval(function(){
        crushCandies();
        slidecandies();
        generate();
    },100);
}

function randomcandies(){
    return candy[Math.floor(Math.random()*candy.length)];
}

function startGame(){
    for(let r=0; r < row;r++){
        let row=[];
        for(let c=0;c< columns;c++){
            //<img id="0-0" src= "./candy/Blue.png">
            let tile=document.createElement("img");
            tile.id=r.toString()+ "-" + c.toString();
            tile.src="./candy/" + randomcandies() +".png";

            //drag function
            tile.addEventListener("dragstart", dragstart); //click on a candy,initalize drag process
            tile.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); //leave cnady over another candy 
            tile.addEventListener("drop", dragDrop); //droping a candy over another candy
            tile.addEventListener("dragend", dragEnd);  //after drag process completed,   we swap candies

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragstart(){
    //this refers to the candy i.e. to be drag
    currentTile=this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragDrop(){
    //this refer to the candy that to be drop
    otherTile=this;
}

function dragEnd(){
    if(currentTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }

    let currentCoords=currentTile.id.split("-"); //id="0-0" -> ["0","0"]
    let r=parseInt(currentCoords[0]);
    let c=parseInt(currentCoords[1]);

    let otherCoords=otherTile.id.split("-");
    let r2=parseInt(otherCoords[0]);
    let c2=parseInt(otherCoords[1]);

    let moveleft=c2==c-1 && r==r2;
    let moveright= c2==c+1 && r==r2;

    let moveup= r2==r-1 && c==c2;
    let movedown= r2==r+1 && c==c2;

    let isAdjacent= moveleft || moveright || moveup || movedown;

    if(isAdjacent){
        let curruentImg=currentTile.src;
        let otherImg=otherTile.src;
        currentTile.src=otherImg;
        otherTile.src=curruentImg;

        let Validmove=checkvalid();
        if(!Validmove){
            let curruentImg=currentTile.src;
            let otherImg=otherTile.src;
            currentTile.src=otherImg;
            otherTile.src=curruentImg;

        }
    }
    
}

function dragLeave(){

}

function crushCandies(){
    crushthree();
    document.getElementById("score").innerText = score;
}

function crushthree(){
    //check rows
    for(let r=0;r<row;r++){
        for(let c=0;c<columns-2;c++){
            let Candy1= board[r][c];
            let Candy2= board[r][c+1];
            let Candy3= board[r][c+2];
            if(Candy1.src == Candy2.src && Candy2.src== Candy3.src && !Candy1.src.includes("blank")){
                Candy1.src="./candy/blank.png";
                Candy2.src="./candy/blank.png";
                Candy3.src="./candy/blank.png";
                score += 50;
            }
        }
    }

    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r<row-2;r++){
            let Candy1= board[r][c];
            let Candy2= board[r+1][c];
            let Candy3= board[r+2][c];
            if(Candy1.src == Candy2.src && Candy2.src== Candy3.src && !Candy1.src.includes("blank")){
                Candy1.src="./candy/blank.png";
                Candy2.src="./candy/blank.png";
                Candy3.src="./candy/blank.png";
                score += 50;
            }
        }
    }
}

function checkvalid(){
     //check rows
     for(let r=0;r<row;r++){
        for(let c=0;c<columns-2;c++){
            let Candy1= board[r][c];
            let Candy2= board[r][c+1];
            let Candy3= board[r][c+2];
            if(Candy1.src == Candy2.src && Candy2.src== Candy3.src && !Candy1.src.includes("blank")){
                return true;
            }
        }
    }

    //check columns
    for(let c=0;c<columns;c++){
        for(let r=0;r<row-2;r++){
            let Candy1= board[r][c];
            let Candy2= board[r+1][c];
            let Candy3= board[r+2][c];
            if(Candy1.src == Candy2.src && Candy2.src== Candy3.src && !Candy1.src.includes("blank")){
               return true
            }
        }
    }
    return false;
}

function slidecandies(){
    for(let c=0;c<columns;c++){
        let ind=row-1;
        for(let r=columns-1;r>=0;r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src=board[r][c].src;
                ind -= 1;
            }
        }

        for(let r=ind;r>=0;r--){
            board[r][c].src= "./candy/blank.png";
        }
    }
}
function generate(){
    for(let c=0;c<columns;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src="./candy/" + randomcandies() + ".png"; 
        }
    }
}










