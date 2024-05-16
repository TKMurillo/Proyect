// Función para eliminar un cliente por su DNI
function eliminarClientePorDNI() {
    var dni = document.getElementById('dniEliminacion').value;
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Verificar si hay clientes almacenados
    if (clientes.length > 0) {
        var clienteIndex = clientes.findIndex(function(cliente) {
            return cliente.dni === dni;
        });

        // Verificar si se encontró al cliente
        if (clienteIndex !== -1) {
            // Confirmar con el usuario antes de eliminar
            if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
                // Eliminar el cliente del array
                clientes.splice(clienteIndex, 1);
                // Actualizar el localStorage
                localStorage.setItem('clientes', JSON.stringify(clientes));
                alert('Cliente eliminado correctamente.');
            }
        } else {
            alert('El cliente con DNI ' + dni + ' no está registrado.');
        }
    } else {
        alert('No hay clientes registrados.');
    }

    // Limpiar la pantalla
    limpiarPantalla();
    // Volver al submenú del cliente
    regresarSubMenuCliente();
}

// Función para regresar al submenú del cliente después de eliminar un cliente
function regresarSubMenuCliente() {
    document.getElementById('clienteMenu').style.display = 'block';
}

// Función para limpiar la pantalla
function limpiarPantalla() {
    document.getElementById('dniEliminacion').value = ''; // Limpiar el campo de DNI
    document.getElementById('eliminarClienteForm').style.display = 'none'; // Ocultar el formulario de eliminación
}
