class Client {
  #dni
  constructor(first_name = "Consumidor", last_name = "Final", dni = "9999999999") {
    // Método constructor para inicializar los atributos de la clase Cliente
    this.first_name = first_name;
    this.last_name = last_name;
    this.#dni = dni; // Atributo privado para almacenar el número de identificación del cliente
  }

  get dni() {
    // Getter para obtener el valor del atributo privado _dni
    return this.#dni;
  }

  set dni(value) {
    // Setter para asignar un nuevo valor al número de identificación del cliente, con validación de longitud
    if (value.length === 10 || value.length === 13) {
      this.#dni = value;
    } else {
      this.#dni = "9999999999"; // Retorna el valor predeterminado si la longitud no es válida
    }
  }

  toString() {
    // Método especial para representar la clase Cliente como una cadena
    return `Cliente: ${this.first_name} ${this.last_name}`;
  }

  show() {
    // Método para imprimir los detalles del cliente en la consola
    console.log('   Nombres    Dni');
    console.log(`${this.first_name} ${this.last_name}  ${this.dni}`);
  }
}

class RetailClient extends Client {
  constructor(first_name = "Cliente", last_name = "Final", dni = "9999999999", card = false) {
    // Método constructor para inicializar los atributos de la clase RetailClient
    super(first_name, last_name, dni); // Llama al constructor de la clase padre
    this._discount = card ? 10 : 0; // Descuento del cliente minorista
  }

  get discount() {
    // Getter para obtener el valor del descuento del cliente minorista
    return this._discount;
  }

  toString() {
    // Método especial para representar la clase RetailClient como una cadena
    return `Cliente Minorista: DNI:${this.dni} Nombre:${this.first_name} ${this.last_name} Descuento:${this.discount}`;
  }

  show() {
    // Método para imprimir los detalles del cliente minorista en la consola
    console.log(`Cliente Minorista: DNI:${this.dni} Nombre:${this.first_name} ${this.last_name} Descuento:${this.discount}`);
  }
  
}

class VipClient extends Client {
  constructor(first_name = "Consumidor", last_name = "Final", dni = "9999999999") {
    // Método constructor para inicializar los atributos de la clase VipClient
    super(first_name, last_name, dni); // Llama al constructor de la clase padre
    this._limit = 10000; // Límite de crédito del cliente VIP
  }

  get limit() {
    // Getter para obtener el valor del límite de crédito del cliente VIP
    return this._limit;
  }

  set limit(value) {
    // Setter para asignar un nuevo valor al límite de crédito del cliente VIP, con validación de rango
    this._limit = (value < 10000 || value > 20000) ? 10000 : value;
  }

  toString() {
    // Método especial para representar la clase VipClient como una cadena
    return `Cliente Vip: DNI:${this.dni} Nombre:${this.first_name} ${this.last_name} Cupo:${this.limit}`;
  }

  show() {
    // Método para imprimir ls detalles del cliente VIP en la consola
    console.log(`Cliente Vip: DNI:${this.dni} Nombre:${this.first_name} ${this.last_name} Cupo:${this.limit}`);
  }
}


// Definir la clase Valida para las validaciones
class Valida {
  // Validar cédula ecuatoriana
  validarCedulaEcuatoriana(cedula) {
    if (!/^\d{10}$/.test(cedula)) {
      return false; // La cédula debe tener 10 dígitos numéricos
    }

    const cedulaArray = cedula.split('').map(Number);
    const provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
      return false; // Provincia inválida
    }

    const digitoVerificador = parseInt(cedulaArray.pop());
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < cedulaArray.length; i++) {
      let resultado = cedulaArray[i] * coeficientes[i];
      if (resultado > 9) {
        resultado -= 9;
      }
      suma += resultado;
    }
    const digitoCalculado = 10 - (suma % 10);
    return digitoCalculado === digitoVerificador;
  }
}

