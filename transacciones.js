cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("depositar");
    deshabilitarComponente("retirar");

}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    for (let i = 0; i < cuentas.length; i++) {
        if (numeroCuenta == cuentas[i].numeroCuenta) {
            //console.log(cuentas[i]);
            return cuentas[i];
        }
    }
    return null;
}

ejecutarBusqueda = function () {
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
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
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada = buscarCuenta(numeroCuenta);
    cuentaAfectada.saldo += monto;
    console.log(cuentaAfectada.saldo);
}

ejecutarDeposito = function () {
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    let numeroCuenta = recuperarTexto("numeroDeCuenta");
    let valorADepositar = recuperarFloat("valor");
    depositar(numeroCuenta, valorADepositar);
    alert("TRANSACCION EXITOSA");
    let cuentaBuscar = buscarCuenta(numeroCuenta);
    mostrarTexto("cuentaExistente", "Numero de cuenta: " + cuentaBuscar.numeroCuenta + "\nCedula: " + cuentaBuscar.cedula + "\nNombre: " + cuentaBuscar.nombre + " " + cuentaBuscar.apellido + "\nSaldo: " + cuentaBuscar.saldo);
}

//depositard = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
//}

retirar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
     cuentaAfectada = buscarCuenta(numeroCuenta);
     if(cuentaAfectada.saldo>=monto){
        cuentaAfectada.saldo -= monto;
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

