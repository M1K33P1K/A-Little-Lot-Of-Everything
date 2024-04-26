// JavaScript code

// Variables
let space = 0;
let heat = 100;
let matter = 0;
let sunVisible = false; // Track whether the sun is visible or not

// Event listeners
document.getElementById("exploreButton").addEventListener("click", explore);
document.getElementById("shopMenu").addEventListener("click", handleShopClick);
document.getElementById("feedSunButton").addEventListener("click", feedSun);

// Functions
function explore() {
    // Exploration logic
    // Display exploration result
    document.getElementById("explorationResult").textContent = "You explored and found nothing interesting.";
}

function handleShopClick(event) {
    // Shop menu logic
    const target = event.target;
    if (target.classList.contains("createStar")) {
        createSun();
    }
}

function createSun() {
    // Check if the player has enough matter to create the sun
    if (matter >= 200) {
        // Deduct the cost of creating the sun
        matter -= 200;
        updateMatter();

        // Show the sun
        document.getElementById("sunContainer").classList.remove("hidden");
        sunVisible = true;
    } else {
        alert("You don't have enough matter to create a sun.");
    }
}

function feedSun() {
    // Feed matter to the sun
    if (sunVisible) {
        // Increase heat and decrease matter
        heat += 10;
        matter -= 10;
        updateHeat();
        updateMatter();
    }
}

function updateMatter() {
    document.getElementById("matter").textContent = matter;
}

function updateHeat() {
    document.getElementById("heat").textContent = heat;
}
