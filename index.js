const buttonElement = document.getElementById("button");
const gravityZoneElement = document.getElementById("gravityZone");
let mousePositionX = 0;
let mousePositionY = 0;
let relativeMousePositionX;
let relativeMousePositionY;
// The "Zero pixel" postion
let initRelativeButtonPosition =
  gravityZoneElement.offsetHeight / 2 - buttonElement.offsetHeight / 2;
let interval;
let angle;

gravityZoneElement.addEventListener("mouseenter", calcultateMousePosition);
gravityZoneElement.addEventListener("mouseleave", () => {
  let marginleft = initRelativeButtonPosition;
  let marginTop = initRelativeButtonPosition;
  buttonElement.style.left = `${marginleft}px`;
  buttonElement.style.top = `${marginTop}px`;
  clearInterval(interval);
});

window.addEventListener("mousemove", (event) => {
  mousePositionX = event.clientX;
  mousePositionY = event.clientY;
});

function calcultateMousePosition() {
  interval = setInterval(() => {
    relativeMousePositionX =
      mousePositionX -
      gravityZoneElement.getBoundingClientRect().left -
      gravityZoneElement.offsetWidth / 2;

    relativeMousePositionY =
      mousePositionY -
      gravityZoneElement.getBoundingClientRect().top -
      gravityZoneElement.offsetHeight / 2;

    angle = Math.atan2(relativeMousePositionY, relativeMousePositionX);

    let coefX = Math.round(
      (gravityZoneElement.offsetWidth / 2 - Math.abs(relativeMousePositionX)) *
        Math.cos(angle) *
        0.5
    );
    let coefY = Math.round(
      (gravityZoneElement.offsetHeight / 2 - Math.abs(relativeMousePositionY)) *
        Math.sin(angle) *
        0.5
    );

    if (coefX > 0 && coefY > 0) {
    }
    let marginleft = initRelativeButtonPosition + coefX;
    let marginTop = initRelativeButtonPosition + coefY;

    buttonElement.style.left = `${marginleft}px`;
    buttonElement.style.top = `${marginTop}px`;
  }, 1000 / 120);
}

// Qu'est ce que je retiens
// Pour trouver une proportionnalité inversée par rapport à un hyp, il suffit juste de prendre l'espace total et de le soustraire
