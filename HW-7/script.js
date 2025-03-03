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
    new ViewMasterImage("Environmental Activism", "image2.jpg", "A protest against climate change.", "John Smith", "2020"),
    new ViewMasterImage("Historic Civil Rights", "image3.jpg", "A snapshot from the 1960s movement.", "Alex Brown", "1965"),
    new ViewMasterImage("Freedom Rally", "image4.jpg", "People demanding justice.", "Emily White", "2019"),
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
