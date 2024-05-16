// Función para buscar un cliente por su DNI
function buscarClientePorDNI() {
    var dni = document.getElementById('dniConsulta').value;
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    
    // Si se ingresa un DNI, buscar el cliente correspondiente
    if (dni) {
        var clienteEncontrado = clientes.find(function(cliente) {
            return cliente.dni === dni;
        });
        if (clienteEncontrado) {
            // Mostrar la información del cliente si se encuentra
            mostrarInformacionCliente(clienteEncontrado);
            // Limpiar la pantalla después de un tiempo y regresar al menú del cliente
            setTimeout(function() {
                limpiarPantallaYMostrarMenuCliente();
            }, 5000); // Cambiar el valor de 5000 a la cantidad de milisegundos que desees
        } else {
            alert('El cliente con DNI ' + dni + ' no está registrado.');
        }
    } else {
        // Si no se ingresa ningún DNI, mostrar todos los clientes y estadísticas
        mostrarTodosClientes(clientes);
        // Limpiar la pantalla después de un tiempo y regresar al menú del cliente
        setTimeout(function() {
            limpiarPantallaYMostrarMenuCliente();
        }, 5000); // Cambiar el valor de 5000 a la cantidad de milisegundos que desees
    }
}

// Función para limpiar la pantalla y mostrar el menú del cliente
function limpiarPantallaYMostrarMenuCliente() {
    limpiarPantalla();
    regresarMenuCliente();
    // Ocultar el formulario de consulta
    var formularioConsulta = document.getElementById('formularioConsulta');
    if (formularioConsulta) {
        formularioConsulta.style.display = 'none';
        // Limpiar el contenido del campo de DNI
        document.getElementById('dniConsulta').value = '';
    }
}

// Función para mostrar la información del cliente
function mostrarInformacionCliente(cliente) {
    var infoClienteElement = document.getElementById('infoCliente');
    infoClienteElement.innerHTML = '';

    var infoHTML = '<h2>Información del Cliente</h2>';
    infoHTML += '<p><strong>Nombre:</strong> ' + cliente.nombre + '</p>';
    infoHTML += '<p><strong>Apellido:</strong> ' + cliente.apellido + '</p>';
    infoHTML += '<p><strong>DNI:</strong> ' + cliente.dni + '</p>';
    if (cliente.limite) {
        infoHTML += '<p><strong>Tipo de Cliente:</strong> VIP</p>';
        infoHTML += '<p><strong>Límite de Crédito:</strong> ' + cliente.limite + '</p>';
    } else {
        infoHTML += '<p><strong>Tipo de Cliente:</strong> Regular</p>';
        if (cliente.descuento) {
            infoHTML += '<p><strong>Descuento:</strong> ' + cliente.descuento + '%</p>';
        } else {
            infoHTML += '<p>Este cliente no tiene descuento.</p>';
        }
    }
    infoClienteElement.innerHTML = infoHTML;
    infoClienteElement.style.display = 'block';
}

// Función para mostrar la lista de todos los clientes y las estadísticas
function mostrarTodosClientes(clientes) {
    var listaClientesHTML = '<h2>Lista de Clientes</h2>';
    if (clientes.length > 0) {
        listaClientesHTML += '<ul>';
        clientes.forEach(function(cliente) {
            listaClientesHTML += '<li><strong>Nombre:</strong> ' + cliente.nombre + ', <strong>Apellido:</strong> ' + cliente.apellido + ', <strong>DNI:</strong> ' + cliente.dni;
            if (cliente.limite) {
                listaClientesHTML += ', <strong>Tipo de Cliente:</strong> VIP, <strong>Límite de Crédito:</strong> ' + cliente.limite;
            } else {
                listaClientesHTML += ', <strong>Tipo de Cliente:</strong> Regular';
                if (cliente.descuento) {
                    listaClientesHTML += ', <strong>Descuento:</strong> ' + cliente.descuento + '%';
                }
            }
            listaClientesHTML += '</li>';
        });
        listaClientesHTML += '</ul>';

        listaClientesHTML += mostrarEstadisticasClientesHTML(clientes);
    } else {
        listaClientesHTML += '<p>No hay clientes registrados.</p>';
    }
    document.getElementById('listaClientes').innerHTML = listaClientesHTML;
    document.getElementById('listaClientes').style.display = 'block';
    document.getElementById('infoCliente').style.display = 'none';
}

// Función para generar el HTML de las estadísticas de clientes
function mostrarEstadisticasClientesHTML(clientes) {
    var totalLimites = 0;
    var limiteMaximo = Number.MIN_VALUE;
    var limiteMinimo = Number.MAX_VALUE;
    var clienteMaximo;
    var clienteMinimo;
    var totalClientes = clientes.length;

    clientes.forEach(function(cliente) {
        // Sumar al total de límites
        if (cliente.limite) {
            totalLimites += parseInt(cliente.limite);
            // Actualizar el límite máximo y mínimo
            if (cliente.limite > limiteMaximo) {
                limiteMaximo = cliente.limite;
                clienteMaximo = cliente;
            }
            if (cliente.limite < limiteMinimo) {
                limiteMinimo = cliente.limite;
                clienteMinimo = cliente;
            }
        }
    });

    var estadisticasHTML = '<h2>Estadísticas de Clientes</h2>';
    estadisticasHTML += '<p><strong>Total de clientes:</strong> ' + totalClientes + '</p>'; // Agrega el total de clientes al HTML
    estadisticasHTML += '<p><strong>Total de todos los límites:</strong> ' + totalLimites + '</p>';
    if (clienteMaximo) {
        estadisticasHTML += '<p><strong>Límite máximo:</strong> ' + clienteMaximo.nombre + ' ' + clienteMaximo.apellido + ', Límite: ' + clienteMaximo.limite + '</p>';
    }
    if (clienteMinimo) {
        estadisticasHTML += '<p><strong>Límite mínimo:</strong> ' + clienteMinimo.nombre + ' ' + clienteMinimo.apellido + ', Límite: ' + clienteMinimo.limite + '</p>';
    }
    return estadisticasHTML;
}

// Función para limpiar la pantalla
function limpiarPantalla() {
    // Limpiar el contenido de consulta de cliente
    document.getElementById('infoCliente').innerHTML = '';
    document.getElementById('listaClientes').innerHTML = '';
    document.getElementById('dniConsulta').value = '';
}

// Función para regresar al menú del cliente
function regresarMenuCliente() {
    // Limpiar la pantalla
    limpiarPantalla();
    // Ocultar el contenido que no pertenece al menú del cliente
    document.getElementById('listaClientes').style.display = 'none';
    document.getElementById('infoCliente').style.display = 'none';
    // Mostrar el menú del cliente
    document.getElementById('clienteMenu').style.display = 'block';
    // Ocultar el menú principal
    document.getElementById('menuPrincipal').style.display = 'none';
}
