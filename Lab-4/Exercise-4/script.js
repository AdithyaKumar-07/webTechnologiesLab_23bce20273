const resultDiv = document.getElementById("weatherResult");

let cachedCity = "";
let cachedData = null;

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) return;

  // Check cache first
  if (city === cachedCity && cachedData) {
    displayWeather(cachedData);
    return;
  }

  // Show loading spinner
  resultDiv.innerHTML = "<p class='loading'>Loading weather data...</p>";

  const apiKey = "YOUR_API_KEY_HERE"; // paste your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // AJAX GET request
  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found");
        }
        throw new Error("Network error");
      }
      return response.json();
    })
    .then(data => {

      // Cache result
      cachedCity = city;
      cachedData = data;

      displayWeather(data);
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    });
}

// Display data dynamically
function displayWeather(data) {

  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const condition = data.weather[0].description;

  resultDiv.innerHTML = `
    <h3>${data.name}</h3>
    <p><b>Temperature:</b> ${temperature}°C</p>
    <p><b>Humidity:</b> ${humidity}%</p>
    <p><b>Condition:</b> ${condition}</p>
  `;
}
