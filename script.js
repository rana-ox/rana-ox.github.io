document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Removal
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1500);

    // 2. Tab Engine
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // 3. Render Services
    const serviceGrid = document.getElementById('services-grid');
    serviceGrid.innerHTML = services.map(s => `
        <div class="card">
            <i class="fa-solid ${s.icon}"></i>
            <h3>${s.title}</h3>
            <p style="color: #8892b0">${s.desc}</p>
        </div>
    `).join('');

    // 4. Render Store (Catalog)
    const storeGrid = document.getElementById('inventory-grid');
    function renderInventory(filter = 'All') {
        const filtered = filter === 'All' ? inventory : inventory.filter(item => item.cat === filter);
        storeGrid.innerHTML = filtered.map(item => `
            <div class="product-card">
                <div class="product-img">
                    <span style="position:absolute; top:10px; right:10px; background:#fcc419; color:#000; font-size:0.6rem; font-weight:800; padding:5px 10px; border-radius:3px;">${item.tag}</span>
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div style="padding: 20px">
                    <small style="color:#666; text-transform:uppercase">${item.cat}</small>
                    <h4 style="margin: 5px 0">${item.name}</h4>
                    <p style="font-size: 1.4rem; font-weight: 800">Rs. ${item.price}</p>
                </div>
                <a href="https://wa.me/923025070541?text=Quotation%20Request:%20${item.name}" class="order-btn">SEND INQUIRY</a>
            </div>
        `).join('');
    }
    renderInventory();

    // 5. Store Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderInventory(btn.dataset.filter);
        });
    });

    // 6. Engineering Logs
    const projectGrid = document.getElementById('projects-grid');
    projectGrid.innerHTML = engineeringLogs.map(log => `
        <div class="card" style="border-left: 5px solid #fcc419">
            <h3>${log.site}</h3>
            <p style="color: #8892b0">Scope: ${log.scope}</p>
        </div>
    `).join('');

    document.getElementById('year').textContent = new Date().getFullYear();
});
