
const path = require('path'); // Para manipulación de rutas de archivos
const { SaleDetail } = require('./saleDetail'); // Importa la clase SaleDetail
const { ICalculo } = require('./calculos'); // Importa la interfaz/calculadora ICalculo
const { exec } = require('child_process'); // Para ejecutar comandos del sistema
const date = new Date();
// Clase SaleDetail en JavaScript
class SaleDetail {
  static line = 0; // Contador estático para ID

  constructor(product, quantity) {
    SaleDetail.line += 1;
    this._id = SaleDetail.line;
    this.product = product;
    this.price = product.price;
    this.quantity = quantity;
  }

  get id() {
    return this._id;
  }

  toString() {
    return `${this.id} ${this.product.description} ${this.price} ${this.quantity}`;
  }
}

// Clase Sale que implementa métodos de ICalculo
class Sale {
  static next = 0;
  static FACTOR_IVA = 0.12;

  constructor(client) {
    Sale.next += 1;
    this.invoice = Sale.next;
    this.date = new Date();
    this.client = client;
    this.subtotal = 0;
    this.percentageDiscount = client.discount;
    this.discount = 0;
    this.iva = 0;
    this.total = 0;
    this.saleDetails = []; // Lista de detalles de venta
  }

  get invoice() {
    return this.invoice;
  }

  calIva(iva = 0.12, valor = 0) {
    return parseFloat((valor * iva).toFixed(2));
  }

  calDiscount(valor = 0, discount = 0) {
    return parseFloat((valor * discount).toFixed(2));
  }

  addDetail(prod, qty) {
    const detail = new SaleDetail(prod, qty);
    const subtotal = parseFloat(detail.price * detail.quantity);
    this.subtotal += subtotal;
    this.discount = this.calDiscount(this.subtotal, this.percentageDiscount);
    this.iva = this.calIva(Sale.FACTOR_IVA, this.subtotal - this.discount);
    this.total = parseFloat((this.subtotal + this.iva - this.discount).toFixed(2));
    this.saleDetails.push(detail);
  }

  printInvoice(company) {
    // Limpiar la pantalla de la consola
    exec('clear'); // Para sistemas UNIX, usar 'cls' para Windows
    console.log(colors.green + "*".repeat(70) + colors.reset);
    console.log(
      colors.blue + `Empresa: ${company.businessName} RUC: ${company.ruc}`,
      `Factura#: ${this.invoice}  Fecha: ${this.date.toISOString().split("T")[0]}`
    );
    this.client.show(); // Mostrar información del cliente
    console.log(colors.green + "*".repeat(70) + colors.reset);
    console.log(colors.purple + "Linea Articulo Precio Cantidad Subtotal");

    this.saleDetails.forEach((detail) => {
      console.log(
        colors.blue + `${detail.id} ${detail.product.description} ${detail.price} ${detail.quantity} ${(detail.price * detail.quantity).toFixed(2)}`
      );
    });

    console.log(colors.green + "*".repeat(70) + colors.reset);
    console.log(`Subtotal: ${this.subtotal.toFixed(2)}`);
    console.log(`Descuento: ${this.discount.toFixed(2)}`);
    console.log(`IVA: ${this.iva.toFixed(2)}`);
    console.log(`Total: ${this.total.toFixed(2)}`);
  }

  getJson() {
    const invoice = {
      factura: this.invoice,
      fecha: this.date.toISOString().split("T")[0],
      cliente: this.client.fullName(),
      subtotal: this.subtotal.toFixed(2),
      descuento: this.discount.toFixed(2),
      iva: this.iva.toFixed(2),
      total: this.total.toFixed(2),
      detalle: []
    };

    this.saleDetails.forEach((detail) => {
      invoice.detalle.push({
        producto: detail.product.description,
        precio: detail.price,
        cantidad: detail.quantity
      });
    });

    return invoice;
  }
}