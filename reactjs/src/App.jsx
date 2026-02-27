// Importamos useEffect y useState para manejar estados y efectos en el componente principal
import { useEffect, useState } from "react";

// Importamos los servicios que se comunican con JSON Server
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos los componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

// Componente principal de la aplicación
function App() {
  // Estado que almacena la lista de contactos obtenidos de la API
  const [contactos, setContactos] = useState([]);

  // Estado que indica si estamos cargando información (por ejemplo, al inicio)
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error generales de la aplicación
  const [error, setError] = useState("");

  // useEffect que se ejecuta una sola vez al montar el componente
  // Aquí cargamos los contactos iniciales desde JSON Server
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true); // Indicamos que estamos cargando
        setError(""); // Limpiamos posibles errores anteriores

        const data = await listarContactos(); // Llamamos a la API
        setContactos(data); // Guardamos la lista de contactos en el estado
      } catch (error) {
        // En caso de error, lo registramos en consola para depuración
        console.error("Error al cargar contactos:", error);

        // Y mostramos un mensaje amigable al usuario
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false); // Finalizamos el estado de carga
      }
    };

    cargarContactos();
  }, []);

  // Función que se encarga de agregar un nuevo contacto usando la API
  // Esta función es async para poder usarla con await en el formulario
  const onAgregarContacto = async (nuevoContacto) => {
  try {
    setError("");

    // ⏳ Simulamos un tiempo real de guardado (UX realista)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const creado = await crearContacto(nuevoContacto);

    setContactos((prev) => [...prev, creado]);

    // IMPORTANTE: retornamos el contacto creado
    return creado;
  } catch (error) {
    console.error("Error al crear contacto:", error);
    setError(
      "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
    );
    throw error;
  }
};

  // Función para eliminar un contacto por su id
  const onEliminarContacto = async (id) => {
    try {
      setError(""); // Limpiamos errores previos
      await eliminarContactoPorId(id); // Llamamos al servicio de eliminación

      // Filtramos el contacto eliminado de la lista local
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      // Mostramos el error en consola para depurar
      console.error("Error al eliminar contacto:", error);

      // Si algo falla al eliminar, informamos al usuario
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  // JSX que renderiza la aplicación
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor principal centrado */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Encabezado principal de la Agenda */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha 3223876
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            Agenda ADSO v6
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Gestión de contactos conectada a una API local con JSON Server,
            ahora con validaciones y mejor experiencia de usuario.
          </p>
        </header>

        {/* Si hay un error global, lo mostramos en un recuadro rojo */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Si estamos cargando, mostramos un mensaje de carga */}
        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            {/* Formulario para crear nuevos contactos */}
            <FormularioContacto onAgregar={onAgregarContacto} />

            {/* Listado de contactos */}
            <section className="space-y-4">
              {contactos.length === 0 ? (
                // Mensaje cuando no existen contactos aún
                <p className="text-sm text-gray-500">
                  Aún no tienes contactos registrados. Agrega el primero usando
                  el formulario superior.
                </p>
              ) : (
                // Recorremos la lista de contactos y mostramos una tarjeta por cada uno
                contactos.map((c) => (
                  <ContactoCard
                    key={c.id} // Key única para cada elemento de la lista
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    // onEliminar es una función que llama a onEliminarContacto con el id
                    onEliminar={() => onEliminarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        {/* Pie de página con los datos del instructor */}
        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    </div>
  );
}

// Exportamos el componente principal
export default App;
