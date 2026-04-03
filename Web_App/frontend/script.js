let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        // mark as completed
        if (task.completed) {
            li.classList.add("completed");
        }

        //toggle completed state
        li.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        // delete button
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") return;

    tasks.push({ text: task, completed: false });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

renderTasks();