function currentweather () {

    var lat = '45.08' //localStorage.getItem('lon')
    var lon = '-93.118' //localStorage.getItem('lat')

    var units = 'imperial' //localStorage.getItem('clientunits') 

    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=temperatureApparent&fields=humidity&fields=precipitationProbability&fields=windSpeed&fields=weatherCode&timesteps=1h&units='+ units +'&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var main =  data.data.timelines[0].intervals
        
        var currentTemp = main[0].values.temperature.toFixed(0)
        var currentTempFeel = main[0].values.temperatureApparent.toFixed(0) + '°'

        var currentHumidity = main[0].values.humidity.toFixed(0) + '%'
        var currentWindSpeed = main[0].values.windSpeed.toFixed(0) + 'mph'
        var currentRainChance = main[0].values.precipitationProbability.toFixed(0) + '%'


        if (localStorage.getItem('clientunits') && localStorage.getItem('clientunits') == 'metric') {
            document.querySelector('.largetempdisplay').innerHTML = currentTemp+ '°' + ' C'
        } else {
            document.querySelector('.largetempdisplay').innerHTML = currentTemp  + '°'
        }

        document.querySelector('.feelsTemp').innerHTML =  currentTempFeel
        document.querySelector('.windSpeed').innerHTML =  currentWindSpeed
        document.querySelector('.humidity').innerHTML =  currentHumidity
        document.querySelector('.rainChance').innerHTML =  currentRainChance
    })
}
currentweather()