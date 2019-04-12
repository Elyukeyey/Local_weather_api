//app state
const state = {
    show: 'celsius',
    temp: 0,
    location: '',
    icon: '',
    description: '',
}
  
// common functions  
const changePlaces = (id, content) => {  document.getElementById(id).innerHTML = content; }
const parseImage = (content) => {
     document.getElementById('image').innerHTML = 
       `<img src=${content} alt='current weather image' class='pos-rel pos-center-y'>`;
}
// Location & data 
const success = (pos) => {
    
  const req = new XMLHttpRequest;
  req.open('GET',`https://fcc-weather-api.glitch.me/api/current?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
  req.send();
    
req.onreadystatechange = (e) => {
      let data = JSON.parse(req.responseText);
  
      state.temp = parseInt(Math.round(data.main.temp));
      state.icon = data.weather[0].icon;
      state.description = data.weather[0].description;
      state.location = data.name + ', ' + data.sys.country
      changePlaces('main', Math.round(data.main.temp));
      changePlaces('weather-data', data.weather[0].description);
      changePlaces('location',data.name + ', ' + data.sys.country);
      parseImage(data.weather[0].icon);
  }
 
}
const error = (err) => {
    changePlaces('weather-data',err);
    console.log('err: ' + err);
} 

// Get position
navigator.geolocation.getCurrentPosition(success,error);

// toggle button
const handleClick = () => {
    (state.show === 'celsius') ? state.show = 'fahrenheit' : state.show = 'celsius';
    changePlaces('metrics',(state.show === 'celsius') ? '°C' : 'F');
    changePlaces('main',(state.show === 'celsius') ?  state.temp : parseInt((state.temp*5/9)+32));
}