var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var temp = document.querySelector(".temp");
var desc = document.querySelector(".desc");
var clouds = document.querySelector(".clouds");
var button = document.querySelector(".submit");
var image = document.querySelector(".image");
var slider = document.querySelector(".switch");
var currentLocation = document.querySelector(".current");
let lat;
let long;
var units = "metric";
var tempUnits = "&deg;C";

slider.addEventListener("change", function (data) {
  if (units == "imperial") {
    units = "metric";
    tempUnits = "&deg;C";
  } else if (units == "metric") {
    units = "imperial";
    tempUnits = "&deg;F";
  }
});

currentLocation.addEventListener("click", function (name) {
  if (navigator.geolocation) {
    getWeatherByCoords();
  } else {
    alert("Current location not accepted.");
  }
});

button.addEventListener("click", function (name) {
  getWeatherByName();
});

function getWeatherByName() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=8542ec0423c929b1624192d5d9396284&units=" +
      units
  )
    .then((response) => response.json())
    .then((data) => {
      var tempValue = data["main"]["temp"];
      var nameValue = data["name"];
      var descValue = data["weather"][0]["main"];
      var iconCode = data["weather"][0]["icon"];

      main.innerHTML = nameValue;
      image.innerHTML = `<img src=http://openweathermap.org/img/w/${iconCode}.png width="60px" height="60px">`;
      desc.innerHTML = "Current Weather Description - " + descValue;
      temp.innerHTML = "Current Temperature - " + tempValue + tempUnits;
      input.value = "";
    })

    .catch((err) =>
      alert(
        "City information unavailable! • Please make sure you have a correct city name."
      )
    );
}

function getWeatherByCoords() {
  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=8542ec0423c929b1624192d5d9396284&units=" +
        units
    )
      .then((response) => response.json())
      .then((data) => {
        var tempValue = data["main"]["temp"];
        var nameValue = data["name"];
        var descValue = data["weather"][0]["main"];
        var iconCode = data["weather"][0]["icon"];

        main.innerHTML = nameValue;
        image.innerHTML = `<img src=http://openweathermap.org/img/w/${iconCode}.png width="60px" height="60px">`;
        desc.innerHTML = "Current Weather Description - " + descValue;
        temp.innerHTML = "Current Temperature - " + tempValue + tempUnits;
        input.value = "";
      })
      .catch((err) =>
        alert(
          "Current location information unavailable! • Please make sure you have your location enabled."
        )
      );
  });
}
