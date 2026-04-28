class Book {
    constructor(title, author, status) {
        this.ID = crypto.randomUUID(); // assign random ID each time
        this.title = title;
        this.author = author;
        this.status = status;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author,status) {
        const newBook = new Book(title, author, status);
        this.books.push(newBook);
        return newBook;
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.ID !== id );
    }
}

const myLibrary = new Library();

//test books
const testLibrary = [
    ["Harry Potter", "JK Rowling", "completed-reading"],
    ["The Hobbit", "JRR Tolkien", "completed-reading"],
    ["Never Let Me Go", "Kazuo Ishiguro", "completed-reading"],
    ["The Road", "Cormac McCarthy", "currently-reading"],
    ["Middlesex", "Jeffrey Eugenides", "want-to-read"],
    ["White Teeth", "Zadie Smith", "completed-reading"],
    ["Atonement", "Ian McEwan", "want-to-read"],
    ["Gilead", "Marilynne Robinson", "currently-reading"],
    ["The Brief Wondrous Life of Oscar Wao", "Junot Díaz", "completed-reading"],
    ["Wolf Hall", "Hilary Mantel", "want-to-read"],
    ["A Visit from the Goon Squad", "Jennifer Egan", "currently-reading"],
    ["Persepolis", "Marjane Satrapi", "completed-reading"],
    ["The Goldfinch", "Donna Tartt", "want-to-read"],
    ["Normal People", "Sally Rooney", "currently-reading"],
    ["Lincoln in the Bardo", "George Saunders", "completed-reading"],
    ["Circe", "Madeline Miller", "want-to-read"],
    ["The Sellout", "Paul Beatty", "currently-reading"],
    ["Hamnet", "Maggie O'Farrell", "completed-reading"],
    ["Klara and the Sun", "Kazuo Ishiguro", "want-to-read"],
    ["Americanah", "Chimamanda Ngozi Adichie", "currently-reading"]
];

const UI = {
    container: document.querySelector('.current-library'),
    sideForm: document.querySelector('.container-add-book-form'),
    bookForm: document.querySelector('.add-book-form'),
    toggleBtn: document.querySelector('#toggle-form'),
    modalTitle: document.querySelector('#modal-book-title'),
    deleteModal: document.querySelector('#delete-modal'),
    confirmBtn: document.querySelector('#confirm-delete'),
    cancelBtn: document.querySelector('#cancel-delete')
};

let pendingBookDelete = null

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
            UI.modalTitle.textContent = `"${item.title}"`;

            UI.deleteModal.showModal();
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
    
    UI.container.appendChild(bookDiv);
};

//delete modal confirmation
UI.confirmBtn.onclick = () => {
    if (pendingBookDelete) {
        const { bookDiv, id } = pendingBookDelete;
        bookDiv.remove();
        myLibrary.removeBook(id);
        pendingBookDelete = null;
    }
    UI.deleteModal.close();
};

UI.cancelBtn.onclick = () => {
    UI.deleteModal.close();
};

testLibrary.forEach(data => {
    const newBook = myLibrary.addBook(...data);
    createBookCard(newBook);
});

//html form toggle
UI.toggleBtn.addEventListener('click', () => {
    UI.sideForm.classList.toggle('open');
    UI.toggleBtn.textContent = UI.sideForm.classList.contains('open') ? '-' : '+';
});

UI.bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(UI.bookForm);

    const newBook = myLibrary.addBook(
        formData.get('title'),
        formData.get('author'),
        formData.get('status')
    );

    createBookCard(newBook);
    UI.bookForm.reset();
    UI.sideForm.classList.remove('open');
    UI.toggleBtn.textContent = '+';
});