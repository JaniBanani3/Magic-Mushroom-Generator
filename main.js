// VARIABLES
// button, title
const randombtn = document.getElementById("randomize-button");
const title = document.getElementById("title");
// imgs
const lamelleImg = document.getElementById("lamelle-img");
const stielImg = document.getElementById("stiel-img");
const hutImg = document.getElementById("hut-img");
// particles, mist
const particleLayer = document.getElementById("particle-layer");
const mistLayer = document.getElementById("mist-layer");
// slots
const slotAdjective = document.querySelector("#slot-adjective span");
const slotLamelle = document.querySelector("#slot-lamelle span");
const slotStiel = document.querySelector("#slot-stiel span");

// LISTS
// Liste der verfügbaren Stiel-Varianten
const stielVariants = [
  "Stiele/Stiel1.png",
  "Stiele/Stiel2.png",
  "Stiele/Stiel3.png",
  "Stiele/Stiel0.png",
];
// Liste der verfügbaren Varianten
const lamelleVariants = [
  "Lamellen/Lamelle1.png",
  "Lamellen/Lamelle2.png",
  "Lamellen/Lamelle3.png",
  "Lamellen/Lamelle0.png",
];
// Liste der verfügbaren Hut-Varianten
const hutVariants = [
  "Hüte/Hut1.png",
  "Hüte/Hut2.png",
  "Hüte/Hut3.png",
  "Hüte/Hut0.png",
];

// Liste an Pilz-Beschreibungen
// adjectives
const adjectiveVariants = [
  "bunter",
  "trippy",
  "halluzinogener",
  "schmackhafter",
];
// descriptive word
const descriptiveVariants = ["Friedens-", "Zauber-", "Stachel-", "Satans-"];
// name
const nameVariants = ["Schwammerl", "Steinpilz", "Röhrling", "Trüffel"];

// FUNKTIONEN
// spores spawnen
function spawnSpores(amount = 12) {
  const rect = particleLayer.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const spore = document.createElement("div");
    spore.className = "spore";

    const x = Math.random() * rect.width;
    const y = rect.height / 2 + Math.random() * 40;

    spore.style.left = `${x}px`;
    spore.style.top = `${y}px`;

    // leichte Farbvariation (pilzig)
    const hue = 40 + Math.random() * 40; // gelb-braun
    spore.style.background = `hsla(${hue}, 60%, 70%, 0.8)`;

    particleLayer.appendChild(spore);

    spore.addEventListener("animationend", () => {
      spore.remove();
    });
  }
}

// slot spinnen
function spinSlot(slotEl, values) {
  // Mini-Jump für Slot-Gefühl
  slotEl.style.transform = "translateY(-100%)";

  setTimeout(() => {
    const value = values[Math.floor(Math.random() * values.length)];
    slotEl.textContent = value;
    slotEl.style.transform = "translateY(0)";
  }, 80);
}

// download mushroom
function downloadMushroom() {
  const canvas = document.getElementById("mushroom-canvas");
  const ctx = canvas.getContext("2d");

  // Canvas leeren
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bilder in richtiger Reihenfolge zeichnen
  ctx.drawImage(stielImg, 0, 0);
  ctx.drawImage(lamelleImg, 0, 0);
  ctx.drawImage(hutImg, 0, 0);

  // Canvas → Download
  const link = document.createElement("a");
  link.download = "mein-pilz.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ON RANDOM BUTTON CLICK
randombtn.addEventListener("click", () => {
  // zufällige Farbe (6-stellige Hex, gepaddet)
  const color = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  title.style.color = "#" + color;

  // 🎰 Slot-Machine Name
  spinSlot(slotAdjective, adjectiveVariants);
  spinSlot(slotLamelle, descriptiveVariants);
  spinSlot(slotStiel, nameVariants);

  // ✨ Effekte
  spawnSpores(16);
  // boostMist();

  // zufälliges Bild tauschen
  if (lamelleImg && lamelleVariants.length > 0) {
    console.log("Changing lamelle image...");
    const idx = Math.floor(Math.random() * lamelleVariants.length);
    lamelleImg.src = lamelleVariants[idx];
  }

  console.log(stielImg);

  // zufälliges Bild tauschen für Stiel
  if (stielImg && stielVariants.length > 0) {
    console.log("Changing stiel image...");
    const idx = Math.floor(Math.random() * stielVariants.length);
    stielImg.src = stielVariants[idx];
  }

  console.log(hutImg);

  // zufälliges Bild tauschen für Hut
  if (hutImg && hutVariants.length > 0) {
    const idx = Math.floor(Math.random() * hutVariants.length);
    hutImg.src = hutVariants[idx];
  }
});

// ON DOWNLOAD BUTTON CLICK
document
  .getElementById("download-btn")
  .addEventListener("click", downloadMushroom);
