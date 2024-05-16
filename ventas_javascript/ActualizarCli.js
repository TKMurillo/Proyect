// Función para buscar un cliente por su DNI y mostrar los campos para actualizar la información
function buscarClienteParaActualizar() {
    const dni = document.getElementById('dniActualizar').value;
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Buscar el cliente por su DNI en la lista de clientes guardados
    const clienteEncontrado = clientes.find(cliente => cliente.dni === dni);

    if (!clienteEncontrado) {
        alert("Cliente no encontrado. Verifique el DNI ingresado.");
        return;
    }

    // Mostrar los campos para actualizar la información del cliente
    mostrarCamposActualizacion(clienteEncontrado);
}

// Función para mostrar los campos para actualizar la información del cliente
function mostrarCamposActualizacion(cliente) {
    const formularioActualizacion = document.getElementById('formularioActualizacion');
    formularioActualizacion.innerHTML = `
        <div class="input-group">
            <label for="nombreActualizar">Nuevo Nombre:</label>
            <input type="text" id="nombreActualizar" name="nombreActualizar" value="${cliente.nombre}">
        </div>
        <div class="input-group">
            <label for="apellidoActualizar">Nuevo Apellido:</label>
            <input type="text" id="apellidoActualizar" name="apellidoActualizar" value="${cliente.apellido}">
        </div>
        <div class="input-group">
            <label for="tipoClienteActualizar">Nuevo Tipo de Cliente:</label>
            <select id="tipoClienteActualizar" name="tipoClienteActualizar" onchange="mostrarOpcionesAdicionales()">
                <option value="1" ${cliente.descuento || cliente.limite ? '' : 'selected'}>Regular</option>
                <option value="2" ${cliente.limite ? 'selected' : ''}>VIP</option>
            </select>
        </div>
        <div class="input-group" id="tieneTarjetaDiv" style="display: ${cliente.descuento && cliente.descuento > 0 ? 'block' : 'none'};">
            <label for="tieneTarjeta">¿Tiene Tarjeta?</label>
            <input type="checkbox" id="tieneTarjeta" name="tieneTarjeta" ${cliente.descuento && cliente.descuento > 0 ? 'checked' : ''}>
        </div>
        <div class="input-group" id="descuentoActualizar" style="display: ${cliente.descuento ? 'block' : 'none'};">
            <label for="descuento">Nuevo Descuento:</label>
            <input type="number" id="descuento" name="descuento" value="${cliente.descuento || ''}" min="0" max="100">
        </div>
        <div class="input-group" id="opcionesAdicionalesActualizar" style="display: ${cliente.limite ? 'block' : 'none'};">
            <label for="limiteCreditoActualizar">Nuevo Límite de Crédito:</label>
            <input type="number" id="limiteCreditoActualizar" name="limiteCreditoActualizar" value="${cliente.limite || ''}" min="10000" max="20000">
        </div>
        <div class="input-group">
            <button onclick="actualizarCliente('${cliente.dni}')">Actualizar</button>
        </div>
    `;
    formularioActualizacion.style.display = 'block';
}

// Función para mostrar opciones adicionales según el tipo de cliente seleccionado
function mostrarOpcionesAdicionales() {
    const tipoCliente = document.getElementById('tipoClienteActualizar').value;
    const tieneTarjetaDiv = document.getElementById('tieneTarjetaDiv');
    const descuentoDiv = document.getElementById('descuentoActualizar');
    const limiteCreditoDiv = document.getElementById('opcionesAdicionalesActualizar');

    if (tipoCliente === '1') {
        tieneTarjetaDiv.style.display = 'block';
        descuentoDiv.style.display = 'block';
        limiteCreditoDiv.style.display = 'none';
    } else if (tipoCliente === '2') {
        tieneTarjetaDiv.style.display = 'none';
        descuentoDiv.style.display = 'none';
        limiteCreditoDiv.style.display = 'block';
    }
}

// Función para actualizar la información del cliente en el almacenamiento local
function actualizarCliente(dni) {
    const nombre = document.getElementById('nombreActualizar').value;
    const apellido = document.getElementById('apellidoActualizar').value;
    const tipoCliente = document.getElementById('tipoClienteActualizar').value;
    let descuento;
    let limiteCredito;

    if (tipoCliente === '1') {
        const tieneTarjeta = document.getElementById('tieneTarjeta').checked;
        descuento = tieneTarjeta ? 10 : 0;
        limiteCredito = undefined;
    } else if (tipoCliente === '2') {
        descuento = undefined; // Eliminar el descuento para clientes VIP
        limiteCredito = document.getElementById('limiteCreditoActualizar').value;
    }

    // Validar los datos actualizados
    if (!nombre || !apellido) {
        alert("Los campos Nombre y Apellido son obligatorios.");
        return;
    }

    // Validar el límite de crédito si está definido
    if (limiteCredito && (limiteCredito < 10000 || limiteCredito > 20000)) {
        alert("El límite de crédito debe estar entre 10000 y 20000.");
        return;
    }

    // Obtener la lista de clientes del almacenamiento local
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Actualizar la información del cliente correspondiente
    clientes = clientes.map(cliente => {
        if (cliente.dni === dni) {
            cliente.nombre = nombre;
            cliente.apellido = apellido;
            cliente.descuento = descuento;
            cliente.limite = limiteCredito;
        }
        return cliente;
    });

    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Limpiar y ocultar el formulario de actualización
    document.getElementById('formularioActualizacion').innerHTML = '';
    document.getElementById('formularioActualizacion').style.display = 'none';

    // Limpiar y ocultar toda la pantalla después de 3 segundos
    setTimeout(function() {
        document.getElementById('container').style.display = 'none';
        document.getElementById('clienteMenu').style.display = 'none';
        document.getElementById('actualizarClienteForm').style.display = 'none'; 
        document.getElementById('dniActualizar').value = ''; 
    }, 3000);

    setTimeout(function() {
        document.getElementById('clienteMenu').style.display = 'block';
    }, 3000);
}
