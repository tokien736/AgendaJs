// Obtener los datos del LocalStorage
const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

// Obtener la tabla
const tabla = document.getElementById('contactos');

// Llenar la tabla con los datos
contactos.forEach((contacto) => {
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${contacto.nombre}</td>
    <td>${contacto.correo}</td>
    <td>${contacto.telefono}</td>
  `;
  tabla.appendChild(fila);
});
function descargarContactos() {
  const contactos = JSON.parse(localStorage.getItem('contactos'));
  let textoContactos = '';

  for (const contacto of contactos) {
    textoContactos += `Nombre: ${contacto.nombre}\n`;
    textoContactos += `Email: ${contacto.email}\n`;
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