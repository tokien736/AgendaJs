// buscar.js

import { searchByName,searchByPhone } from './firebase.js';

const inputBuscar = document.getElementById('busqueda-nombre');
const inputBuscarTelefono = document.getElementById('busqueda-telefono'); // Recuperar el input de búsqueda por teléfono
const btnBuscar = document.getElementById('buscar-contacto-btn');
const listaResultados = document.getElementById('resultado-busqueda');

btnBuscar.addEventListener('click', async () => {
  event.preventDefault();
  const nombre = inputBuscar.value.trim();
  const telefono = inputBuscarTelefono.value.trim(); // Obtener valor del input de búsqueda por teléfono
  if (!nombre && !telefono) return; // Si no se ingresó ningún valor, salir de la función

  let resultados = [];

  if (nombre && !telefono) {
    resultados = await searchByName(nombre); // Buscar por nombre
  } else if (!nombre && telefono) {
    resultados = await searchByPhone(telefono); // Buscar por teléfono
  } else {
    resultados = await searchByNameAndPhone(nombre, telefono); // Buscar por nombre y teléfono
  }

  listaResultados.innerHTML = '';

  if (resultados.length === 0) {
    listaResultados.innerHTML = '<li>No se encontraron resultados</li>';
    return;
  }

  resultados.forEach(resultado => {
    const { nombre, apellidoP, apellidoM, fechaN, email, direccion, telefono } = resultado.data;
    const li = document.createElement('li');
    li.innerHTML = `${nombre} ${apellidoP} ${apellidoM} - ${fechaN} - ${email} - ${direccion} - ${telefono}`;
    listaResultados.appendChild(li);
  });
});

