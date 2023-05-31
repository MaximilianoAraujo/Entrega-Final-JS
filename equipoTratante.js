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

            const infoDoctor = document.createElement("p");
            infoDoctor.className = "parrafoEquipo";
            infoDoctor.innerHTML = `<h3 class="h3Equipo">${doctor.medico}</h3>
                            <p class="parrafoEquipo">Legajo n°: ${doctor.legajo}</p>
                            <p class="parrafoEquipo">Especialidad: ${doctor.especialidad}</p>
                            <p class="parrafoEquipo">Horario: ${doctor.horario}</p>`;
            divDoctor.appendChild(infoDoctor);

            listaDoctores.appendChild(divDoctor);
        });
    })
    .catch(error => console.log(error));