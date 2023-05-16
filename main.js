// SIMULADOR DE SISTEMA DE PACIENTES DE HOSPITAL

// ME GUSTARIA AGREGAR MAS COSAS PARA LA ENTREGA FINAL, COMO POR EJEMPLO, SIMULAR UN LOG IN, QUE EN LA PARTE DE AGREGAR EVOLUCION, SE PUEDAN VER LAS ANTERIORES SI HAY, NO BORRAR A LA PERSONA EGRESADA SINO FILTRARLA DE LAS BUSQUEDAS PARA QUE NO QUEDE AFUERA DEL SISTEMA COMPLETAMENTE, ETC.

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
const registrarPaciente = document.getElementById("registrarPaciente");


// Puse este IF aca y en el principio de otros eventos recomendación de ChatGPT porque al cargar los otros HTML la consola tiraba un error como este (main.js:22 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
// at main.js:22:19). Mi idea era tener tener un archivo JS para cada HTML pero no sabia si estaba bien o era buena o mala practica, ademas de que no me quise complicar añadiendo muchos archivos. No se si tendrá que ver que este error suceda por tener varios archivos HTML para un archivo JS o no.
if (registrarPaciente) {
    registrarPaciente.addEventListener("click", (e) => {
        e.preventDefault();

        const listaGuardada = JSON.parse(localStorage.getItem("listaDePacientes")) || listaDePacientes;

        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let documento = document.getElementById("documento");
        let habitacion = document.getElementById("habitacion");
        let medico = document.getElementById("medico");
        let diagnostico = document.getElementById("diagnostico");

        // Validación para evitar que se pueda agregar un objetos con todas las propiedades vacias
        if (nombre.value && apellido.value && documento.value && habitacion.value && medico.value && diagnostico.value) {

            const comprobarDocumento = listaGuardada.find(paciente => paciente.documento == documento.value);
            const comprobarHab = listaGuardada.find(paciente => paciente.habitacion == habitacion.value);

            //Validación por documento o habitación para evitar que se pueda agregar un paciente que ya este registrado con esos datos.
            if (comprobarDocumento) {
                parrafoIngreso.style.color = "red";
                parrafoIngreso.innerText = `El paciente con DNI N° ${documento.value} ya se encuentra registrado`;

                documento.value = "";
            }
            else if (comprobarHab) {
                parrafoIngreso.style.color = "red";
                parrafoIngreso.innerText = `La habitación N° ${habitacion.value} ya se encuentra en uso`;

                habitacion.value = "";
            }
            else {
                const nuevoPaciente = new Paciente(nombre.value, apellido.value, documento.value, habitacion.value, medico.value, diagnostico.value);
                listaGuardada.push(nuevoPaciente);

                //Se guarda al nuevo paciente en el localStorage
                localStorage.setItem("listaDePacientes", JSON.stringify(listaGuardada));

                const parrafoIngreso = document.getElementById("parrafoIngreso");
                parrafoIngreso.style.color = "green";
                parrafoIngreso.innerText = `Paciente registrado exitosamente!`;

                nombre.value = "";
                apellido.value = "";
                documento.value = "";
                habitacion.value = "";
                medico.value = "";
                diagnostico.value = "";
            }
        } else {
            parrafoIngreso.style.color = "red";
            parrafoIngreso.innerText = `Complete todos los campos antes de registrar al paciente!`;
        }
    });
}



//SECCION DE CONSULTA DE DATOS
const buscarPaciente = document.getElementById("buscarPaciente");

if (buscarPaciente) {
    buscarPaciente.addEventListener("click", () => {

        //Recupero el localStorage
        const listaGuardada = JSON.parse(localStorage.getItem("listaDePacientes")) || listaDePacientes;

        let consultarPaciente = document.getElementById("consultarPaciente");
        const encontrarPaciente = listaGuardada.find(paciente => paciente.documento == consultarPaciente.value);

        if (encontrarPaciente) {
            mostrarPaciente.style.color = "black";
            mostrarPaciente.classList.add("estiloMostrarPaciente");
            mostrarPaciente.innerHTML = `Nombre Completo: <span class="estiloValue">${encontrarPaciente.nombre} ${encontrarPaciente.apellido}</span> <br>
                                        N° de Documento: <span class="estiloValue">${encontrarPaciente.documento}</span> <br>
                                        N° de Habitación: <span class="estiloValue">${encontrarPaciente.habitacion}</span> <br>
                                        Médico Asignado: <span class="estiloValue">${encontrarPaciente.medico}</span> <br>
                                        Diagnóstico Inicial: <span class="estiloValue">${encontrarPaciente.diagnostico}`;

            consultarPaciente.value = ""
        } else {
            mostrarPaciente.style.color = "red";
            mostrarPaciente.classList.add("estiloMostrarPaciente");
            mostrarPaciente.innerHTML = "Paciente no encontrado.";

            consultarPaciente.value = ""
        }
    });
}


