const refs = {
    toggleThemeBtn: document.querySelector(".toggle-theme"),
    menuToggle: document.querySelector("button.menu-toggle"),
    sidebar: document.querySelector(".sidebar"),
    overlay: document.querySelector(".overlay"),
    container: document.querySelector(".container"),
    navLinks: document.querySelectorAll(".sidebar nav a")
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
    const response = await fetch(`../partials/${page}.html`);
    const html = await response.text();
    refs.container.innerHTML = html;
}

refs.navLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()
        refs.navLinks.forEach(link => link.classList.remove("active"));
        link.classList.add("active")

        const page = link.dataset.page;
        loadPage(page)
    })
})

// * DEFAULT PAGE

loadPage("dashboard")

// * LOADING DATA

async function loadData(page) {
    const response = await fetch(`../data/${page}.json`);
    return await response.json();
}