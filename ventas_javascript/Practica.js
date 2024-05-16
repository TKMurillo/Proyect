const fs = require('fs');
const path = require('path')

class Usuario{
    #dni;
    #id;
    static Control = 0;
    constructor(nombre,apellido,dni){
        Usuario.Control+= 1;
        this.#id = Usuario.Control;
        this.#dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
    }
    get dni(){
        return this.#dni;
    }

    get id(){
        return this.#id;
    }

    full_name(){
        return `Cliente: ${this.nombre} ${this.apellido}`;
    }

    show(){
        console.log(`Id: ${this.#id} ${this.full_name()} Dni: ${this.#dni}`);
    }
    static guardarEnJSON(usuarios) {
        const rutaArchivo = path.join(__dirname, 'archivos', 'persona.json');
        const datos = usuarios.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni
        }));

        fs.writeFile(rutaArchivo, JSON.stringify(datos), err => {
            if (err) {
                console.error('Error al guardar datos:', err);
                return;
            }
            console.log('Datos guardados correctamente en:', rutaArchivo);
        });
    }
}

if (require.main == module){
    let Cliente1 = new Usuario("Matkol","Esteban","0941103616");
    let Cliente2 = new Usuario("Melanie","Guzman","0917145674");
    let List_Client = [Cliente1,Cliente2]
    for (let client of List_Client){
        client.show()
    }

    Usuario.guardarEnJSON(List_Client);

}