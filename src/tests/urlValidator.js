
var isValidUrl = require('../utils/url-validator');

const firstCheck = isValidUrl('https://www.freecodecamp.org/');
const secondCheck = isValidUrl('mailto://freecodecamp@mail.org');
const thirdCheck = isValidUrl('https://www.sqlitetutorial.net/sqlite-select/');

console.log(firstCheck); // true
console.log(secondCheck); // false
console.log(thirdCheck); // false