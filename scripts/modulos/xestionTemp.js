const DIA_SEMANA = ['Luns', 'Martes', 'Mercores', 'Xoves', 'Venres', 'Sabado', 'Domingo'];

let hoxe = new Date();
let opcions = {weekday: 'long'};
let diaActual = hoxe.toLocaleDateString('pt-PT', opcions);

diaActual = diaActual.charAt(0).toUpperCase() + diaActual.slice(1);

let ordeDias = DIA_SEMANA.slice(DIA_SEMANA.indexOf(diaActual)).concat(DIA_SEMANA.slice(0, DIA_SEMANA.indexOf(diaActual)));

export default ordeDias;