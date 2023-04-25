// Obtener los datos del LocalStorage
const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

// Obtener la tabla
const tabla = document.getElementById('contactos');

// Llenar la tabla con los datos
contactos.forEach((contacto) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${contacto.nombre}</td>
    <td>${contacto.apellidoP}</td>
    <td>${contacto.apellidoM}</td>
    <td>${contacto.fechaNac}</td>
    <td>${contacto.email}</td>
    <td>${contacto.direccion}</td>
    <td>${contacto.telefono}</td>
  `;
  tabla.appendChild(fila);
});
function descargarContactos() {
  const contactos = JSON.parse(localStorage.getItem('contactos'));
  let textoContactos = '';

  for (const contacto of contactos) {
    textoContactos += `Nombre: ${contacto.nombre}\n`;
    textoContactos += `Apellido Paterno: ${contacto.apellidoP}\n`;
    textoContactos += `Apellido Materno: ${contacto.apellidoM}\n`;
    textoContactos += `Fecha Nacimiento: ${contacto.fechaNac}\n`;
    textoContactos += `Email: ${contacto.email}\n`;
    textoContactos += `Direccion: ${contacto.direccion}\n`;
    textoContactos += `Teléfono: ${contacto.telefono}\n\n`;
  }

  const enlace = document.createElement('a');
  enlace.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textoContactos));
  enlace.setAttribute('download', 'contactos.txt');
  enlace.style.display = 'none';
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}