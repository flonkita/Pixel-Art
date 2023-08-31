let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let heightValue = document.getElementById("height-value");
let widthValue = document.getElementById("width-value");

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

gridButton.addEventListener("click", () => {
  container.innerHTML = "";
  for (let i = 0; i < gridHeight.value; i++) {
    let div = document.createElement("div");
    div.classList.add("gridRow");

    for (let j = 0; j < gridWidth.value; j++) {
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `gridCol-${j}-${i}`);
      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton.value;
        }
      });

      col.addEventListener(events[deviceType].move, (e) => {
        let elementId = e.target.id;
        checker(elementId);
      });

      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });

      div.appendChild(col);
    }

    container.appendChild(div);
  }
});

function checker(elementId) {
  let element = document.getElementById(elementId);
  if (element) {
    if (draw && !erase) {
      element.style.backgroundColor = colorButton.value;
    } else if (draw && erase) {
      element.style.backgroundColor = "transparent";
    }
  }
}

clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
  erase = true;
});

paintBtn.addEventListener("click", () => {
  erase = false;
});

gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

document.getElementById("save-button").addEventListener("click", () => {
  html2canvas(container, {
    width: gridWidth.value * 16, // Remplacez 40 par la largeur de vos cases (peut nécessiter ajustement)
    height: gridHeight.value * 16, // Remplacez 40 par la hauteur de vos cases (peut nécessiter ajustement)
  }).then((canvas) => {
    const imageDataURL = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imageDataURL;
    downloadLink.download = "pixel_art.png";
    downloadLink.click();
  });
});

window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
};
