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




//SECCION INICIO DE SESION
const usuarioRegistrado = "admin";
const passwordRegistrado = "0000";
const ingresar = document.getElementById("ingresar");

// Puse este IF aca y en el principio de otros eventos recomendación de ChatGPT porque al cargar los otros HTML la consola tiraba un error como este (main.js:22 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') at main.js:22:19). Mi idea era tener tener un archivo JS para cada HTML pero no me quise complicar añadiendo muchos archivos. Lautaro me dijo que podria haber hecho eso para tenerlo mas ordenado pero que esto igualmente es valido
if (ingresar)
    ingresar.addEventListener("click", (e) => {
        e.preventDefault();

        let usuario = document.getElementById("usuario");
        let password = document.getElementById("password");

        if (usuario.value == usuarioRegistrado && password.value == passwordRegistrado) {
            alertaExitosa('¡BIENVENIDO!', "./sections/inicio.html");
        }
        else {
            alertaError('¡Error! El usuario o contraseña no son correctos');

            usuario.value = "";
            password.value = "";
        }
    })




//SECCION DE REGISTRO DE PACIENTE
const registrarPaciente = document.getElementById("registrarPaciente");

if (registrarPaciente) {
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
}




//SECCION DE REINGRESOS DE PACIENTES
const busquedaParaReingreso = document.getElementById("busquedaParaReingreso");

if (busquedaParaReingreso) {
    busquedaParaReingreso.addEventListener("click", (e) => {
        e.preventDefault();

        recuperarStorage();

        let consultaParaReingreso = document.getElementById("consultaParaReingreso");
        const encontrarParaReingreso = egresadosGuardados.find(paciente => paciente.documento == consultaParaReingreso.value);

        if (encontrarParaReingreso) {

            const reingreso = document.getElementById("reingreso");

            modificarDOM(reingreso, `Nombre Completo: <span class="estiloValue">${encontrarParaReingreso.nombre} ${encontrarParaReingreso.apellido}</span> <br>
                                        N° de Documento: <span class="estiloValue">${encontrarParaReingreso.documento}</span> <br>
                                        <form>
                                            <div>
                                                <label for="habitacion">N° de Habitación</label>
                                                <input class="inputIngreso" type="number" name="habitacion" id="habitacionReingreso">
                                            </div>
                                            <div>
                                                <label for="medico">Médico a cargo</label>
                                                <input class="inputIngreso" type="text" name="medico" id="medicoReingreso">
                                            </div> <br>
                                            <p>Ingrese el motivo de reingreso. Tenga en cuenta que el diagnóstico ingresado será añadido como una nueva actualización en las evoluciones y no reemplazará el diagnóstico inicial.</p>
                                            <div class="containerInputEvo">
                                                <textarea class="inputEvolucion" name="aniadirEvolucion" id="aniadirEvolucionReingreso" cols="50" rows="7"></textarea>
                                                <button class="aniadir" id="reingresar">Reingresar Paciente</button>
                                            </div>
                                        </form>`);

            const habitacionReingreso = document.getElementById("habitacionReingreso");
            const medicoReingreso = document.getElementById("medicoReingreso");
            const aniadirEvolucionReingreso = document.getElementById("aniadirEvolucionReingreso");
            const reingresar = document.getElementById("reingresar");

            reingresar.addEventListener("click", (e) => {
                e.preventDefault();

                if (habitacionReingreso.value && medicoReingreso.value && aniadirEvolucionReingreso.value) {

                    const comprobarHabReingreso = listaGuardada.find(paciente => paciente.habitacion == habitacionReingreso.value);

                    if (comprobarHabReingreso) {
                        alertaAdvertencia(`La habitación N° ${habitacionReingreso.value} ya se encuentra en uso`);
                        habitacionReingreso.value = "";
                    }
                    else {
                        encontrarParaReingreso.habitacion = habitacionReingreso.value;
                        encontrarParaReingreso.medico = medicoReingreso.value;
                        encontrarParaReingreso.diagnostico += (`<br><br> ►|REINGRESO|◄ <br> ${aniadirEvolucionReingreso.value}`);

                        listaGuardada.push(encontrarParaReingreso);
                        const buscarEgresados = egresadosGuardados.indexOf(encontrarParaReingreso);
                        egresadosGuardados.splice(buscarEgresados, 1);

                        guardarEnStorage();

                        alertaExitosa('PACIENTE REINGRESADO EXITOSAMENTE!', "./reingresarPaciente.html");
                    }
                }

                else {
                    alertaAdvertencia(`Complete todos los campos antes de registrar al paciente!`);
                }
            });
        }

        else {
            alertaAdvertencia(`Paciente no encontrado`);
            consultaParaReingreso.value = "";
        }
        consultaParaReingreso.value = "";
    });
}




