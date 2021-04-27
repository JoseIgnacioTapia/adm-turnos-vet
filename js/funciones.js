import Citas from './classes/Citas';

import UI from './classes/UI';

import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomaInput,
  formulario,
} from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let modoEdicion = false;

// Objeto con la información de la cita
const citaObjeto = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};

// Agrega datos al objeto de cita
export function datosCita(e) {
  citaObjeto[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e) {
  e.preventDefault();

  // Extraer la información del objeto de cita
  const {
    mascota, propietario, telefono, fecha, hora, sintomas,
  } = citaObjeto;

  // Validar
  if (
    mascota === ''
    || propietario === ''
    || telefono === ''
    || fecha === ''
    || hora === ''
    || sintomas === ''
  ) {
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
    return;
  }

  if (modoEdicion) {
    // Pasar el objeto a la cita
    administrarCitas.editarCita({ ...citaObjeto });

    ui.imprimirAlerta('Editado Correctamente');

    // Regresar el texto del boton a su estado original
    formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

    // Quitando modo edición
    modoEdicion = false;
  } else {
    // Generar un ID único
    citaObjeto.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({ ...citaObjeto });

    // Imprimiendo mensaje
    ui.imprimirAlerta('Se agregó correctamente');
  }

  // Mostrar el HTML de las citas
  ui.imprimirCitas(administrarCitas);

  // Reiniciar el objeto para la validación
  reiniciarObjeto();

  // Reiniciar el formulario
  formulario.reset();
}

export function reiniciarObjeto() {
  citaObjeto.mascota = '';
  citaObjeto.propietario = '';
  citaObjeto.telefono = '';
  citaObjeto.fecha = '';
  citaObjeto.hora = '';
  citaObjeto.sintomas = '';
}

export function eliminarCita(id) {
  // ELiminar la cita
  administrarCitas.eliminarCitas(id);

  // Refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
export function cargarEdicion(cita) {
  const {
    mascota, propietario, telefono, fecha, hora, sintomas, id,
  } = cita;

  // Llenar el objeto
  citaObjeto.mascota = mascota;
  citaObjeto.propietario = propietario;
  citaObjeto.telefono = telefono;
  citaObjeto.fecha = fecha;
  citaObjeto.hora = hora;
  citaObjeto.sintomas = sintomas;
  citaObjeto.id = id;

  // Llenar los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomaInput.value = sintomas;

  // Cambiar texto del boton
  formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

  modoEdicion = true;
}
