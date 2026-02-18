const usernameInput = document.getElementById("username");
const statusDiv = document.getElementById("status");
const form = document.getElementById("registerForm");

let isUsernameAvailable = false;

// Check username as user types
usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();

  if (username.length === 0) {
    statusDiv.textContent = "";
    return;
  }

  // Show loading indicator
  statusDiv.textContent = "Checking...";
  statusDiv.className = "loading";

  // AJAX request using Fetch API
  fetch("usernames.json")
    .then(response => response.json())
    .then(data => {
      const existingUsers = data.users;

      if (existingUsers.includes(username.toLowerCase())) {
        statusDiv.textContent = "Username already taken";
        statusDiv.className = "taken";
        isUsernameAvailable = false;
      } else {
        statusDiv.textContent = "Username available";
        statusDiv.className = "available";
        isUsernameAvailable = true;
      }
    })
    .catch(error => {
      statusDiv.textContent = "Error checking username";
      statusDiv.className = "taken";
      isUsernameAvailable = false;
    });
});

// Prevent form submission if username unavailable
form.addEventListener("submit", (e) => {
  if (!isUsernameAvailable) {
    e.preventDefault();
    alert("Please choose an available username before submitting.");
  } else {
    alert("Form submitted successfully!");
  }
});