//SECCION DE CONSULTA DE DATOS
const buscarPaciente = document.getElementById("buscarPaciente");

if (buscarPaciente) {
    buscarPaciente.addEventListener("click", (e) => {
        e.preventDefault();

        recuperarStorage();

        let consultarPaciente = document.getElementById("consultarPaciente");
        const encontrarPaciente = listaGuardada.find(paciente => paciente.documento == consultarPaciente.value);

        if (encontrarPaciente) {
            const mostrarPaciente = document.getElementById("mostrarPaciente");

            modificarDOM(mostrarPaciente, `Nombre Completo: <span class="estiloValue">${encontrarPaciente.nombre} ${encontrarPaciente.apellido}</span> <br>
                                            N° de Documento: <span class="estiloValue">${encontrarPaciente.documento}</span> <br>
                                            N° de Habitación: <span class="estiloValue">${encontrarPaciente.habitacion}</span> <br>
                                            Médico Asignado: <span class="estiloValue">${encontrarPaciente.medico}</span> <br>
                                            Diagnóstico Inicial: <span class="estiloValue">${encontrarPaciente.diagnostico}`);

            consultarPaciente.value = "";
        } else {
            alertaAdvertencia(`Paciente no encontrado`);
            consultarPaciente.value = "";
        }
    });
}




//SECCION DE EVOLUCION
const busquedaParaEvolucion = document.getElementById("busquedaParaEvolucion");

if (busquedaParaEvolucion) {
    busquedaParaEvolucion.addEventListener("click", (e) => {
        e.preventDefault();

        recuperarStorage();

        let consultaParaEvolucion = document.getElementById("consultaParaEvolucion");
        const encontrarParaEvolucion = listaGuardada.find(paciente => paciente.documento == consultaParaEvolucion.value);

        if (encontrarParaEvolucion) {
            const evolucion = document.getElementById("evolucion");

            modificarDOM(evolucion, `<div>
                                        <p>Evoluciones anteriores</p> <br> <span class="estiloValue">${encontrarParaEvolucion.diagnostico} </span>
                                    </div> <br>
                                    <p>Ingrese la evolución de <span class="estiloValue">${encontrarParaEvolucion.nombre} ${encontrarParaEvolucion.apellido}</p> </span>
                                    <div class="containerInputEvo">
                                        <textarea class="inputEvolucion" name="aniadirEvolucion" id="aniadirEvolucion" cols="50" rows="7"></textarea>
                                        <button class="aniadir" id="enviarEvolucion">Añadir Evolución</button>
                                    </div>`);

            consultaParaEvolucion.value = "";

            const enviarEvolucion = document.getElementById("enviarEvolucion");

            enviarEvolucion.addEventListener("click", () => {
                let aniadirEvolucion = document.getElementById("aniadirEvolucion");

                //Validación para que no se pueda agregar una evolucion vacia
                if (aniadirEvolucion.value == "") {
                    alertaAdvertencia(`No es posible añadir una evolución vacia`);
                }
                else {
                    //No encontre la manera que la palabra "actualizacion" se vea de color negra al consultar los datos de un paciente, igual que con "Reingreso".
                    encontrarParaEvolucion.diagnostico += (`<br><br> ►|ACTUALIZACIÓN|◄ <br> ${aniadirEvolucion.value}`);

                    guardarEnStorage();

                    alertaExitosa('LA EVOLUCIÓN SE HA CARGADO CORRECTAMENTE', "./evolucionPaciente.html");
                }
            })

        } else {
            alertaAdvertencia(`Paciente no encontrado`);
            consultaParaEvolucion.value = "";
        }
    });
}




//SECCION DE EGRESO
const busquedaParaEgreso = document.getElementById("busquedaParaEgreso");

