// Vista: Se encarga de la presentación y la interacción con el usuario
export class TaskView {
  constructor() {
    // Referencias a los elementos del DOM
    this.list = document.getElementById('task-list');
    this.form = document.getElementById('task-form');
    this.input = document.getElementById('task-input');
  }

  // Renderiza la lista de tareas en el DOM
  render(tasks) {
    this.list.innerHTML = '';
    tasks.forEach((task, idx) => {
      const li = document.createElement('li');
      li.textContent = task;
      // TODO: Agrega aquí el botón y la lógica para eliminar la tarea
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.className = 'remove';
      btnEliminar.dataset.idx = idx;
      li.appendChild(btnEliminar);
      
      // TODO: Agrega aquí el botón y la lógica para editar la tarea
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'edit';
      btnEditar.dataset.idx = idx;
      li.appendChild(btnEditar);
      
      this.list.appendChild(li);
    });
  }

  // Asocia el evento de agregar tarea al formulario
  bindAddTask(handler) {
    this.form.onsubmit = e => {
      e.preventDefault();
      handler(this.input.value); // Llama al controlador con el valor ingresado
      this.input.value = '';
    };
  }

  // TODO: Asocia el evento de eliminar tarea a la lista
  bindRemoveTask(handler) {
    this.removeHandler = handler;
  }

  // TODO: Asocia el evento de editar tarea a la lista
  bindEditTask(handler) {
    this.editHandler = handler;
    
    // Configurar el evento click único para manejar ambas acciones
    this.list.onclick = e => {
      if (e.target.classList.contains('remove')) {
        this.removeHandler(Number(e.target.dataset.idx));
      } else if (e.target.classList.contains('edit')) {
        const idx = Number(e.target.dataset.idx);
        const currentTask = e.target.parentNode.firstChild.textContent;
        const newTask = prompt('Editar tarea:', currentTask);
        if (newTask && newTask !== currentTask) {
          this.editHandler(idx, newTask);
        }
      }
    };
  }
} 