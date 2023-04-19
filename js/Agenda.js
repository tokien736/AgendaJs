class Contacto {
    constructor(nombre,ApellidoPaterno,ApellidoMaterno,telefono,direccion,FechaNacimiento,email){
        this.nombre = nombre;
        this.ApellidoPaterno = ApellidoPaterno;
        this.ApellidoMaterno = ApellidoMaterno;
        this.telefono = telefono;
        this.direccion = direccion;
        this.FechaNacimiento = FechaNacimiento;
        this.email = email;
    }
    getNombre(){
        return this.nombre;
    }
    getApellidoPaterno(){
        return this.ApellidoPaterno;
    }
    getApellidoMaterno(){
        return this.ApellidoMaterno;
    }
    getTelefono(){
        return this.telefono;
    }
    getDireccion(){
        return this.direccion;
    }
    getFechaNacimiento(){
        return this.FechaNacimiento;
    }
    getEmail(){
        return this.email;
    }
}
class Agenda{
    constructor(){
        this.Contactos=[];
    }
    agregaContacto(Contacto){
        this.Contactos.push(Contacto);
    }
    mostrarContacto(Contacto){
        this.Contactos.forEach(Contacto => console.log(Contacto.getNombre()+ " - " + Contacto.getApellidoPaterno()+ " - " + Contacto.getApellidoMaterno()+ " - " + Contacto.getTelefono()+ " - " + Contacto.getDireccion()+ " - " +Contacto.getFechaNacimiento()+ " - " +Contacto.getEmail()))
    }
}
const MiAgenda = new Agenda();
const contacto1 = new Contacto("Fernando","Garcia","Soto","+51959436496","Av Almudena 721","21/01/2000","72968022@continental.edu.pe");
MiAgenda.agregaContacto(contacto1);
MiAgenda.mostrarContacto(contacto1);