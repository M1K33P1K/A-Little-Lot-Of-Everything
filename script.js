document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');

      // Hide all tab contents
      tabContents.forEach(content => {
        content.classList.remove('active');
      });

      // Show the selected tab content
      const selectedTab = document.getElementById(tabId);
      selectedTab.classList.add('active');

      // Remove 'active' class from all tab buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      // Add 'active' class to the clicked tab button
      this.classList.add('active');
    });
  });
let space = parseFloat(localStorage.getItem("space")) || 1;
let heat = parseFloat(localStorage.getItem("heat")) || 100;
let matter = parseFloat(localStorage.getItem("matter")) || 0;
let hasStar = localStorage.getItem("hasStar") === "true" || false;

// Function to update the space score
function updateSpace() {
    document.getElementById("space").textContent = space.toFixed(2);
}

// Function to update the heat level
function updateHeat() {
    document.getElementById("heat").textContent = heat.toFixed(2);
}

// Function to update the matter level
function updateMatter() {
    document.getElementById("matter").textContent = matter.toFixed(2);
}

// Function to calculate expansion speed
function calculateExpansionSpeed() {
    return 1 * (space / 1000);
}

// Function to decrease heat over time
function decreaseHeat() {
    heat *= 0.9999;
    updateHeat();
}

// Function to increase space over time
function expandUniverse() {
    const expansionSpeed = calculateExpansionSpeed();
    space += expansionSpeed;
    updateSpace();
    decreaseHeat();
}

// Update space, heat, and matter every 10 milliseconds (for smoother animation)
setInterval(expandUniverse, 10);

// Function to display exploration result as text above the explore button
function displayExplorationResult(result) {
    const explorationResult = document.getElementById("explorationResult");
    explorationResult.textContent = result;
    explorationResult.classList.remove("hidden");
}

// Exploration functionality
const exploreButton = document.getElementById("exploreButton");

exploreButton.addEventListener("click", explore);

function explore() {
    const explorationChance = Math.random(); // Random chance to find matter
    if (explorationChance < 0.5) { // Adjust this probability as needed
        const matterGathered = Math.random() * 10; // Gather between 0 and 10 matter
        matter += matterGathered;
        updateMatter();
        displayExplorationResult(`You explored and gathered ${matterGathered.toFixed(2)} matter!`);
    } else {
        displayExplorationResult("You explored but found nothing.");
    }
}

// Shop menu functionality
const shopButton = document.getElementById("shopButton");
const shopMenu = document.getElementById("shopMenu");
const shopItems = document.querySelectorAll(".shopItem");
const createStarButton = document.querySelector(".createStar");

shopItems.forEach(item => {
    item.addEventListener("click", buyItem);
});
createStarButton.addEventListener("click", createStar);

function toggleShopMenu() {
    shopMenu.classList.toggle("hidden");
}

function buyItem() {
    const cost = parseInt(this.dataset.cost);
    if (space >= cost) {
        space -= cost;
        updateSpace();
        alert("Item purchased successfully!");
    } else {
        alert("Not enough space to buy this item.");
    }
}

function createStar() {
    const cost = parseInt(this.dataset.cost);
    if (matter >= cost) {
        matter -= cost;
        updateMatter();
        hasStar = true;
        localStorage.setItem("hasStar", hasStar);
        alert("You have created a star! It will now generate heat and progress for you.");
    } else {
        alert("Not enough matter to create a star.");
    }
}

// Save and load functionality
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");

saveButton.addEventListener("click", saveProgress);
loadButton.addEventListener("click", loadProgress);

function saveProgress() {
    localStorage.setItem("space", space);
    localStorage.setItem("heat", heat);
    localStorage.setItem("matter", matter);
    localStorage.setItem("hasStar", hasStar);
    alert("Progress saved!");
}

function loadProgress() {
    const savedSpace = parseFloat(localStorage.getItem("space"));
    const savedHeat = parseFloat(localStorage.getItem("heat"));
    const savedMatter = parseFloat(localStorage.getItem("matter"));
    const savedHasStar = localStorage.getItem("hasStar") === "true";
    if (!isNaN(savedSpace) && !isNaN(savedHeat) && !isNaN(savedMatter)) {
        space = savedSpace;
        heat = savedHeat;
        matter = savedMatter;
        hasStar = savedHasStar;
        updateSpace();
        updateHeat();
        updateMatter();
        alert("Progress loaded!");
    } else {
        alert("No saved progress found.");
    }
}

// Update space, heat, and matter displays on page load
window.onload = function() {
    updateSpace();
    updateHeat();
    updateMatter();
};
// Developer Console functionality
const commandInput = document.getElementById("commandInput");
const executeCommandButton = document.getElementById("executeCommandButton");

executeCommandButton.addEventListener("click", executeCommand);

function executeCommand() {
    const command = commandInput.value.trim();
    if (command !== "") {
        try {
            // Execute the command
            const result = evalCommand(command);
            console.log("Result:", result);
        } catch (error) {
            console.error("Error executing command:", error);
        }
        // Clear the input
        commandInput.value = "";
    }
}

function evalCommand(command) {
    const parts = command.split(" ");
    const action = parts[0];
    const args = parts.slice(1);

    switch (action) {
        case "set":
            return setVariable(args[0], parseFloat(args[1]));
        case "increase":
            return increaseVariable(args[0], parseFloat(args[1]));
        case "decrease":
            return decreaseVariable(args[0], parseFloat(args[1]));
        case "reset":
            return resetGame();
        case "help":
            return displayHelp();
        default:
            throw new Error("Unknown command");
    }
}

function setVariable(variableName, value) {
    window[variableName] = value;
    return `${variableName} set to ${value}`;
}

function increaseVariable(variableName, amount) {
    window[variableName] += amount;
    return `${variableName} increased by ${amount}`;
}

function decreaseVariable(variableName, amount) {
    window[variableName] -= amount;
    return `${variableName} decreased by ${amount}`;
}

function resetGame() {
    // Reset all game variables to their initial values
    space = 1;
    heat = 100;
    matter = 0;
    // Add additional reset actions as needed
    return "Game reset";
}

function displayHelp() {
    return `Available commands:
- set variableName value: Set the value of a variable
- increase variableName amount: Increase the value of a variable
- decrease variableName amount: Decrease the value of a variable
- reset: Reset the game to its initial state
- help: Display this help message`;
}
});
