import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mango Kingdom";
document.title = gameName;

// Interface to define item structure
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

// Add more items with descriptions
const availableItems: Item[] = [
  {
    name: "Mango Tree",
    cost: 10,
    rate: 0.15,
    description: "A small tree bearing juicy mangoes.",
  },
  {
    name: "Mango Farm",
    cost: 100,
    rate: 2,
    description: "A lush farm filled with ripe mangoes.",
  },
  {
    name: "Mango Plantation",
    cost: 1000,
    rate: 50,
    description: "A vast plantation of high-quality mangoes.",
  },
  {
    name: "Mango Factory",
    cost: 5000,
    rate: 200,
    description: "Produces processed mango products at scale.",
  },
  {
    name: "Mango Empire",
    cost: 20000,
    rate: 1000,
    description: "An empire built on the global trade of mangoes.",
  },
];

// Counter and growth rate variables
let counter: number = 0;
let growthRate: number = 0; // Initialize default growth rate to zero
const purchases: { [key: string]: number } = {}; // Track the number of purchases for each upgrade

availableItems.forEach((item) => (purchases[item.name] = 0)); // Initialize purchase counts

const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} 🥭s`;
app.append(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} 🥭s/sec`;
app.append(growthRateDiv);

const purchasesDiv = document.createElement("div");
updatePurchasesDisplay();
app.append(purchasesDiv);

// Store references to buttons
const buttons: { [key: string]: HTMLButtonElement } = {};

// Price increase factor
const priceIncreaseFactor = 1.1;

let lastTimestamp = 0;

// Animation loop
const animate = (timestamp: number) => {
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Increase counter based on growth rate
  counter += growthRate * deltaTime;

  // Update counter display
  counterDiv.textContent = `${Math.floor(counter)} 🥭s`;

  // Update buttons and status
  updatePurchaseButtons();
  updateStatusDisplay();

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

// Manual counter increment button
const button = document.createElement("button");
button.textContent = "Click for 🥭";
button.style.backgroundColor = "gray";
button.style.color = "white";
document.body.appendChild(button);

button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${Math.floor(counter)} 🥭s`;
});

// Create upgrade buttons from the availableItems array
availableItems.forEach((item) => {
  createUpgradeButton(item);
});

// Function to create an upgrade button dynamically
function createUpgradeButton(item: Item) {
  let cost = item.cost;
  const button = document.createElement("button");
  button.textContent = `Purchase ${item.name}: ${cost.toFixed(2)} 🥭s - ${item.description}`;
  button.style.color = "white";
  button.disabled = true;
  app.appendChild(button);

  // Store the button reference
  buttons[item.name] = button;

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost;
      growthRate += item.rate;
      purchases[item.name]++;
      cost *= priceIncreaseFactor;
      button.textContent = `Purchase ${item.name}: ${cost.toFixed(2)} 🥭s - ${item.description}`;
      updateStatusDisplay();
    }
  });

  return button;
}

// Function to update the status display
function updateStatusDisplay() {
  growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} 🥭s/sec`;
  updatePurchasesDisplay();
}

// Function to update the purchase counts display
function updatePurchasesDisplay() {
  purchasesDiv.textContent = `Purchases: ${availableItems
    .map((item) => `${item.name}: ${purchases[item.name]}`)
    .join(", ")}`;
}

// Function to update the purchase buttons based on counter
function updatePurchaseButtons() {
  availableItems.forEach((item) => {
    const button = buttons[item.name]; // Access the button reference
    if (button) {
      button.disabled = counter < item.cost;
    }
  });
}

// Game header
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
