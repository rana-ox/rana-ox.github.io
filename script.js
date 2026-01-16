document.addEventListener('DOMContentLoaded', () => {
    // 1. CHANGE THIS TO YOUR PUBLISHED GOOGLE SHEET CSV LINK
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCUWZzKZ-eBa22g0r3VYgfzli_ljjmg54VhPA0VidARKBY22K_WNz9wZ9160nQk9utuXnRjXP_igp0/pub?gid=0&single=true&output=csv';

    // 2. NEURAL CURSOR ENGINE
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    window.addEventListener('mousemove', (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        outline.style.transform = `translate(${e.clientX - 17}px, ${e.clientY - 17}px)`;
    });

    // 3. NAVIGATION SYSTEM
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabs = document.querySelectorAll('.tab-view');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    document.getElementById('mobile-toggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // 4. GOOGLE SHEETS AUTOMATION
    let rawInventory = [];

    async function syncData() {
        const body = document.getElementById('inventory-body');
        const notice = document.getElementById('sync-notice');
        notice.innerHTML = `<i class="fa-solid fa-sync fa-spin"></i> Please be seated and we'll find best rates for you...`;

        try {
            const res = await fetch(SHEET_URL);
            const data = await res.text();
            const rows = data.split('\n').slice(1);
            
            rawInventory = rows.map(r => r.split(',')).filter(c => c.length > 1);
            renderTable(rawInventory);
            notice.innerHTML = `<i class="fa-solid fa-check-circle"></i> DATA_SYNC_SUCCESSFUL`;
        } catch (e) {
            notice.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> SYNC_ERROR: LINK NOT PUBLISHED AS CSV`;
        }
    }

    function renderTable(data) {
        const body = document.getElementById('inventory-body');
        body.innerHTML = data.map(item => `
            <tr>
                <td><i class="fa-solid ${item[4] || 'fa-bolt'}"></i> ${item[0]}</td>
                <td><span class="dim">${item[2]}</span></td>
                <td><span class="price-old">PKR ${item[1]}</span></td>
                <td><span class="discount-tag">-${item[3]}</span></td>
                <td><span class="price-net">PKR ${item[5]}</span></td>
                <td><a href="https://wa.me/923025070541?text=Order Inquiry: ${item[0]}" target="_blank" class="btn-sync" style="text-decoration:none;">ORDER</a></td>
            </tr>
        `).join('');
    }

    // 5. SEARCH LOGIC
    document.getElementById('search-bar').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = rawInventory.filter(i => i[0].toLowerCase().includes(term) || i[2].toLowerCase().includes(term));
        renderTable(filtered);
    });

    document.getElementById('sync-trigger').addEventListener('click', syncData);

    // Initial Sync & Boot
    setTimeout(() => {
        document.getElementById('boot-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('boot-screen').style.display = 'none', 800);
    }, 2500);

    syncData();

    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-GB');
    }, 1000);
});
