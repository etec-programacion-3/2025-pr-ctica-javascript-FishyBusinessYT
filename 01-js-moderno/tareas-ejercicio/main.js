// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask, editTask, toggleTaskCompleted } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Renderiza la lista de tareas en el DOM
function renderTasks(filter = "all") {
  list.innerHTML = '';

  getTasks().forEach((task, idx) => {
    // Saltear tareas segun el filtro
    if (
      (filter === 'completed' && !task.completed) ||
      (filter === 'pending' && task.completed)
    ) {
      return;
    }

    const li = document.createElement('li');
    li.textContent = task.name;

    // Checkbox para marcar como completada
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      toggleTaskCompleted(idx);
      renderTasks(filter);
    };
    li.appendChild(checkbox);


    //Botón para editar la tarea
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => {
      const newTaskName = prompt('Nuevo nombre:', task.name);
      if (newTaskName) {
        editTask(idx, newTaskName)
        renderTasks(filter);
      }
    };
    li.appendChild(editBtn);

    // Botón para eliminar la tarea
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.onclick = () => {
      removeTask(idx);
      renderTasks(filter);
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
  renderTasks("all");
};

// Filtrar tareas
document.getElementById('show-all').onclick = () => renderTasks('all');
document.getElementById('show-completed').onclick = () => renderTasks('completed');
document.getElementById('show-pending').onclick = () => renderTasks('pending');


// Render inicial de las tareas
renderTasks("all"); 

