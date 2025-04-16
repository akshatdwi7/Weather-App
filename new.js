const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "869bb6d9527a7c9257f4e0a64336b85d"; // Removed extra space

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    await getWeather(city);
  } else {
    displayError("Please enter a city name");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeatherInfo(data);
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeatherInfo(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const weatherDescription = weather[0].description;
  const weatherId = weather[0].id;
  const emoji = getWeatherEmoji(weatherId);

  card.textContent = "";
  card.style.display = "flex";

  const weatherDisplay = document.createElement("p");
  weatherDisplay.innerHTML = `🌍 <b>${name}</b> <br> 🌡️ ${temperature}°C <br> ${emoji} ${weatherDescription}`;
  weatherDisplay.classList.add("weatherDisplay");

  card.appendChild(weatherDisplay);
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
  if (weatherId >= 300 && weatherId < 500) return "🌧️"; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
  if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
  if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
  if (weatherId === 800) return "☀️"; // Clear
  if (weatherId > 800) return "☁️"; // Clouds
  return "🌍"; // Default
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

// Select elements
const eventForm = document.querySelector(".eventForm");
const eventInput = document.querySelector(".eventInput");
const eventList = document.querySelector(".eventList");

// Add event listener to the form
eventForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const eventText = eventInput.value.trim();

  if (eventText) {
    addEvent(eventText);
    eventInput.value = ""; // Clear input field
  }
});

// Function to add an event
function addEvent(eventText) {
  const eventItem = document.createElement("li");
  eventItem.classList.add("eventItem");

  const eventContent = document.createElement("span");
  eventContent.textContent = eventText;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", () => {
    eventItem.remove();
  });

  eventItem.appendChild(eventContent);
  eventItem.appendChild(deleteButton);
  eventList.appendChild(eventItem);
}
