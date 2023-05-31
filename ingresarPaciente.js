//SECCION DE REGISTRO DE PACIENTE
import { alertaExitosa, alertaAdvertencia, recuperarStorage, guardarEnStorage, } from "./funciones.js"
import { Paciente, listaGuardada, } from "./main.js"

const registrarPaciente = document.getElementById("registrarPaciente");

registrarPaciente.addEventListener("click", (e) => {
    e.preventDefault();

    recuperarStorage();

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let documento = document.getElementById("documento");
    let habitacion = document.getElementById("habitacion");
    let diagnostico = document.getElementById("diagnostico");
    let medico = document.getElementById("medico");

    // Validación para evitar que se pueda agregar un objeto con todas las propiedades vacias
    if (nombre.value && apellido.value && documento.value && habitacion.value && medico.value && diagnostico.value) {
        
        const comprobarDocumento = listaGuardada.find(paciente => paciente.documento == documento.value);
        const comprobarHab = listaGuardada.find(paciente => paciente.habitacion == habitacion.value);

        //Validación por documento o habitación para evitar que se pueda agregar un paciente que ya este registrado con esos datos.
        if (comprobarDocumento) {
            alertaAdvertencia(`El paciente con número de documento ${documento.value} ya se encuentra registrado`);
            documento.value = "";
        }
        else if (comprobarHab) {
            alertaAdvertencia(`La habitación N° ${habitacion.value} ya se encuentra en uso`);
            habitacion.value = "";
        }
        else {
            const nuevoPaciente = new Paciente(nombre.value, apellido.value, documento.value, habitacion.value, medico.value, diagnostico.value);
            listaGuardada.push(nuevoPaciente);

            guardarEnStorage();

            alertaExitosa('PACIENTE REGISTRADO EXITOSAMENTE!', "./ingresarPaciente.html");

            nombre.value = "";
            apellido.value = "";
            documento.value = "";
            habitacion.value = "";
            medico.value = "";
            diagnostico.value = "";
        }

    } else {
        alertaAdvertencia(`Complete todos los campos antes de registrar al paciente!`);
    }
});