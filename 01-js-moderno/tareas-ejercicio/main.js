// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask, editTask } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Renderiza la lista de tareas en el DOM
function renderTasks() {
  list.innerHTML = '';
  getTasks().forEach((task, idx) => {
    const li = document.createElement('li');
    li.textContent = task;
    // TODO: Agrega aquí la lógica para filtrar tareas completadas/pendientes

    //Botón para editar la tarea
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const newTask = prompt('Nuevo nombre:', task);
      if (newTask) {
        editTask(idx, newTask)
        renderTasks();
      }
    };
    li.appendChild(editBtn);

    // Botón para eliminar la tarea
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
      removeTask(idx);
      renderTasks();
    };
    li.appendChild(deleteBtn);

    
    list.appendChild(li);
  });
}

// Maneja el evento submit del formulario para agregar una tarea
form.onsubmit = e => {
  e.preventDefault();
  addTask(input.value);
  input.value = '';
  renderTasks();
};

// Render inicial de las tareas
renderTasks(); 