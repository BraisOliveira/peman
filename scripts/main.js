const CHAVEAPI = '7326f07e4f9431394b8aa421c633ac07';
const TEMPO = document.querySelector('.tempo');
const TEMPERATURA = document.querySelector('.temperatura');
const LOCALIZACION = document.querySelector('.localizacion');
const HORA = document.querySelectorAll('.hora-nome-prevision');
const TEMPO_HORA = document.querySelectorAll('.hora-prevision-valor');

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
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=es&exclude=minutely&units=metric&appid=${CHAVEAPI}`)
    .then((resposta) => {
        return resposta.json();
    })
    .then ((data) => {
        //console.log(data);
        resultadosAPI = data;
        TEMPO.innerText = resultadosAPI.current.weather[0].description;
        TEMPERATURA.innerText = `${Math.trunc(resultadosAPI.current.temp)}º`;
        LOCALIZACION.innerText = resultadosAPI.timezone
        
        let horaActual = new Date().getHours();
        for(let i = 0; i < HORA.length; i++) {
            let horaIncr = horaActual + i * 2;

            HORA[i].innerText = `${horaIncr} h`;
        }

        for(let i = 0; i < TEMPO_HORA.length; i++) {
            TEMPO_HORA[i].innerText = `${resultadosAPI.hourly[i * 2].temp}º`;
        }
    })
}