import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;

// Button
const button = document.createElement("button");
button.textContent = "Don't click me 😛";
button.style.backgroundColor = "gray";
button.style.color = "white";
document.body.appendChild(button);

// Counter
let counter: number = 0;
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} 🥭s`; // Update content with counter
app.append(counterDiv); // Add counter div to app

// Initialize time difference
let lastTimestamp = 0;

const animate = (timestamp: number) => {
  // Calculate time difference in seconds
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Increase counter
  counter += deltaTime;

  // Update counter display
  counterDiv.textContent = `${Math.floor(counter)} 🥭s`;

  // Request next animation frame
  requestAnimationFrame(animate);
};

// Start animation on page load
requestAnimationFrame(animate);

button.addEventListener("click", () => {
  counter++; // Increase counter on click
  counterDiv.textContent = `${Math.floor(counter)} 🥭s`; // Update counter display
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
