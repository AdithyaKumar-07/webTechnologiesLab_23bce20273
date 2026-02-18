const searchBox = document.getElementById("searchBox");
const resultsDiv = document.getElementById("results");

let debounceTimer;

// Debounce function
searchBox.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    searchProducts(searchBox.value.trim());
  }, 500); // delay API calls by 500ms
});

function searchProducts(query) {

  if (query.length === 0) {
    resultsDiv.innerHTML = "";
    return;
  }

  // Show loading
  resultsDiv.innerHTML = "<p class='loading'>Searching...</p>";

  // AJAX request using Fetch
  fetch("products.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .then(data => {
      const products = data.products;

      // Filter matching products
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      displayResults(filtered);
    })
    .catch(error => {
      resultsDiv.innerHTML = "<p class='error'>Error fetching products</p>";
      console.error(error);
    });
}

function displayResults(products) {

  if (products.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  resultsDiv.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <p>Category: ${product.category}</p>
    `;

    resultsDiv.appendChild(div);
  });
}
