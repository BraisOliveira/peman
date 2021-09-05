const CHAVEAPI = '7326f07e4f9431394b8aa421c633ac07';
let resultadosAPI; 

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posicion => {
        //console.log(posicion);
        let lon = posicion.coords.longitude;
        let lat = posicion.coords.latitude;
        ChamadaAPI(lon, lat);

    }, () => {
        alert('Vostede rexeitou comunicarlle ao programa onde se atopa, a aplicación non pode funcionar sen xeolocalización.')

    })
}

function ChamadaAPI(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${CHAVEAPI}`)
    .then((resposta) => {
        return resposta.json();
    })
    .then ((data) => {
        console.log(data);
    })
}