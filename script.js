let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const list = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");

document.getElementById("toggleMode").onclick = () => {
    document.body.classList.toggle("light");
};

function renderTasks() {
    list.innerHTML = "";

    if (tasks.length === 0) {
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";
    }

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task.text;
        li.classList.add(task.priority);

        if (task.completed) li.classList.add("completed");

        li.onclick = () => toggleTask(index);

        const del = document.createElement("button");
        del.innerText = "X";
        del.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(del);
        list.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;

    if (input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        completed: false,
        priority: priority
    });

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