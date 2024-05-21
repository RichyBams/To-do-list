const form = document.querySelector('#todo-form');
const input = form.querySelector('input');
const ul = document.querySelector('#todo-list');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load tasks from local storage
function loadTasks() {
  tasks.forEach(function(task) {
    const li = createTaskElement(task);
    ul.appendChild(li);
  });
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create task element
function createTaskElement(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');

  span.textContent = task;
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit');

  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  return li;
}

// Add new task
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = input.value.trim();

  if (task) {
    const li = createTaskElement(task);
    ul.appendChild(li);
    tasks.push(task);
    saveTasks();
    input.value = '';
  }
});

// Delete task
ul.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    const li = e.target.closest('li');
    const task = li.querySelector('span').textContent;
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    saveTasks();
    li.remove();
  }
});

// Edit task
ul.addEventListener('click', function(e) {
  if (e.target.classList.contains('edit')) {
    const li = e.target.closest('li');
    const span = li.querySelector('span');
    const task = span.textContent;
    const index = tasks.indexOf(task);
    const newTask = prompt('Enter new task', task);
    
    if (newTask !== null && newTask !== '') {
      tasks[index] = newTask;
      span.textContent = newTask;
      saveTasks();
    }
  }
});

// Save edited task when enter key is pressed
ul.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.tagName === 'SPAN') {
    const li = e.target.closest('li');
    const task = e.target.textContent;
    const index = tasks.indexOf(task);
    const newTask = e.target.textContent.trim();
    
    if (newTask !== '') {
      tasks[index] = newTask;
      saveTasks();
    } else {
      // Restore original task text if new task is empty
      e.target.textContent = task;
    }
    
    // Remove focus from edited task
    e.target.blur();
  }
});

// Load tasks when page is loaded
loadTasks();
