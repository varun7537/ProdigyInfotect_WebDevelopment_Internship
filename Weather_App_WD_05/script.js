const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city'); // Adjusted selector to select all city elements

let cityInput = "London";
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=9785721996c65560793286735ebfc1b5&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.split('/').pop();
            icon.src = "./icons/" + iconId;

            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + " km/h";

            let timeOfDay = data.current.is_day ? "day" : "night";
            const code = data.current.condition.code;

            if (code === 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = timeOfDay === "day" ? "#e5ba92" : "#181e27";
            } else if ([1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clouds.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay === "night") {
                    btn.style.background = "#181e27";
                }
            } else if ([1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rain.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay === "night") {
                    btn.style.background = "#325c80";
                }
            } else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snow.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay === "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}

fetchWeatherData();

app.style.opacity = "1";
