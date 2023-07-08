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
let hyp;

gravityZoneElement.addEventListener("mouseenter", calcultateMousePosition);
gravityZoneElement.addEventListener("mouseleave", () => {
  buttonElement.style.transform = `translate(0% ,0%)`;
  clearInterval(interval);
});

window.addEventListener("mousemove", (event) => {
  mousePositionX = event.clientX;
  mousePositionY = event.clientY;
});

function calcultateMousePosition() {
  interval = setInterval(() => {
    // On recuperer la position en X de la souris par rapport au contenu, comme ca le 0 se situe au milieu de ce dernier
    relativeMousePositionX =
      mousePositionX -
      gravityZoneElement.getBoundingClientRect().left -
      gravityZoneElement.offsetWidth / 2;

    // On recuperer la position en X de la souris par rapport au contenu, comme ca le 0 se situe au milieu de ce dernier
    relativeMousePositionY =
      mousePositionY -
      gravityZoneElement.getBoundingClientRect().top -
      gravityZoneElement.offsetHeight / 2;

    // On recupere l'angle de la souri juste pour pouvoir avoir le cos/sin à la fin
    angle = Math.atan2(relativeMousePositionY, relativeMousePositionX);
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    // On recupere l'hyp de la souri juste pour pouvoir avoir le cos/sin à la fin
    hyp = Math.sqrt(
      relativeMousePositionX * relativeMousePositionX +
        relativeMousePositionY * relativeMousePositionY
    );

    //15 / 50 × 100 = 30%
    // il faut que plus la distance entre la souris et le bouton diminue, plus le translate soit fort
    // d'ou le (gravityZoneElement.offsetWidth / 2 - Math.abs(relativeMousePositionX)) qui équivaut à une distance d'equart

    let translateX = Math.round(
      ((gravityZoneElement.offsetWidth / 2 - Math.abs(relativeMousePositionX)) /
        (gravityZoneElement.offsetWidth / 2)) *
        100
    );
    let translateY = Math.round(
      ((gravityZoneElement.offsetWidth / 2 - Math.abs(relativeMousePositionY)) /
        (gravityZoneElement.offsetWidth / 2)) *
        100
    );

    translateX *= cos * 0.5;
    translateY *= sin * 0.5;
    if (translateX > 80 && translateY > 80) {
      translateX =
        (relativeMousePositionX / (gravityZoneElement.offsetWidth / 2)) * 100;
      translateY =
        (relativeMousePositionY / (gravityZoneElement.offsetWidth / 2)) * 100;
    }
    buttonElement.style.transform = `translate(${translateX}% ,${translateY}%)`;
  }, 1000 / 120);
}
