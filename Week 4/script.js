const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

function addTask(text) {
  const li = document.createElement('li');

  li.innerHTML = `
    <span class="task-text">${text}</span>
    <div class="actions">
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  taskList.appendChild(li);
}

taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li');
    li.remove();
  }

  if (e.target.classList.contains('complete-btn')) {
    const li = e.target.closest('li');
    li.classList.toggle('completed');
  }
});
