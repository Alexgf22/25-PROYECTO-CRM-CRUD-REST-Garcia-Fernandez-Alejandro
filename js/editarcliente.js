var listadoClientes = JSON.parse(localStorage.getItem('Clientes')) || []

function actualizarFilaEnTabla(clienteID, nuevoNombre, nuevoTelefono, nuevaEmpresa) {
    const fila = document.querySelector(`tr[data-id="${clienteID}"]`)
    if (fila) {
        fila.querySelector("td:nth-child(1)").textContent = nuevoNombre
        fila.querySelector("td:nth-child(2)").textContent = nuevoTelefono
        fila.querySelector("td:nth-child(3)").textContent = nuevaEmpresa
    }
}

document.addEventListener("DOMContentLoaded", () => {

    if (!localStorage.getItem('Clientes')) {
        sessionStorage.clear()
    } 

    const btnGuardarCambios = document.querySelector('#formulario button[type="submit"]')

    const nombreInput = document.querySelector("#nombre")
    const emailInput = document.querySelector("#email")
    const telefonoInput = document.querySelector("#telefono")
    const empresaInput = document.querySelector("#empresa")

    // Prellenar el formulario con los datos del cliente
    const nombre = sessionStorage.getItem('clienteNombre')
    const email = sessionStorage.getItem('clienteEmail')
    const telefono = sessionStorage.getItem('clienteTelefono')
    const empresa = sessionStorage.getItem('clienteEmpresa')

    if (nombre !== null && email !== null && telefono !== null && empresa !== null) {
        nombreInput.value = nombre
        emailInput.value = email
        telefonoInput.value = telefono
        empresaInput.value = empresa

        nombreInput.addEventListener("input", validarFormulario)
        emailInput.addEventListener("input", validarFormulario)
        telefonoInput.addEventListener("input", validarFormulario)
        empresaInput.addEventListener("input", validarFormulario)
    }

    // Funciones
    function validarFormulario() {
        const nuevoNombre = nombreInput.value
        const nuevoEmail = emailInput.value
        const nuevoTelefono = telefonoInput.value
        const nuevaEmpresa = empresaInput.value

        const nombreEsValido = validarNombre(nuevoNombre)
        const emailEsValido = validarEmail(nuevoEmail)
        const telefonoEsValido = validarTelefono(nuevoTelefono)
        const empresaEsValida = validarEmpresa(nuevaEmpresa)

        const formularioEsValido = nombreEsValido && emailEsValido && telefonoEsValido && empresaEsValida

        if (formularioEsValido) {
            btnGuardarCambios.classList.remove("opacity-50")
            btnGuardarCambios.disabled = false
        } else {
            btnGuardarCambios.classList.add("opacity-50")
            btnGuardarCambios.disabled = true
        }
    }

    btnGuardarCambios.addEventListener("click", function (event) {
        event.preventDefault()

        const clienteID = sessionStorage.getItem("clienteID")
        const nuevoNombre = nombreInput.value
        const nuevoEmail = emailInput.value
        const nuevoTelefono = telefonoInput.value
        const nuevaEmpresa = empresaInput.value

        actualizarFilaEnTabla(clienteID, nuevoNombre, nuevoTelefono, nuevaEmpresa)

        const clienteIndex = listadoClientes.findIndex(cliente => cliente.id === clienteID)

        if (clienteIndex !== -1) {
            listadoClientes[clienteIndex] = {
                id: clienteID,
                nombre: nuevoNombre,
                email: nuevoEmail,
                telefono: nuevoTelefono,
                empresa: nuevaEmpresa
            }
        } else {
            console.error("No se encontró el cliente en la lista.")
        }

        localStorage.setItem('Clientes', JSON.stringify(listadoClientes))

        window.location.replace('index.html')

    })


    function validarNombre(nombre) {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s']+$/
        const longitudMinima = 2
        const longitudMaxima = 50
    
        if (nombre.length < longitudMinima || nombre.length > longitudMaxima) {
            return false
        }
    
        return regex.test(nombre)
    }

    function validarTelefono(telefono) {
        regex = /^[0-9]{9}$/
        resultado = regex.test(telefono)
        return resultado
    }

    function validarEmpresa(empresa) {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s']+$/
        const longitudMinima = 2
        const longitudMaxima = 120
    
        if (empresa.length < longitudMinima || empresa.length > longitudMaxima) {
            return false
        }
    
        return regex.test(empresa)
    }

    function validarEmail(email) {
        regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        resultado = regex.test(email)
        return resultado
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600")
        if (alerta) {
            alerta.remove()
        }
    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia)
        const error = document.createElement("p")
        error.textContent = mensaje
        error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
        referencia.appendChild(error)
    }

})