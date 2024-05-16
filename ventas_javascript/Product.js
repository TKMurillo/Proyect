class Product {
    static next = 0; // Variable de clase para almacenar el próximo ID disponible
  
    constructor(id = 0, descrip = "Ninguno", preci = 0, stock = 0) {
      // Método constructor para inicializar los atributos de la clase Producto
      Product.next++;
      // Variables de instancia
      this._id = id; // Asigna el ID único al producto
      this.descrip = descrip;
      this.preci = preci;
      this._stock = stock; // Atributo privado para almacenar el stock del producto
    }
  
    get stock() {
      // Getter para obtener el valor del atributo privado _stock
      return this._stock;
    }
  
    toJSON() {
      // Método especial para representar la clase Producto como un objeto JSON
      return {
        id: this._id,
        descripcion: this.descrip,
        precio: this.preci,
        stock: this._stock
      };
    }
  
    show() {
      // Método para imprimir los detalles del producto en la consola
      console.log(`${this._id}  ${this.descrip}           ${this.preci}  ${this._stock}`);
    }
  }
  
  // Ejemplo de uso
  const product1 = new Product("Aceite", 2, 1000);
  const product2 = new Product("Colas", 3, 5000);
  const product3 = new Product("Leche", 1, 300);
  
  const products = [product1, product2, product3];
  const prods = products.map(prod => prod.toJSON());
  console.log(prods);