// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API (GET resuelto)
async function fetchProducts() {
  const res = await fetch(BASE_URL);
  const products = await res.json();
  list.innerHTML = '';
  products.forEach(prod => {
    const li = document.createElement('li');
    li.textContent = `${prod.name} - $${prod.price}`;
    // Llama a showDetails al hacer clic en el nombre del producto
    li.onclick = () => showDetails(prod.id);
    // Botón para eliminar (completar en el ejercicio)
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = async e => {
      e.stopPropagation();
      await deleteProduct(prod.id);
      fetchProducts();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function createProduct(name, price, description) {
  try {
    // Envía una solicitud POST con los datos para crear un nuevo producto
    await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, description })
    });
    // Actualiza la lista de productos después de crear uno nuevo
    fetchProducts();
  } catch (err) {
    alert('Error al crear producto');
  }
}

async function deleteProduct(id) {
  try {
    // Envía una solicitud DELETE para eliminar el producto con este ID
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    // Actualiza la lista de productos
    fetchProducts();
  } catch (err) {
    alert('Error al eliminar producto');
  }
}

async function showDetails(id) {
  try {
    // Conseguir los detalles del producto con este ID
    const res = await fetch(`${BASE_URL}/${id}`);
    const prod = await res.json();
    // Mostrar los detalles en un alert
    alert(`Nombre: ${prod.name}\nPrecio: $${prod.price}\nDescripción: ${prod.description}`);
  } catch (err) {
    alert('Error al obtener detalles');
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  try {
    // Añadir el producto usando los datos del formulario
    await createProduct(name, price, description);
    // Actualizar la lista de productos
    fetchProducts();
  } catch (err) {
    alert('Error al procesar el formulario');
  }
  // Resetear el formulario
  form.reset();
};

// Render inicial
fetchProducts();