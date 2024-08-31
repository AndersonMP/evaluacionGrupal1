cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

let movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos


/* Inicio JS Cuentas*/
cargar=function(){
    mostrarCuentas();
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    
}

cargarTransacciones = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("depositar");
    deshabilitarComponente("retirar");

}

cargarMovimientos = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");

}

mostrarCuentas=function(){
        let cmpTabla = document.getElementById("tablaCuentas");
        let elementoCuenta;
        let contenidoTabla = 
            "<table class='table table-striped table-bordered'>" +
                "<thead>" +
                    "<tr>" +
                        "<th>NÚMERO CUENTA</th>" +
                        "<th>NOMBRE</th>" +
                        "<th>SALDO</th>" +
                    "</tr>" +
                "</thead>" +
                "<tbody>";
            
        for (let i = 0; i < cuentas.length; i++) {
            elementoCuenta = cuentas[i];
            contenidoTabla += 
                "<tr>" +
                    "<td>" + elementoCuenta.numeroCuenta + "</td>" +
                    "<td>" + elementoCuenta.nombre + " " + elementoCuenta.apellido +   "</td>" +
                    "<td>" + elementoCuenta.saldo + "</td>" +
                "</tr>"; 
        }
        contenidoTabla += "</tbody></table>"; 
        cmpTabla.innerHTML = contenidoTabla;

}

buscarCuenta=function(numeroCuenta){
    let existeCuenta = null;
    let elementoCuenta;

    for (let i = 0; i < cuentas.length; i++){
        elementoCuenta = cuentas[i];
        if (elementoCuenta.numeroCuenta == numeroCuenta){
            existeCuenta = elementoCuenta;
            break;
        } 
    }

    return existeCuenta;
}

agregarCuenta=function(cuenta){
    let existe = buscarCuenta(cuenta.numeroCuenta);
    if (existe != null){
        alert("CUENTA EXISTENTE");
        return;
    } else {
        alert ("CUENTA AGREGADA");
        cuentas.push(cuenta);
        limpiar ();
    }
}

agregar=function(){
    let valorCedula = recuperarTexto ("txtCedula");
    let valorNombre = recuperarTexto ("txtNombre");
    let valorApellido = recuperarTexto ("txtApellido");
    let valorCuenta = recuperarTexto ("txtCuenta");

    let cuenta = {};
    cuenta.numeroCuenta = valorCuenta;
    cuenta.cedula = valorCedula;
    cuenta.nombre = valorNombre;
    cuenta.apellido = valorApellido;
    cuenta.saldo = 0;
    agregarCuenta(cuenta);
    mostrarCuentas();
}

limpiar = function () {
    mostrarTextoEnCaja ("txtCedula", "");
    mostrarTextoEnCaja ("txtNombre", "");
    mostrarTextoEnCaja ("txtApellido", "");
    mostrarTextoEnCaja ("txtCuenta", "");
}
/*Fin JS Cuentas*/

/*Inicio JS Transacciones*/

ejecutarBusqueda = function () {
    let numeroCuenta = recuperarTexto("numeroDeCuenta");
    let cuentaBuscar = buscarCuenta(numeroCuenta);
    if (cuentaBuscar != null) {
        console.log(cuentaBuscar);
        mostrarTexto("cuentaExistente", "Numero de cuenta: " + cuentaBuscar.numeroCuenta + "\nCedula: " + cuentaBuscar.cedula + "\nNombre: " + cuentaBuscar.nombre + " " + cuentaBuscar.apellido + "\nSaldo: " + cuentaBuscar.saldo);
        habilitarComponente("depositar");
        habilitarComponente("retirar");
    } else {
        alert("CUENTA INEXISTENTE");
    }

}

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    let movimiento = {};
    cuentaAfectada = buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo += monto;
    movimiento.numeroCuenta = numeroCuenta;
    movimiento.tipo = "C";
    movimiento.monto = monto;
    movimientos.push (movimiento);
}

ejecutarDeposito = function () {
    let numeroCuenta = recuperarTexto("numeroDeCuenta");
    let valorADepositar = recuperarFloat("valor");
    depositar(numeroCuenta, valorADepositar);
    alert("TRANSACCION EXITOSA");
    let cuentaBuscar = buscarCuenta(numeroCuenta);
    mostrarTexto("cuentaExistente", "Numero de cuenta: " + cuentaBuscar.numeroCuenta + "\nCedula: " + cuentaBuscar.cedula + "\nNombre: " + cuentaBuscar.nombre + " " + cuentaBuscar.apellido + "\nSaldo: " + cuentaBuscar.saldo);
}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    let movimiento = {};
    cuentaAfectada = buscarCuenta(numeroCuenta);
    if(cuentaAfectada.saldo>=monto){
        cuentaAfectada.saldo -= monto;
        movimiento.numeroCuenta = numeroCuenta;
        movimiento.tipo = "D";
        movimiento.monto = monto;
        movimientos.push(movimiento);
        alert("TRANSACCION EXITOSA");
        mostrarTexto("cuentaExistente", "Numero de cuenta: " + cuentaAfectada.numeroCuenta + "\nCedula: " + cuentaAfectada.cedula + "\nNombre: " + cuentaAfectada.nombre + " " + cuentaAfectada.apellido + "\nSaldo: " + cuentaAfectada.saldo);
    }else{
        alert("SALDO INSUFICIENTE");
    }
}
ejecutarRetiro = function () {
    let numeroCuenta = recuperarTexto("numeroDeCuenta");

    let valorARetirar = recuperarFloat("valor");
    retirar(numeroCuenta, valorARetirar);
}
/*Fin JS Transacciones*/

/*Inicio JS Movimientos*/
filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];
    let cuenta;
    for (let i = 0; i < movimientos.length; i++) {
        cuenta = movimientos[i];
        if (cuenta.numeroCuenta == numeroCuenta) {
            movimientosCuenta.push(cuenta);
        } 
    }
    mostrarMovimientos(movimientosCuenta);
}

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
}

buscarM = function () {
    let cuenta = recuperarTexto("txtC");
    filtrarMovimientos(cuenta);
}
/*Fin JS Movimientos*/
