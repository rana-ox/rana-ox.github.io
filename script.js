/* ==============================
   CONFIG
============================== */
const inventoryCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv";
const servicesCSV  = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=1319615574&single=true&output=csv";

/* ==============================
   LOADER SETUP (INDEX ONLY SAFE)
============================== */
const loader   = document.getElementById("loader");
const progress = document.getElementById("progress");

let loadedTasks = 0;
const TOTAL_TASKS = 2;

// Minimum loader visibility (UX polish)
const LOADER_MIN_TIME = 1800; // ms
const loaderStartTime = Date.now();

/* ==============================
   LOADER ADVANCE FUNCTION
============================== */
function advanceLoader() {
  loadedTasks++;

  // Update progress bar (if loader exists)
  if (progress) {
    progress.style.width = (loadedTasks / TOTAL_TASKS) * 100 + "%";
  }

  // Close loader only after all tasks + minimum time
  if (loadedTasks === TOTAL_TASKS && loader) {
    const elapsed = Date.now() - loaderStartTime;
    const remaining = Math.max(0, LOADER_MIN_TIME - elapsed);

    setTimeout(() => {
      loader.style.transition = "opacity 0.5s ease";
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";

      setTimeout(() => {
        loader.remove();
      }, 500);
    }, remaining);
  }
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
        const cols = row.split(",");
        if (cols.length < 6) return;

        const [name, price, category, discount, image, net] = cols;

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
        const cols = row.split(",");
        if (cols.length < 3) return;

        const [title, desc, specs] = cols;

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
  const input = document.getElementById("units");
  const result = document.getElementById("result");

  if (!input || !result) return;

  const units = Number(input.value);
  if (!units || units <= 0) {
    result.innerHTML = "<span>Please enter valid monthly units.</span>";
    return;
  }

  const kw = units / 120;
  const panels = (kw * 1000) / 580;

  result.innerHTML = `
    <strong>System Size:</strong> ${kw.toFixed(2)} kW<br>
    <strong>Panels Required:</strong> ${Math.ceil(panels)}
  `;
}
