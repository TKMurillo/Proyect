// Clase base para CRUD con métodos abstractos
class ICrud {
    constructor() {
      if (new.target === ICrud) {
        throw new Error("ICrud es una clase abstracta y no puede ser instanciada.");
      }
    }
  
    create() {
      throw new Error("El método 'create' debe ser implementado.");
    }
  
    update() {
      throw new Error("El método 'update' debe ser implementado.");
    }
  
    delete() {
      throw new Error("El método 'delete' debe ser implementado.");
    }
  
    consult() {
      throw new Error("El método 'consult' debe ser implementado.");
    }
  }
  
  // Ejemplo de clase que heredaría de ICrud para implementar los métodos
  class UserCrud extends ICrud {
    create(data) {
    }
  
    update(data) {
    }
  
    delete(data) {
    }
  
    consult(data) {
    }
  }