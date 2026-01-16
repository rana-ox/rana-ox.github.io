document.addEventListener('DOMContentLoaded', () => {
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv';

    // 1. ISLAMIC LOADER
    const fill = document.getElementById('bar-fill');
    if (fill) {
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 30;
            fill.style.width = Math.min(p, 100) + '%';
            if (p >= 100) {
                clearInterval(interval);
                setTimeout(() => document.getElementById('loader').style.display = 'none', 600);
            }
        }, 200);
    }

    // 2. DATA SYNC
    async function syncData() {
        try {
            const res = await fetch(CSV_URL);
            const text = await res.text();
            const rows = text.split('\n').slice(1).map(r => r.split(','));

            const invBody = document.getElementById('inventory-body');
            if (invBody) {
                invBody.innerHTML = rows.map(item => `
                    <tr>
                        <td><strong>${item[0]}</strong></td>
                        <td>${item[2]}</td>
                        <td style="text-decoration:line-through; color:#64748b">PKR ${item[1]}</td>
                        <td style="color:var(--gold)">${item[3]}</td>
                        <td style="color:#22c55e; font-weight:bold">PKR ${item[5]}</td>
                        <td><a href="https://wa.me/923025070541?text=Order:${item[0]}" class="btn-wa" style="color:var(--gold); text-decoration:none; font-size:12px; border:1px solid var(--gold); padding:5px 10px;">BUY</a></td>
                    </tr>
                `).join('');
            }
        } catch (e) { console.error("Sync Error"); }
    }

    syncData();
});

// 3. SOLAR CALCULATOR LOGIC
function estimateSolar() {
    const bill = document.getElementById('billInput').value;
    const result = document.getElementById('calcResult');
    if (bill) {
        const kw = (bill / 70).toFixed(1); // Estimated 70 PKR per unit average
        result.innerHTML = `Suggested Capacity: <span class="gold">${kw} kW System</span><br><small>Estimated for Bahria/Rawalpindi tariffs.</small>`;
    }
}
