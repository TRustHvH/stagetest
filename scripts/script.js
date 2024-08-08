let version = "v2.01"
let receiving = "20.09.2021 18:36:21"
let broadcast = "20.09.2021 18:38:21"

function getCurrentDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
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
        document.querySelector('.footer-for-tab').classList.toggle('collapse')
    })

    sync.addEventListener("click", () => {
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

    const userButtons = document.querySelectorAll(".user-button");
    const userTab = document.querySelectorAll(".user-tab");
    const locTabName = document.querySelector(".loc-tab-name");
    const settingsTabName = document.querySelector(".settings-tab-name");
    function updateTabName(activeButton) {
        const activeTab = document.querySelector(".tab.active");

        if (activeTab.id === "locations") {
            locTabName.textContent = "Локации / " + activeButton.textContent.trim();
        } else if (activeTab.id === "settings") {
            settingsTabName.textContent = "Настройки / " + activeButton.textContent.trim();
        }
    }

    userButtons.forEach(button => {
        button.addEventListener("click", () => {
            userButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            userTab.forEach(content => content.classList.remove("active"));

            const tabId = button.getAttribute("data-user");

            document.getElementById(tabId).classList.add("active");

            updateTabName(button);
        });
    });

    const selectElement = document.querySelector('.custom-select');

    selectElement.addEventListener('change', function () {
        if (this.value === "") {
            this.style.color = 'rgb(174, 174, 174)';
        } else {
            this.style.color = 'rgb(23, 33, 57)';
        }
    });

    document.querySelector('.create-loc').addEventListener("click", () => {
        document.querySelector('.popup').style.display = 'flex'
        document.querySelector('.create-popup').style.display = 'flex'
    })

    document.querySelector('.close-create').addEventListener("click", () => {
        document.querySelector('.popup').style.display = 'none'
        document.querySelector('.create-popup').style.display = 'none'
    })
    document.querySelector('.close-change').addEventListener("click", () => {
        document.querySelector('.popup').style.display = 'none'
        document.querySelector('.change-popup').style.display = 'none'
    })

    const footersForTab = document.querySelector('.footer-for-tab');
    const footersInfo = document.querySelector('.footer-info');

    function updateFooterDisplay(tabId) {
        if (tabId === 'settings') {
            footersInfo.style.display = 'none';
            footersForTab.style.display = 'flex';
        } else {
            footersInfo.style.display = 'flex';
            footersForTab.style.display = 'none';
        }
    }

    function switchTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.menu-block').forEach(menuBlock => menuBlock.classList.remove('active'));

        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.menu-block[data-tab="${tabId}"]`).classList.add('active');

        updateFooterDisplay(tabId);
    }

    document.querySelectorAll('.menu-block').forEach(menuBlock => {
        menuBlock.addEventListener('click', function() {
            const tabId = menuBlock.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    const activeMenuBlock = document.querySelector('.menu-block.active');
    if (activeMenuBlock) {
        const activeTabId = activeMenuBlock.getAttribute('data-tab');
        switchTab(activeTabId);
    }
})