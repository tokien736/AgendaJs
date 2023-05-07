console.log("clock")
import {
  saveTask,getTasks,onGetContacto,deleteContacto,getContacto,editContacto,searchByName
} from "./firebase.js";

let editStatus = false;
let id = "";
class Agenda {
    constructor() {
      this.contactos = [];
    }
  
    agregarContacto(contacto) {
      this.contactos.push(contacto);
    }
  
    eliminarContacto(contacto) {
      const index = this.contactos.indexOf(contacto);
      if (index !== -1) {
        this.contactos.splice(index, 1);
      }
    }
  
    buscarContacto(nombre) {
      return this.contactos.find((contacto) => contacto.nombre === nombre);
    }
}
 
class Contacto {
    constructor(nombre, apellidoP, apellidoM, fechaNac, email, direccion, telefono){
        this.nombre = nombre;
        this.apellidoP = apellidoP;
        this.apellidoM = apellidoM;
        this.fechaNac = fechaNac;
        this.email = email; 
        this.direccion = direccion; 
        this.telefono = telefono;
    }
}
//Recuperamos los elementos del html
const nombre = document.getElementById("nombre")
const ApellidoPaterno = document.getElementById("apellidoP")
const ApellidoMaterno = document.getElementById("apellidoM")
const fechaNacimiento = document.getElementById("fechaNac")
const email = document.getElementById("email")
const direccion = document.getElementById("direccion")
const telefono = document.getElementById("telefono")
//Recuperamos el boton
const btnAgregar = document.getElementById("agregar")
const listaContactos = document.getElementById("listaContactos")
let miAgenda = new Agenda()
const contacForm = document.getElementById('formcontactos');
//Enviar los datos al Firestore
document.addEventListener('DOMContentLoaded', async () => {
  onGetContacto((querySnapshot) =>{
    let html = "";
    querySnapshot.forEach((doc) =>{
      const task = doc.data();
      html += `
          <div>
            <p>${task.nombre}</p>
            <p>${task.apellidoP}</p>
            <p>${task.apellidoM}</p>
            <p>${task.fechaN}</p>
            <p>${task.email}</p>
            <p>${task.direccion}</p>
            <p>${task.telefono}</p>
            <button class ='btn-delete' data-id="${doc.id}">Delete</button>
            <button class ='btn-edit' data-id="${doc.id}">Editar</button>
          </div>
      `;
    });
    listaContactos.innerHTML = html;
    const btnsDelete = listaContactos.querySelectorAll('.btn-delete')
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({target: {dataset}}) => {
        deleteContacto(dataset.id);
      });
    });
    const btnsEditar = listaContactos.querySelectorAll('.btn-edit');
    btnsEditar.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getContacto(e.target.dataset.id);
        const task = doc.data();
        contacForm['nombre'].value = task.nombre;
        contacForm['apellidoP'].value = task.apellidoP;
        contacForm['apellidoM'].value = task.apellidoM;
        contacForm['fechaNac'].value = task.fechaN;
        contacForm['email'].value = task.email;
        contacForm['direccion'].value = task.direccion;
        contacForm['telefono'].value = task.telefono;
        editStatus = true;
        id = doc.id;
        formcontactos['agregar'].innerText = 'Actualizar';
      });
    });
  });
});
contacForm.addEventListener('submit', (e) => {
  event.preventDefault();
  const name = contacForm['nombre']
  const lastnameP = contacForm['apellidoP']
  const lastnameM = contacForm['apellidoM']
  const fechaN = contacForm['fechaNac']
  const email = contacForm['email']
  const address = contacForm['direccion']
  const phone = contacForm['telefono'] 
  if(!editStatus){
    saveTask(name.value,lastnameP.value,lastnameM.value,fechaN.value,email.value,address.value,phone.value)
  }
  else{
    editContacto(id,{
      nombre :nombre.value,
      apellidoP: apellidoP.value,
      apellidoM: apellidoM.value,
      fechaN: fechaN.value,
      email: email.value,
      direccion: direccion.value,
      telefono: telefono.value})
      editStatus = false;
  }
  formcontactos.reset();
});

