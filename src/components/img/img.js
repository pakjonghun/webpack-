import rainbow from "../../rainbow.jpg";
import "./img.css";

class Img {
  render(alt) {
    const body = document.querySelector("body");
    const img = document.createElement("img");
    img.src = rainbow;
    img.alt = alt;

    body.appendChild(img);
  }
}

export default Img;
