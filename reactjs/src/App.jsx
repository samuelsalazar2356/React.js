import {useState} from "react";
import "./App.css" // Importamos estilos de la app
import ContactoCard from "./components/ContactoCard"; // Importamos el componente hijo
import FormularioContacto from "./components/FormularioContacto"; // Importamos el componente hijo


export default function App() {
  // Esta es nuestra "base de datos" inicial quemada en el código
 
const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
    },
  ]);

  // Agregar
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  // Eliminar
  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v2</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      <section className="lista-contactos">
        {contactos.map((c) => (
          <ContactoCard
            key={c.id}
            id={c.id}
            nombre={c.nombre}
            telefono={c.telefono}
            correo={c.correo}
            etiqueta={c.etiqueta}
            onDelete={eliminarContacto}
          />
        ))}
      </section>
    </main>
  );
}



