//SECCION DE CONSULTA DE DATOS
import { alertaAdvertencia, recuperarStorage, mostrarPacientes } from "./funciones.js"
import { listaGuardada, egresadosGuardados } from "./main.js"

//Código para la parte de busqueda
const buscarPaciente = document.getElementById("buscarPaciente");
const listaCompleta = document.getElementById("listaCompleta");

buscarPaciente.addEventListener("click", (e) => {
    e.preventDefault();

    recuperarStorage();

    let consultarPaciente = document.getElementById("consultarPaciente");
    const encontrarPaciente = listaGuardada.find(paciente => paciente.documento == consultarPaciente.value);

    if (encontrarPaciente) {
        const mostrarPaciente = document.getElementById("mostrarPaciente");

        if (mostrarPaciente) {
            mostrarPaciente.innerHTML = "";
        }

        const divBusqueda = document.createElement("div");
        divBusqueda.classList.add("estiloMostrarBuscado");
        divBusqueda.innerHTML = `Nombre Completo: <span class="estiloValue">${encontrarPaciente.nombre} ${encontrarPaciente.apellido}</span> <br>
                                    N° de Documento: <span class="estiloValue">${encontrarPaciente.documento}</span> <br>
                                    N° de Habitación: <span class="estiloValue">${encontrarPaciente.habitacion}</span> <br>
                                    Médico Asignado: <span class="estiloValue">${encontrarPaciente.medico}</span> <br>
                                    Diagnóstico Inicial: <span class="estiloValue">${encontrarPaciente.diagnostico}`;
        mostrarPaciente.appendChild(divBusqueda)

        consultarPaciente.value = "";
    }

    else {
        alertaAdvertencia(`Paciente no encontrado`);
        consultarPaciente.value = "";
    }
});

//Código para la parte donde se muestran las listas
listaCompleta.addEventListener("click", (e) => {
    e.preventDefault();

    recuperarStorage();

    const mostrarPaciente = document.getElementById("mostrarPaciente");

    if (mostrarPaciente) {
        mostrarPaciente.innerHTML = "";

        mostrarPacientes(listaGuardada, "ingresados");
        mostrarPacientes(egresadosGuardados, "egresados");
    }
});