"use ______"; // Use ECMAScript 5 strict mode in browsers that support it   (strict)

$(document)._____(function() { //ready
   $("#fileinput").______(calculate); //change
});

function calculate(evt) {
  var f = evt.target.files[0]; 

  if (f) {
    var r = new __________(); //Filereader
    r.onload = function(e) { 
      var contents = e.target.______; //result
      
      var tokens = lexer(contents);
      var pretty = tokensToString(tokens);
      
      out.className = 'unhidden';
      initialinput._________ = contents; //innerHTML
      finaloutput._________ = pretty; //innerHTML
    }
    r.__________(f); // Leer como texto (readAsText)
  } else { 
    alert("Failed to load file");
  }
}

var temp = '<li> <span class = "<%= ______ %>"> <%= _ %> </span>\n'; //%= Código javascript se evaluara y se inserta por el =, el % lo que hace es evaluarlo.% Tipo de token y en el otro la cadena que representa al token. Nombre de token como clase t.type...s  //token.type....match.

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
  var blanks         = /^___/; 
  var iniheader      = /^________________/;
  var comments       = /^________/;
  var nameEqualValue = /^________________________/;
  var any            = /^_______/;

  var out = [];
  var m = null;

  while (input != '') {
    if (m = blanks.____(input)) { //exec
      input = input.substr(m.index+___________); // ''
      out.push({ type : ________, match: _ });  //'blanks' ..... match: m
    }
    else if (m = iniheader.exec(input)) {
      input = input.substr(___________________);
      _______________________________________ // avanzemos en input out.push({ type : ________, match: _ });
    }
    else if (m = comments.exec(input)) {
      input = input.substr(___________________); //m.index+''
      _________________________________________ //out.push({ type : ________, match: _ });
    }
    else if (m = nameEqualValue.exec(input)) {
      input = input.substr(___________________); //m.index+''
      _______________________________________________ //out.push({ type : ________, match: _ });
    }
    else if (m = any.exec(input)) {
      _______________________________________ //out.push({ type : ________, match: _ });
      input = '';
    }
    else {
      alert("Fatal Error!"+substr(input,0,20));
      input = '';
    }
  }
  return out;
}
