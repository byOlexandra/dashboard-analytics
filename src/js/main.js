const refs = {
    toggleThemeBtn: document.querySelector(".toggle-theme")
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark")
}

refs.toggleThemeBtn.addEventListener("click", e => {
    e.preventDefault()
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    } else {
    localStorage.setItem("theme", "light");
    }
})