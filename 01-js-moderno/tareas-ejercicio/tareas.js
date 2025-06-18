// Módulo de tareas usando ES6+
// Provee funciones para obtener, agregar y eliminar tareas usando localStorage

const STORAGE_KEY = 'tasks'; // Clave para localStorage

// Devuelve la lista de tareas almacenadas
export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Agrega una tarea nueva y la guarda en localStorage
export function addTask(taskName) {
  const tasks = getTasks();
  const task = {name: taskName, completed: false}
  tasks.push(task);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Edita una tarea y la guarda en localStorage
export function editTask(index, newTaskName) {
  const tasks = getTasks();
  tasks[index].name = newTaskName;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Elimina una tarea por índice y actualiza localStorage
export function removeTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
} 

// Marca una tarea como completada o no completada
export function toggleTaskCompleted(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
