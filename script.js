//by default last index is one that is not in the array currently
let lastFaceIndex = -1;

//get random face to display a winner
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setRandomFace() {
  const cube = document.querySelector(".cube");
  //positions to display the winner face
  const faces = [
    { x: 0, y: 0 }, // Front
    { x: 0, y: 180 }, // Back
    { x: 0, y: 90 }, // Right
    { x: 0, y: -90 }, // Left
    { x: 90, y: 0 }, // Top
    { x: -90, y: 0 }, // Bottom
  ];

  let randomFaceIndex;

  //make sure index never repeats
  do {
    randomFaceIndex = getRandomInt(faces.length);
  } while (randomFaceIndex === lastFaceIndex);

  //assign new latestFace
  lastFaceIndex = randomFaceIndex;
  //pick random face of dice
  const randomFace = faces[randomFaceIndex];

  //edit cube's styles so that the winner face is displayed
  const transformString = `rotateX(${randomFace.x}deg) rotateY(${randomFace.y}deg)`;
  cube.style.transform = transformString;
  //displayWinner
  displayWinner(randomFaceIndex);
}

const faceChangeHandler = () => {
  console.log("This function triggers when cube animation finished");
  setRandomFace();
};

function handleCube() {
  const cube = document.querySelector(".cube");
  cube.classList.remove("reset");
  cube.classList += " animateCube";

  cube.addEventListener("animationend", faceChangeHandler);

  setTimeout(() => {
    cube.classList += " reset";
  }, 2000);

  setTimeout(() => {
    //remove event handler
    cube.removeEventListener("animationed", faceChangeHandler, true);
    //remove animation class
    cube.classList.remove("animateCube");
  }, 2100);
}

function getSingerName(idx) {
  let name = "";
  switch (idx) {
    case 0:
      name = "Haku";
      break;
    case 1:
      name = "Lily";
      break;
    case 2:
      name = "Meiko";
      break;
    case 3:
      name = "Luka";
      break;
    case 4:
      name = "Teto";
      break;
    case 5:
      name = "Miku";
      break;
    default:
      name = "Miku";
      break;
  }

  return name;
}

function displayWinner(index) {
  const images = document.querySelectorAll("img");
  const arrImg = Array.from(images);
  const target = arrImg[index];

  let srcToShow = "./";

  switch (index) {
    case 0:
      srcToShow = "./vocaloids/haku.gif";
      break;
    case 1:
      srcToShow = "./vocaloids/lily.gif";
      break;
    case 2:
      srcToShow = "./vocaloids/meiko.gif";
      break;
    case 3:
      srcToShow = "./vocaloids/luka.gif";
      break;
    case 4:
      srcToShow = "./vocaloids/teto.gif";
      break;
    case 5:
      srcToShow = "./vocaloids/miku.gif";
      break;
    default:
      srcToShow = "./vocaloids/miku.gif";
  }

  document.querySelector(".winner").innerHTML = `
      <div class="child">
          <h1>${getSingerName(index)} will sing for you: 
              <br>
              <img class="thumbnail-small" src=${srcToShow} />
          </h1>
      </div>
      `;
}

document.querySelector("#inputBtn").addEventListener("click", handleCube);
