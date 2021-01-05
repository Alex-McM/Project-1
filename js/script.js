const weatherAPIKey = "5ef88dc51d3ee5b81c89c1e9a4e916a9";

getWeatherInformation("London");

// This function will get weather information for the city passed to it
function getWeatherInformation(cityName) {

    var weatherAPIurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + 37.8136 + "&lon=" + 144.9631 + "&exclude=current,minutely,hourly,alerts&appid=" + weatherAPIKey;

    $.ajax(weatherAPIurl).then(function (response) {
        console.log(response);
    });

}