const myLibrary = [];

//constructor for books with unique ID
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


//test books
const harryPotter = new Book("Harry Potter", "JK Rowling", "completed-reading");
const theHobbit = new Book("The Hobbit", "JRR Tolkien", "completed-reading");

addBookToLibrary(harryPotter);
addBookToLibrary(theHobbit);

//html display
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

// listen for html form input 
const bookForm = document.querySelector('.add-book-form');

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const status = formData.get('status');

    const newBook = new Book(title, author, status);
    addBookToLibrary(newBook);

    bookForm.reset();
    console.log(myLibrary)
});


