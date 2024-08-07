let version = "v2.01"
let receiving = "20.09.2021 18:36:21"
let broadcast = "20.09.2021 18:38:21"

function getCurrentDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `(${day}.${month}.${year} ${hours}:${minutes}:${seconds})`;
}

document.addEventListener("DOMContentLoaded", function (){

    let sync = document.querySelector(".sync")

    sync.innerHTML = "<img src=\"../images/sync.svg\" alt=\"\">синхронизация <p class='small-sync'>" + getCurrentDateTime() + "</p>"

    document.querySelector(".version").innerHTML = version

    document.querySelector(".receiving").innerHTML = "Последний приём " + receiving
    document.querySelector(".broadcast").innerHTML = "Последняя передача " + broadcast

    document.querySelector(".hide-menu").addEventListener("click", () => {
        document.querySelector('.menu').classList.toggle('collapsed');
    })

    sync.addEventListener("click", (time) => {
        sync.innerHTML = "<img src=\"../images/sync.svg\" alt=\"\">синхронизация <p class='small-sync'>" + getCurrentDateTime() + "</p>"
    })


    const menuButtons = document.querySelectorAll(".menu-block");
    const tabContents = document.querySelectorAll(".tab");

    menuButtons.forEach(button => {
        button.addEventListener("click", () => {
            menuButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            tabContents.forEach(content => content.classList.remove("active"));

            const tabId = button.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("active");
        });
    });

    const userButtons = document.querySelectorAll(".user-button")
    const userTab = document.querySelectorAll(".user-tab")

    userButtons.forEach(button => {
        button.addEventListener("click", () => {
            userButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            userTab.forEach(content => content.classList.remove("active"));

            const tabId = button.getAttribute("data-user");
            document.getElementById(tabId).classList.add("active");
        });
    });
})