import { handleSubmit } from './js/formHandler';
//import { datep } from './js/datepicker';
//const materialize = require 'materialize';

import './styles/base.css';
//import './styles/footer.css';
import './styles/materialize.css';
//import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
//import '../../dist/'


const submit = document.querySelector('.submit');

submit.addEventListener('click', e => {

    handleSubmit(e);
    //checkForName();

});
//to check 
//console.log(checkForName);

alert("I EXIST")
console.log("CHANGE!!");