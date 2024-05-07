const 정답 = "CHELS";

let attempt = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:33vh; left:37vw;background-color:black;width:200px; height:100px;color:white";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempt === 6) return gameover();
    attempt++;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempt}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6baa64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#cab458";
      else block.style.background = "#787c7e";
      block.style.color = "#ffffff";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempt}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const clickKey = (event) => {
    const clickedKeyBox = event.target;
    if (index >= 5) {
      return;
    }
    if (clickedKeyBox.classList.contains("key-block")) {
      const clickedKey = clickedKeyBox.dataset.key;
      const thisBlock = document.querySelector(
        `.board-block[data-index='${attempt}${index}']`
      );
      if (clickedKey === "ENTER") {
        handleEnterKey();
      } else {
        thisBlock.innerText = clickedKey;
        index++;
      }
    }
    console.log(clickedKeyBox.dataset.key);
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeh1 = document.querySelector(".timer");
      timeh1.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("click", clickKey);
}

appStart();
