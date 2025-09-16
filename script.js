let beats = 0;

let beatsPerClick = 1;
let volumeLvl = 1;
let PerClickUpgradeCost = 10;

document.addEventListener("DOMContentLoaded", () => {
  const bgVideo = document.getElementById("bgVideo");
  if (bgVideo) {
    bgVideo.volume = 0.0;
  }
});

const settingsBtn = document.getElementById("settingsBtn");
const beatsDisplay = document.getElementById("beats");
const djButton = document.getElementById("dj-button");
const upgradeButton = document.getElementById("upgrade");
const volumeKnob = document.getElementById("volumeKnob");
const volumeKnobLvl = document.getElementById("volumeKnobLvl");

const bassKnob = document.getElementById("bassKnob");

const volumeCost = document.getElementById("volumeCost");

djButton.addEventListener("click", () => {
  beats += beatsPerClick;
  updateDisplay();
});

volumeKnob.addEventListener("click", () => {
  if (beats >= PerClickUpgradeCost) {
    beats -= PerClickUpgradeCost;
    volumeKnob.style.setProperty('--volumeKnob-rotation', `${beatsPerClick * 20}deg`);
    volumeLvl++;
    console.log(volumeLvl);
    beatsPerClick++;
    PerClickUpgradeCost = Math.floor(PerClickUpgradeCost * 1.5); 
    updateDisplay();
  }
});

settingsBtn.addEventListener("click", () => {
  alert("Settings are not available yet.");
});

function updateDisplay() {
  beatsDisplay.textContent = `${beats} Beats`;
  volumeCost.innerHTML = `Volume<br>${PerClickUpgradeCost} BTs`;

  volumeKnobLvl.innerHTML = `${String(volumeLvl).padStart(2, '0')}`;

}
