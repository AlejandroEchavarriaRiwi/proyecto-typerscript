import { Players } from "./classes/playersClass.js";

document.addEventListener("DOMContentLoaded", async () => {

    const body = document.querySelector("body") as HTMLBodyElement;

    const containerCenter = document.createElement('div') as HTMLDivElement;
    containerCenter.classList.add("container-center");

    const navBar = document.createElement('nav') as HTMLMenuElement;
    navBar.classList.add("main-nav");

    const menu = document.createElement('ul') as HTMLUListElement;
    const home = document.createElement('li') as HTMLLIElement;
    home.innerText = "Home";
    const register = document.createElement('li') as HTMLLIElement;
    register.innerText = "Register";
    const aboutUs = document.createElement('li') as HTMLLIElement;
    aboutUs.innerText = "About us";
    const contact = document.createElement('li') as HTMLLIElement;
    contact.innerText = "Contact";
    menu.appendChild(home);
    menu.appendChild(register);
    menu.appendChild(aboutUs);
    menu.appendChild(contact);
    navBar.appendChild(menu);
    containerCenter.appendChild(navBar);
    body.appendChild(containerCenter);
    const mainContainer = document.createElement('div') as HTMLDivElement;
    mainContainer.classList.add('mainContainer');
    containerCenter.appendChild(mainContainer);

    showCards()

    home.addEventListener("click", (ev: Event) => {
        ev.preventDefault();
        showCards()
    })

    register.addEventListener("click", (ev: Event) => {
        ev.preventDefault();
        mainContainer.innerHTML = "";
        const form = document.createElement('form') as HTMLFormElement;

        // Crear los elementos input
        const name = document.createElement('input') as HTMLInputElement;
        const lastName = document.createElement('input') as HTMLInputElement;
        const profilePhoto = document.createElement('input') as HTMLInputElement;
        const position = document.createElement('input') as HTMLInputElement;
        const numberTshirt = document.createElement('input') as HTMLInputElement;
        const country = document.createElement('input') as HTMLInputElement;
        const countryImg = document.createElement('input') as HTMLInputElement;
        const submit = document.createElement('button') as HTMLButtonElement;
        submit.textContent = "Ingresar";

        // Asignar IDs a los inputs para asociarlos con los labels
        name.id = "name";
        lastName.id = "lastName";
        profilePhoto.id = "profilePhoto";
        position.id = "position";
        numberTshirt.id = "numberTshirt";
        country.id = "country";
        countryImg.id = "countryImg";

        // Crear y asociar los labels con los inputs
        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = "Nombre: ";

        const lastNameLabel = document.createElement('label');
        lastNameLabel.setAttribute('for', 'lastName');
        lastNameLabel.textContent = "Apellido: ";

        const profilePhotoLabel = document.createElement('label');
        profilePhotoLabel.setAttribute('for', 'profilePhoto');
        profilePhotoLabel.textContent = "Foto de Perfil: ";

        const positionLabel = document.createElement('label');
        positionLabel.setAttribute('for', 'position');
        positionLabel.textContent = "Posición: ";

        const numberTshirtLabel = document.createElement('label');
        numberTshirtLabel.setAttribute('for', 'numberTshirt');
        numberTshirtLabel.textContent = "Número de Camiseta: ";

        const countryLabel = document.createElement('label');
        countryLabel.setAttribute('for', 'country');
        countryLabel.textContent = "País: ";

        const countryImgLabel = document.createElement('label');
        countryImgLabel.setAttribute('for', 'countryImg');
        countryImgLabel.textContent = "Imagen del País: ";

        // Agregar los labels y inputs al formulario
        form.appendChild(nameLabel);
        form.appendChild(name);
        form.appendChild(document.createElement('br'));

        form.appendChild(lastNameLabel);
        form.appendChild(lastName);
        form.appendChild(document.createElement('br'));

        form.appendChild(profilePhotoLabel);
        form.appendChild(profilePhoto);
        form.appendChild(document.createElement('br'));

        form.appendChild(positionLabel);
        form.appendChild(position);
        form.appendChild(document.createElement('br'));

        form.appendChild(numberTshirtLabel);
        form.appendChild(numberTshirt);
        form.appendChild(document.createElement('br'));

        form.appendChild(countryLabel);
        form.appendChild(country);
        form.appendChild(document.createElement('br'));

        form.appendChild(countryImgLabel);
        form.appendChild(countryImg);
        form.appendChild(document.createElement('br'));

        form.appendChild(submit);

        mainContainer.appendChild(form)


        form.addEventListener("submit", (ev: Event) => {
            ev.preventDefault();
            const newPlayer = new Players(name.value, lastName.value, profilePhoto.value, position.value, numberTshirt.value, country.value, countryImg.value)
            console.log(newPlayer)

            fetch('http://localhost:3000/jugadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayer)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Jugador creado:', data); // Aquí puedes manejar la respuesta del servidor
                })
                .catch(error => {
                    console.error('Error al crear el jugador:', error);
                });

            form.reset();
        })


    })

    aboutUs.addEventListener("click", (ev: Event) => {
        ev.preventDefault();
        mainContainer.innerHTML = "";
    })

    function showCards() {
        mainContainer.innerHTML = "";
        const cardContainer = document.createElement('div') as HTMLDivElement;
        cardContainer.classList.add('container');
        cardContainer.classList.add('text-center');
        cardContainer.classList.add('cardContainerGrid');

        fetch('http://localhost:3000/jugadores')
            .then(response => response.json())
            .then(data => {
                data.forEach((playerData: any) => {
                    const jugador = new Players(
                        playerData.name || '',
                        playerData.lastName || '',
                        playerData.profilePhoto || null,
                        playerData.position || '',
                        playerData.numberTshirt || '',
                        playerData.country || '',
                        playerData.countryImg || null
                    );
                    const card = jugador.render();
                    cardContainer.appendChild(card)
                    mainContainer.appendChild(cardContainer);
                });
            })
            .catch(error => {
                console.error('Error al obtener los jugadores:', error);
            });
    }
})