document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Simulation
    let progress = 0;
    const bar = document.getElementById('loader-bar');
    const logs = document.getElementById('status-logs');
    const logMessages = [
        "> CONNECTING TO GRID...",
        "> LOADING INVENTORY...",
        "> SYNCING COORDINATES...",
        "> BISMILLAH_READY."
    ];

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('boot-screen').style.transform = "translateY(-100%)";
            }, 800);
        }
        bar.style.width = progress + "%";
        if (Math.random() > 0.8) {
            logs.innerHTML += `<br>> ${logMessages[Math.floor(Math.random()*logMessages.length)]}`;
        }
    }, 150);

    // 2. Tab Navigation
    const btns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.tab-view');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // 3. Render Injections
    const sGrid = document.getElementById('service-injection');
    sGrid.innerHTML = serviceData.map(s => `
        <div class="unit-card">
            <i class="fa-solid ${s.icon}"></i>
            <h3>${s.title}</h3>
            <p style="color:var(--dim-text); font-size:12px; margin-top:10px;">${s.body}</p>
        </div>
    `).join('');

    const pGrid = document.getElementById('product-injection');
    pGrid.innerHTML = productData.map(p => `
        <div class="unit-card">
            <div style="height:150px; background:#080808; margin-bottom:15px; display:flex; align-items:center; justify-content:center;">
                <img src="${p.img}" style="max-height:80%; filter:grayscale(1);">
            </div>
            <small style="color:var(--gold)">${p.cat}</small>
            <h4>${p.name}</h4>
            <div style="font-size:1.5rem; margin:10px 0;">PKR ${p.price}</div>
            <a href="https://wa.me/923025070541" class="wa-btn" style="display:block; text-align:center; text-decoration:none; border:1px solid var(--gold); color:var(--gold); padding:10px; font-size:10px;">REQUEST_QUOTE</a>
        </div>
    `).join('');

    // 4. Clock
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    }, 1000);
});
