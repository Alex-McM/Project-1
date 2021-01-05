const weatherAPIKey = "5ef88dc51d3ee5b81c89c1e9a4e916a9";

var weatherNotificationDiv = $("#weatherNotification");

init();

// This function is ran when the js loads
function init() {
    weatherNotificationDiv.hide();
}

// This event is triggered when somebody selects a new date
document.querySelector("#reservation-date").addEventListener('change', function (event){
    // Get the selected date as a UNIX timestamp
    var selectedDateUnix = event.target.valueAsNumber;

    // Get weather information for the selected date
    getWeatherInformation(selectedDateUnix);
});


// This function will get weather information for the city passed to it
function getWeatherInformation(UnixDate) {
    var weatherAPIurl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + 37.8136 + "&lon=" + 144.9631 + "&exclude=current,minutely,hourly,alerts&appid=" + weatherAPIKey;

    // Convert the date input to a date time and add 2 hours
    var selectedDate = new Date(UnixDate);
    selectedDate.addHours(2);

    $.ajax(weatherAPIurl).then(function (response) {
        console.log(response);

        // Stores the weather data for the date the user selected if it is found
        var selectedDateData = null;

        // Go through the next 7 days weather data and check if any of them are equal to the selected date
        for (let index = 0; index < response.daily.length; index++) {
            const day = response.daily[index];
            var date = new Date(day.dt * 1000);    
            
            if (date.getTime() == selectedDate.getTime()) {
                selectedDateData = response.daily[index];
            }
        }

        weatherNotificationDiv.show(1000);

        // If weather data was found for the selected date...
        if (selectedDateData != null) {

            var weatherNotification = "";

            // Get the weather forecasted that day
            var weatherMain = selectedDateData.weather[0].main;
            
            // Set the notification message based on the weather forecast
            switch (weatherMain) {
                case "Snow":
                    weatherNotification = "Snow is forecasted, so rug up in your warmest coat and we'll find you a table inside!";
                    break;
                case "Thunderstorm":
                    weatherNotification = "There is a Thunderstorm forecast that day, wear something warm and drive safe!";
                    break;
                case "Drizzle":
                    weatherNotification = "A drizzle is forecasted that day, wear a jacket and book a table inside!";
                    break;
                case "Rain":
                    weatherNotification = "Rain is forecast, wear a coat and drive safe!";
                    break;
                case "Clear":
                    weatherNotification = "The weather that day is forecasted to be clear!";
                    break;
                case "Clouds":
                    weatherNotification = "The weather that day is forecasted to be cloudy, could get chilly so bring a jacket!";
                    break;
                default:
                    break;
            }

            // Display the weather notification
            weatherNotificationDiv.text(weatherNotification);

        } else {
            // Display a message saying the information could not be found
            weatherNotificationDiv.text("Could not find weather information for the selected date!");
        }
    });

}

// Adding to the functionality of the date class so I can conveniently add 2 hours
Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }