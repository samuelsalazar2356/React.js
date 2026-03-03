// Archivo: src/api.js
// Capa de acceso a datos de Agenda ADSO (llamados a la API REST).

const BASE_URL = "http://localhost:3001/contactos";

// Listar todos los contactos
export async function listarContactos() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Error al listar contactos");
  }
  return await response.json();
}

// Crear un nuevo contacto
export async function crearContacto(contacto) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contacto),
  });
  if (!response.ok) {
    throw new Error("Error al crear contacto");
  }
  return await response.json();
}

// Eliminar un contacto por ID
export async function eliminarContactoPorId(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar contacto");
  }
  return await response.json();
}

// Actualizar un contacto por ID
export async function actualizarContacto(id, contactoActualizado) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactoActualizado),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar contacto");
  }
  return await response.json();
}

