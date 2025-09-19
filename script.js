let beats = 0;
let xp = 0;
let nextLevelXP = 10;
let Lvl = 1;

let beatsPerClick = 1;
let volumeLvl = 1;
let PerClickUpgradeCost = 10;

let tempoLvl = 1;

let autoScratchTempo = 1000;
let autoScratchPrice = 100;
let autoScratchLvl = 1;

let discs = [
  "./images-videos/broken-record-png.png",
  "./images-videos/Vinyl.png",
  "./images-videos/SilverVinyl.png",
  "./images-videos/goldVinyl.png",
  "./images-videos/pinkVinyl.png",
  ];

let backgrounds = [
  "./images-videos/BackgroundVideo1.mp4",
  "./images-videos/BackgroundVideo2.mp4",
  "./images-videos/BackgroundVideo4.mp4",
]

//settings
const settingsBtn = document.getElementById("settingsBtn");
const settingsTab = document.getElementById("settingsTab");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");

//xp and level
const xpSlider = document.getElementById("xpSlider");
const currentXp = document.getElementById("currentXp");
const nextLevelXp = document.getElementById("nextLevelXp");
const levelText = document.getElementById("levelText");
const bgVideo = document.getElementById("bgVideo");

//auto scratch upgrades
const autoScratchButton = document.getElementById("autoScratchButton");
const autoScratchCost = document.getElementById("autoScratchCost");
const autoScratchLevelText = document.getElementById("autoScratchLevelText");


const beatsDisplay = document.getElementById("beats");
const djButton = document.getElementById("dj-button");
const upgradeButton = document.getElementById("upgrade");
const volumeKnob = document.getElementById("volumeKnob");
const volumeKnobLvl = document.getElementById("volumeKnobLvl");

const tempoKnob = document.getElementById("tempoKnob");
const tempoKnobLvl = document.getElementById("tempoKnobLvl");

const volumeCost = document.getElementById("volumeCost");

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
    levelUp();
  }
  xp += 1;
  updateDisplay();
});

autoScratchButton.addEventListener("click", () => {
  if (beats >= autoScratchPrice) {
    beats -= autoScratchPrice;
    autoScratchLevelText.textContent = "LVL " + (autoScratchLvl + 1);
    autoScratchCost.textContent = `${Math.floor(autoScratchPrice * Math.pow(1.5, volumeLvl))} Beats`;
    setInterval(() => {
      beats += 1;
      xp += 1;
      updateDisplay();
      if (xp >= nextLevelXP) {
        levelUp();
      }
    }, autoScratchTempo);
  }
});

volumeKnob.addEventListener("click", () => {
  if (beats >= PerClickUpgradeCost) {
    beats -= PerClickUpgradeCost;
    volumeKnob.style.setProperty('--volumeKnob-rotation', `${beatsPerClick * 18}deg`);
    volumeLvl++;
    console.log(volumeLvl);
    beatsPerClick++;
    PerClickUpgradeCost = Math.floor(PerClickUpgradeCost * 1.5); 
    updateDisplay();
  }
});

tempoKnob.addEventListener("click", () => {
  if(beats >= )



function levelUp() {
  Lvl++;
  let LevelUpIndex = Lvl -1;
  if (LevelUpIndex >= discs.length) {
    LevelUpIndex = discs.length - 1; 
  }
  djButton.src = discs[LevelUpIndex];

  if (LevelUpIndex >= backgrounds.length) {
    LevelUpIndex = backgrounds.length - 1;
  }
  
  bgVideo.src = backgrounds[LevelUpIndex];
  levelText.textContent = 'LVL ' + Lvl;
  
  nextLevelXP = Math.floor(nextLevelXP * 2.5);
  xpSlider.max = nextLevelXP;
  xpSlider.min = xp;
  nextLevelXp.textContent = `${nextLevelXP}xp`;

  
}

function updateDisplay() {
  beatsDisplay.textContent = `${beats} Beats`;
  volumeCost.innerHTML = `Gain<br><span class="priceText">${PerClickUpgradeCost}</span>`;

  volumeKnobLvl.innerHTML = `${String(volumeLvl).padStart(2, '0')}`;

  if (xpSlider) {
    xpSlider.value = xp;
  }

  currentXp.textContent = `${xp}xp`;

}
