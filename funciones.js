    // FUNCIONES
    import {listaGuardada,egresadosGuardados} from "./main.js"

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

    function mostrarPacientes(lista, titulo) {
        if (lista.length !== 0) {
            const tituloPacientes = document.createElement("h3");
            tituloPacientes.classList.add("tituloPacientes")
            tituloPacientes.innerHTML = `Pacientes ${titulo}`;
            mostrarPaciente.appendChild(tituloPacientes);
    
            const tablaPacientes = document.createElement("table");
            mostrarPaciente.appendChild(tablaPacientes);
    
            const nombreColumna = document.createElement("tr");
            nombreColumna.innerHTML = `<th class="estiloDiez">Nombre</th> 
                                            <th class="estiloDiez">Documento</th> 
                                            <th class="estiloDiez">Habitación</th> 
                                            <th class="estiloDiez">Médico</th> 
                                            <th class="estiloCincuenta">Diagnóstico y Evoluciones</th>`;
            tablaPacientes.appendChild(nombreColumna);
    
            lista.forEach(paciente => {
                const filaPacientes = document.createElement("tr");
                filaPacientes.innerHTML = `<td>${paciente.nombre} ${paciente.apellido}</td>
                                            <td>${paciente.documento}</td>
                                            <td>${paciente.habitacion}</td>
                                            <td>${paciente.medico}</td>
                                            <td>${paciente.diagnostico}</td>`;
                tablaPacientes.appendChild(filaPacientes);
            });
        }
    }

    
    export {alertaExitosa, alertaAdvertencia, alertaError, recuperarStorage, guardarEnStorage, modificarDOM, mostrarPacientes};