// Función para validar y guardar un cliente
function validarYGuardarCliente() {
  const dni = document.getElementById('dni').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const tipoCliente = document.getElementById('tipoCliente').value;
  const limiteCredito = tipoCliente === '2' ? document.getElementById('limiteCredito').value : undefined;

  // Validar los datos ingresados
  const valida = new Valida();
  if (!valida.validarCedulaEcuatoriana(dni)) {
    alert("El DNI debe ser una cédula ecuatoriana válida.");
    return;
  }

  if (!/^[a-zA-Z]+$/.test(nombre) || !/^[a-zA-Z]+$/.test(apellido)) {
    alert("Los nombres y apellidos deben contener solo letras.");
    return;
  }

  if (tipoCliente !== '1' && tipoCliente !== '2') {
    alert("Tipo de cliente inválido.");
    return;
  }

  if (tipoCliente === '2' && (limiteCredito < 10000 || limiteCredito > 20000)) {
    alert("El límite de crédito para clientes VIP debe estar entre 10,000 y 20,000.");
    return;
  }

  // Si los datos son válidos, guardar el cliente
  guardarCliente(dni, nombre, apellido, tipoCliente, limiteCredito);

  // Limpiar los campos del formulario después de guardar
  limpiarCampos();
}

// Función para mostrar opciones adicionales según el tipo de cliente
function mostrarOpciones() {
  const tipoCliente = document.getElementById('tipoCliente').value;
  const opcionesAdicionalesDiv = document.getElementById('opcionesAdicionales');
  if (tipoCliente === '1') {
    opcionesAdicionalesDiv.innerHTML = `
      <label for="tieneTarjeta">¿Tiene Tarjeta?</label>
      <select id="tieneTarjeta" name="tieneTarjeta">
        <option value="si">Sí</option>
        <option value="no">No</option>
      </select>
    `;
    opcionesAdicionalesDiv.style.display = 'block';
  } else if (tipoCliente === '2') {
    opcionesAdicionalesDiv.innerHTML = `
      <label for="limiteCredito">Límite de Crédito:</label>
      <input type="number" id="limiteCredito" name="limiteCredito" min="10000" max="20000">
    `;
    opcionesAdicionalesDiv.style.display = 'block';
  } else {
    opcionesAdicionalesDiv.innerHTML = '';
    opcionesAdicionalesDiv.style.display = 'none';
  }
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
  document.getElementById('dni').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('tipoCliente').value = '1'; // Reiniciar el tipo de cliente a 'Regular'
  
  // Limpiar el campo de límite de crédito (si existe)
  const limiteCreditoInput = document.getElementById('limiteCredito');
  if (limiteCreditoInput) {
    limiteCreditoInput.value = '';
  }
  
  // Reiniciar la selección de tener tarjeta o no
  const tieneTarjetaSelect = document.getElementById('tieneTarjeta');
  if (tieneTarjetaSelect) {
    tieneTarjetaSelect.value = 'no';
  }

  document.getElementById('opcionesAdicionales').innerHTML = ''; // Limpiar las opciones adicionales
  document.getElementById('opcionesAdicionales').style.display = 'none'; // Ocultar el contenedor de opciones adicionales
}

// Función para guardar un cliente en el almacenamiento local
function guardarCliente(dni, nombre, apellido, tipoCliente, limiteCredito) {
  let nuevoCliente;
  if (tipoCliente === '1') {
    const tieneTarjeta = document.getElementById('tieneTarjeta').value === 'si';
    const descuento = tieneTarjeta ? 10 : 0;
    nuevoCliente = { dni, nombre, apellido, descuento };
  } else if (tipoCliente === '2') {
    nuevoCliente = { dni, nombre, apellido, limite: limiteCredito };
  }

  if (!nuevoCliente) {
    alert("No se pudo crear el cliente.");
    return;
    
  }

  let clientesActuales = JSON.parse(localStorage.getItem('clientes')) || [];
  clientesActuales.push(nuevoCliente);
  localStorage.setItem('clientes', JSON.stringify(clientesActuales));
  document.getElementById('clienteForm').style.display = 'none';
  document.getElementById('clienteMenu').style.display = 'block';
  alert("Cliente ingresado con éxito.");
}
