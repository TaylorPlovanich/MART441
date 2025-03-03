class ViewMasterImage {
    constructor(title, image, description, author, year) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}

const images = [
    new ViewMasterImage("Equality Protest", "images/1.jpg.webp", "Women's Strike for Peace and Equality.", "Eugene Gordon", "1970"),
    new ViewMasterImage("Environmental Activism", "images/2.jpg", "Environmental activists protest BLM timber sale.", "Chrissy Ewald", "2023"),
    new ViewMasterImage("Historic Civil Rights", "images/3.jpg", "Demonstrating on Behalf of School Integration 1959", "Bettmann / Contributor / ettmann / Getty", "1959"),
    new ViewMasterImage("Freedom Rally", "images/4.jpg", "Educators Rally for Freedom to Learn", "Brenda Álvarez and Mary Ellen Flannery", "2023"),
    new ViewMasterImage("Youth for Change", "image5.jpg", "Young activists making a difference.", "Chris Green", "2021")
];

function showRandomImage() {
    let randomIndex = Math.floor(Math.random() * images.length);
    let selectedImage = images[randomIndex];
    
    document.getElementById("image").src = selectedImage.image;
    document.getElementById("title").textContent = selectedImage.title;
    document.getElementById("description").textContent = selectedImage.description;
    document.getElementById("author").textContent = selectedImage.author;
    document.getElementById("year").textContent = selectedImage.year;
}
