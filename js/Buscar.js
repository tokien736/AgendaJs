const formularioBusqueda = document.querySelector('#buscar-contactos form');
const resultadoBusqueda = document.querySelector('#resultado-busqueda');

formularioBusqueda.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombreBusqueda = document.querySelector('#busqueda-nombre').value;
  const telefonoBusqueda = document.querySelector('#busqueda-telefono').value;

  // Buscar los contactos que coincidan con los valores de búsqueda
  const contactosEncontrados = buscarContactos(nombreBusqueda, telefonoBusqueda);

  // Mostrar los resultados en la interfaz de usuario
  mostrarResultadosBusqueda(contactosEncontrados);
});

function buscarContactos(nombre, telefono) {
  const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
  const contactosEncontrados = [];

  for (const contacto of contactos) {
    if (contacto.nombre.toLowerCase().includes(nombre.toLowerCase()) || contacto.telefono.includes(telefono)) {
      contactosEncontrados.push(contacto);
    }
  }

  return contactosEncontrados;
}

function mostrarResultadosBusqueda(contactos) {
  resultadoBusqueda.innerHTML = '';

  if (contactos.length === 0) {
    const mensaje = document.createElement('li');
    mensaje.textContent = 'No se encontraron resultados';
    mensaje.classList.add('list-group-item');
    resultadoBusqueda.appendChild(mensaje);
  } else {
    for (const contacto of contactos) {
      const li = document.createElement('li');
      li.textContent = `${contacto.nombre} - ${contacto.apellidoP} - ${contacto.apellidoM} - ${contacto.fechaNac} - ${contacto.email} - ${contacto.direccion} - ${contacto.telefono} `;
      li.classList.add('list-group-item');
      resultadoBusqueda.appendChild(li);
    }
  }
}