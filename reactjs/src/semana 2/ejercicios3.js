const productos = [
{ nombre: "Laptop", precio: 1200000,
stock: 5 },
{ nombre: "Mouse", precio: 35000,
stock: 0 },
{ nombre: "Teclado", precio: 85000,
stock: 12 }
];


// Implementa estas funciones:
// 1. obtenerDisponibles(productos)
// 3 Productos con stock > 0
const obtenerDisponibles = productos.filter(producto => producto.stock > 0);
console.log(obtenerDisponibles)
// 2. calcularInventario(productos)
// 3 Valor total del inventario

// 2. calcularInventario(productos) - Calcula el valor total del inventario (precio * stock)
function calcularInventario(productos) {
  return productos.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
}
console.log(calcularInventario(productos))
// 3. aplicarDescuento(productos,
//  porcentaje)
//  Reduce precios X%

function aplicarDescuento(productos) {
    const porcentaje = 10; // Porcentaje de descuento
    return productos.map(producto => {
        return {
            ...producto,
            precio: producto.precio - (producto.precio * porcentaje / 100)
        };
    })}

console.log(aplicarDescuento(productos))


// 4. ordenarPorPrecio(productos)
// 3 Array ordenado menor a mayor

function ordenarPorPrecio(productos) {
  return [...productos].sort((a, b) => a.precio - b.precio);
}

console.log(ordenarPorPrecio(productos))