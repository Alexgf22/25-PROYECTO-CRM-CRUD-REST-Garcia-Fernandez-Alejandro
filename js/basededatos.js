const request = indexedDB.open('MiBaseDeDatos', 1)

let db

request.onupgradeneeded = function(event) {
  console.log('onupgradeneeded')
  db = event.target.result
  const objectStore = db.createObjectStore('clientes', { keyPath: 'id' })

  objectStore.createIndex('nombre', 'nombre', { unique: false })
  objectStore.createIndex('email', 'email', { unique: true })
  objectStore.createIndex('telefono', 'telefono', { unique: false })
  objectStore.createIndex('empresa', 'empresa', { unique: false })
}

request.onsuccess = function(event) {
  console.log('onsuccess')
  db = event.target.result
  if (!db) {
    console.error('La base de datos no está inicializada correctamente.')
    return
  }

  agregarCliente({ id: 1, nombre: 'Max', email: 'maxvers12@gmail.com', telefono: '123456789', empresa: 'Mako' })
  agregarCliente({ id: 2, nombre: 'Pedro', email: 'pedrito22@gmail.com', telefono: '123456789', empresa: 'Maki' })
  agregarCliente({ id: 3, nombre: 'Julio', email: 'julito22@gmail.com', telefono: '123456789', empresa: 'Maki' })

  modificarCliente(1, 'Magic Alonso', 'theMagic@example.com', '987654321', 'XYZ Inc.')

  eliminarCliente(2)
  eliminarCliente(3)
  modificarCliente(1, 'Hamilton', 'incredible12@example.com', '667345890', 'Ynd ISQ.')
  agregarCliente({ id: 2, nombre: 'Checo Perez', email: 'checho22@gmail.com', telefono: '123456789', empresa: 'Maki' })

  obtenerClientes(function(clientes) {
    console.log(clientes)
  })
}

request.onerror = function(event) {
  console.error('Error al abrir la base de datos:', event.target.errorCode)
}

function agregarCliente(cliente) {
  const transaction = db.transaction(['clientes'], 'readwrite')
  const objectStore = transaction.objectStore('clientes')

  const clienteID = cliente.id

  const getRequest = objectStore.get(clienteID)

  getRequest.onsuccess = function(event) {
    const existingCliente = event.target.result

    if (!existingCliente) {
      const addRequest = objectStore.add(cliente)

      addRequest.onsuccess = function(event) {
        const nuevoClienteID = event.target.result
        console.log('Cliente añadido correctamente. ID:', nuevoClienteID)
      }

      addRequest.onerror = function(event) {
        console.error('Error al añadir el cliente:', event.target.errorCode)
      }
    } else {
      console.error('No se puede agregar el cliente, ya existe un cliente con el ID ' + clienteID)
    }
  }

  getRequest.onerror = function(event) {
    console.error('Error al comprobar el cliente:', event.target.errorCode)
  }
}

function modificarCliente(id, nuevoNombre, nuevoEmail, nuevoTelefono, nuevaEmpresa) {
  const transaction = db.transaction(['clientes'], 'readwrite')
  const objectStore = transaction.objectStore('clientes')
  const request = objectStore.get(id)

  request.onsuccess = function(event) {
    const cliente = request.result
    if (cliente) {
      cliente.nombre = nuevoNombre
      cliente.email = nuevoEmail
      cliente.telefono = nuevoTelefono
      cliente.empresa = nuevaEmpresa

      const requestUpdate = objectStore.put(cliente)

      requestUpdate.onsuccess = function(event) {
        console.log('Cliente modificado correctamente.')
      }

      requestUpdate.onerror = function(event) {
        console.error('Error al modificar el cliente:', event.target.errorCode)
      }
    } else {
      console.error('El cliente con ID ' + id + ' no fue encontrado.')
    }
  }

  request.onerror = function(event) {
    console.error('Error al obtener el cliente:', event.target.errorCode)
  }
}

function obtenerClientes(callback) {
  const transaction = db.transaction(['clientes'], 'readonly')
  const objectStore = transaction.objectStore('clientes')
  const request = objectStore.getAll()

  request.onsuccess = function(event) {
    const clientes = event.target.result
    callback(clientes)
  }

  request.onerror = function(event) {
    console.error('Error al obtener los clientes:', event.target.errorCode)
  }
}

function eliminarCliente(id) {
  const transaction = db.transaction(['clientes'], 'readwrite')
  const objectStore = transaction.objectStore('clientes')

  const deleteRequest = objectStore.delete(id)

  deleteRequest.onsuccess = function(event) {
    console.log('Cliente eliminado correctamente.')
  }

  deleteRequest.onerror = function(event) {
    console.error('Error al eliminar el cliente:', event.target.errorCode)
  }
}
