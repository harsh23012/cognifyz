let tasks = [];
let taskId = 1;

document.addEventListener("DOMContentLoaded", function() {
    fetchTasks();
    document.getElementById("create-task-btn").addEventListener("click", createTask);
    document.getElementById("task-list").addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            let taskId = event.target.getAttribute("data-task-id");
            updateTask(taskId);
        }
    });
    document.getElementById("update-task-btn").addEventListener("click", updateTaskSubmit);
});

function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            tasks = data;
            taskId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
            displayTasks();
        })
        .catch(error => console.error('Error loading tasks:', error));
}

function createTask(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let isCompleted = document.getElementById("isCompleted").checked;

    let task = {
        id: taskId,
        name: name,
        description: description,
        isCompleted: isCompleted
    };

    tasks.push(task);
    taskId++;

    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("isCompleted").checked = false;

    saveTasks();
}

function displayTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        let taskHtml = `
            <li>
                <span>${task.name}</span>
                <span>${task.description}</span>
                <span class="${task.isCompleted ? 'completed' : 'not-completed'}">${task.isCompleted ? "Completed" : "Not Completed"}</span>
                <button data-task-id="${task.id}">Update</button>
                <button data-task-id="${task.id}" class="delete-btn">Delete</button>
            </li>
        `;

        taskList.innerHTML += taskHtml;
    });

    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            let taskId = event.target.getAttribute("data-task-id");
            deleteTask(taskId);
        });
    });
}

function updateTask(taskId) {
    let task = tasks.find(function(task) {
        return task.id == taskId;
    });

    document.getElementById("update-name").value = task.name;
    document.getElementById("update-description").value = task.description;
    document.getElementById("update-isCompleted").checked = task.isCompleted;

    document.querySelector(".task-update-form").style.display = "block";
    document.getElementById("update-task-btn").setAttribute("data-task-id", taskId);
}

function updateTaskSubmit(event) {
    event.preventDefault();
    let taskId = event.target.getAttribute("data-task-id");
    let task = tasks.find(function(task) {
        return task.id == taskId;
    });

    task.name = document.getElementById("update-name").value;
    task.description = document.getElementById("update-description").value;
    task.isCompleted = document.getElementById("update-isCompleted").checked;

    document.querySelector(".task-update-form").style.display = "none";

    saveTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(function(task) {
        return task.id != taskId;
    });

    saveTasks();
}

function saveTasks() {
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tasks)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Tasks saved:', data);
        displayTasks();
    })
    .catch(error => console.error('Error saving tasks:', error));
}
