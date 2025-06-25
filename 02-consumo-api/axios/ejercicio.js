// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API usando axios (GET resuelto)
async function fetchProducts() {
  try {
    const res = await axios.get(BASE_URL);
    const products = res.data;
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
  } catch (err) {
    alert('Error al obtener productos');
  }
}

// Crear un producto usando axios POST
async function createProduct(name, price, description) {
  try {
    await axios.post(BASE_URL, { name, price, description });
    fetchProducts();
  } catch (err) {
    alert('Error al crear producto');
  }
}

// Eliminar un producto usando axios DELETE
async function deleteProduct(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    alert('Error al eliminar producto');
  }
}

// Mostrar detalles usando axios GET /products/:id
async function showDetails(id) {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const prod = res.data;
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

  // Crea el producto con los datos del formulario
  await createProduct(name, price, description);
  // Actualzar la lista de productos
  fetchProducts();
  // Resetear el formulario
  form.reset();
};

// Render inicial
fetchProducts();