//SECCION DE EVOLUCION
const busquedaParaEvolucion = document.getElementById("busquedaParaEvolucion");

if (busquedaParaEvolucion) {
    busquedaParaEvolucion.addEventListener("click", () => {

        //Recupero el localStorage
        const listaGuardada = JSON.parse(localStorage.getItem("listaDePacientes")) || listaDePacientes;

        let consultaParaEvolucion = document.getElementById("consultaParaEvolucion");
        const encontrarParaEvolucion = listaGuardada.find(paciente => paciente.documento == consultaParaEvolucion.value);

        if (encontrarParaEvolucion) {
            evolucion.style.color = "black";
            evolucion.classList.add("estiloMostrarPaciente");
            evolucion.innerHTML = `<p>Ingrese la evolución de ${encontrarParaEvolucion.nombre} ${encontrarParaEvolucion.apellido}</p>
                                    <div class="containerInputEvo">
                                        <textarea class="inputEvolucion" name="aniadirEvolucion" id="aniadirEvolucion" cols="50" rows="7"></textarea>
                                        <button class="aniadir" id="enviarEvolucion">Añadir Evolución</button>
                                    </div>`

            consultaParaEvolucion.value = ""

            const enviarEvolucion = document.getElementById("enviarEvolucion");
            enviarEvolucion.addEventListener("click", () => {
                let aniadirEvolucion = document.getElementById("aniadirEvolucion");
                evolucion.style.color = "red";

                //Validación para que no se pueda agregar una evolucion vacia
                if (aniadirEvolucion.value == "") {
                    evolucion.innerHTML = `<p">No es posible añadir una evolución vacia.</p>`;
                }
                else {
                    //No encontre la manera que la palabra "actualizacion" se vea de color negra al consultar los datos de un paciente.
                    encontrarParaEvolucion.diagnostico += (`<br><br> ►|ACTUALIZACIÓN|◄ <br> ${aniadirEvolucion.value}`);

                    // Guardo la evolucion en el localStorage
                    localStorage.setItem("listaDePacientes", JSON.stringify(listaGuardada));

                    consultaParaEvolucion.value = ""
                    evolucion.innerHTML = `<p class="textoCorrecto">La evolución se ha cargado correctamente.</p>`
                }
            })

        } else {
            evolucion.style.color = "red";
            evolucion.classList.add("estiloMostrarPaciente");
            evolucion.innerHTML = "Paciente no encontrado.";

            consultaParaEvolucion.value = ""
        }
    })
}

//SECCION DE EGRESO
const busquedaParaEgreso = document.getElementById("busquedaParaEgreso");

if (busquedaParaEgreso) {
    busquedaParaEgreso.addEventListener("click", () => {

        //Recupero el localStorage
        const listaGuardada = JSON.parse(localStorage.getItem("listaDePacientes")) || listaDePacientes;

        let consultaParaEgreso = document.getElementById("consultaParaEgreso");
        const encontrarParaEgreso = listaGuardada.find(paciente => paciente.documento == consultaParaEgreso.value);

        if (encontrarParaEgreso) {
            egreso.style.color = "black";
            egreso.classList.add("estiloMostrarPaciente");
            egreso.innerHTML = `El siguiente paciente está a punto de ser dado de alta. <br> 
                                ¿Está seguro que desea continuar? <br><br>
                                Nombre: <span class="estiloValue">${encontrarParaEgreso.nombre}</span><br>
                                Apellido: <span class="estiloValue">${encontrarParaEgreso.apellido}</span> <br>
                                N° de Documento: <span class="estiloValue">${encontrarParaEgreso.documento}</span> <br>
                                N° de Habitación: <span class="estiloValue">${encontrarParaEgreso.habitacion}</span> <br>
                                <button class="btnAceptar" id="Aceptar">Aceptar</button>
                                <button class="btnCancelar" id="Cancelar">Cancelar</button>`;

            const aceptar = document.getElementById("Aceptar");
            const cancelar = document.getElementById("Cancelar");

            consultaParaEgreso.value = ""

            //Validación para que se cancele o se acepte el egreso
            if (aceptar) {
                aceptar.addEventListener("click", () => {
                    let buscarEnLista = listaGuardada.indexOf(encontrarParaEgreso);
                    console.log(buscarEnLista)
                    listaGuardada.splice(buscarEnLista, 1);

                    localStorage.setItem("listaDePacientes", JSON.stringify(listaGuardada));

                    egreso.style.color = "green";
                    egreso.innerHTML = `El paciente a sido dado de alta exitomasemente.`;
                })
            }

            if (cancelar) {
                cancelar.addEventListener("click", () => {
                    egreso.style.color = "red";
                    egreso.classList.add("estiloMostrarPaciente");
                    egreso.innerHTML = `Acción cancelada!`;
                })
            }
        } else {
            egreso.style.color = "red";
            egreso.classList.add("estiloMostrarPaciente");
            egreso.innerHTML = "Paciente no encontrado.";

            consultaParaEgreso.value = ""
        }
    });
}

