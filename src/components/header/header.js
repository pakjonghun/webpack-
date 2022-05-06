import "./header.css";

class Header {
  render() {
    const header = document.createElement("h1");
    header.classList.add("header");
    header.innerHTML = "header";
    const body = document.querySelector("body");
    body.appendChild(header);
  }
}

export default Header;
