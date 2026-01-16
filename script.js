document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA LINK
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv';

    // 2. LOADER (Only runs on index.html)
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        let p = 0;
        const load = setInterval(() => {
            p += Math.random() * 25;
            progressBar.style.width = Math.min(p, 100) + '%';
            if (p >= 100) {
                clearInterval(load);
                setTimeout(() => document.getElementById('loader-overlay').style.display = 'none', 600);
            }
        }, 200);
    }

    // 3. AUTOMATIC DATA FETCHING
    async function syncData() {
        try {
            const response = await fetch(CSV_URL);
            const data = await response.text();
            const rows = data.split('\n').slice(1).map(r => r.split(','));

            // Check if we are on the inventory page
            const inventoryBody = document.getElementById('inventory-body');
            if (inventoryBody) {
                inventoryBody.innerHTML = rows.map(item => `
                    <tr>
                        <td><strong>${item[0]}</strong></td>
                        <td>${item[2]}</td>
                        <td style="color:#64748b; text-decoration:line-through">PKR ${item[1]}</td>
                        <td style="color:var(--gold)">-${item[3]}</td>
                        <td style="color:#22c55e">PKR ${item[5]}</td>
                        <td><a href="https://wa.me/923025070541?text=Order:${item[0]}" class="btn-wa">BUY</a></td>
                    </tr>
                `).join('');
            }
        } catch (e) { console.error("Sheet Sync Failed"); }
    }

    syncData();
});
