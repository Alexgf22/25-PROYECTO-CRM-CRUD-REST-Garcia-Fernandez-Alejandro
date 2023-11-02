# IndexedDB: Configuración inicial

## Resumen de los aspectos clave de IndexedDB, desde la configuración inicial hasta operaciones avanzadas como transacciones y consultas

```javascript

// Abrir una base de datos
window.indexedDB.open('nombreDB', 1);

// Crear un almacén de objetos
const objectStore = db.createObjectStore('nombreAlmacen', { keyPath: 'clavePrimaria' });



// Iniciar una transacción de lectura
const transaction = db.transaction(['nombreAlmacen'], 'readonly');

// Iniciar una transacción de escritura
const transaction = db.transaction(['nombreAlmacen'], 'readwrite');




// Las operaciones de CRUD 

// Crear
objectStore.add({ clavePrimaria: valor });

// Leer
objectStore.get(clavePrimaria);

// Actualizar
objectStore.put({ clavePrimaria: valorActualizado });

// Eliminar
objectStore.delete(clavePrimaria);





// Crear un índice
objectStore.createIndex('nombreIndice', 'propiedad', { unique: false });




// Eventos y manejos de errores
request.onsuccess = (event) => {
  const db = event.target.result;
  // Operaciones exitosas
};

request.onerror = (event) => {
  // Manejo de errores
};




//Versionamiento de bases de datos
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  // Actualizaciones de estructura aquí
};




// A continuación una consulta avanzada
const index = objectStore.index('nombreIndice');
const request = index.get('NombreCliente');

request.onsuccess = (event) => {
  const resultado = event.target.result;
  // Procesar el resultado
};

```
