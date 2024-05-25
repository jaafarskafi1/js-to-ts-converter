import { greet } from "./utils";
import { Header } from "./components/header";

console.log(greet("World"));

const header = new Header();
header.render();