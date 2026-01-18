/* ================================
   GOOGLE SHEETS CSV LINKS
================================ */

const INVENTORY_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv";

const SERVICES_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=1319615574&single=true&output=csv";


/* ================================
   INTRO LOADER (SMOOTH & FIXED)
================================ */

const loader = document.getElementById("loader");
const progressBar = document.querySelector(".progress-bar span");

if (loader && progressBar) {
  let progress = 0;

  // Fake loading for perception
  const fakeLoad = setInterval(() => {
    if (progress < 85) {
      progress += 2;
      progressBar.style.width = progress + "%";
    }
  }, 90);

  // Finish only when everything is loaded
  window.onload = () => {
    clearInterval(fakeLoad);
    progressBar.style.width = "100%";

    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";

      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 400);
  };
}


/* ================================
   CSV PARSER (SAFE & SIMPLE)
================================ */

function parseCSV(text) {
  return text
    .trim()
    .split("\n")
    .slice(1)
    .map(row => row.split(","));
}


/* ================================
   INVENTORY SECTION
================================ */

const inventoryContainer = document.getElementById("inventoryCards");

if (inventoryContainer) {
  fetch(INVENTORY_CSV)
    .then(res => res.text())
    .then(csv => {
      const rows = parseCSV(csv);

      rows.forEach(([name, price, category, discount, image, net]) => {
        inventoryContainer.innerHTML += `
          <div class="card">
            <h3>${name}</h3>
            <p>${category}</p>
            <p>Rs ${net}</p>
            <a href="https://wa.me/923025070541?text=Inquiry:${encodeURIComponent(
              name
            )}" target="_blank">Order</a>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Inventory load error:", err);
    });
}


/* ================================
   SERVICES SECTION
================================ */

const servicesContainer = document.getElementById("services");

if (servicesContainer) {
  fetch(SERVICES_CSV)
    .then(res => res.text())
    .then(csv => {
      const rows = parseCSV(csv);

      rows.forEach(([title, desc, specs]) => {
        servicesContainer.innerHTML += `
          <div class="card">
            <h3>${title}</h3>
            <p>${desc}</p>
            <small>${specs}</small>
          </div>
        `;
      });
    })
    .catch(err => {
      console.error("Services load error:", err);
    });
}


/* ================================
   SOLAR CALCULATOR
================================ */

function calculateSolar() {
  const unitsInput = document.getElementById("units");
  const resultBox = document.getElementById("result");

  if (!unitsInput || !resultBox) return;

  const units = Number(unitsInput.value);

  if (units > 0) {
    const systemSize = (units / 120).toFixed(2);
    resultBox.innerHTML = `Required System: <strong>${systemSize} kW</strong>`;
  } else {
    resultBox.innerHTML = "Please enter valid electricity units.";
  }
}
