// SIMULADOR DE SISTEMA DE PACIENTES DE HOSPITAL

//Creacion de clase, objetos y arrays para simular una base de datos pre-existente
class Paciente {
    constructor(nombre, apellido, documento, habitacion, medico, diagnostico) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.habitacion = habitacion;
        this.medico = medico;
        this.diagnostico = diagnostico;
    }
}

const paciente1 = new Paciente("Maximiliano", "Araujo", 36293894, 313, "Gabriela Obeso", "Gastroenteritis");
const paciente2 = new Paciente("Mariano", "Moreno", 12345678, 314, "Meredith Gray", "Edema de pulmón");
const paciente3 = new Paciente("Dario", "Aguirre", 33558796, 414, "Christina Yang", "Fiebre");
const paciente4 = new Paciente("Leon", "Kennedy", 30246795, 413, "Gabriela Obeso", "Gripe A");
const paciente5 = new Paciente("Ada", "Wong", 31746287, 210, "Christina Yang", "Covid");

const listaDePacientes = [paciente1, paciente2, paciente3, paciente4, paciente5];


//SECCION DE REGISTRO DE PACIENTE
const RegistrarPaciente = document.getElementById("RegistrarPaciente");

if (RegistrarPaciente) {
    RegistrarPaciente.addEventListener("click", (e) => {
        e.preventDefault();
        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let documento = document.getElementById("documento");
        let habitacion = document.getElementById("habitacion");
        let medico = document.getElementById("medico");
        let diagnostico = document.getElementById("diagnostico");

        const nuevoPaciente = new Paciente(nombre.value, apellido.value, documento.value, habitacion.value, medico.value, diagnostico.value);
        listaDePacientes.push(nuevoPaciente);

        const parrafoIngreso = document.getElementById("parrafoIngreso");
        parrafoIngreso.innerText = `Paciente registrado exitosamente!`;

        nombre.value = "";
        apellido.value = "";
        documento.value = "";
        habitacion.value = "";
        medico.value = "";
        diagnostico.value = "";
        console.log(listaDePacientes)
    });
}


//SECCION DE CONSULTA DE DATOS
const buscarPaciente = document.getElementById("buscarPaciente");
let consultarPaciente = document.getElementById("consultarPaciente");

buscarPaciente.addEventListener("click", (e) => {
    e.preventDefault();
    const EncontrarPaciente = listaDePacientes.find(paciente => paciente.documento === consultarPaciente.value);
    console.log(EncontrarPaciente)
});




