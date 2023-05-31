//SECCION DE EVOLUCION
import { alertaExitosa, alertaAdvertencia, recuperarStorage, guardarEnStorage, modificarDOM } from "./funciones.js"
import { listaGuardada, } from "./main.js"

const busquedaParaEvolucion = document.getElementById("busquedaParaEvolucion");

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
