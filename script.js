// to keep everything cleaner I made my API Key and ID in variables so I could insert them into the URL
let apiKey = "a2b8aa83b0cfc4777c9bbb6687981072";
let apiId = "524901";

function findWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${apiId}&appid=${apiKey}&q=${city}`
  )
    .then(function (response) {
      return response.json();
    })
    // I also made the key and ID into variables so I could use the API to get it's lat and lon. Once having the lat and lon I could fetch it, like below, and use it to show location.
    .then(function (data) {
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?id=${apiId}&appid=${apiKey}&lat=${lat}&lon=${lon}&units=imperial`
      );
    })
    .then(function (response) {
      return response.json();
    })
    // With the API working I could call from it in order to get Temp, Humidity, wind speed, and uv index.
    .then(function (data) {
      document.querySelector("#current .card-title").textContent =
        city + " " + new Date().toLocaleString("en-US", { dateStyle: "short" });
      document.querySelector("#current .temp").textContent =
        "Temperature: " + data.current.temp;
      document.querySelector("#current .humid").textContent =
        "Humidity: " + data.current.humidity + "%";
      document.querySelector(
        "#current .wind-speed"
      ).textContent = `Wind Speed: ${data.current.wind_speed} mph`;
      document.querySelector(
        "#current .uv-index"
      ).textContent = `UV Index: ${data.current.uvi}`;
      // Did the same thing below in order to get the 5 day. Didn't use moment to get the dates. Found the current day in the API under daily, and using an array was able to call each day by adding 1.

      document.querySelector("#day-one .card-title").textContent = new Date(
        data.daily[1].dt * 1000
      ).toLocaleString("en-US", { dateStyle: "short" });
      document.querySelector("#day-one .temp").textContent =
        "Temp: " + data.daily[1].temp.day;
      document.querySelector("#day-one .humid").textContent =
        "Humidity: " + data.daily[1].humidity + "%";

      document.querySelector("#day-two .card-title").textContent = new Date(
        data.daily[2].dt * 1000
      ).toLocaleString("en-US", { dateStyle: "short" });
      document.querySelector("#day-two .temp").textContent =
        "Temp: " + data.daily[2].temp.day;
      document.querySelector("#day-two .humid").textContent =
        "Humidity: " + data.daily[2].humidity + "%";

      document.querySelector("#day-three .card-title").textContent = new Date(
        data.daily[3].dt * 1000
      ).toLocaleString("en-US", { dateStyle: "short" });
      document.querySelector("#day-three .temp").textContent =
        "Temp: " + data.daily[3].temp.day;
      document.querySelector("#day-three .humid").textContent =
        "Humidity: " + data.daily[3].humidity + "%";

      document.querySelector("#day-four .card-title").textContent = new Date(
        data.daily[4].dt * 1000
      ).toLocaleString("en-US", { dateStyle: "short" });
      document.querySelector("#day-four .temp").textContent =
        "Temp: " + data.daily[4].temp.day;
      document.querySelector("#day-four .humid").textContent =
        "Humidity: " + data.daily[4].humidity + "%";

      document.querySelector("#day-five .card-title").textContent = new Date(
        data.daily[5].dt * 1000
      ).toLocaleString("en-US", { dateStyle: "short" });
      document.querySelector("#day-five .temp").textContent =
        "Temp: " + data.daily[5].temp.day;
      document.querySelector("#day-five .humid").textContent =
        "Humidity: " + data.daily[5].humidity + "%";

      console.log(data);
    });
}
// Have to have local storage on the left of the page. A lot of this code is similar to how I was able to get the high score list in the week 4 homework.
findWeather("Denver");

let searchBtn = document.getElementById("searchBtn");
let searches = JSON.parse(localStorage.getItem("searches"));
if (searches == null) {
  searches = [];
}
let pastSearches = document.getElementById("past-search");

function renderSearches() {
  pastSearches.innerHTML = "";
  for (let i = 0; i < searches.length; i++) {
    let searchesLineItem = searches[i];
    let searchesLineElement = document.createElement("li");
    searchesLineElement.classList.add("list-group-item");
    searchesLineElement.textContent = searchesLineItem;
    searchesLineElement.addEventListener("click", function () {
      findWeather(searchesLineItem);
    });

    pastSearches.appendChild(searchesLineElement);
  }
}
// Did the local storage through the search button to keep past searches on the screen.
searchBtn.addEventListener("click", function () {
  let searchInput = document.getElementById("search");
  if (searches.length === 10) {
    searches.pop();
  }

  searches.unshift(searchInput.value);

  localStorage.setItem("searches", JSON.stringify(searches));

  renderSearches();

  findWeather(searchInput.value);
  searchInput.value = "";
});
renderSearches();
