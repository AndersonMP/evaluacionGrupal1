let movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" }
]

cargar = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");

}

filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];
    let cuenta;
    console.log(movimientos);
    for (let i = 0; i < movimientos.length; i++) {
        cuenta = movimientos[i];
        if (cuenta.numeroCuenta == numeroCuenta) {
            movimientosCuenta.push(cuenta);
        }
    }
    mostrarMovimientos(movimientosCuenta);
    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos = function (misMovimientos) {
    let cmptabla = document.getElementById("tablaMovimientos");
    let contenidoTabla = "<table><tr>" +
        "<th>NUMERO CUENTA</th>" +
        "<th>MONTO</th>" +
        "<th>TIPO</th>" +
        "</tr>";
    let elemento;
    let monto;
    for (let i = 0; i < misMovimientos.length; i++) {
        elemento = misMovimientos[i];
        if(elemento.tipo=="D"){
            monto=elemento.monto*-1;
        }else{
            monto=elemento.monto;
        }
        contenidoTabla +=
            "<tr><td>" + elemento.numeroCuenta + "</td>"
            + "<td>" + monto + "</td>"
            + "<td>" + elemento.tipo + "</td>"
            + "</tr>";
    }
    contenidoTabla += "</table>";
    cmptabla.innerHTML = contenidoTabla;
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
}

buscarM = function () {
    let cuenta = recuperarTexto("txtC");
    filtrarMovimientos(cuenta);
}






