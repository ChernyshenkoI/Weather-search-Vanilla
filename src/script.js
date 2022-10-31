function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  

function displayWeather (responce){
document.querySelector("#city").innerHTML=responce.data.name
document.querySelector("#temperature").innerHTML=Math.round(responce.data.main.temp)
document.querySelector("#humidity").innerHTML=responce.data.main.humidity
document.querySelector("#wind").innerHTML=Math.round(responce.data.wind.speed)
document.querySelector("#description").innerHTML=responce.data.weather[0].main
let iconElement=document.querySelector("#icon")
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/10d@2x.png`)

celsusTemperature=responce.data.main.temp

}

function searchCity(city) {
    let apiKey = "e53a3ec273016795243d6681c997ded2";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function searchLocation(position) {
    let apiKey = "e53a3ec273016795243d6681c997ded2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeather);
  }

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

function handleSubmit (event){
    event.preventDefault();
    let units = "metric"
    let city= document.querySelector("#city-input").value
    searchCity(city)
}

let dateElement =document.querySelector("#date")
let currentTime = new Date ();
dateElement.innerHTML=formatDate(currentTime)

let searchForm = document.querySelector("#search-form")
searchForm.addEventListener("submit", handleSubmit)

function showFarenheitTemperature (event){
  event.preventDefault()

  celsusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let farenheitTemperature= (celsusTemperature*9/5) + 32 
  let temperatureElement=document.querySelector("#temperature")
  temperatureElement.innerHTML=Math.round(farenheitTemperature)
}

function showCelsusTemperature(event){
  event.preventDefault()

  celsusLink.classList.add("active");
  farenheitLink.classList.remove("active");

  let temperatureElement=document.querySelector("#temperature")
  temperatureElement.innerHTML=Math.round(celsusTemperature)   

}

let celsusTemperature= null;

farenheitLink=document.querySelector("#farenheit-link")
farenheitLink.addEventListener("click", showFarenheitTemperature)

celsusLink=document.querySelector("#farenheit-link")
celsusLink.addEventListener("click", showCelsusTemperature)

searchCity();