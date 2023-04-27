const moment = require('moment');
let edad;
const hoy = moment();
const nacimiento = moment('25/06/1990', 'DD/MM/YYYY');

    if(nacimiento.isValid()){
        edad = hoy.diff(nacimiento, 'years');
        dias = hoy.diff(nacimiento, 'days');   
        console.log(`Tengo ${edad} años y llevo ${dias} días vivo`)
        } else {
        console.log('Formato incorrecto');
    }


