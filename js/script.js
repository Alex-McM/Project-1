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
            weatherNotificationDiv.text("We found weather information for the selected date!");
        } else {
            weatherNotificationDiv.text("Could not find weather information for the selected date!");
        }
    });

}

// Adding to the functionality of the date class so I can conveniently add 2 hours
Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }