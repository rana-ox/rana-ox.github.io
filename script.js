/* ==============================
   CONFIG
============================== */
const inventoryCSV = "PASTE_GOOGLE_SHEET_1_CSV_LINK_HERE";
const servicesCSV  = "PASTE_GOOGLE_SHEET_2_CSV_LINK_HERE";

/* ==============================
   LOADER SAFE HANDLING
============================== */
const loader   = document.getElementById("loader");
const progress = document.getElementById("progress");

let loadedTasks = 0;
const TOTAL_TASKS = 2;

const LOADER_MIN_TIME = 1800; // milliseconds
const loaderStartTime = Date.now();


function advanceLoader() {
  loadedTasks++;
  if (progress) {
    progress.style.width = (loadedTasks / TOTAL_TASKS) * 100 + "%";
  }

   if (loadedTasks === TOTAL_TASKS && loader) {
  const elapsed = Date.now() - loaderStartTime;
  const remaining = Math.max(0, LOADER_MIN_TIME - elapsed);

  setTimeout(() => {
    loader.style.transition = "opacity 0.5s ease";
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => loader.remove(), 500);
  }, remaining);
}


   
/* ==============================
   INVENTORY FETCH
============================== */
fetch(inventoryCSV)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1);
    const tbody = document.querySelector("#inventoryTable tbody");

    if (tbody) {
      rows.forEach(row => {
        const [name, price, category, discount, image, net] = row.split(",");
        tbody.insertAdjacentHTML("beforeend", `
          <tr>
            <td>${name}</td>
            <td>${category}</td>
            <td>${price}</td>
            <td>${discount}</td>
            <td>${net}</td>
            <td>
              <a href="https://wa.me/923025070541?text=Inquiry:${encodeURIComponent(name)}"
                 target="_blank">WhatsApp</a>
            </td>
          </tr>
        `);
      });
    }

    advanceLoader();
  })
  .catch(err => {
    console.error("Inventory CSV error:", err);
    advanceLoader();
  });

/* ==============================
   SERVICES FETCH
============================== */
fetch(servicesCSV)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.trim().split("\n").slice(1);
    const container = document.getElementById("services");

    if (container) {
      rows.forEach(row => {
        const [title, desc, specs] = row.split(",");
        container.insertAdjacentHTML("beforeend", `
          <div class="card">
            <h3>${title}</h3>
            <p>${desc}</p>
            <small>${specs}</small>
            <a href="https://wa.me/923025070541?text=Inquiry:${encodeURIComponent(title)}"
               target="_blank">WhatsApp</a>
          </div>
        `);
      });
    }

    advanceLoader();
  })
  .catch(err => {
    console.error("Services CSV error:", err);
    advanceLoader();
  });

/* ==============================
   SOLAR CALCULATOR
============================== */
function calculateSolar() {
  const units = Number(document.getElementById("units").value);
  if (!units || units <= 0) return;

  const kw = units / 120;
  const panels = (kw * 1000) / 580;

  document.getElementById("result").innerHTML = `
    <strong>System Size:</strong> ${kw.toFixed(2)} kW<br>
    <strong>Panels Required:</strong> ${Math.ceil(panels)}
  `;
}
