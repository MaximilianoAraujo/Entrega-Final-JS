//SECCION INICIO DE SESION
import { alertaExitosa, alertaError, } from "./funciones.js"

const usuarioRegistrado = "admin";
const passwordRegistrado = "0000";
const ingresar = document.getElementById("ingresar");

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
});
