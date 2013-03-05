"use strict"; // Use ECMAScript 5 strict mode in browsers that support it   (strict)

$(document).ready(function() { //ready
   $("#fileinput").change(calculate); //change
});

function calculate(evt) {
  var f = evt.target.files[0]; 

  if (f) {
    var r = new FileReader(); //Filereader
    r.onload = function(e) { 
      var contents = e.target.result; //result 

      var tokens = lexer(contents);
      var pretty = tokensToString(tokens);

      out.className = 'unhidden';
      initialinput.innerHTML = contents; //innerHTML
      finaloutput.innerHTML = pretty; //innerHTML
    }
    r.readAsText(f); // Leer como texto (readAsText)
  } else { 
    alert("Failed to load file");
  }
}

var temp = '<li> <span class = "<%= t.type %>"> <%= s %> </span>\n'; //%= Código javascript se evaluara y se inserta por el =, el % lo que hace es evaluarlo.% Tipo de token y en el otro la cadena que representa al token. Nombre de token como clase t.type...s  //token.type....match.

function tokensToString(tokens) {
   var r = '';
   for(var i in tokens) {
     var t = tokens[i];
     var s = JSON.stringify(t, undefined, 2); //t, objeto que queremos convertir a cadena, 2 significa el sangrado que se hace y undefined significa que se pongan todos los campos pero podemos mostrar el que queramos poniendo ahi por ejemplo type o value.
     s = _.template(temp, {t: t, s: s}); //primer argumento del template es el propio template (temp) y el otro son los nombres que usamos arriba en temp =.
//t:t es token: t y en s:s es match:s
     r += s;
   }
   return '<ol>\n'+r+'</ol>'; //tag <ol> es lista ordenada
}

function lexer(input) {

  var blanks         = /^\s+/; 
  var iniheader      = /^\[([^\]\r\n]+)\]/;
  var comments       = /^[;#](.*)/;
  var nameEqualValue = /^([^=;\r\n]+)=([^;\r\n]*)/;
  var any            = /^(.|\n)+/;

  var out = [];
  var m = null;

  while (input != '') {
    if (m = blanks.exec(input)) { //exec
      input = input.replace(blanks, '');//input = input.substr(m.index+m.lastIndex); //m.lastIndex
      out.push({ type : 'Blancos', match: m });  //'blanks' ..... match: m
    }
    else if (m = iniheader.exec(input)) {
      input = input.replace(iniheader, '');//input = input.substr(m.index+m.lastIndex); //m.index+m.lastIndex
      out.push({ type : 'Cabeceras', match: m }); // avanzemos en input out.push({ type : ________, match: _ }); input.lastIndex
    }
    else if (m = comments.exec(input)) {
      input = input.replace(comments, '');//input = input.substr(m.index+m.lastIndex); //m.index+m.lastIndex
      out.push({ type : 'Comentarios', match: m });//out.push({ type : ________, match: _ });
    }
    else if (m = nameEqualValue.exec(input)) {
      input = input.replace(nameEqualValue, '');//input = input.substr(m.index+m.lastIndex); //m.index+m.lastIndex
      out.push({ type : 'NombreEqualValor', match: m }); //out.push({ type : ________, match: _ });
    }
    else if (m = any.exec(input)) {
      input = input.replace(any, '');
      out.push({ type : 'Error', match: m }); //out.push({ type : ________, match: _ });
      //input = '';
    }
    else {
      alert("Fatal Error!"+substr(input,0,20));
      input = '';
    }
  }
  return out;
}
