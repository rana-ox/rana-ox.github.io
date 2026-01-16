document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab System
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // 2. Render Services
    const serviceGrid = document.getElementById('services-grid');
    serviceGrid.innerHTML = serviceData.map(s => `
        <div class="card">
            <i class="fa-solid ${s.icon}" style="font-size: 2.5rem; color: #fcc419; margin-bottom: 15px;"></i>
            <h3>${s.title}</h3>
            <p style="color: #8892b0;">${s.desc}</p>
        </div>
    `).join('');

    // 3. Render Store (with Filtering)
    const storeGrid = document.getElementById('inventory-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProducts(category = 'All') {
        const filtered = category === 'All' ? productData : productData.filter(p => p.cat === category);
        storeGrid.innerHTML = filtered.map(p => `
            <div class="product-card">
                <div class="product-img">
                    <span class="badge">${p.badge}</span>
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <div class="product-info">
                    <small>${p.cat}</small>
                    <h3 style="font-size: 1.1rem; margin: 5px 0;">${p.name}</h3>
                    <p style="font-weight: 700; font-size: 1.2rem;">Rs. ${p.price}</p>
                    <a href="https://wa.me/923025070541?text=Order:%20${p.name}" class="order-btn">
                        <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
                    </a>
                </div>
            </div>
        `).join('');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });

    // 4. Render Projects
    const projectGrid = document.getElementById('projects-grid');
    projectGrid.innerHTML = projectData.map(prj => `
        <div class="card" style="border-left: 4px solid #fcc419;">
            <span style="font-size: 0.7rem; color: #fcc419; text-transform: uppercase;">${prj.tag}</span>
            <h3 style="margin: 5px 0;">${prj.title}</h3>
            <p><i class="fa-solid fa-location-dot"></i> ${prj.loc}</p>
        </div>
    `).join('');

    // Set Year
    document.getElementById('year').textContent = new Date().getFullYear();
    renderProducts();
});
