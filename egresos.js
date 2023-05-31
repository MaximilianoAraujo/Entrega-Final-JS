//SECCION DE EGRESO
import { alertaExitosa, alertaAdvertencia, recuperarStorage, guardarEnStorage, modificarDOM } from "./funciones.js"
import { listaGuardada, egresadosGuardados } from "./main.js"

const busquedaParaEgreso = document.getElementById("busquedaParaEgreso");

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
