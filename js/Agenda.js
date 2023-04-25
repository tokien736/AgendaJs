console.log("clock")
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
let contacto = new Contacto(nombre.value,apellidoP.value,apellidoM.value,fechaNac.value,email.value,direccion.value,telefono.value) 
const contacForm = document.getElementById('form-contactos');
//Cuando haces click en Agregar
btnAgregar.onclick = () => {
    let contacto = new Contacto(nombre.value,apellidoP.value,apellidoM.value,fechaNac.value,email.value,direccion.value,telefono.value) 
    miAgenda.agregarContacto(contacto)
    // Guardamos los contactos en un localStore
    let contactos = JSON.parse(localStorage.getItem('contactos')) || [];  
    contactos.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));
    console.log(miAgenda)
    //Mostramos
    actualizarListaContactos()
    limpiarCajas()
}
function obtenerIdContacto(event) {
  // obtener el elemento de la lista que contiene el botón "eliminar"
  var botonEliminar = event.target;
  var itemLista = botonEliminar.closest('.list-group-item');
  //Terminamos
  // verificar si itemLista no es null antes de acceder al atributo "nombre"
  var id = null;
  if (itemLista) {
    id = parseInt(itemLista.getAttribute('nombre'));
  }

  return id;
}
function eliminarContacto(nombreContacto) {
    // Encontrar el contacto a eliminar en el objeto Agenda
    // obtener el identificador único del contacto
    var id = obtenerIdContacto(event);
    //Terminamos
    
    const contactoAEliminar = miAgenda.buscarContacto(nombreContacto);
  
    // Eliminar el contacto del objeto Agenda
    miAgenda.eliminarContacto(contactoAEliminar);
    // buscar el contacto en el local storage
    var contactos = JSON.parse(localStorage.getItem('contactos'));
    var index = contactos.findIndex(c => c.id === id);

    // eliminar el contacto del local storage
    contactos.splice(index, 1);
    localStorage.setItem('contactos', JSON.stringify(contactos));  
    // Actualizar la lista de contactos en la interfaz de usuario
    actualizarListaContactos();
    limpiarCajas();
}
function editarContacto(nombre, apellidoP, apellidoM, fechaNac, email, direccion, telefono) {
  contacForm['nombre'].value = nombre;
  contacForm['apellidoP'].value = apellidoP;
  contacForm['apellidoM'].value = apellidoM;
  contacForm['fechaNac'].value = fechaNac;
  contacForm['email'].value = email;
  contacForm['direccion'].value = direccion;
  contacForm['telefono'].value = telefono;

  // Agregar un botón "Guardar"
  const guardarBtn = document.createElement('button');
  guardarBtn.textContent = 'Guardar';
  guardarBtn.classList.add('btn', 'btn-primary', 'mt-2');
  guardarBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const nombreEditado = contacForm['nombre'].value;
    const apellidoPEditado = contacForm['apellidoP'].value;
    const apellidoMEditado = contacForm['apellidoM'].value;
    const fechaNacEditado = contacForm['fechaNac'].value;
    const emailEditado = contacForm['email'].value;
    const direccionEditado = contacForm['direccion'].value;
    const telefonoEditado = contacForm['telefono'].value;

    // Encontrar el contacto a editar en el objeto Agenda
    const contactoAEditar = miAgenda.buscarContacto(nombre);

    // Actualizar los valores del contacto editado
    contactoAEditar.nombre = nombreEditado;
    contactoAEditar.apellidoP = apellidoPEditado;
    contactoAEditar.apellidoM = apellidoMEditado;
    contactoAEditar.fechaNac = fechaNacEditado;
    contactoAEditar.email = emailEditado;
    contactoAEditar.direccion = direccionEditado;
    contactoAEditar.telefono = telefonoEditado;

    // Actualizar el contacto editado en el localStorage
    const contactos = JSON.parse(localStorage.getItem('contactos'));
    const index = contactos.findIndex((c) => c.nombre === nombre);
    contactos[index] = {
      nombre: nombreEditado,
      apellidoP: apellidoPEditado,
      apellidoM: apellidoMEditado,
      fechaNac: fechaNacEditado,
      email: emailEditado,
      direccion: direccionEditado,
      telefono: telefonoEditado,
    };
    localStorage.setItem('contactos', JSON.stringify(contactos));

    // Actualizar la lista de contactos en la interfaz de usuario
    actualizarListaContactos();

    // Eliminar el botón "Guardar"
    guardarBtn.parentNode.removeChild(guardarBtn);

    limpiarCajas();
  });

  // Agregar el botón "Guardar" fuera del formulario
  contacForm.parentNode.insertBefore(guardarBtn, contacForm.nextSibling);
}
function actualizarListaContactos(){
    
    listaContactos.innerHTML = '';
    miAgenda.contactos.forEach((contacto) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <li class="contact" id="lista-contactos">
              <h5 class="card-title"><span id="nombre">${contacto.nombre}</span> ${contacto.apellidoP} ${contacto.apellidoM}</h5>
              <p>Fecha de nacimiento: ${contacto.fechaNac}</p>
              <p>Email: ${contacto.email}</p>
              <p>Dirección: ${contacto.direccion}</p>
              <p class="telefono">Teléfono: ${contacto.telefono}</p>
              <button class="btn btn-success" id="editar" onclick="editarContacto('${contacto.nombre}', '${contacto.apellidoP}', '${contacto.apellidoM}', '${contacto.fechaNac}', '${contacto.email}', '${contacto.direccion}', '${contacto.telefono}')">🗑 Editar</button>
  
              <button class="btn btn-danger" id="eliminar" onclick="eliminarContacto('${contacto.nombre}')">🖉 Eliminar</button>
          </li>
  
        `;
    // Agregar el evento click al elemento de la lista
    li.addEventListener('click', () => {
      // Obtener el nombre del contacto y mostrarlo en la consola
      const nombreContacto = li.querySelector('#nombre').textContent;
      console.log(nombreContacto);
    });
  
  
        listaContactos.appendChild(li);
    });
  }
function limpiarCajas() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellidoP').value = '';
    document.getElementById('apellidoM').value = '';
    document.getElementById('fechaNac').value = '';
    document.getElementById('email').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
}
