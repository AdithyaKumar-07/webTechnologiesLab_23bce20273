const table = document.getElementById("bookTable");
const message = document.getElementById("message");
const form = document.getElementById("bookForm");

let xmlDoc;

// Load XML using AJAX
function loadBooks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "books.xml", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      xmlDoc = xhr.responseXML;

      if (!xmlDoc) {
        showMessage("Malformed XML file", "error");
        return;
      }

      displayBooks(xmlDoc.getElementsByTagName("book"));
      showMessage("Books loaded successfully", "success");
    } else {
      showMessage("Error loading XML", "error");
    }
  };

  xhr.send();
}

// Display XML data in table
function displayBooks(books) {
  table.innerHTML = "";

  for (let book of books) {
    const id = book.getElementsByTagName("id")[0].textContent;
    const title = book.getElementsByTagName("title")[0].textContent;
    const author = book.getElementsByTagName("author")[0].textContent;
    const status = book.getElementsByTagName("status")[0].textContent;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${id}</td>
      <td>${title}</td>
      <td>${author}</td>
      <td>${status}</td>
      <td>
        <button onclick="updateStatus('${id}')">Update</button>
        <button onclick="deleteBook('${id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  }
}

// Validation
function validateBook(id, title, author, status) {
  if (!id || !title || !author || !status) {
    showMessage("All fields required", "error");
    return false;
  }
  return true;
}

// CREATE → Add new book
form.addEventListener("submit", e => {
  e.preventDefault();

  const id = bookId.value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const status = document.getElementById("status").value;

  if (!validateBook(id, title, author, status)) return;

  const book = xmlDoc.createElement("book");
  book.appendChild(createNode("id", id));
  book.appendChild(createNode("title", title));
  book.appendChild(createNode("author", author));
  book.appendChild(createNode("status", status));

  xmlDoc.documentElement.appendChild(book);

  loadBooks();
  showMessage("Book added successfully", "success");
  form.reset();
});

// UPDATE → Modify availability
function updateStatus(id) {
  const books = xmlDoc.getElementsByTagName("book");

  for (let book of books) {
    if (book.getElementsByTagName("id")[0].textContent === id) {
      const newStatus = prompt("Enter new availability:");

      if (newStatus) {
        book.getElementsByTagName("status")[0].textContent = newStatus;
        loadBooks();
        showMessage("Status updated", "success");
      }
    }
  }
}

// DELETE → Remove book
function deleteBook(id) {
  const books = xmlDoc.getElementsByTagName("book");

  for (let book of books) {
    if (book.getElementsByTagName("id")[0].textContent === id) {
      book.remove();
      loadBooks();
      showMessage("Book deleted", "success");
      break;
    }
  }
}

// Helper node creator
function createNode(tag, value) {
  const node = xmlDoc.createElement(tag);
  node.textContent = value;
  return node;
}

// Message
function showMessage(msg, type) {
  message.textContent = msg;
  message.className = type;
}

// Initial load
loadBooks();
