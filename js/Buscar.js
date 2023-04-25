// Esperar a que se cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Obtener referencia al formulario y a la lista de resultados
  const form = document.querySelector('form');
  const resultadoBusqueda = document.querySelector('#resultado-busqueda');

  // Agregar un listener para el evento submit del formulario
  form.addEventListener('submit', (event) => {
    // Prevenir la acción por defecto del formulario (que es refrescar la página)
    event.preventDefault();

    // Obtener los valores de búsqueda ingresados por el usuario
    const nombre = document.querySelector('#busqueda-nombre').value;
    const telefono = document.querySelector('#busqueda-telefono').value;

    // Obtener los contactos del localStorage y filtrarlos según los criterios de búsqueda
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const resultados = contactos.filter((contacto) => {
      return contacto.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
             contacto.telefono.includes(telefono);
    });

    // Limpiar la lista de resultados previos y mostrar los nuevos resultados
    resultadoBusqueda.innerHTML = '';
    if (resultados.length > 0) {
      resultados.forEach((contacto) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerText = `${contacto.nombre}-${contacto.apellidoP}-${contacto.apellidoM}-${contacto.fechaNac}-${contacto.email}-${contacto.direccion}-${contacto.telefono}`;
        resultadoBusqueda.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerText = 'No se encontraron resultados';
      resultadoBusqueda.appendChild(li);
    }
  });

});
