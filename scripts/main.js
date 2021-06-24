mapboxgl.accessToken = 'pk.eyJ1IjoiYmF0dWlzaWsiLCJhIjoiY2twd21wb3EwMGt2bDJvcDJ3dDdrdXRobCJ9.EHZaXToF8V_66jDmWrq4GQ';

// Initialate map


function getAPIdata() {

    var url = 'https://api.openweathermap.org/data/2.5/weather';
    var apiKey = '77b5a1b499377e0ab9dc5bafdcf07531';
    var city = 'pretoria';

    // construct request
    var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;

    // get current weather
    fetch(request)

    // parse to JSON format
    .then(function(response) {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    })

    // render weather per day
    .then(function(response) {
        // render weatherCondition
        onAPISucces(response);
    })

    // catch error
    .catch(function(error) {
        onAPIError(error);
    });
}

function onAPISucces(response) {
    // get type of weather in string format
    var type = response.weather[0].description;

    // get temperature in Celcius
    var degC = Math.floor(response.main.temp - 273.15);

    // render weather in DOM
    var weatherBox = document.getElementById('weather');
    weatherBox.innerHTML = degC + '&#176;C ' + type;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/batuisik/ckqb9i3611q7i18p5dcitda3w',
        center: [28.236499553842332, -25.730124537238773],
        zoom: 13,
        pitch: 45,
        bearing: 30,
    });

    var myPopup1 = new mapboxgl.Popup().setHTML(degC + ' °C ' + type);

    var marker1 = new mapboxgl.Marker().setLngLat([28.236499553842332, -25.730124537238773]).setPopup(myPopup1).addTo(map);
}


function onAPIError(error) {
    console.error('Request failed', error);
    var weatherBox = document.getElementById('weather');
    weatherBox.className = 'hidden';
}

// init data stream
getAPIdata();