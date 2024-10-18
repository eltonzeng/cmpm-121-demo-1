import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;


const button = document.createElement("button");
button.textContent = "Don't click me 😛";
button.style.backgroundColor = "blue"
button.style.color = 'white'
document.body.appendChild(button);

let counter: number = 0;
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} mangoes`; // Update content with counter 
app.append(counterDiv); // Add counter div to app

button.addEventListener("click", () => {
  counter++; // Increase counter on click
  counterDiv.textContent = `${counter} mangoes`; // Update counter 
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
