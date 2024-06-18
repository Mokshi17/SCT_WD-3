let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let isUserVsComputer = false;

document.querySelector("#toggle-mode").addEventListener("click",()=>{
    isUserVsComputer = !isUserVsComputer;
    document.querySelector("#toggle-mode").innerText = isUserVsComputer ? "Toggle-mode (Current: User vs Computer)" : "Toggle-mode (Current: User vs User)";
    resetGame();
});

boxes.forEach(e =>{
    e.innerHTML=""
    e.addEventListener("click",()=>{
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            if (!isGameOver){
                changeTurn();
                if(isUserVsComputer && turn === "O"){
                    computerMove();
            }
        }
        }
    });
});
function changeTurn(){
    if(turn ==="X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}
function cheakWin(){
  let winConditions =
[
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]
for(let i = 0;i<winConditions.length;i++){
    let v0= boxes[winConditions[i][0]].innerHTML;
    let v1= boxes[winConditions[i][1]].innerHTML;
    let v2= boxes[winConditions[i][2]].innerHTML;
 
    if(v0 != "" && v0 === v1 && v0 === v2){
    isGameOver= true;
document.querySelector("#results").innerHTML = turn + " wins";
document.querySelector("#play-again").style.display = "inline"

for(let j=0; j<3; j++){
    boxes[winConditions[i][j]].style.backgroundColor = "#da3838"
    boxes[winConditions[i][j]].style.color = "#000"
}
}
}
}
function cheakDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e=>{
            if(e.innerHTML === "")isDraw = false;
        })
        if(isDraw){
            isGameOver= true;
            document.querySelector("#results").innerHTML="Draw";
            document.querySelector("#play-again").style.display="inline"
        }
    }
}
function resetGame(){
    isGameOver = false;
    turn="X";
    document.querySelector(".bg").style.left="0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display="none";

    boxes.forEach(e=>{
        e.innerHTML="";
        e.style.removeProperty("background-color");
        e.style.color="#000"
    });
}
document.querySelector("#play-again").addEventListener("click",resetGame);
   
function computerMove(){
    let emptyBoxes = [];
    boxes.forEach((box,index)=>{
        if(box.innerHTML === ""){
            emptyBoxes.push(index);
        }
    });
    if(emptyBoxes.length>0){
        let randomIndex = Math.floor(Math.random()* emptyBoxes.length);
        boxes[emptyBoxes[randomIndex]].innerHTML = turn;
        cheakWin();
        cheakDraw();
        if(!isGameOver){
            changeTurn();
        }
    }
}
