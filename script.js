let beats = 0;
let beatsPerClick = 1;
let upgradeCost = 50;

const beatsDisplay = document.getElementById("beats");
const djButton = document.getElementById("dj-button");
const upgradeButton = document.getElementById("upgrade");

djButton.addEventListener("click", () => {
  beats += beatsPerClick;
  updateDisplay();
});

upgradeButton.addEventListener("click", () => {
  if (beats >= upgradeCost) {
    beats -= upgradeCost;
    beatsPerClick++;
    upgradeCost = Math.floor(upgradeCost * 1.5); 
    updateDisplay();
  }
});

function updateDisplay() {
  beatsDisplay.textContent = `Beats: ${beats}`;
  upgradeButton.textContent = `Upgrade Beats (Cost: ${upgradeCost})`;
  upgradeButton.disabled = beats < upgradeCost;
}
