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
    bookDiv.classList.add("book-card");
    bookDiv.id = item.ID;

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = item.title;
    bookTitle.classList.add("book-title");

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `by ${item.author}`;
    bookAuthor.classList.add("book-author");

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    
    libraryContainer.appendChild(bookDiv);
});
