//SECCION DE REINGRESOS DE PACIENTES
import { alertaExitosa, alertaAdvertencia, recuperarStorage, guardarEnStorage, modificarDOM } from "./funciones.js"
import { listaGuardada, egresadosGuardados } from "./main.js"

const busquedaParaReingreso = document.getElementById("busquedaParaReingreso");

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

            //Validación por habitación para evitar que se pueda reingresar un paciente a una habitación en uso.
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
