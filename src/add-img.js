import rainbow from "./rainbow.jpg";

function addImg() {
  const img = document.createElement("img");
  img.alt = "rainbow";
  img.width = 300;
  img.src = rainbow;
  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImg;
