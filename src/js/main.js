const refs = {
    toggleThemeBtn: document.querySelector(".toggle-theme"),
    menuToggle: document.querySelector("button.menu-toggle"),
    sidebar: document.querySelector(".sidebar"),
    overlay: document.querySelector(".overlay"),
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    refs.toggleThemeBtn.textContent = "Light mode";
} 

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