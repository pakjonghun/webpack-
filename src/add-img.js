import rainbow from "./rainbow.jpg";
import alt from "./altText.txt";

function addImg() {
  const img = document.createElement("img");
  img.alt = alt;
  img.width = 300;
  img.src = rainbow;
  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImg;
