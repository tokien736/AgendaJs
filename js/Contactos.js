import {
  saveTask,getTasks,onGetContacto,deleteContacto,getContacto,editContacto,
} from "./firebase.js";
let editStatus = false;
let id = "";

const CuerpoLista = document.getElementById('tbodyContactos')
document.addEventListener('DOMContentLoaded', async () => {
  onGetContacto((querySnapshot) =>{
    let html = "";
    querySnapshot.forEach((doc) =>{
      const task = doc.data();
      html += `
          <tr>
            <td>${task.nombre}</td>
            <td>${task.apellidoP}</td>
            <td>${task.apellidoM}</td>
            <td>${task.fechaN}</td>
            <td>${task.email}</td>
            <td>${task.direccion}</td>
            <td>${task.telefono}</td>
            <td>
              <button class="btn-delete" data-id="${doc.id}">Eliminar</button>
            </td>
          </tr>
      `;
    });
    CuerpoLista.innerHTML = html;
    const btnsDelete = CuerpoLista.querySelectorAll('.btn-delete')
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({target: {dataset}}) => {
        deleteContacto(dataset.id);
      });
    });
    //Editar
  });
  
});
document.addEventListener('DOMContentLoaded', function() {
  function descargarContactos() {
    const data = [];
    getTasks().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const contacto = doc.data();
        const contactoTxt = `Nombre: ${contacto.nombre}, Apellido paterno: ${contacto.apellidoP}, Apellido materno: ${contacto.apellidoM}, Fecha de nacimiento: ${contacto.fechaN}, Email: ${contacto.email}, Dirección: ${contacto.direccion}, Teléfono: ${contacto.telefono}`;
        data.push(contactoTxt);
      });
      const txt = data.join("\n");
      const a = document.createElement("a");
      const file = new Blob([txt], { type: "text/plain" });
      a.href = URL.createObjectURL(file);
      a.download = "contactos.txt";
      a.click();
    }).catch((error) => {
      console.error("Error al obtener los contactos: ", error);
    });
  }
  const btnDescargar = document.getElementById('btn-descargar-contactos');
  btnDescargar.onclick = descargarContactos;  
});


