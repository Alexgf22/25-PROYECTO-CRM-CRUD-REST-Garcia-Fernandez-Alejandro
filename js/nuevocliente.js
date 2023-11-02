var listadoClientes = []
var clientesEnPantalla = document.querySelector("#listado-clientes")

// Selectores y Listeners

document.addEventListener("DOMContentLoaded", () => {

    // Objeto con el contenido del mensaje
    clienteOBJ = {
        nombre: "",
        email: "",
        telefono: "",
        empresa: ""
    }

    
    // Selectores
    const inputNombre = document.querySelector("#nombre")
    const inputCorreo = document.querySelector("#email")
    const inputTelefono = document.querySelector("#telefono")
    const inputEmpresa = document.querySelector("#empresa")
    const formulario = document.querySelector("#formulario")
    const btnSubmit = document.querySelector('#formulario button[type = "submit"]')
    //const btnReset = document.querySelector('#formulario button[type = "reset"]')
    const spinner = document.querySelector("#spinner")

    // Deshabilitar el botón por defecto
    btnSubmit.disabled = true
    btnSubmit.classList.add("opacity-50")

    // Listeners

    // Listener para el botón de añadir
    btnSubmit.addEventListener("click", () => {
    anadirHTML()
  })

    // Listener para remover clientes
    mensajesEnPantalla.addEventListener("click", (e) => {
    if (e.target.className == "borrar-mensaje") {
      var indiceLi = parseInt(e.target.parentElement.dataset.indice)
      // Eliminamos el mensaje del array
      arrayMensajes.splice(indiceLi, 1)
      // Actualizamos el localStorage tras haber eliminado el mensaje
      localStorage.setItem("Clientes", JSON.stringify(arrayMensajes))
      console.log(localStorage)
      // Eliminamos el 'li' del mensaje correspondiente
      e.target.parentElement.remove()
    }
  })


    // Añadir los listeners para resaltar campo activo
    inputNombre.addEventListener("focus", resaltarCampoActivo)
    inputCorreo.addEventListener("focus", resaltarCampoActivo)
    inputTelefono.addEventListener("focus", resaltarCampoActivo)
    inputEmpresa.addEventListener("focus", resaltarCampoActivo)

    // Si en vez de blur uso input me lo valida sobre la marcha
    inputNombre.addEventListener("blur", (e) => {
        quitarResaltadoCampo(e)
        validar(e)
    })
    inputCorreo.addEventListener("blur", (e) => {
        quitarResaltadoCampo(e)
        validar(e)
    })
    inputTelefono.addEventListener("blur", (e) => {
        quitarResaltadoCampo(e)
        validar(e)
    })
    inputEmpresa.addEventListener("blur", (e) => {
        quitarResaltadoCampo(e)
        validar(e)
    })
    formulario.addEventListener("submit", activarSpinner)
    /* btnReset.addEventListener("click", (e) => {
        e.preventDefault()
        resetForm()
    }) */


    // Funciones

    // Función para añadir clientes
    function anadirHTML() {
        var mensaje = document.querySelector("#mensaje").value.trim();
        if (mensaje !== "") {
        arrayMensajes.push(mensaje);
        var mensajeAnadir = `
        <li data-indice="${arrayMensajes.length - 1}">${mensaje}<a class="borrar-mensaje" href="#">X</a></li>
        `
    
        var ul = document.createElement("ul")
        ul.innerHTML = mensajeAnadir
    
        mensajesEnPantalla.appendChild(ul)
    
        // Se actualiza el localStorage tras añadir el nuevo mensaje
        localStorage.setItem("Clientes", JSON.stringify(arrayMensajes))
        console.log(localStorage)
    
        //console.log(arrayMensajes)
    
        document.querySelector("#mensaje").value = ""
        } else {
        alert("Por favor, debes agregar un mensaje antes de añadirlo.");
        }
    
  }

    // Resaltamos el campo activo
    function resaltarCampoActivo(e) {
        e.target.style.borderColor = "#3498db"
        e.target.style.boxShadow = "0 0 10px rgba(52, 152, 219, 0.7)"
    }

    // Eliminamos el resaltado cuando el campo pierde el foco
    function quitarResaltadoCampo(e) {
        e.target.style.borderColor = ""
        e.target.style.boxShadow = ""
    }
    

    function activarSpinner(e) {
        e.preventDefault()
        spinner.classList.remove("hidden")
        spinner.classList.add("flex")
        
        setTimeout(() => {
            spinner.classList.add("hidden")
            spinner.classList.remove("flex")

            resetForm()

            // Creamos una alerta para confirmar que todo está OK
            const alerta = document.createElement("p")
            alerta.classList.add("bg-green-500", "text-white", "text-center",
            "rounded-lg", "mt-10", "text-sm")
            alerta.textContent = "El mensaje se ha mandado con éxito"
            formulario.appendChild(alerta)

            setTimeout(() => {
                alerta.remove()
            }, 3000)

        }, 3000)

        

        
    }

    function resetForm() {
        clienteOBJ.nombre = ""
        clienteOBJ.email = ""
        clienteOBJ.telefono = ""
        clienteOBJ.empresa = ""
        formulario.reset()
        comprobarFormulario()

    }

    function validar(e) {
        if(e.target.value.trim() === "") {
            mostrarAlerta(`el campo ${e.target.id} es obligatorio`, e.target.parentElement)
            clienteOBJ[e.target.name] = ""
            comprobarFormulario()
            return 
        }
        if (e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es válido", e.target.parentElement)
            clienteOBJ[e.target.name] = ""
            comprobarFormulario() 
            return 
        }
        if (e.target.id === "telefono" && !validarTelefono(e.target.value)) {
            mostrarAlerta("El teléfono no es válido", e.target.parentElement)
            clienteOBJ[e.target.name] = ""
            comprobarFormulario() 
            return 
        }

        limpiarAlerta(e.target.parentElement)

        clienteOBJ[e.target.name] = e.target.value.trim().toLowerCase()
        comprobarFormulario(clienteOBJ)
        //console.log(clienteOBJ)
        
    }

    function comprobarFormulario() {
        const values = Object.values(clienteOBJ)
    
        // Verificar si hay algún campo vacío o no válido
        const campoVacio = values.includes("")
        const formularioValido = values.every(value => value !== "")
    
        if (campoVacio || !formularioValido) {
            btnSubmit.classList.add("opacity-50")
            btnSubmit.disabled = true
        } else {
            btnSubmit.classList.remove("opacity-50")
            btnSubmit.disabled = false
        }
    }
    

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".bg-red-600")
        if (alerta) {
            alerta.remove()
        }
    }

    function mostrarAlerta(mensaje, referencia) {

        limpiarAlerta(referencia)

        console.log("Hubo un error...")
        const error = document.createElement("p")
        error.textContent = mensaje
        error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
        console.log(error)
        referencia.appendChild(error)
    }

    function validarEmail(email) {
        regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        resultado = regex.test(email)
        return resultado
    }

    function validarTelefono(telefono) {
        regex = /^[0-9]{9}$/
        resultado = regex.test(telefono)
        return resultado
    }




})