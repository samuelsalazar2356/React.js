import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
} from "./api";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEditar, setContactoEditar] = useState(null);

  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que JSON Server esté encendido."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error(error);
      setError(
        "No se pudo guardar el contacto. Revisa tu conexión o el servidor."
      );
      throw error;
    }
  };

  const eliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar el contacto. Intenta nuevamente.");
    }
  };

  const actualizarContactoHandler = async (id, contactoActualizado) => {
    try {
      setError("");
      const actualizado = await actualizarContacto(id, contactoActualizado);
      setContactos((prev) =>
        prev.map((c) => (c.id === id ? actualizado : c))
      );
      setContactoEditar(null);
    } catch (error) {
      console.error(error);
      setError("No se pudo actualizar el contacto. Intenta nuevamente.");
      throw error;
    }
  };

  const iniciarEdicion = (contacto) => {
    setContactoEditar(contacto);
    // Scroll hacia el formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setContactoEditar(null);
  };

  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    const nombre = c.nombre.toLowerCase();
    const correo = c.correo.toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = (c.telefono || "").toLowerCase();
    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) {
      return ordenAsc ? -1 : 1;
    }
    if (nombreA > nombreB) {
      return ordenAsc ? 1 : -1;
    }
    return 0;
  });

  const totalVisibles = contactosOrdenados.length;
  const mensajeCantidad = totalVisibles === 1 
    ? "Mostrando un contacto" 
    : `Mostrando ${totalVisibles} contactos`;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Programa ADSO
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          Agenda ADSO v8
        </h1>
        <p className="text-gray-500 mt-1">
          Gestión de contactos con validaciones y mejor experiencia de usuario.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            <FormularioContacto 
              onAgregar={agregarContacto} 
              contactoEditar={contactoEditar}
              onActualizar={actualizarContactoHandler}
              onCancelar={cancelarEdicion}
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              {mensajeCantidad}
            </p>

            <div className="space-y-4">
              {contactosOrdenados.length === 0 && (
                <p className="text-sm text-gray-500">
                  {contactos.length === 0 
                    ? "No hay contactos aún. Agrega el primero usando el formulario." 
                    : "No se encontraron contactos que coincidan con la búsqueda."}
                </p>
              )}
              {contactosOrdenados.map((c) => (
                <ContactoCard
                  key={c.id}
                  {...c}
                  onEliminar={() => eliminarContacto(c.id)}
                  onEditar={() => iniciarEdicion(c)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

