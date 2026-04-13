let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.onclick = () => toggleTask(index);

        const delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    tasks.push({ text: input.value, completed: false });
    input.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

renderTasks();