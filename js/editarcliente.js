document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.querySelector("#nombre")
    const inputCorreo = document.querySelector("#email")
    const inputTelefono = document.querySelector("#telefono")
    const inputEmpresa = document.querySelector("#empresa")

    // Recuperar datos de sessionStorage
    const nombre = sessionStorage.getItem('clienteNombre')
    const email = sessionStorage.getItem('clienteEmail')
    const telefono = sessionStorage.getItem('clienteTelefono')
    const empresa = sessionStorage.getItem('clienteEmpresa')

    // Preenlazar el formulario con los datos del cliente
    inputNombre.value = nombre
    inputCorreo.value = email
    inputTelefono.value = telefono
    inputEmpresa.value = empresa
})
