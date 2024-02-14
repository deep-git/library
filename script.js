const showDialog = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog_books");
const closeDialog = document.getElementById("validate_close");

const bookTitle = document.getElementById("book_title");
const bookAuthor = document.getElementById("book_author");
const bookPages = document.getElementById("book_pages");
const bookCompletedYes = document.getElementById("completed_yes");
const bookCompletedNo = document.getElementById("completed_no");

const showBooks = document.getElementById("show_books_table");

showDialog.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookCompletedYes.checked = false;
    bookCompletedNo.checked = false;
    dialog.close();
});

const myLibrary = [];

function addBook() {
    event.preventDefault();

    if (bookTitle.value !== "" && bookAuthor.value !== "") {

        myLibrary.push({
            title: bookTitle.value,
            author: bookAuthor.value,
            pages: bookPages.value,
            completed: bookCompletedYes.checked
        });

        dialog.close();

        createRowValues(bookTitle.value, bookAuthor.value, bookPages.value, bookCompletedYes.checked);

        bookTitle.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        bookCompletedYes.checked = false;
        bookCompletedNo.checked = false;
    }
}

function createRowValues(title, author, pages, completedYes) {
    const newBookItem = document.createElement("tr");
    newBookItem.className = "bookEntry";
    
    const titleEntry = document.createElement("td");
    titleEntry.className = "bookTitleEntry";
    titleEntry.innerHTML = bookTitle.value;

    const authorEntry = document.createElement("td");
    authorEntry.className = "bookAuthorEntry";
    authorEntry.innerHTML = bookAuthor.value;

    const pagesEntry = document.createElement("td");
    pagesEntry.className = "bookPagesEntry";
    pagesEntry.innerHTML = bookPages.value;

    const completedEntry = document.createElement("td");
    completedEntry.className = "bookCompletedEntry";
    if (completedYes === true) {
        completedEntry.innerHTML = "Yes";
    } else {
        completedEntry.innerHTML = "No";
    }

    const deleteEntry = document.createElement("td");
    deleteEntry.className = "deleteEntry";
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";
    deleteButton.innerHTML = "x";
    deleteButton.setAttribute("onclick", "deleteBook(this)");
    deleteEntry.appendChild(deleteButton);

    newBookItem.appendChild(titleEntry);
    newBookItem.appendChild(authorEntry);
    newBookItem.appendChild(pagesEntry);
    newBookItem.appendChild(completedEntry);
    newBookItem.appendChild(deleteEntry);

    showBooks.appendChild(newBookItem);
}

function deleteBook(buttonNum) {
    const bookTable = document.getElementById("show_books_table");
    const row = buttonNum.parentNode.parentNode.rowIndex;
    const rowValue = row - 1;
    bookTable.deleteRow(rowValue);

    if (rowValue > -1) {
        myLibrary.splice(rowValue, 1);
    }
}

