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


//add books
function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}

//link to delete modal
const deleteModal = document.querySelector('#delete-modal');
const confirmBtn = document.querySelector('#confirm-delete');
const cancelBtn = document.querySelector('#cancel-delete');

let pendingBookDelete = null

    //delete modal confirmation
    confirmBtn.onclick = () => {
        if (pendingBookDelete) {
            const { bookDiv, id } = pendingBookDelete;
            bookDiv.remove();
            removeBookFromLibrary(id);
            pendingBookDelete = null;
        }
        deleteModal.close();
    };

    cancelBtn.onclick = () => {
        deleteModal.close();
    };

//remove book from array
function removeBookFromLibrary(id) {
    const index = myLibrary.findIndex(book => book.ID === id);
    if (index > -1) {
        myLibrary.splice(index, 1);
    }
}

//test books
const harryPotter = new Book("Harry Potter", "JK Rowling", "completed-reading");
const theHobbit = new Book("The Hobbit", "JRR Tolkien", "completed-reading");

addBookToLibrary(harryPotter);
addBookToLibrary(theHobbit);

//html display
const libraryContainer = document.querySelector('.current-library');

const sideForm = document.querySelector('.container-add-book-form');
const toggleBtn = document.querySelector('#toggle-form');


//html form toggle
toggleBtn.addEventListener('click', () => {
    sideForm.classList.toggle('open');
    toggleBtn.textContent = sideForm.classList.contains('open') ? '-' : '+';
});

document.querySelector('.add-book-form').addEventListener('submit', () => {
    sideForm.classList.remove('open');
    toggleBtn.textContent = '+'
});


//creating books
function createBookCard(item) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.id = item.ID;
    bookDiv.dataset.uuid = item.ID;

    //remove button
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-button");
    delBtn.textContent = "";

        delBtn.onclick = () => {
            pendingBookDelete = { bookDiv, id: item.ID };

            //inject title in modal
            const modalTitle = document.querySelector('#modal-book-title');
            modalTitle.textContent = `"${item.title}"`;

            deleteModal.showModal();
        }

    //book info
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = item.title;
    bookTitle.classList.add("book-title");

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `by ${item.author}`;
    bookAuthor.classList.add("book-author");

    const statusSidebar = document.createElement("div");
    statusSidebar.classList.add("status-sidebar");

    const statuses = [
        ['read', 'check_circle', 'completed-reading'],
        ['reading', 'menu_book', 'currently-reading'],
        ['want', 'bookmark', 'want-to-read']
    ];

    statuses.forEach(([suffix, icon, statusValue]) => {
        const statBtn = document.createElement("button");
        statBtn.classList.add("status-btn", suffix, "material-symbols-outlined");
        statBtn.textContent = icon;
        statBtn.type = "button";

        if (item.status === statusValue) {
            statBtn.classList.add("active");
        }

        statBtn.addEventListener("click", () => {
            statusSidebar.querySelectorAll(".status-btn").forEach(b => b.classList.remove("active"));
            statBtn.classList.add("active");
            item.status = statusValue;
        });

        statusSidebar.appendChild(statBtn);
    })

    //append
    bookDiv.appendChild(delBtn);
    bookDiv.appendChild(statusSidebar);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    
    libraryContainer.appendChild(bookDiv);
};

myLibrary.forEach(createBookCard);

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
    createBookCard(newBook);

    bookForm.reset();
    console.log(myLibrary)
});


