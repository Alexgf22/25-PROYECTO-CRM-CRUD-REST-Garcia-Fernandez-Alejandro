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
        sessionStorage.clear();
    }
    const nombre = sessionStorage.getItem('clienteNombre')
    const email = sessionStorage.getItem('clienteEmail')
    const telefono = sessionStorage.getItem('clienteTelefono')
    const empresa = sessionStorage.getItem('clienteEmpresa')

    // Prellenar el formulario con los datos del cliente
    if (nombre !== null && email !== null && telefono !== null && empresa !== null) {
        document.querySelector("#nombre").value = nombre
        document.querySelector("#email").value = email
        document.querySelector("#telefono").value = telefono
        document.querySelector("#empresa").value = empresa
    }

    const btnGuardarCambios = document.querySelector('form#formulario button[type="submit"]')

    btnGuardarCambios.addEventListener("click", () => {
        // Obtener los nuevos datos del formulario
        const nuevoNombre = document.querySelector("#nombre").value
        const nuevoEmail = document.querySelector("#email").value
        const nuevoTelefono = document.querySelector("#telefono").value
        const nuevaEmpresa = document.querySelector("#empresa").value

        // Obtener el ID del cliente
        const clienteID = sessionStorage.getItem("clienteID")

        function validarNombre(nombre) {
            const regex = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s']+$/
            const longitudMinima = 2
            const longitudMaxima = 50
        
            if (nombre.length < longitudMinima || nombre.length > longitudMaxima) {
                return false
            }
        
            return regex.test(nombre)
        }

        console.log(nuevoNombre, nuevoEmail, nuevoTelefono, nuevaEmpresa)
        
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
        
        if (!validarNombre(nuevoNombre) || !validarTelefono(nuevoTelefono) || !validarEmpresa(nuevaEmpresa)) {
            // Si alguna validación falla, no se procede
            return
        }

        console.log(clienteID)

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
        }

        localStorage.setItem('Clientes', JSON.stringify(listadoClientes))

        window.location.replace('index.html')
    })
})
