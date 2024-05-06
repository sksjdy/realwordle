const 정답 = "CHELS";

let attempt = 0;
let index = 0;

function appStart() {
  const nextLine = () => {
    if (attempt === 6) return gameover();
    attempt++;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
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

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempt}${index}']`
    );

    if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
