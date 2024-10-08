document.addEventListener('DOMContentLoaded', () => {
    const data = [
        {
            name: "Локация 1",
            value: 512,
            sublocations: [
                { name: "Подотдел 1", value: 100, description: "Для утерь", sublocations: [
                        { name: "Подподотдел 1", value: 2, description: "Виртуальная", barcode: "Без штрихкода" }
                    ]},
                { name: "Подотдел 2", value: 100, sublocations: [
                        { name: "Подподотдел 1", value: 2, description: "Виртуальная", barcode: "Без штрихкода" }
                    ]},
                { name: "Подотдел 3", value: 400, sublocations: [
                        { name: "Подподотдел 1", value: 2, description: "Виртуальная", barcode: "Без штрихкода" }
                    ]},
            ]
        },
        {
            name: "Локация 2",
            value: 100,
            sublocations: [
                { name: "Подотдел 1", value: 0 }
            ]
        },
        {
            name: "Локация 3",
            value: 100,
            sublocations: [
                { name: "Подотдел 1", value: 0 }
            ]
        }
    ];

    const listContainer = document.querySelector('.locations');
    const createButton = document.querySelector('.create');
    const changePopup = document.querySelector('.change-popup');
    let currentEditingLocation = null;

    function createLocationElement(location) {
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location';

        const locationHeader = document.createElement('div');
        locationHeader.classList.add("location-info");
        locationHeader.innerHTML = `
            <div></div>
            <img src="images/plus.svg" class="toggle" alt="Toggle">
            <img src="images/tripple-dots.svg" class="toggle" alt="Toggle">
            <div class="location-use">
                <p class="location-name">${location.name}</p>
                <p class="location-value">${location.value}</p>
                <div class="buttons hidden edit-loc"><img src="images/editing.svg" alt="">Редактировать</div>
                <div class="buttons hidden delete-loc"><img src="images/delete.svg" alt="">Удалить</div>
            </div>
        `;

        const toggleIcon = locationHeader.querySelector('.toggle');
        toggleIcon.addEventListener('click', () => {
            locationDiv.classList.toggle('active');
            const sublocationContainer = locationDiv.querySelector('.sublocations');
            if (locationDiv.classList.contains('active')) {
                sublocationContainer.classList.remove('hidden');
                toggleIcon.src = 'images/minus.svg';
                locationHeader.querySelectorAll('.buttons').forEach(button => button.classList.remove('hidden'));
            } else {
                sublocationContainer.classList.add('hidden');
                toggleIcon.src = 'images/plus.svg';
                locationHeader.querySelectorAll('.buttons').forEach(button => button.classList.add('hidden'));
            }
        });

        const editButton = locationHeader.querySelector('.edit-loc');
        editButton.addEventListener('click', () => {
            currentEditingLocation = locationDiv;
            openChangePopup(location);
        });

        const deleteButton = locationHeader.querySelector('.delete-loc');
        deleteButton.addEventListener('click', () => {
            locationDiv.remove();
        });

        locationDiv.appendChild(locationHeader);

        if (location.sublocations) {
            const sublocationContainer = document.createElement('div');
            sublocationContainer.className = 'sublocations hidden';
            location.sublocations.forEach((sublocation) => {
                sublocationContainer.appendChild(createSubLocationElement(sublocation));
            });
            locationDiv.appendChild(sublocationContainer);
        }

        return locationDiv;
    }

    function createSubLocationElement(sublocation) {
        const sublocationDiv = document.createElement('div');
        sublocationDiv.className = 'sub-location';

        const sublocationHeader = document.createElement('div');
        sublocationHeader.classList.add("sub-location-info");
        sublocationHeader.innerHTML = `
            <div></div>
            ${sublocation.sublocations ? '<img src="../images/plus.svg" class="toggle" alt="Toggle">' : ''}
            <img src="images/tripple-dots.svg" class="toggle" alt="Toggle">
            <div class="sublocation-use">
                <p class="sublocation-name">${sublocation.name}</p>
                <p class="location-value">${sublocation.value}</p>
                <p class="location-description">${sublocation.description || ''}</p>
                <p class="location-barcode">${sublocation.barcode || ''}</p>
            </div>
        `;

        const toggleIcon = sublocationHeader.querySelector('.toggle');
        if (toggleIcon) {
            toggleIcon.addEventListener('click', () => {
                sublocationDiv.classList.toggle('active');
                const subsublocationContainer = sublocationDiv.querySelector('.sublocations');
                if (sublocationDiv.classList.contains('active')) {
                    subsublocationContainer.classList.remove('hidden');
                    toggleIcon.src = 'images/minus.svg';
                } else {
                    subsublocationContainer.classList.add('hidden');
                    toggleIcon.src = 'images/plus.svg';
                }
            });
        }

        sublocationDiv.appendChild(sublocationHeader);

        if (sublocation.sublocations) {
            const subsublocationContainer = document.createElement('div');
            subsublocationContainer.className = 'sublocations hidden';
            sublocation.sublocations.forEach((subsublocation) => {
                subsublocationContainer.appendChild(createSubLocationElement(subsublocation));
            });
            sublocationDiv.appendChild(subsublocationContainer);
        }

        return sublocationDiv;
    }

    function openChangePopup() {
        changePopup.style.display = 'flex';
        document.querySelector('.popup').style.display = 'flex'
    }

    function saveChanges() {
        if (currentEditingLocation) {
            changePopup.style.display = 'none';
            document.querySelector('.popup').style.display = 'none'
            currentEditingLocation = null;
        }
    }

    document.querySelector('.save').addEventListener('click', saveChanges);

    data.forEach(location => {
        listContainer.appendChild(createLocationElement(location));
    });

    createButton.addEventListener('click', () => {
        const name = document.querySelector('.name').value;
        const barcode = document.querySelector('.barcode').value;
        const isVirtual = document.querySelector('.custom-select').checked;

        const newLocation = {
            name: name,
            value: 0,
            sublocations: [],
            description: "",
            barcode: isVirtual ? "Без штрихкода" : barcode
        };

        listContainer.appendChild(createLocationElement(newLocation));

        document.querySelector('.popup').style.display = 'none';
        document.querySelector('.create-popup').style.display = 'none';
    });
});
