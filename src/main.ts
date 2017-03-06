import { Trumpicorn } from "./Trumpicorn";

const trumpicorn: Trumpicorn = new Trumpicorn();

document.getElementById("game")!.appendChild(trumpicorn.container);

(window as any).trumpicorn = trumpicorn;
