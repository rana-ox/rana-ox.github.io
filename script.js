const inventoryCSV = "PASTE_GOOGLE_SHEET_1_CSV_LINK_HERE";
const servicesCSV  = "PASTE_GOOGLE_SHEET_2_CSV_LINK_HERE";

let progress = 0;

function updateProgress(val) {
  progress += val;
  document.getElementById("progress").style.width = progress + "%";
  if (progress >= 100) document.getElementById("loader").style.display = "none";
}

fetch(inventoryCSV)
  .then(r => r.text())
  .then(data => {
    const rows = data.split("\n").slice(1);
    const tbody = document.querySelector("#inventoryTable tbody");
    if (!tbody) return updateProgress(50);

    rows.forEach(r => {
      const [name, price, cat, disc, img, net] = r.split(",");
      tbody.innerHTML += `
        <tr>
          <td>${name}</td>
          <td>${cat}</td>
          <td>${price}</td>
          <td>${disc}</td>
          <td>${net}</td>
          <td><a href="https://wa.me/923025070541?text=Inquiry:${name}" target="_blank">WhatsApp</a></td>
        </tr>`;
    });
    updateProgress(50);
  });

fetch(servicesCSV)
  .then(r => r.text())
  .then(data => {
    const rows = data.split("\n").slice(1);
    const container = document.getElementById("services");
    if (!container) return updateProgress(50);

    rows.forEach(r => {
      const [title, desc, specs] = r.split(",");
      container.innerHTML += `
        <div class="card">
          <h3>${title}</h3>
          <p>${desc}</p>
          <small>${specs}</small>
          <a href="https://wa.me/923025070541?text=Inquiry:${title}">WhatsApp</a>
        </div>`;
    });
    updateProgress(50);
  });

function calculateSolar() {
  const units = document.getElementById("units").value;
  const kw = units / 120;
  const panels = (kw * 1000) / 580;

  document.getElementById("result").innerHTML =
    `System Size: ${kw.toFixed(2)} kW<br>Panels Required: ${Ma
