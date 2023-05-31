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
const listaDeEgresados = []

// Seteo de constantes para recuperar el Local Storage
const listaGuardada = JSON.parse(localStorage.getItem("listaDePacientes")) || listaDePacientes;
const egresadosGuardados = JSON.parse(localStorage.getItem("listaDeEgresados")) || listaDeEgresados;

export {Paciente,paciente1,paciente2,paciente3,paciente4,paciente5,listaDeEgresados,listaDePacientes,listaGuardada,egresadosGuardados}
