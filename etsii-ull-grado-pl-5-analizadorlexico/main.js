Object.prototype.error = function (message, t) {
    t = t || this;
    t.name = "SyntaxError";
    t.message = message;
    throw t; // Genera una excepción. Y salta al catch de abajo con la excepción, e, que es un objeto.
};

function main() {
    var parse = make_parse();


    var source = INPUT.value;
    var string, tree;
    try {
        tree = parse(source);
        
        //string = JSON.stringify(tree, ['type', 'value', 'from', 'to'],  4);
        string = JSON.stringify(tree, ['key', 'name', 'message',
             'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
    } catch (e) {
        string = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4); //La excepción, los campos que queremos que se van y el 4 es el sangrado.
    }
    OUTPUT.innerHTML = string.replace(/&/g, '&amp;').replace(/[<]/g, '&lt;');
};

window.onload = function() {
  PARSE.onclick = main;
}
