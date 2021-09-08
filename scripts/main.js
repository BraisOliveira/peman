import ordeDias from "./modulos/xestionTemp.js";
const CHAVEAPI = '7326f07e4f9431394b8aa421c633ac07';
const TEMPO = document.querySelector('.tempo');
const TEMPERATURA = document.querySelector('.temperatura');
const LOCALIZACION = document.querySelector('.localizacion');
const HORA = document.querySelectorAll('.hora-nome-prevision');
const TEMPO_HORA = document.querySelectorAll('.hora-prevision-valor');
const DIA_PREVISION_NOME = document.querySelectorAll('.dia-prevision-nome');
const DIA_PREVISION_TEMPO = document.querySelectorAll('.dia-prevision-tempo');
const IMG = document.querySelector('.logo-meteo');

let resultadosAPI; 

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posicion => {
        let lon = posicion.coords.longitude;
        let lat = posicion.coords.latitude;
        ChamadaAPI(lon, lat);

    }, () => {
        alert('Vostede rexeitou comunicarlle ao programa onde se atopa, a aplicación non pode funcionar sen xeolocalización.')

    })
}

function ChamadaAPI(lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=gl&exclude=minutely&units=metric&appid=${CHAVEAPI}`)
    .then((resposta) => {
        return resposta.json();
    })
    .then ((data) => {
        resultadosAPI = data;
        TEMPO.innerText = resultadosAPI.current.weather[0].description;
        TEMPERATURA.innerText = `${Math.trunc(resultadosAPI.current.temp)}º`;
        LOCALIZACION.innerText = resultadosAPI.timezone
        
        let horaActual = new Date().getHours();

        
        for(var i = 0; i < HORA.length; i++) {
            let horaIncr = horaActual + i * 2;
            let hora24 = horaIncr - 24;

            HORA[i].innerText = `${horaIncr} h`;

            if (horaIncr === 24) {
                HORA[i].innerText = "00 h";
            }
            if (horaIncr > 24) {
                HORA[i].innerText = `${hora24} h`;
            }
       
        }

        for(var i = 0; i < TEMPO_HORA.length; i++) {
            TEMPO_HORA[i].innerText = `${resultadosAPI.hourly[i * 2].temp}º`;
        }
        for (var i = 0; i < ordeDias.length; i++) {
            DIA_PREVISION_NOME[i].innerText = ordeDias[i].slice(0,3);
        }

        for(var i = 0; i < 7; i++){
            DIA_PREVISION_TEMPO[i].innerText = `${Math.trunc(resultadosAPI.daily[i + 1].temp.day)}°`
        }
        if(horaActual >= 8 && horaActual < 21) {
            IMG.src = `img/dia/${resultadosAPI.current.weather[0].icon}.svg`;
        } else  {
           IMG.src = `img/noite/${resultadosAPI.current.weather[0].icon}.svg`;
        }

    })
}