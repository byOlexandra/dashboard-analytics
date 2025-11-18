const refs = {
    toggleThemeBtn: document.querySelector(".toggle-theme"),
    menuToggle: document.querySelector("button.menu-toggle"),
    sidebar: document.querySelector(".sidebar"),
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    refs.toggleThemeBtn.textContent = "Light";
} 

refs.toggleThemeBtn.addEventListener("click", e => {
    e.preventDefault()
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        refs.toggleThemeBtn.textContent = "Light";
    } else {
        localStorage.setItem("theme", "light");
        refs.toggleThemeBtn.textContent = "Dark";
    }
})

refs.menuToggle.addEventListener("click", e => {
    e.preventDefault()
    refs.sidebar.classList.toggle("active")
}) 

document.addEventListener("click", e => {
    if (!refs.sidebar.contains(e.target) && e.target !== refs.menuToggle) {
    refs.sidebar.classList.remove("active");
    }
})