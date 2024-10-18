import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;

// Counter and growth rate variables
let counter: number = 0;
let growthRate: number = 0; // Initialize default growth rate to zero
const purchases = { A: 0, B: 0, C: 0 }; // Track the number of purchases for each upgrade

const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} 🥭s`; // Update content with counter
app.append(counterDiv); // Add counter div to app

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} 🥭s/sec`; // Display current growth rate
app.append(growthRateDiv); // Add growth rate display

const purchasesDiv = document.createElement("div");
purchasesDiv.textContent = `Purchases: A: ${purchases.A}, B: ${purchases.B}, C: ${purchases.C}`; // Display purchase counts
app.append(purchasesDiv);

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

  // Update the buttons and growth rate display
  updatePurchaseButtons();
  updateStatusDisplay();

  // Request next animation frame
  requestAnimationFrame(animate);
};

// Start animation on page load
requestAnimationFrame(animate);

// Manual counter increment button
const button = document.createElement("button");
button.textContent = "Don't click me 😛";
button.style.backgroundColor = "gray";
button.style.color = "white";
document.body.appendChild(button);

button.addEventListener("click", () => {
  counter++; // Increase counter on click
  counterDiv.textContent = `${Math.floor(counter)} 🥭s`; // Update counter display
});

// Purchase upgrade buttons
const createUpgradeButton = (name: string, cost: number, rateIncrease: number, upgradeType: keyof typeof purchases) => {
  const button = document.createElement("button");
  button.textContent = `Purchase ${name}: ${cost} 🥭s`;
  button.style.color = "white";
  button.disabled = true; // Initially disabled
  app.appendChild(button);

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost; // Deduct cost from counter
      growthRate += rateIncrease; // Increase growth rate
      purchases[upgradeType]++; // Increment the purchase count
      updateStatusDisplay(); // Update the status display
    }
  });

  return button;
};

// Create three upgrade buttons for A, B, and C
const upgradeAButton = createUpgradeButton("A", 10, 0.1, "A");
const upgradeBButton = createUpgradeButton("B", 100, 2.0, "B");
const upgradeCButton = createUpgradeButton("C", 1000, 50.0, "C");

// Function to update the status display (growth rate and purchase counts)
const updateStatusDisplay = () => {
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} 🥭s/sec`;
  purchasesDiv.textContent = `Purchases: A: ${purchases.A}, B: ${purchases.B}, C: ${purchases.C}`;
};

// Function to update the purchase buttons (enable/disable based on counter)
const updatePurchaseButtons = () => {
  upgradeAButton.disabled = counter < 10;
  upgradeBButton.disabled = counter < 100;
  upgradeCButton.disabled = counter < 1000;
};

// Game header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
