
let beats = 0;
let xp = 0;
let nextLevelXP = 5;
let Lvl = 1;

let beatsPerClick = 1;
let volumeLvl = 1;
let PerClickUpgradeCost = 10;

let tempoLvl = 1;
let tempoUpgradeCost = 100;

let autoScratchTempo = 1000;
let autoScratchPrice = 10;
let autoScratchLvl = 0;

let scratchAudioVolume = 10;

let discs = [
  "./images-videos/broken-record-png.png",
  "./images-videos/Vinyl.png",
  "./images-videos/SilverVinyl.png",
  "./images-videos/goldVinyl.png",
  "./images-videos/pinkVinyl.png",
  "./images-videos/RubyVinyl.png",
  "./images-videos/DiamondVinyl.png"
  ];

let backgrounds = [
  "./images-videos/BasementVideo.mp4",
  "./images-videos/BedroomVideo.mp4",
  "./images-videos/ClubVideo.mp4",
  "./images-videos/eventVideo.mp4",
  "./images-videos/BackgroundVideo4.mp4",
  "./images-videos/SEE-YOU-DROP.mp4"
]

let music = [
  "./audio/ChillJazz.mp3",
  "./audio/HouseBeat.mp3",
  null,
  "./audio/Feel-The-Ground-Shake.mp3",
  null,
  null,
]

let djScratches = [
  "./audio/djScratch1.mp3",
  "./audio/djScratch2.mp3",
  "./audio/djScratch3.mp3",
  "./audio/djScratch4.mp3"
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
const bgAudio = document.getElementById("bgAudio");

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
const tempoCost = document.getElementById("tempoCost");

const volumeCost = document.getElementById("volumeCost");

document.addEventListener("DOMContentLoaded", () => {
  const musicVolumeSlider = document.getElementById("musicVolumeSlider");
  const musicVolumePercent = document.getElementById("musicVolumePercent");
  const sfxVolumeSlider = document.getElementById("sfxVolumeSlider");
  const sfxVolumePercent = document.getElementById("sfxVolumePercent");
  const bgVideo = document.getElementById("bgVideo");
  if (bgVideo && bgAudio) {
    bgVideo.volume = musicVolumeSlider.value / 100;
    bgAudio.volume = musicVolumeSlider.value / 100;
    musicVolumePercent.textContent = `${musicVolumeSlider.value}%`;

    airHorn = new Audio("./audio/dj-airhorn.mp3");
    reVerse = new Audio("./audio/re-verse-dj.mp3");

    function enableVideoSound() {
      bgVideo.muted = false;
      bgVideo.play();
      document.removeEventListener("click", enableVideoSound);
    }
    document.addEventListener("click", enableVideoSound);

    musicVolumeSlider.addEventListener("input", (e) => {
      bgVideo.volume = e.target.value / 100;
      bgAudio.volume = e.target.value / 100;
      musicVolumePercent.textContent = `${e.target.value}%`;
    });

    sfxVolumeSlider.addEventListener("input", (e) => {
      scratchAudioVolume = e.target.value;
      airHorn.volume = (e.target.value / 100)+0.2;
      reVerse.volume = (e.target.value / 100)+0.2;
      sfxVolumePercent.textContent = `${e.target.value}%`;
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
  scratchAudio();
  if (xp >= nextLevelXP) {
    levelUp();
  }
  xp += 1;
  updateDisplay();
});

function scratchAudio() {
  const randomIndex = Math.floor(Math.random() * djScratches.length);
  const scratchSound = new Audio(djScratches[randomIndex]);
  scratchSound.volume = scratchAudioVolume /100;
  scratchSound.play();
}

autoScratchButton.addEventListener("click", () => {
  if (beats >= autoScratchPrice) {
    airHorn.play();
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
  if(beats >= tempoUpgradeCost) {
    beats -= tempoUpgradeCost;
    tempoKnob.style.setProperty('--tempoKnob-rotation', `${tempoLvl * 18}deg`);
    tempoLvl++;
    autoScratchTempo = autoScratchTempo - 100;
    tempoUpgradeCost = Math.floor(tempoUpgradeCost * 1.5);
    updateDisplay();
  }

});

function levelUp() {
  Lvl++;
  reVerse.play();
  let LevelUpIndex = Lvl -1;
  if (LevelUpIndex >= discs.length) {
    LevelUpIndex = discs.length - 1; 
  }
  djButton.src = discs[LevelUpIndex];

  if (LevelUpIndex >= backgrounds.length) {
    LevelUpIndex = backgrounds.length - 1;
  }
  
  bgVideo.src = backgrounds[LevelUpIndex];

  if (LevelUpIndex >= music.length) {
    LevelUpIndex = music.length - 1;
  }
  bgAudio.pause();
  bgAudio.currentTime = 0;
  bgAudio.src = music[LevelUpIndex];
  bgAudio.play();

  levelText.textContent = 'LVL ' + Lvl;
  
  nextLevelXP = Math.floor(nextLevelXP * 2.5);
  xpSlider.max = nextLevelXP;
  xpSlider.min = xp;
  nextLevelXp.textContent = `${nextLevelXP}xp`;

  
}

// Tooltip logic
function createTooltip(text, x, y) {
  const tooltip = document.createElement('div');
  tooltip.className = 'custom-tooltip';
  tooltip.textContent = text;
  tooltip.style.position = 'fixed';
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
  tooltip.style.zIndex = 2000;
  document.body.appendChild(tooltip);
  return tooltip;
}

function removeTooltip(tooltip) {
  if (tooltip) tooltip.remove();
}

function getUpgradeTooltip(type) {
  if (type === 'volume') {
    return `Volume Level: ${volumeLvl}\nBeats per click: ${beatsPerClick}\nUpgrade cost: ${PerClickUpgradeCost}`;
  }
  if (type === 'tempo') {
    return `Tempo Level: ${tempoLvl}\nAuto-scratch speed: ${autoScratchTempo}ms\nUpgrade cost: ${tempoUpgradeCost}`;
  }
  return '';
}
// Volume knob tooltip
let volumeTooltip;
volumeKnob.addEventListener('mouseenter', (e) => {
  volumeTooltip = createTooltip(getUpgradeTooltip('volume'), e.clientX + 10, e.clientY + 10);
});
volumeKnob.addEventListener('mouseleave', () => {
  removeTooltip(volumeTooltip);
});

// Tempo knob tooltip
let tempoTooltip;
tempoKnob.addEventListener('mouseenter', (e) => {
  tempoTooltip = createTooltip(getUpgradeTooltip('tempo'), e.clientX + 10, e.clientY + 10);
});
tempoKnob.addEventListener('mouseleave', () => {
  removeTooltip(tempoTooltip);
});



function updateDisplay() {
  beatsDisplay.textContent = `${beats} Beats`;
  volumeCost.innerHTML = `Gain<br><span class="priceText">${PerClickUpgradeCost}</span>`;
  tempoCost.innerHTML = `Tempo<br><span class="priceText">${tempoUpgradeCost}</span>`;

  volumeKnobLvl.innerHTML = `${String(volumeLvl).padStart(2, '0')}`;
  tempoKnobLvl.innerHTML = `${String(tempoLvl).padStart(2, '0')}`;

  if (xpSlider) {
    xpSlider.value = xp;
  }

  currentXp.textContent = `${xp}xp`;

}
