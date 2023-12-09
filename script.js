const boxes = document.querySelector(".boxes");
const colors = [
  "aqua",
  "red",
  "yellow",
  "blueviolet",
  "chartreuse",
  "coral",
  "green",
  "hotpink",
];
const colorList = [...colors, ...colors];
// console.log(colorList)
const boxLength = colorList.length;
//!initializing the game element
let revealCount = 0;
let activeBox = null;
let waitingTime = false;

function buildBoxes(color) {
  const element = document.createElement("div");
  element.classList.add("box");
  element.setAttribute("data-color", color);
  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");
    if (waitingTime || revealed === "true" || element == activeBox) {
      return;
    }
    element.style.backgroundColor = color;
    if (!activeBox) {
      activeBox = element;
      return;
    }
    // console.log(activeBox)
    const colorMatch = activeBox.getAttribute("data-color");
    if (colorMatch === color) {
      activeBox.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      waitingTime = false;
      activeBox = null;
      revealCount += 2;
      if (revealCount === boxLength) {
        alert("Congratulations! You Won!  Refresh to play again");
      }
      return;
    }
    waitingTime = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeBox.style.backgroundColor = null;
      waitingTime = false;
      activeBox = null;
    }, 1000);
  });

  return element;
}
//!Builiding the box of game
for (let i = 0; i < boxLength; i++) {
  const randomIndex = Math.floor(Math.random() * colorList.length);
  const color = colorList[randomIndex];
  const box = buildBoxes(color);

  //!Using splice method to  avoid 3 repeats calls
  colorList.splice(randomIndex, 1);
  // console.log(color);
  boxes.append(box);
}
