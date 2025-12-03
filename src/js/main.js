import { createChart } from "./chart.js";


const refs = {
    toggleThemeBtn: document.querySelector(".toggle-theme"),
    menuToggle: document.querySelector("button.menu-toggle"),
    sidebar: document.querySelector(".sidebar"),
    overlay: document.querySelector(".overlay"),
    container: document.querySelector(".container"),
    navLinks: document.querySelectorAll(".sidebar nav a"),
    content: document.getElementById('page-content'),
    links: document.querySelectorAll('[data-page]'),
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    refs.toggleThemeBtn.textContent = "Light mode";
} 

// * THEME COLOR

refs.toggleThemeBtn.addEventListener("click", e => {
    e.preventDefault()
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        refs.toggleThemeBtn.textContent = "Light mode";
    } else {
        localStorage.setItem("theme", "light");
        refs.toggleThemeBtn.textContent = "Dark mode";
    }
})

// * MOBILE MENU

refs.menuToggle.addEventListener("click", e => {
    e.preventDefault()
    refs.sidebar.classList.toggle("active");
    refs.overlay.style.display = refs.sidebar.classList.contains("active") ? "block" : "none";
}) 

refs.overlay.addEventListener("click", e => {
    refs.sidebar.classList.remove("active");
    refs.overlay.style.display = "none";
})

// * LOADING PAGE

async function loadPage(page) {
    try {
        // 1. Завантажуємо HTML
        const htmlRes = await fetch(`../partials/${page}.html`);
        if (!htmlRes.ok) throw new Error('Partial not found');
        const html = await htmlRes.text();
        refs.content.innerHTML = html;

        let data = null;
        try {
            const dataRes = await fetch(`../data/${page}.json`);
            if (dataRes.ok) data = await dataRes.json();
        } catch (e) {
            console.log(`Немає даних для ${page} — це нормально`);            
        }
        const initFunctionName = 'init' + page.charAt(0).toUpperCase() + page.slice(1);
        if (typeof window[initFunctionName] === 'function') {
            window[initFunctionName](data);
        }
        refs.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

    } catch (err) {
        refs.container.innerHTML = `<h2 style="color: red; text-align: center;">Сторінка не знайдена</h2>`;
        console.error(err);
    }
}


function initDashboard(data) {
    if (!data) return;

    document.querySelector("#totalUsers").textContent = data.stats.totalUsers;
    document.querySelector("#activeUsers").textContent = data.stats.activeUsers;
    document.querySelector("#newUsersToday").textContent = data.stats.newUsersToday;
    document.querySelector("#revenueToday").textContent = `$${data.stats.revenueToday}`;

    createChart("weeklyRevenueChart", data.weeklyRevenue.labels, data.weeklyRevenue.values),
    createChart("activeSessionsChart", data.activeSessions.labels, data.activeSessions.values)
}


refs.links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()
        refs.navLinks.forEach(link => link.classList.remove("active"));
        link.classList.add("active")

        const page = link.dataset.page;
        loadPage(page)
    })
})

document.addEventListener('DOMContentLoaded', () => {
    loadPage('dashboard');
});


// * LOADING DATA

