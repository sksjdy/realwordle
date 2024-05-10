let attempt = 0;
let index = 0;
let timer;
const footer = document.querySelector("footer");

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:33vh; left:42vw;background-color:black;width:200px; height:100px;color:white";
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
  const handleEnterKey = async () => {
    let 맞은_갯수 = 0;
    const 응답 = await fetch("/answer");
    const 정답 = await 응답.json();
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

  const KeyClick = (event) => {
    const boardBlock = event.srcElement.dataset.key;
    const enter = event.target.innerText;
    const text = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );
    if (boardBlock === "Backspace") handleBackspace();
    else if (index === 5) {
      if (enter === "ENTER") handleEnterKey();
      else return;
    } else if (enter !== "ENTER") {
      text.innerText = boardBlock;
      index++;
    }
  };

  const keyTouch = (event) => {
    const boardBlock = event.target.innerText;
    const text = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );
    if (boardBlock === "지우기") handleBackspace();
    else if (index === 5) {
      if (boardBlock === "ENTER") handleEnterKey();
      else return;
    } else if (boardBlock !== "ENTER") {
      text.innerText = boardBlock;
      index++;
    }
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
  footer.addEventListener("click", KeyClick);
  footer.addEventListener("touchend", keyTouch);
}
appStart();
