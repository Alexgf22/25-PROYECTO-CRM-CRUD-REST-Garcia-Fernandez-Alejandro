// En acciones del index de cliente van los botones de eliminar y editar cliente

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombre = urlParams.get('nombre');
    const email = urlParams.get('email');
    const telefono = urlParams.get('telefono');
    const empresa = urlParams.get('empresa');

    // Llenar el formulario de edición con los datos del cliente
    document.querySelector("#nombre").value = nombre;
    document.querySelector("#email").value = email;
    document.querySelector("#telefono").value = telefono;
    document.querySelector("#empresa").value = empresa;
});
