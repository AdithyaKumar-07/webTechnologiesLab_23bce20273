const table = document.getElementById("inventoryTable");
const message = document.getElementById("message");
const totalValueEl = document.getElementById("totalValue");
const form = document.getElementById("productForm");

let inventoryData = [];

// Load JSON data
function loadInventory() {
  fetch("inventory.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load inventory");
      return res.json();
    })
    .then(data => {
      inventoryData = data.products;
      displayInventory(inventoryData);
      calculateTotalValue();
    })
    .catch(err => {
      showMessage("Error loading JSON data", "error");
      console.error(err);
    });
}

// Display products
function displayInventory(products) {
  table.innerHTML = "";

  products.forEach(product => {
    const row = document.createElement("tr");

    // Conditional formatting for low stock
    if (product.stock <= 5) {
      row.classList.add("lowStock");
    }

    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="editProduct('${product.id}')">Edit</button>
        <button onclick="deleteProduct('${product.id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// Validation
function validateProduct(id, name, category, price, stock) {
  if (!id || !name || !category || !price || !stock) {
    showMessage("All fields required", "error");
    return false;
  }
  if (price <= 0 || stock < 0) {
    showMessage("Invalid price or stock value", "error");
    return false;
  }
  return true;
}

// CREATE
form.addEventListener("submit", e => {
  e.preventDefault();

  const id = id.value;
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);

  if (!validateProduct(id, name, category, price, stock)) return;

  inventoryData.push({ id, name, category, price, stock });

  displayInventory(inventoryData);
  calculateTotalValue();
  showMessage("Product added", "success");
  form.reset();
});

// UPDATE
function editProduct(id) {
  const product = inventoryData.find(p => p.id === id);

  const newPrice = prompt("Enter new price:");
  const newStock = prompt("Enter new stock:");

  if (newPrice) product.price = parseFloat(newPrice);
  if (newStock) product.stock = parseInt(newStock);

  displayInventory(inventoryData);
  calculateTotalValue();
  showMessage("Product updated", "success");
}

// DELETE
function deleteProduct(id) {
  inventoryData = inventoryData.filter(p => p.id !== id);
  displayInventory(inventoryData);
  calculateTotalValue();
  showMessage("Product deleted", "success");
}

// SEARCH
function searchProduct() {
  const category = document.getElementById("searchCategory").value.toLowerCase();

  const filtered = inventoryData.filter(p =>
    p.category.toLowerCase().includes(category)
  );

  displayInventory(filtered);
}

// Total inventory value
function calculateTotalValue() {
  const total = inventoryData.reduce((sum, product) =>
    sum + (product.price * product.stock), 0);

  totalValueEl.textContent = total;
}

// Messages
function showMessage(msg, type) {
  message.textContent = msg;
  message.className = type;
}

// Initial load
loadInventory();
