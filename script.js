document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const removeButton = document.getElementById('removeButton');
    const editForm = document.getElementById('editForm');
    const updateForm = document.getElementById('updateForm');
    const editInput = document.getElementById('editInput');
    const cancelEdit = document.getElementById('cancelEdit');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let editingIndex = -1;

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                <input type="checkbox" ${todo.done ? 'checked' : ''}>
                <span>${todo.todoText}</span>
                <button data-index="${index}" class="btn btn-secondary">Edit</button>
            `;
            todoList.appendChild(todoItem);
        });

        // Add event listeners for the edit buttons
        todoList.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editInput.value = todos[index].todoText;
                editingIndex = index;
                editForm.classList.remove('hidden');
            });
        });

        // Add event listeners for checkboxes
        todoList.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
            checkbox.addEventListener('change', function() {
                todos[index].done = this.checked;
                saveTodos();
            });
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (todoInput.value.trim()) {
            todos.push({ todoText: todoInput.value, done: false });
            todoInput.value = '';
            saveTodos();
        }
    });

    removeButton.addEventListener('click', function() {
        todos = todos.filter(todo => !todo.done);
        saveTodos();
    });

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (editInput.value.trim() && editingIndex > -1) {
            todos[editingIndex].todoText = editInput.value;
            editingIndex = -1;
            editForm.classList.add('hidden');
            saveTodos();
        }
    });

    cancelEdit.addEventListener('click', function() {
        editingIndex = -1;
        editForm.classList.add('hidden');
    });

    renderTodos();
});
