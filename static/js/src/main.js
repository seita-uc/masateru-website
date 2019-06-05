import 'babel-polyfill';
import { masateru } from './masateru.js';
import { threeD } from './threeD.js';

$(document).ready(function(){
    new p5(masateru);
    new p5(threeD);
})
