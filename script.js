/* ===============================
   CONFIG
=============================== */
const INVENTORY_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv";

const SERVICES_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=1319615574&single=true&output=csv";

/* ===============================
   SIMPLE LOADER HANDLER
=============================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => loader.remove(), 500);
  }, 1200); // loader visible for 1.2s (smooth UX)
});


/* ===============================
   SAFE CSV PARSER
=============================== */
function parseCSV(text) {
  return text
    .trim()
    .split("\n")
    .slice(1)
    .map(row =>
      row
        .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
        ?.map(c => c.replace(/^"|"$/g, "").trim())
    )
    .filter(row => row && row.length);
}

/* ===============================
   INVENTORY
=============================== */
const inventoryBody = document.querySelector("#inventoryTable tbody");

if (inventoryBody) {
  fetch(INVENTORY_CSV)
    .then(res => res.text())
    .then(csv => {
      const rows = parseCSV(csv);

      rows.forEach(cols => {
        const [name, category, price, discount, net] = cols;

        inventoryBody.insertAdjacentHTML("beforeend", `
          <tr>
            <td>${name}</td>
            <td>${category}</td>
            <td>${price}</td>
            <td>${discount}</td>
            <td>${net}</td>
            <td>
              <a href="https://wa.me/923025070541?text=Inquiry%20for%20${encodeURIComponent(name)}"
                 target="_blank">WhatsApp</a>
            </td>
          </tr>
        `);
      });
    })
    .catch(err => console.error("Inventory error:", err));
}

/* ===============================
   SERVICES
=============================== */
const servicesContainer = document.getElementById("services");

if (servicesContainer) {
  fetch(SERVICES_CSV)
    .then(res => res.text())
    .then(csv => {
      const rows = parseCSV(csv);

      rows.forEach(cols => {
        const [title, desc, specs] = cols;

        servicesContainer.insertAdjacentHTML("beforeend", `
          <div class="card">
            <h3>${title}</h3>
            <p>${desc}</p>
            <small>${specs}</small><br>
            <a href="https://wa.me/923025070541?text=Inquiry%20for%20${encodeURIComponent(title)}"
               target="_blank">WhatsApp</a>
          </div>
        `);
      });
    })
    .catch(err => console.error("Services error:", err));
}

/* ===============================
   SOLAR CALCULATOR
=============================== */
function calculateSolar() {
  const input = document.getElementById("units");
  const result = document.getElementById("result");

  if (!input || !result) return;

  const units = Number(input.value);
  if (!units || units <= 0) {
    result.innerHTML = "Please enter valid monthly units.";
    return;
  }

  const kw = units / 120;
  const panels = Math.ceil((kw * 1000) / 580);

  result.innerHTML = `
    <strong>System Size:</strong> ${kw.toFixed(2)} kW<br>
    <strong>Panels Required:</strong> ${panels}
  `;
}
