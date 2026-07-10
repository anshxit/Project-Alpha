const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const inputField = document.getElementById('city-input');
const button = document.getElementById('get-weather');

button.addEventListener('click', () => { 
   const name = inputField.value.trim(); 

    if (name === "") {
        alert("Please enter a city name.");
    } else {
        getWeather(name);
    }
});

inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        button.click();
    }
});

async function getWeather(name) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4ccccf4c0e751417ead1476450518849&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = data.main.temp;
        description.textContent = data.weather[0].description;
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = (data.wind.speed * 3.6).toFixed(1);

        inputField.value = "";

    } catch (error) {
        alert(error.message);
    }
}