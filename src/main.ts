import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;

// Button to increment counter
const button = document.createElement("button");
button.textContent = "Don't click me 😛";
button.style.backgroundColor = "gray";
button.style.color = "white";
document.body.appendChild(button);

// Counter
let counter: number = 0;
let growthRate: number = 0; // Initialize default growth rate to zero
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} 🥭s`; // Update content with counter
app.append(counterDiv); // Add counter div to app

// Initialize time difference
let lastTimestamp = 0;

const animate = (timestamp: number) => {
  // Calculate time difference in seconds
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Increase counter based on growth rate
  counter += growthRate * deltaTime;

  // Update counter display
  counterDiv.textContent = `${Math.floor(counter)} 🥭s`;

  updatePurchaseButton(); // Continuously check the purchase button status
  requestAnimationFrame(animate); // Request next animation frame
};

requestAnimationFrame(animate); // Start animation on page load

// Button click to manually increase the counter
button.addEventListener("click", () => {
  counter++; // Increase counter on click
  counterDiv.textContent = `${Math.floor(counter)} 🥭s`; // Update counter display
});

// Purchase button for upgrade
const purchaseButton = document.createElement("button");
purchaseButton.textContent = "Purchase Upgrade: 10 🥭s";
purchaseButton.disabled = true; // Initially disabled
app.appendChild(purchaseButton);

// Function to update the purchase button status
const updatePurchaseButton = () => {
  purchaseButton.disabled = counter < 10; // Enable if counter is at least 10
};

// Event listener for purchase button click
purchaseButton.addEventListener("click", () => {
  if (!purchaseButton.disabled) {
    counter -= 10; // Deduct 10 units from counter
    growthRate += 1; // Increment growth rate by 1
    counterDiv.textContent = `${Math.floor(counter)} 🥭s`; // Update counter display
    updatePurchaseButton(); // Update button status after purchase
  }
});

// Game header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
