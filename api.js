// Punto base de la API - Configurable para desarrollo local o producción
// Desarrollo local: http://localhost:3003/contactos
// Producción (Render): https://agenda-adso-api-ljjm.onrender.com/contactos
const API_BASE = import.meta.env.VITE_API_URL || "https://agenda-adso-api-ljjm.onrender.com/contactos";

const API = API_BASE;

// GET: listar contactos
export async function listarContactos() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Error al listar contactos");
  return res.json();
}

// POST: crear contacto
export async function crearContacto(data) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear el contacto");
  return res.json();
}

// DELETE: eliminar contacto por id
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar el contacto");
  return true;
}

// PUT: actualizar un contacto existente (UPDATE) - Clase 11
export async function actualizarContacto(id, data) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar el contacto");
  return res.json();
}
