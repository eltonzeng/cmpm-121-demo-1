import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;

// Button
const button = document.createElement("button");
button.textContent = "Don't click me 😛";
button.style.backgroundColor = "blue";
button.style.color = "white";
document.body.appendChild(button);

// Counter
let counter: number = 0;
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} mangoes`; // Update content with counter
app.append(counterDiv); // Add counter div to app

// Automatic increment every second
let intervalId: number | undefined = setInterval(() => {
  counter++;
  counterDiv.textContent = `${counter} mangoes`;
}, 1000); // Update every 1 second (1000 milliseconds)

button.addEventListener("click", () => {
  counter++; // Increase counter on click
  counterDiv.textContent = `${counter} mangoes`; // Update counter
});

// Add a button to stop the interval
const stopButton = document.createElement("button");
stopButton.textContent = "Stop Automatic Increment";
document.body.appendChild(stopButton);

stopButton.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
