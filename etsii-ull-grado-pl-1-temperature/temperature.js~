"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

//Se usa use strict para seguir las reglas de programación.

function calculate() {
  var result;
  var original = document.getElementById("original");
  var temp = original.value;
  var regexp = /(\d+\.?\d+?)(\w)/; // Los parentesis suelen tener memoria en las expresiones regulares
  
  //Parte que casa con el número la parentisas y tb la letras /(\d+\.?\d+?)(\w)/
  
  var m = temp.match(regexp);
  
  if (m) {
    var num = m[1];
    var type = m[2];
    num = parseFloat(num);
    if (type == 'c' || type == 'C') {
      result = (num * 9/5) + 32 +"F";
    }
    else {
      result = (num - 32) * 5/9 + "C";
    }
    converted.innerHTML = result;
  }
  else {
    converted.innerHTML = "ERROR! Try something like '-4.2C' instead";
  }
}
