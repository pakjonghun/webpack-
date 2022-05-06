import "./hellowWorld.scss";

class HellowButton {
  buttonCssClass = "hellow-button";
  render() {
    const button = document.createElement("button");
    button.innerHTML = "hel12312low";
    button.classList.add(this.buttonCssClass);
    button.addEventListener("click", () => {
      const p = document.createElement("p");
      p.classList.add("hellow-p");
      p.innerHTML = "hellow";
      body.append(p);
    });

    const body = document.querySelector("body");
    body.appendChild(button);
    ``;
  }
}

export default HellowButton;
