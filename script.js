document.addEventListener('DOMContentLoaded', () => {
    // 1. ABSOLUTE PATH LOGIC
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv';

    // 2. LOADER ENGINE (Only on index.html)
    const bar = document.getElementById('bar-fill');
    if (bar) {
        let p = 0;
        const load = setInterval(() => {
            p += Math.random() * 20;
            bar.style.width = Math.min(p, 100) + '%';
            if (p >= 100) {
                clearInterval(load);
                setTimeout(() => document.getElementById('loader').style.opacity = '0', 400);
                setTimeout(() => document.getElementById('loader').style.display = 'none', 800);
            }
        }, 150);
    }

    // 3. FETCH & RENDER
    async function updateData() {
        const body = document.getElementById('inventory-body');
        if (!body) return;

        try {
            const res = await fetch(CSV_URL);
            const text = await res.text();
            const rows = text.split('\n').slice(1).map(r => r.split(','));

            body.innerHTML = rows.map(item => {
                if(item.length < 5) return '';
                return `
                    <tr>
                        <td style="font-weight:800;">${item[0]}</td>
                        <td style="color:#94a3b8; font-size:0.8rem;">${item[2]}</td>
                        <td style="text-decoration:line-through; opacity:0.5;">PKR ${item[1]}</td>
                        <td style="color:#fcc419; font-weight:bold;">${item[3]}</td>
                        <td style="color:#22c55e; font-weight:900; font-size:1.1rem;">PKR ${item[5]}</td>
                        <td><a href="https://wa.me/923025070541?text=Inquiry:${item[0]}" class="btn-order-table">REQUEST</a></td>
                    </tr>
                `;
            }).join('');
        } catch (e) {
            body.innerHTML = '<tr><td colspan="6">SYNC_ERROR: RECHECK GOOGLE SHEET PUBLISHING</td></tr>';
        }
    }

    // Search Filter
    const search = document.getElementById('inventorySearch');
    if (search) {
        search.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('#inventory-body tr');
            rows.forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(val) ? '' : 'none';
            });
        });
    }

    updateData();
});
