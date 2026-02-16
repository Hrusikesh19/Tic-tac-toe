let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn");

let turnO = true;
let count = 0;

const winPatterns = [
  [0,1,2],[0,3,6],[0,4,8],
  [1,4,7],[2,5,8],[2,4,6],
  [3,4,5],[6,7,8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnIndicator.innerText = "O";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {

    if (turnO) {
      box.innerHTML = `<img src="assets/cat.jpeg" class="meme">`;
      turnO = false;
      turnIndicator.innerText = "Monkey 🐒";
    } else {
      box.innerHTML = `<img src="assets/monkey.png" class="meme">`;
      turnO = true;
      turnIndicator.innerText = "Cat 🐱";
    }

    box.disabled = true;
    count++;

    if (checkWinner()) return;

    if (count === 9) {
      gameDraw();
    }
  });
});



const gameDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  let imageSrc =
    winner === "Monkey"
      ? "assets/monkey.png"
      : "assets/cat.jpeg";

  msg.innerHTML = `
    <img src="${imageSrc}" class="winner-meme">
  `;

  msgContainer.classList.remove("hide");
  disableBoxes();
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      boxes[a].innerHTML !== "" &&
      boxes[a].innerHTML === boxes[b].innerHTML &&
      boxes[b].innerHTML === boxes[c].innerHTML
    ) {
      let winner = boxes[a].innerHTML.includes("monkey")
  ? "Monkey"
  : "Cat";


      showWinner(winner);
      return true;
    }
  }
  return false;
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
