const { greet } = require("./utils");
const { Header } = require("./components/header");

console.log(greet("World"));
const header = new Header();
header.render();
