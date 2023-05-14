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

        localStorage.setItem("listaDePacientes", JSON.stringify(listaDePacientes));

        const parrafoIngreso = document.getElementById("parrafoIngreso");
        parrafoIngreso.innerText = `Paciente registrado exitosamente!`;

        nombre.value = "";
        apellido.value = "";
        documento.value = "";
        habitacion.value = "";
        medico.value = "";
        diagnostico.value = "";
    });
}


//SECCION DE CONSULTA DE DATOS
const buscarPaciente = document.getElementById("buscarPaciente");

if(buscarPaciente){
    buscarPaciente.addEventListener("click", (e) => {
        e.preventDefault();

        let consultarPaciente = document.getElementById("consultarPaciente");
        const EncontrarPaciente = listaDePacientes.find(paciente => paciente.documento == consultarPaciente.value);

        if (EncontrarPaciente) {
            mostrarPaciente.innerHTML = `Nombre: ${EncontrarPaciente.nombre} <br>
                                    Apellido: ${EncontrarPaciente.apellido} <br>
                                    Documento: ${EncontrarPaciente.documento} <br>
                                    Habitacion: ${EncontrarPaciente.habitacion} <br>
                                    Medico: ${EncontrarPaciente.medico} <br>
                                    Diagnostico: ${EncontrarPaciente.diagnostico}`;
        } else {
            mostrarPaciente.innerHTML = "Paciente no encontrado.";
        }
    });
}


//SECCION DE EVOLUCION
const busquedaParaEvolucion = document.getElementById("busquedaParaEvolucion");

if (busquedaParaEvolucion){
    busquedaParaEvolucion.addEventListener("click", (e) => {
        e.preventDefault();
        
        let consultaParaEvolucion = document.getElementById("consultaParaEvolucion");
        const EncontrarParaEvolucion = listaDePacientes.find(paciente => paciente.documento == consultaParaEvolucion.value);
    
        if (EncontrarParaEvolucion) {
            evolucion.innerHTML =  `<p>Ingrese la evolución del paciente</p>
                                    <textarea name="aniadirEvolucion" id="aniadirEvolucion" cols="30" rows="10"></textarea>
                                    <button id="enviarEvolucion">Añadir Evolucion</button>`
    
            const enviarEvolucion = document.getElementById("enviarEvolucion");
            enviarEvolucion.addEventListener("click", () => {
                let aniadirEvolucion = document.getElementById("aniadirEvolucion");
                EncontrarParaEvolucion.diagnostico += aniadirEvolucion.value;
    
                evolucion.innerText = `La evolucion se ha cargado correctamente`
            })
    
        } else {
            evolucion.innerHTML = "Paciente no encontrado.";
        }
    })
}

//SECCION DE EGRESO
const busquedaParaEgreso = document.getElementById("busquedaParaEgreso");

if(busquedaParaEgreso){
    busquedaParaEgreso.addEventListener("click", () => {


        let consultaParaEgreso = document.getElementById("consultaParaEgreso");
        const EncontrarParaEgreso = listaDePacientes.find(paciente => paciente.documento == consultaParaEgreso.value);
    
        if (EncontrarParaEgreso) {
            egreso.innerHTML =  `El siguiente paciente va a ser egresado. Esta seguro que desea continuar?
                                Nombre: ${EncontrarParaEgreso.nombre} <br>
                                Apellido: ${EncontrarParaEgreso.apellido} <br>
                                Documento: ${EncontrarParaEgreso.documento} <br>
                                Habitacion: ${EncontrarParaEgreso.habitacion} <br>
                                <button id="aceptar">Aceptar</button>
                                <button id="cancelar">Cancelar</button>`;
    
            const aceptar = document.getElementById("aceptar");
            const cancelar = document.getElementById("cancelar");
    
            aceptar.addEventListener("click", () => {
                let buscarEnLista = listaDePacientes.indexOf(EncontrarParaEgreso);
                listaDePacientes.splice(buscarEnLista, 1);


    
                egreso.innerHTML = `El paciente a sido dado de alta exitomasemente`;
            })
    
            cancelar.addEventListener("click", () => {
                egreso.innerHTML = `Accion cancelada`;
            })
        } else {
            egreso.innerHTML = "Paciente no encontrado.";
        }
    });
}

