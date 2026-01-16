/* CSV LINKS */
const INVENTORY_CSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv";

const SERVICES_CSV =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=1319615574&single=true&output=csv";

/* SIMPLE LOADER */
window.onload = () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.remove(), 1200);
  }
};

/* CSV PARSER */
function parseCSV(text) {
  return text.trim().split("\n").slice(1).map(r => r.split(","));
}

/* INVENTORY */
const inv = document.getElementById("inventoryCards");
if (inv) {
  fetch(INVENTORY_CSV).then(r => r.text()).then(csv => {
    parseCSV(csv).forEach(([name, price, category, discount, image, net]) => {
      inv.innerHTML += `
        <div class="card">
          <h3>${name}</h3>
          <p>${category}</p>
          <p>Rs ${net}</p>
          <a href="https://wa.me/923025070541?text=Inquiry:${encodeURIComponent(name)}">Order</a>
        </div>`;
    });
  });
}

/* SERVICES */
const services = document.getElementById("services");
if (services) {
  fetch(SERVICES_CSV).then(r => r.text()).then(csv => {
    parseCSV(csv).forEach(([title, desc, specs]) => {
      services.innerHTML += `
        <div class="card">
          <h3>${title}</h3>
          <p>${desc}</p>
          <small>${specs}</small>
        </div>`;
    });
  });
}

/* SOLAR CALCULATOR */
function calculateSolar() {
  const u = Number(document.getElementById("units").value);
  document.getElementById("result").innerHTML =
    u > 0 ? `System: ${(u/120).toFixed(2)} kW` : "Enter valid units";
}
