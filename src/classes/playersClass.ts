import { url } from "inspector";

export class Players implements Players {
    public name: string | null;
    public lastName: string | null;
    public profilePhoto: string | null;
    public position: string | null;
    public numberTshirt: string | null;
    public country: string | null;
    public countryImg: string | null;
    constructor(name: string | null, lastName: string | null, profilePhoto: string | null, position: string | null, numberTshirt: string | null, country: string | null, countryImg: string | null) {
        this.name = name;
        this.lastName = lastName;
        this.profilePhoto = profilePhoto;
        this.position = position;
        this.numberTshirt = numberTshirt;
        this.country = country;
        this.countryImg = countryImg;
    }




    render() {
        const card = document.createElement('div');
        card.className = 'cardCSS';
    
        if (this.profilePhoto) {
            const profilePhoto = document.createElement('img');
            profilePhoto.style.backgroundImage = `url(${this.profilePhoto})`;
            profilePhoto.classList.add('imgPhoto')
            card.appendChild(profilePhoto);
        }
        
        const cardBody = document.createElement('div') as HTMLDivElement
        cardBody.classList.add('card-body')
        
        card.appendChild(cardBody)
        const name = document.createElement('h3');
        name.textContent = this.name;
        cardBody.appendChild(name);
    
        const lastName = document.createElement('h4');
        lastName.textContent = this.lastName;
        cardBody.appendChild(lastName);
    
        const position = document.createElement('p');
        position.textContent = `Position: ${this.position}`;
        cardBody.appendChild(position);
    
        const numberTshirt = document.createElement('p');
        numberTshirt.textContent = `Number: ${this.numberTshirt}`;
        cardBody.appendChild(numberTshirt);
    
        const country = document.createElement('p');
        country.textContent = `Country: ${this.country}`;
        cardBody.appendChild(country);
    
        if (this.countryImg) {
            const countryImg = document.createElement('img');
            countryImg.src = this.countryImg;
            countryImg.alt = `${this.country} flag`;
            cardBody.appendChild(countryImg);
            countryImg.classList.add('flagPhoto')
        }
    
        return card;
    }}