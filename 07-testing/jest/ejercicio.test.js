// Ejercicio: pruebas unitarias con Jest

function suma(a, b) {
  return a + b;
}

// EJERCICIO: Implementa la función totalCarrito que reciba un array de productos y devuelva el total
function totalCarrito(carrito) {
  return carrito.reduce((acc, prod) => acc + prod.precio, 0);
}

test('suma 2 + 2 es 4', () => {
  expect(suma(2, 2)).toBe(4);
});

test('suma -1 + 1 es 0', () => {
  expect(suma(-1, 1)).toBe(0);
});

// EJERCICIO: Agrega tests para totalCarrito
test('totalCarrito suma los precios de los productos', () => {
  expect(totalCarrito([{precio: 10}, {precio: 5}])).toBe(15);
});

test('totalCarrito de carrito vacío es 0', () => {
  expect(totalCarrito([])).toBe(0);
});

test('totalCarrito con un solo producto', () => {
  expect(totalCarrito([{precio: 25}])).toBe(25);
});

test('totalCarrito con múltiples productos', () => {
  expect(totalCarrito([
    {precio: 10}, 
    {precio: 20}, 
    {precio: 15}, 
    {precio: 5}
  ])).toBe(50);
}); 