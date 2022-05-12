let now = new Date();
let apiKey = "dc61f0ce6df2d06f78975534efcf7a8d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

function setInfo(response){
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML += Math.round(response.data.main.humidity);
  document.querySelector("#wind").innerHTML += Math.round(response.data.wind.speed);
}

///time

let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Fri", "Sat"];
let day = days [now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`

///inputfield 


function search(event){ 
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h2 = document.querySelector("h2")
  h2.innerHTML = `${searchInput.value} `;
  console.log(searchInput.value);
  axios.get(`${apiUrl}?q=${searchInput.value}&appid=${apiKey}&units=metric`).then(setInfo);

}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

///currenloaction 

function currentlocation(position){ 
  console.log('position', position)
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios.get(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(setInfo);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentlocation);
}

let formLoaction = document.querySelector("#searchLoaction");
formLoaction.addEventListener("click", getCurrentLocation);
