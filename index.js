const myLibrary = [];


function Book(title, author, status) {
    if (!new.target) {
        throw Error("Constructor called without 'new' operator");
    }
    this.ID = crypto.randomUUID(); // assign random ID each time
    this.title = title;
    this.author = author;
    this.status = status;
}

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}

const harryPotter = new Book("Harry Potter", "JK Rowling", "Read");
const theHobbit = new Book("The Hobbit", "JRR Tolkien", "Not read");

addBookToLibrary(harryPotter);
addBookToLibrary(theHobbit);

const libraryContainer = document.querySelector('.current-library');

myLibrary.forEach((item) => {
    const bookDiv = document.createElement("div");
    bookDiv.id = item.ID;
    bookDiv.classList.add("book-card");
    bookDiv.textContent = `${item.title} by ${item.author}`;
    libraryContainer.appendChild(bookDiv);
});
