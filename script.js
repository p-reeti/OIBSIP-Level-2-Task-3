document.getElementById('taskForm').addEventListener('submit', addTask);

let pendingTasks = [];
let completedTasks = [];

function addTask(e) {
    e.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;

    const task = {
        title: taskTitle,
        description: taskDescription,
        id: new Date().getTime(),
        completed: false,
    };

    pendingTasks.push(task);
    document.getElementById('taskForm').reset();

    updateTaskLists();
}

function updateTaskLists() {
    const pendingTaskList = document.getElementById('pendingTasks');
    const completedTaskList = document.getElementById('completedTasks');

    pendingTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    pendingTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${task.title}:</strong> ${task.description}</span>
            <div>
                <button class="complete" onclick="completeTask(${task.id})">Complete</button>
                <button class="delete" onclick="deleteTask(${task.id}, false)">Delete</button>
            </div>
        `;
        pendingTaskList.appendChild(li);
    });

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${task.title}:</strong> ${task.description}</span>
            <button class="delete" onclick="deleteTask(${task.id}, true)">Delete</button>
        `;
        completedTaskList.appendChild(li);
    });
}

function completeTask(taskId) {
    const task = pendingTasks.find(t => t.id === taskId);
    pendingTasks = pendingTasks.filter(t => t.id !== taskId);
    task.completed = true;
    completedTasks.push(task);

    updateTaskLists();
}

function deleteTask(taskId, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(t => t.id !== taskId);
    } else {
        pendingTasks = pendingTasks.filter(t => t.id !== taskId);
    }

    updateTaskLists();
}
