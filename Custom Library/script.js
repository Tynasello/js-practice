/*----

Virtual Library
Add and remove books to your library.
Each book has a title, author, page count, and personal rating.
Each book is stored in local storage so library is saved when refreshing or closing browser
Jun 30, 2021
script.js

----*/

const booksContainer = document.getElementById("books");
const addPopUp = document.getElementById("add-pop-up");
const overlay = document.getElementById("overlay");
const addBtn = document.getElementById("add-button");
const closeBtn = document.getElementById("close-pop-up");
const confirmAdd = document.getElementById("confirm-btn");

/*----

Pop-up for adding books to library
Appropriately add and remove a classs of active to the overlay and addPopUp elements

----*/

addBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  addPopUp.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  addPopUp.classList.remove("active");
});

const title = document.getElementById("pop-up-title");
const author = document.getElementById("pop-up-author");
const pages = document.getElementById("pop-up-pages");
const rating = document.getElementById("pop-up-rating");
const inputs = [title, author, pages, rating];

// ADDING BOOKS TO LIBRARY

confirmAdd.addEventListener("click", () => {
  /*---

  Loop through each input feild when the confirmAdd element is clicked
  If no value was entered into the inputs, change the border to red to signify an issue
  Else make sure the border is grey as a valid value was entered

  ----*/
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input.value) {
      input.style.border = "1px solid red";
    } else {
      input.style.border = "1px solid grey";
    }
  }

  // If all inputs have valid values, run create new book with title,author,page count and rating variables
  // Remove pop-up by removing active class from overlay and addPopUp elements
  if (title.value && author.value && pages.value && rating.value) {
    createNewBook(title.value, author.value, pages.value, rating.value);
    overlay.classList.remove("active");
    addPopUp.classList.remove("active");
  }
});

function createNewBook(titleVal, authorVal, pagesVal, ratingVal) {
  // Reset placeholder values
  title.value = "";
  author.value = "";
  pages.value = "";
  rating.value = "";
  // Create newBook div with class book
  let newBook = document.createElement("div");
  newBook.classList.add("book");
  // Add appropriate HTML to newBook
  newBook.innerHTML = `

    <div class="book-container">

        <div class="book-header">
          <h3 class="book-title">${titleVal}</h3>
          <div class="bookmark"></div>
        </div>

        <div class="book-info">
          <p class="author">Author: ${authorVal}</p>
          <p class="pages">Number of Pages: ${pagesVal}</p>
          <p class="rating">Personal Rating: ${ratingVal}/10</p>
          <hr />
        </div>

        <div class="book-footer">
          <div class="button-container">
              <div class="remove-p">Remove</div>
              <div class="remove" >❌</div>
          </div>
        </div>

    </div>
    
    `;
  // Append newBook to booksContainer
  booksContainer.appendChild(newBook);

  // Create new book object with appropriate title, author, pages and rating
  let book = {
    title: titleVal,
    author: authorVal,
    pages: pagesVal,
    rating: ratingVal,
  };
  // Storing books with key of title+author to assure there are no duplicated books
  // If a book has the same title and same author they are the same book
  // Add new book to localStorage
  localStorage.setItem(`${titleVal}+${authorVal}`, JSON.stringify(book));

  // Remove book from library

  let removeBtn = newBook.querySelector(".remove");
  removeBtn.addEventListener("click", () => {
    newBook.remove();
    localStorage.removeItem(`${titleVal}+${authorVal}`);
  });
}

// Displays all elements in localStorage
// Loop through each key in localStorage
Object.keys(localStorage).forEach((key) => {
  // Get the value of each key using JSON.parse()
  let value = JSON.parse(localStorage.getItem(key));
  // Create new book with value keys
  createNewBook(value.title, value.author, value.pages, value.rating);
});
