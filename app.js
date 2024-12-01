//All Id and class (All attributes)

const boxes = document.querySelectorAll(".box");
const message = document.querySelector(".msg-container");
const msgBox = document.querySelector("#message");
const nextBtn = document.querySelector("#next");
const resetBtn = document.querySelector("#reset");

//Music list for the game

const over = new Audio('gameover.mp3');
const next = new Audio('next.mp3');
const playgame = new Audio('playgame.mp3');

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO){
            //playerO
            box.innerText = "O";
            turnO = false;
            next.play();
        }else{
            //playerX
            box.innerText = "X";
            turnO = true;
            next.play()
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
            gameover();
        }
    });
});

const checkWinner = () =>{

    for(let pattern of winPatterns){
        let paval1 = boxes[pattern[0]].innerHTML;
        let paval2 = boxes[pattern[1]].innerHTML;
        let paval3 = boxes[pattern[2]].innerHTML;

        if(paval1 != "" && paval2 != "" && paval3 !=""){
            if(paval1 === paval2 && paval2 === paval3){
                showWinner(paval1);
                return true;
            }
        }
    }
};

const showWinner = (winner)=>{
    msgBox.innerText = `Congratulations, the Winner is ${winner}`;
    msgBox.classList.remove("hide");
    disabled();
    over.play();
};

const disabled = () =>{
    for(box of boxes){
        box.disabled = true;
    };
};

const enableGame = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    };
};
const resetNow = () =>{
    msgBox.classList.add("hide");
    enableGame()
    count = 0;
    turnO = true;
}

const gameDraw = () =>{
    msgBox.innerHTML = "Game is Dram, please again the game";
    msgBox.classList.remove("hide");
    disabled();

};


resetBtn.addEventListener('click', resetNow);
nextBtn.addEventListener('click', resetNow);
