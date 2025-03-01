// 869bb6d9527a7c9257f4e0a64336b85d api key


const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "869bb6d9527a7c9257f4e0a64336b85d";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city name");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    throw new Error("City not found");
  }
  return await response.json();
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    return "⛈️";
  } else if (weatherId >= 300 && weatherId < 400) {
    return "🌧️";
  } else if (weatherId >= 500 && weatherId < 600) {
    return "🌧️";
  } else if (weatherId >= 600 && weatherId < 700) {
    return "❄️";
  } else if (weatherId >= 700 && weatherId < 800) {
    return "🌫️";
  } else if (weatherId === 800) {
    return "☀️";
  } else if (weatherId > 800) {
    return "☁️";
  }
  return "❓";
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  
  card.textContent = "";
  card.style.display = "flex";
  
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = getWeatherEmoji(id);
  
  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temperature: ${Math.round(temp)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = `${weatherEmoji} ${description}`;
  
  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

