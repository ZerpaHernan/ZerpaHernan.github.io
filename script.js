// Seleccionar elementos
const detalleBotones = document.querySelectorAll('.ver-detalles');
const descripcionContenedor = document.getElementById('descripcion-producto');
const descripcionTexto = document.getElementById('descripcion-texto');

// Agregar eventos a los botones de "Ver Detalles"
detalleBotones.forEach((boton) => {
  boton.addEventListener('click', () => {
    const producto = boton.parentElement;
    const descripcion = producto.getAttribute('data-descripcion');
    
    // Mostrar la descripción del producto
    descripcionTexto.textContent = descripcion;
    descripcionContenedor.style.display = 'block';
  });
});

// Opcional: Ocultar la descripción al hacer clic fuera del contenedor
document.addEventListener('click', (event) => {
  if (!descripcionContenedor.contains(event.target) && !event.target.classList.contains('ver-detalles')) {
    descripcionContenedor.style.display = 'none';
  }
});

// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Referencias del DOM
const carritoItems = document.getElementById('carrito-items');
const totalElement = document.getElementById('total');

// Actualizar carrito en pantalla
function actualizarCarrito() {
  carritoItems.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('carrito-item');
    div.innerHTML = `
      <h4>${item.nombre}</h4>
      <p>Precio: $${item.precio}</p>
      <p>Cantidad: 
        <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="cantidad">
      </p>
      <p>Subtotal: $${item.precio * item.cantidad}</p>
      <button class="eliminar" data-index="${index}">Eliminar</button>
    `;
    carritoItems.appendChild(div);

    total += item.precio * item.cantidad;
  });

  totalElement.textContent = `Total: $${total}`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
document.querySelectorAll('.card .agregar').forEach(button => {
  button.addEventListener('click', () => {
    const producto = button.parentElement;
    const id = producto.getAttribute('data-id');
    const nombre = producto.getAttribute('data-nombre');
    const precio = parseFloat(producto.getAttribute('data-precio'));

    const existente = carrito.find(item => item.id === id);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
  });
});

// Escuchar cambios de cantidad y eliminación
carritoItems.addEventListener('input', (e) => {
  if (e.target.classList.contains('cantidad')) {
    const index = e.target.getAttribute('data-index');
    carrito[index].cantidad = parseInt(e.target.value) || 1;
    actualizarCarrito();
  }
});

carritoItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('eliminar')) {
    const index = e.target.getAttribute('data-index');
    carrito.splice(index, 1);
    actualizarCarrito();
  }
});

// Inicializar carrito
actualizarCarrito();


// Selección del formulario
const form = document.getElementById('contactForm');

// Evento submit para validar campos
form.addEventListener('submit', function(event) {
    // Selección de campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Verificación de campos vacíos
    if (!name || !email || !message) {
        console.log("Por favor, completa todos los campos del formulario.");
        event.preventDefault(); // Evita que se envíe el formulario
    } else {
        console.log("Todos los campos están completos.");
    }
});
