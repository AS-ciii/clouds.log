const api_key = "";
var city;
const container = document.querySelector(".container");
const darkModeButton = document.getElementById("mode");
const icon_mode = darkModeButton.querySelector("i");
const logo = document.getElementById("cloud");
const city_text = document.querySelector(".location");
const temperature_text = document.querySelector(".Temperature");
const condition = document.querySelector(".condition");
const humidity = document.querySelector(".b1");
const Wind_speed = document.querySelector(".b2");
const visibility = document.querySelector(".b3");
const city_name = document.querySelector(".textfield");
const Search = document.querySelector(".search_glass");
const error_img = document.createElement('img');
const boxes = document.querySelectorAll(".box");
error_img.src = "error_image.png";

darkModeButton.addEventListener("click", function () {
    if (icon_mode.classList.contains("bxs-moon")) {
        document.body.classList.add("light-mode");
        icon_mode.style.fontSize = "19px";
        logo.style.filter = "brightness(0) invert(0) grayscale(100%)";
        document.body.style.backgroundColor = "#222";
        error_img.style.filter = "brightness(0) invert(0) grayscale(100%)";
    } else {
        document.body.classList.remove("light-mode");
        icon_mode.style.fontSize = "15px";
        logo.style.filter = "brightness(0) invert(1) grayscale(100%)";
        document.body.style.backgroundColor = "#fff";
        error_img.style.filter = "brightness(0) invert(1) grayscale(100%)";
    }
    icon_mode.classList.toggle("bxs-moon");
    icon_mode.classList.toggle("bxs-sun");
});

async function fetchInfo() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        );

        if (!response.ok) {
            throw new Error("Weather data not available");
        }
        const data = await response.json();
        console.log(data);
        updateInfo(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        boxes.forEach(box => {
            box.style.height = "0vw";
        });    
        container.appendChild(error_img);
        if (icon_mode.classList.contains("bxs-moon")) {
            error_img.style.filter = "brightness(0) invert(1) grayscale(100%)";
        } else {
            error_img.style.filter = "brightness(0) invert(0) grayscale(100%)";
        }
        if(window.innerWidth <= 1024) { 
            error_img.style.height = "43vw";
            error_img.style.width = "60vw";
            error_img.style.top = '60%';
        } else {
            error_img.style.height = "18vw";
            error_img.style.width = "26vw";
            error_img.style.top = '58%';
        }    
        error_img.style.position = 'absolute';
        error_img.style.left = '50.5%';
        error_img.style.transform = 'translate(-50%, -50%)';
    }
}

function updateInfo(data) {
    city_text.innerHTML = `<i class='bx bxs-edit-location' id="location-icon"></i><h2 class="city">${data.name}, ${data.sys.country}</h2></div>`;
    temperature_text.innerHTML = `${Math.round(data.main.temp - 273.15)}<span class="celsius"><span class="degree">&deg;</span>C</span>`;
    const iconData = data.weather[0].main;
    condition.innerHTML = `<i class="material-icons" id="weather">${conditionIcons(iconData)}</i>${data.weather[0].description}</div>`;
    humidity.innerHTML = `<i class="material-icons">water_drop</i>${data.main.humidity}%<span class="humidity">Humidity</span></div>`;
    Wind_speed.innerHTML = `<i class="material-icons">air</i>${data.wind.speed} m/s<span class="wind-s">Wind Speed</span></div>`;
    visibility.innerHTML = `<i class="material-icons">visibility</i>${data.visibility/1000} km<span class="visibility">Visibility</span></div>`
}   

function conditionIcons(iconData) {
    const icon = {
        Clear: "sunny",
        Clouds: "cloud",
        Rain: "umbrella",
        Thunderstorm: "thunderstorm",
        Drizzle: "umbrella",
        Snow: "ac_unit",
        Mist: "cloudy_snowing",
        Smoke: "filter_drama",
        Haze: "foggy",
        Fog: "foggy",
        Dust: "grain"
    };
    return icon[iconData];
}

city_name.addEventListener("click", function(){
    if(container.contains(error_img)) {
        container.removeChild(error_img);
        if(window.innerWidth <= 1024) {
            container.style.height = "30vw";
        } else {
            container.style.height = "11vw";
        }    
    } 
    if(city_text.textContent !== "") {
        if(window.innerWidth <= 1024) {
            container.style.height = "33vw";
        } else {
            container.style.height = "12vw";
        }  
        city_text.innerHTML = "";
        temperature_text.innerHTML = "";
        condition.innerHTML = "";
        humidity.innerHTML = "";
        Wind_speed.innerHTML = "";
        visibility.innerHTML = "";
        boxes.forEach(box => {
            box.style.height = "0vw";
        });
    }
});


Search.addEventListener("click", function() {
    if(container.contains(error_img)) {
        container.removeChild(error_img);
    } 
    if(city_name.value !== "") {
        if(window.innerWidth <= 1024) {
            container.style.height = "86vw";
            boxes.forEach(box => {
                box.style.height = "25vw";
            });
        } else {
            container.style.height = "33vw";
            boxes.forEach(box => {
                box.style.height = "8vw";
            }); 
        }    
        city = city_name.value;
        console.log(city);
        fetchInfo();
        city_name.value = "";
    } else {
        alert("Please enter a city name");
    }
});