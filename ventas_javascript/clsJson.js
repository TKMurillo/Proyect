const fs = require('fs'); // Módulo para manipulación de archivos
const path = require('path'); // Módulo para manipulación de rutas de archivos

class JsonFile {
  constructor(filename) {
    this.filename = path.resolve(__dirname, filename); // Asegura una ruta absoluta
  }

  // Guarda datos en el archivo JSON
  save(data) {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(data)); // Sincroniza para guardar los datos
    } catch (error) {
      console.error("Error al guardar datos:", error);
    }
  }

  // Lee datos del archivo JSON
  read() {
    let data = [];
    try {
      if (fs.existsSync(this.filename)) { // Verifica si el archivo existe
        const fileContent = fs.readFileSync(this.filename, 'utf-8');
        data = JSON.parse(fileContent); // Convierte el contenido a JSON
      }
    } catch (error) {
      console.error("Error al leer datos:", error);
    }
    return data;
  }

  // Busca elementos con un atributo específico
  find(atributo, buscado) {
    const data = this.read(); // Obtiene los datos del archivo
    return data.filter(item => item[atributo] === buscado); // Filtra por el atributo dado
  }
}
