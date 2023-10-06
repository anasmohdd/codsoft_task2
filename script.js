
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}

// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a task to the list
function addTaskToList(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <span class="edit">Edit</span>
        <span class="delete">Delete</span>
    `;
    taskList.appendChild(li);

    // Attach event listeners for delete and edit
    li.querySelector('.delete').addEventListener('click', () => {
        li.remove();
        updateTaskList();
    });

    li.querySelector('.edit').addEventListener('click', () => {
        const newText = prompt('Edit task:', taskText);
        if (newText !== null) {
            taskText = newText;
            li.querySelector('span').textContent = taskText;
            updateTaskList();
        }
    });
}

// Update the task list and save to local storage
function updateTaskList() {
    const taskElements = taskList.querySelectorAll('li');
    const tasks = Array.from(taskElements).map(taskElement => taskElement.querySelector('span').textContent);
    saveTasks(tasks);
}

// Event listener for adding a new task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTaskToList(taskText);
        taskInput.value = '';
        updateTaskList();
    }
});

// Load tasks on page load
loadTasks();