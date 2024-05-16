class Icalculo {
    // Método para calcular el IVA
    cal_iva(iva = 0.12, valor = 0) {
      throw new Error("Método cal_iva debe ser implementado");
    }
  
    // Método para calcular el descuento
    cal_discount(valor = 0, discount = 0) {
      throw new Error("Método cal_discount debe ser implementado");
    }
  }
  
  // Esta clase no puede ser instanciada directamente
  try {
    const ical = new Icalculo(); // Esto dará un error
  } catch (error) {
    console.error(error.message); // Salida: Método cal_iva debe ser implementado
  }
  