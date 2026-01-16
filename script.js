document.addEventListener('DOMContentLoaded', () => {

    // 1. NEURAL CURSOR ENGINE
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    window.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        outline.style.left = e.clientX + 'px';
        outline.style.top = e.clientY + 'px';
    });

    // 2. ISLAMIC BOOT SEQUENCE
    let progress = 0;
    const bar = document.getElementById('loader-bar');
    const bootInterval = setInterval(() => {
        progress += Math.random() * 20;
        bar.style.width = Math.min(progress, 100) + '%';
        if (progress >= 100) {
            clearInterval(bootInterval);
            setTimeout(() => {
                document.getElementById('boot-screen').style.transform = 'translateY(-100%)';
            }, 600);
        }
    }, 150);

    // 3. TAB NAVIGATION SYSTEM (FIXED)
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabViews = document.querySelectorAll('.tab-view');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            // UI Update
            navBtns.forEach(b => b.classList.remove('active'));
            tabViews.forEach(v => v.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');

            // Close mobile sidebar on click
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // 4. MOBILE MENU TOGGLE
    const toggle = document.getElementById('mobile-toggle');
    toggle.addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // 5. AUTOMATION: GOOGLE SHEETS SYNC ENGINE
    // Replace with your CSV link: File > Share > Publish to web > CSV
    const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1xsYD4IKE00daV2RP73ppzlYXEvXzwHE2cr274j188Hs/edit?usp=sharing';

    const syncBtn = document.getElementById('sync-trigger');
    const syncInjection = document.getElementById('auto-sync-injection');
    const syncNotice = document.getElementById('sync-notice');

    async function fetchLiveRates() {
        syncNotice.innerText = "CONNECTING_TO_CLOUD_DATABASE...";
        syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SYNCING...';

        try {
            const response = await fetch(SHEET_CSV_URL);
            const data = await response.text();
            const rows = data.split('\n').slice(1); // Remove headers

            syncInjection.innerHTML = rows.map(row => {
                const [name, price, category, icon] = row.split(',');
                if(!name) return '';
                return `
                    <div class="tech-card">
                        <i class="fa-solid ${icon || 'fa-box-open'}"></i>
                        <small style="color:var(--gold)">${category}</small>
                        <h3>${name}</h3>
                        <div style="font-size: 1.5rem; margin: 15px 0;">PKR ${price}</div>
                        <a href="https://wa.me/923025070541?text=Inquiry: ${name}" class="wa-btn" style="display:block; text-align:center; text-decoration:none;">ORDER_NOW</a>
                    </div>
                `;
            }).join('');

            syncNotice.innerText = "SYNC_SUCCESSFUL // " + new Date().toLocaleTimeString();
        } catch (error) {
            syncNotice.innerText = "SYNC_FAILED: CHECK_URL_OR_CONNECTION";
            // Fallback content if URL is not yet set
            syncInjection.innerHTML = '<p style="padding:20px;">We have update the rate list if you have any queries contact Sajjad Ahmed (Mithu).</p>';
        } finally {
            syncBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> REFRESH_RATES';
        }
    }

    syncBtn.addEventListener('click', fetchLiveRates);

    // 6. CLOCK & STATIC DATA
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    }, 1000);

    // Pre-fill Services
    const serviceData = [
        { title: "SOLAR.GRID", icon: "fa-solar-panel", desc: "Industrial Hybrid & On-Grid Solutions." },
        { title: "HVAC.SYSTEMS", icon: "fa-snowflake", desc: "Enterprise Cooling & VRF Maintenance." },
        { title: "POWER.WIRING", icon: "fa-plug-circle-bolt", desc: "Smart Panel Design & Load Balancing." }
    ];
    document.getElementById('service-injection').innerHTML = serviceData.map(s => `
        <div class="tech-card">
            <i class="fa-solid ${s.icon}"></i>
            <h3>${s.title}</h3>
            <p style="color:var(--text-dim); font-size:12px;">${s.desc}</p>
        </div>
    `).join('');
});
