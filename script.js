const button = document.getElementById('button');

button.addEventListener('click',() => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else {
        button.innerText = "Your browser does not support";
    }
});

const api_key = '238b2dce6a1b45e290dfe77cfa033334';

function onSuccess(position) {
    let {latitude,longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`)
    .then(response => response.json())
    .then(result => {
        let allDetails = result.results[0].components;
        let {country,city,county} = allDetails;
        button.innerText = `${country} ${city} ${county}`;
    }).catch(()=> {
        button.innerText = 'Unable to retrieve location data';
    })
}

function onError(error) {
    if(error.code == 1) {
        button.innerText = "Your request is denied";
    }
    else if(error.code == 2) {
        button.innerText = "Location not available";
    }
    else {
        button.innerText = "Something went wrong";
    }
}