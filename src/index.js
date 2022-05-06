import HellowButton from "./components/hellowWorldButton";
import Header from "./components/header/header.js";

const hellow = new HellowButton();
const header = new Header();
header.render();
hellow.render();

if (process.env.NODE_ENV === "production") {
  console.log("production");
}

if (process.env.NODE_ENV === "none") {
  console.log("none");
}

if (process.env.NODE_ENV === "development") {
  console.log("development");
}

hellow.sadf();
