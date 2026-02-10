const aprendices = [
{ id: 1, nombre: "Ana", ficha:
3223874, nota: 4.2 },
{ id: 2, nombre: "Luis", ficha:
3223874, nota: 3.5 },
{ id: 3, nombre: "María", ficha:
3223875, nota: 4.8 }
];


// Implementa estas funciones:
// 1. obtenerAprobados(aprendices)
// 3 Retorna array con nota >= 3.0
const aprobados = aprendices.filter(n => n.nota>= 3.0);
console.log(aprobados)
// console.log(aprendices)



// 2. calcularPromedio(aprendices)
// 3 Retorna promedio del grupo

// Calcular promedio
const suma = aprendices.reduce((acum, nota) => {
return acum + nota.nota},0);
console.log(suma)

const promedio = suma / aprendices.length
console.log(`el promedio de las notas son: ${promedio}`)
// 3. obtenerNombrese(aprendices,
// nombre) Retorna aprendiz que coincida

const nombreEs = "María"
function buscarporNombres(aprendices){ 
    return aprendices.find (aprendiz => aprendiz.nombre === nombreEs)
    
}
console.log(buscarporNombres(aprendices))

// 4. buscarPorNombr(aprendices)
// 3 Retorna array solo con
// nombres
function obtenerNombres(aprendices) {
  return aprendices.map(aprendiz => aprendiz.nombre);
}

console.log(obtenerNombres(aprendices));