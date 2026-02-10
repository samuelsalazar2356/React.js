
let tareas = [
{ id: 1, texto: "Instalar React", completada: false },
{ id: 2, texto: "Aprender Hooks", completada: false },
{ id: 3, texto: "Crear Agenda ADSO", completada: false }
];

console.log(tareas)

// Función para mostrar todas las tareas
const mostrarTareas = () => {
console.log("\n=== LISTA DE TAREAS ===");
tareas.forEach((tarea, index) => {
const estado = tarea.completada ? "7" : "ï";
console.log(`${estado} ${index + 1}. ${tarea.texto}`);
});
console.log("======================\n");
};

console.log(mostrarTareas)
// Función para agregar una tarea
const agregarTarea = (texto) => {
const nuevaTarea = {
id: Date.now(),
texto: texto,
completada: false
};
tareas = [...tareas, nuevaTarea];
console.log(`7 Tarea agregada: "${texto}"`);
return nuevaTarea;
};

console.log(agregarTarea)

// Función para marcar como completada
const completarTarea = (id) => {
tareas = tareas.map(tarea =>
tarea.id === id
? { ...tarea, completada: true }
: tarea
);
console.log(`7 Tarea #${id} marcada como completada`);
};


console.log(completarTarea)

// Función para eliminar una tarea
const eliminarTarea = (id) => {
const tareaEliminada = tareas.find(t => t.id === id);
tareas = tareas.filter(tarea => tarea.id !== id);
console.log(`

Tarea eliminada: "${tareaEliminada.texto}"`);

};


console.log(eliminarTarea)
// Función para filtrar tareas pendientes
const obtenerPendientes = () => {
return tareas.filter(tarea => !tarea.completada);
};

console.log(obtenerPendientes)
// Función para obtener estadísticas
const obtenerEstadisticas = () => {
const total = tareas.length;
const completadas = tareas.filter(t => t.completada).length;
const pendientes = total - completadas;
const porcentaje = total > 0 ? ((completadas / total) * 100).toFixed(1) : 0;
console.log(`Total: ${total} | Completadas: ${completadas} | Pendientes: ${pendientes} | Progreso: ${porcentaje}%`);
};

console.log(obtenerEstadisticas)