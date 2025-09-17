let beats = 0;
let xp = 0;
let nextLevelXP = 100;

let beatsPerClick = 1;
let volumeLvl = 1;
let PerClickUpgradeCost = 10;



const settingsBtn = document.getElementById("settingsBtn");
const settingsTab = document.getElementById("settingsTab");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");

const xpSlider = document.getElementById("xpSlider");
const currentXp = document.getElementById("currentXp");
const nextLevelXp = document.getElementById("nextLevelXp");

const beatsDisplay = document.getElementById("beats");
const djButton = document.getElementById("dj-button");
const upgradeButton = document.getElementById("upgrade");
const volumeKnob = document.getElementById("volumeKnob");
const volumeKnobLvl = document.getElementById("volumeKnobLvl");

const bassKnob = document.getElementById("bassKnob");

const volumeCost = document.getElementById("volumeCost");

//SETTINGS
document.addEventListener("DOMContentLoaded", () => {
  const musicVolumeSlider = document.getElementById("musicVolumeSlider");
  const musicVolumePercent = document.getElementById("musicVolumePercent");
  const bgVideo = document.getElementById("bgVideo");
  if (bgVideo) {
    bgVideo.volume = musicVolumeSlider.value / 100;
    musicVolumePercent.textContent = `${musicVolumeSlider.value}%`;

    function enableVideoSound() {
      bgVideo.muted = false;
      bgVideo.play();
      document.removeEventListener("click", enableVideoSound);
    }
    document.addEventListener("click", enableVideoSound);

    musicVolumeSlider.addEventListener("input", (e) => {
      bgVideo.volume = e.target.value / 100;
      musicVolumePercent.textContent = `${e.target.value}%`;
    });
  }
});

settingsBtn.addEventListener("click", () => {
  settingsTab.style.display = settingsTab.style.display === "block" ? "none" : "block";
});

closeSettingsBtn.addEventListener("click", () => {
  settingsTab.style.display = "none";
});


djButton.addEventListener("click", () => {
  beats += beatsPerClick;
  if (xp >= nextLevelXP) {
    nextLevelXP = Math.floor(nextLevelXP * 2.5);
    xpSlider.max = nextLevelXP;
    xpSlider.min = xp;
    nextLevelXp.textContent = `${nextLevelXP}xp`;
  }
  xp += 1;
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



function updateDisplay() {
  beatsDisplay.textContent = `${beats} Beats`;
  volumeCost.innerHTML = `Volume<br>${PerClickUpgradeCost} BTs`;

  volumeKnobLvl.innerHTML = `${String(volumeLvl).padStart(2, '0')}`;

  if (xpSlider) {
    xpSlider.value = xp;
  }

  currentXp.textContent = `${xp}xp`;

}
