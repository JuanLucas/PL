/*Practica de poner un id = num separados por punto y coma y luego mostrarlos en un hash*/



%lex
%%



\s+               {/* skip whitespace */}
[a-zA-Z_]\w*      {return 'ID';}
[=;]					{return yytext;}
\d+(\.\d+)?([-+]?[eE]\d+)?		{yytext = Number (yytext); return 'NUM';}
.										{return 'INVALID';}

/lex

%{

var s = {};

var make_traverse = function() {
          var seen = [];
          return function(key, val) {
            if (typeof val == "object") {
              if (seen.indexOf(val) >= 0) return undefined
              seen.push(val)
            }
            return val
          };
};
%}

%%

p	: s
      {
 				var ss = JSON.stringify(s,undefined,2);
				console.log(ss);
				return "<ul> \n <li> Tabla de simbolos: <p> " + ss + "\n </ul>";
      }
	;

s	: e
	| s ';' e
	;

e	: ID '=' NUM {s[$1] = $$ = $3;}
	| ID '=' INVALID	
   	{
			throw new Error( "Se ha producido un error" + (yy.lexer.yylineno + 1) + ":\n" + yy.lexer.showPosition() + '\n');
      }
	;

/* La primera regla que se ejecuta en el arbol va desde abajo hacia arriba y solo cuenta el numero de identificadores .

Como se inicia a vacio ponemos $$ que es A se pone a 0 luego se ejecuta le A x y se le suma 1 y va hacia arriba hasta llegar a la raíz
lo que se pone en S : A retorna por el parse que es el número de X que se han identificado, siendo X el numero de elementos.

La practica hay que modificarla para que reconozca secuencias de id = num; separado por puntos y comas o solo comas.*/
