const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  app.use(express.static(__dirname + "/"));
});

app.post("/", (req, res) => {
  const apiKey = "f238c040cb51b9d7ad0a4983342f498c";
  const city = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  https.get(url, (response) => {
    console.log(response.statusCode);
    console.log(req.body.cityName);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const urlWeatherIcon = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      res.write(`<h1>Weather in ${city}:</h1>`);
      res.write(`<p><strong>The temperature is ${temp} &#8451</strong></p>`);
      res.write(`<p>Description: ${weatherDescription}</p>`);
      res.write(`<img src="${urlWeatherIcon}" alt="icon">`)
      res.send();
    })
  });
})

app.listen(3000, () => {
  console.log("Server is running on");
})
