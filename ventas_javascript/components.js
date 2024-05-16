const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Valida {
  // Valida enteros positivos
  solonumero(callback) {
    readlineInterface.question("Ingrese un número entero positivo: ", (valor) => {
      const numero = parseInt(valor.trim());
      if (isNaN(numero) || numero <= 0) {
        console.log("Error: debe ingresar un número entero positivo");
        setTimeout(() => this.solonumero(callback), 3000); // Pausa y vuelve a intentar
      } else {
        callback(numero);
      }
    });
  }

  // Valida letras
  sololetra(callback) {
    readlineInterface.question("Ingrese solo letras: ", (valor) => {
      if (!/^[a-zA-Z]+$/.test(valor.trim())) {
        console.log("Error: debe ingresar solo letras");
        setTimeout(() => this.sololetra(callback), 3000); // Pausa y reintenta
      } else {
        callback(valor.trim());
      }
    });
  }

  // Valida valores decimales positivos
  solodecimal(callback) {
    readlineInterface.question("Ingrese un valor decimal positivo: ", (valor) => {
      const numero = parseFloat(valor.trim());
      if (isNaN(numero) || numero <= 0) {
        console.log("Error: debe ingresar un valor decimal positivo");
        setTimeout(() => this.solodecimal(callback), 3000);
      } else {
        callback(numero);
      }
    });
  }

  // Valida cédula ecuatoriana
  cedula(callback) {
    readlineInterface.question("Ingrese su cédula ecuatoriana (10 dígitos): ", (valor) => {
      const cedula = valor.trim();
      if (!/^\d{10}$/.test(cedula)) {
        console.log("Error: la cédula debe tener 10 dígitos numéricos");
        setTimeout(() => this.cedula(callback), 3000);
      } else {
        const cedulaArray = cedula.split('').map(Number);
        const provincia = parseInt(cedula.substring(0, 2));
        if (provincia < 1 || provincia > 24) {
          console.log("Error: provincia inválida");
          setTimeout(() => this.cedula(callback), 3000);
          return;
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
        const cedulaValida = digitoCalculado === digitoVerificador;
        if (cedulaValida) {
          callback(cedula);
        } else {
          console.log("Error: cédula inválida");
          setTimeout(() => this.cedula(callback), 3000);
        }
      }
    });
  }
}

module.exports = Valida;

