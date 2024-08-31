let cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarCuentas();
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    
}

mostrarCuentas=function(){
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
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

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
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

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta=function(cuenta){
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
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
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas

    let valorCedula = recuperarTexto ("txtCedula");
    let valorNombre = recuperarTexto ("txtNombre");
    let valorApellido = recuperarTexto ("txtApellido");
    let valorCuenta = recuperarTexto ("txtCuenta");

    let cuenta = {};
    cuenta.numeroCuenta = valorCuenta;
    cuenta.cedula = valorCedula;
    cuenta.valorNombre = valorNombre;
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
