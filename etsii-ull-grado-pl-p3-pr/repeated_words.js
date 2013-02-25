"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("#fileinput").change(calculate);
});

function generateOutput(contents) {
  return contents.replace(/\b([a-z_]\w*)(\s+)\1\b/ig,'<span class = "repeated"> $1 </span> $2'); // /\b([a-z]+)(\s+)(\1)+/ig , <span class = "repeated"> $1 </span> $2 --Casiano.
}

function calculate(evt) {
  var f = evt.target.files[0]; 
  var contents = '';

  if (f) {
    var r = new FileReader(); //Objeto lector de ficheros
    r.onload = function(e) { 
      contents = e.target.result;
      var escaped  = escapeHtml(contents);
      var outdiv = document.getElementById("out");
      outdiv.className = 'unhidden';
      finaloutput.innerHTML = generateOutput(escaped); // Crea un objeto al tenerlo declarado en index
      initialinput.innerHTML = escaped; //Tambien crea un objeto por que esta declaro en el index

    }
    r.readAsText(f);
  } else { 
    alert("Failed to load file");
  }
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

function escapeHtml(string) { //Sirve para escapar el formato y que no salga en el resultado sino que salga el formato que queremos sin H1 o similar si tuviese.
  return String(string).replace(/[&<>\/'"]/g, function (s) { 
    return entityMap[s];
  });
};
