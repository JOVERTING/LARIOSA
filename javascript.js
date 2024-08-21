document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteTaskButton">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';

        const deleteButton = li.querySelector('.deleteTaskButton');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });
});