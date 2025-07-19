const textInput = document.getElementById("textInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");
const toggleMode = document.getElementById("toggleMode");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";  

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

addTaskBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (text === "") return alert("Please enter task!");

    tasks.push({text, completed: false});
    textInput.value = "";
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "incomplete") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleComplete(${index})">✅</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    })
})

toggleMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

renderTasks();