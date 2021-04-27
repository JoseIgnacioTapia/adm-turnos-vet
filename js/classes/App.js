import { datosCita, nuevaCita } from '../funciones';
import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomaInput,
  formulario,
} from '../selectores';

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomaInput.addEventListener('input', datosCita);

    // Formulario para nuevas citas
    formulario.addEventListener('submit', nuevaCita);
  }
}

export default App;
