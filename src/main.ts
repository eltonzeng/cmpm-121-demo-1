import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;

const button = document.createElement('button');
button.textContent = "Don't click me 😛";
document.body.appendChild(button);

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
