let matriz = [
    ["joaquin", "martin", "padre"],
    ["joaquin", "alicia", "madre"],
    ["martin", "eduardo", "padre"],
    ["martin", "marisol", "madre"],
    ["alicia", "ricardo", "padre"],
    ["alicia", "stella", "madre"],
    ["eduardo", "jorge", "padre"],
    ["eduardo", "romina", "madre"],
    ["marisol", "nose", "padre"],
    ["marisol", "nose", "madre"],
    ["stella", "nose", "padre"],
    ["stella", "nose", "madre"],
    ["ricardo", "nose", "padre"],
    ["ricardo", "nose", "madre"]
];

function encontrarPadres(nombre, matriz) {
    let padres = { padre: "", madre: "" };

    matriz.forEach(([hijo, progenitor, tipo]) => {
        if (hijo === nombre) {
            padres[tipo] = progenitor;
        }
    });

    return padres;
}

function construirArbol(nombre, matriz) {
    let nodo = {
        nombre: nombre,
        hijos: []
    };

    let padres = encontrarPadres(nombre, matriz);

    if (padres.padre) {
        nodo.hijos.push(construirArbol(padres.padre, matriz));
    }

    if (padres.madre) {
        nodo.hijos.push(construirArbol(padres.madre, matriz));
    }

    return nodo;
}

let raiz = matriz[0][0];
let arbolGenealogico = construirArbol(raiz, matriz);

function construirArbolHTML(nodo, contenedor) {
    let divNodo = document.createElement('div');
    divNodo.className = 'node';
    divNodo.textContent = nodo.nombre;
    contenedor.appendChild(divNodo);

    nodo.hijos.forEach(hijo => {
        construirArbolHTML(hijo, divNodo);
    });
}

let contenedor = document.getElementById('arbol-genealogico');
construirArbolHTML(arbolGenealogico, contenedor);