if (busquedaParaEgreso) {
    busquedaParaEgreso.addEventListener("click", (e) => {
        e.preventDefault();

        recuperarStorage();

        let consultaParaEgreso = document.getElementById("consultaParaEgreso");
        const encontrarParaEgreso = listaGuardada.find(paciente => paciente.documento == consultaParaEgreso.value);

        if (encontrarParaEgreso) {
            const egreso = document.getElementById("egreso");

            modificarDOM(egreso, `El siguiente paciente está a punto de ser dado de alta. <br> 
                                ¿Está seguro que desea continuar? <br><br>
                                Nombre: <span class="estiloValue">${encontrarParaEgreso.nombre}</span><br>
                                Apellido: <span class="estiloValue">${encontrarParaEgreso.apellido}</span> <br>
                                N° de Documento: <span class="estiloValue">${encontrarParaEgreso.documento}</span> <br>
                                N° de Habitación: <span class="estiloValue">${encontrarParaEgreso.habitacion}</span> <br>
                                <button class="btnAceptar" id="Aceptar">Aceptar</button>
                                <button class="btnCancelar" id="Cancelar">Cancelar</button>`);

            const aceptar = document.getElementById("Aceptar");
            const cancelar = document.getElementById("Cancelar");

            consultaParaEgreso.value = "";

            //Validación para que se cancele o se acepte el egreso
            if (aceptar) {
                aceptar.addEventListener("click", () => {
                    let buscarEnLista = listaGuardada.indexOf(encontrarParaEgreso);
                    egresadosGuardados.push(encontrarParaEgreso);
                    listaGuardada.splice(buscarEnLista, 1);

                    guardarEnStorage();

                    alertaExitosa('EL PACIENTE A SIDO DADO DE ALTA EXITOSAMENTE', "./egresos.html");
                })
            }

            if (cancelar) {
                cancelar.addEventListener("click", () => {
                    Swal.fire({
                        text: `Acción cancelada!`,
                        icon: 'warning',
                    }).then(() => {
                        window.location.href = "./egresos.html";
                    });
                });
            }
        }

        else {
            alertaAdvertencia(`Paciente no encontrado`);
            consultaParaEgreso.value = "";
        }
    });
}



//SECCION EQUIPO TRATANTE

const listaDoctores = document.getElementById("listaDoctores");
const equipoTratante = "/json/equipo.json";

fetch(equipoTratante)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(doctor => {
            listaDoctores.classList.add("contenedorDoctores");

            const divDoctor = document.createElement("div");
            divDoctor.className = "divDoctores";

            const fotoMedico = document.createElement("img");
            fotoMedico.className = "fotoMedico";
            fotoMedico.src = doctor.foto;
            divDoctor.appendChild(fotoMedico);

            const nombreMedico = document.createElement("h3");
            nombreMedico.className = "h3Equipo";
            nombreMedico.textContent = doctor.medico;
            divDoctor.appendChild(nombreMedico);

            const legajo = document.createElement("p");
            legajo.className = "parrafoEquipo";
            legajo.textContent = `Legajo n°: ${doctor.legajo}`;
            divDoctor.appendChild(legajo);

            const especialidad = document.createElement("p");
            especialidad.className = "parrafoEquipo";
            especialidad.textContent = `Especialidad: ${doctor.especialidad}`;
            divDoctor.appendChild(especialidad);

            const horario = document.createElement("p");
            horario.className = "parrafoEquipo";
            horario.textContent = `Horario: ${doctor.horario}`;
            divDoctor.appendChild(horario);

            listaDoctores.appendChild(divDoctor);
        });
    })
    .catch(error => console.log(error));




// FUNCIONES

function alertaExitosa(texto, url) {
    Swal.fire({
        text: texto,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
    }).then(() => {
        window.location.href = url;
    })
}

function alertaAdvertencia(texto) {
    Swal.fire({
        text: texto,
        icon: 'warning',
    })
}

function alertaError(texto) {
    Swal.fire({
        text: texto,
        icon: 'error',
    })
}

function recuperarStorage() {
    listaGuardada;
    egresadosGuardados;
}

function guardarEnStorage() {
    localStorage.setItem("listaDePacientes", JSON.stringify(listaGuardada));
    localStorage.setItem("listaDeEgresados", JSON.stringify(egresadosGuardados));
}

function modificarDOM(elemento, contenido) {
    elemento.style.color = "black";
    elemento.classList.add("estiloMostrarPaciente");
    elemento.innerHTML = contenido;
}