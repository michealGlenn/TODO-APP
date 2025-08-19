// const todoForm = document.querySelector('form');
// const todoInput = document.getElementById('todo-input');
// const todoListUl = document.getElementById('todo-list');

// let allTodos = [];
 
// todoForm.addEventListener('submit', function (e) {
//     e.preventDefault();
//     addTodo();
// })
 
// function addTodo() {
//     const todoText = todoInput.value.trim();
//     if (todoText.length > 0) {
//         allTodos.unshift(todoText);
//         updateTodoList(todoText)
//         todoInput.value = "";
//     }
//     console.log(allTodos)
  
// }
 
// function updateTodoList() {
//     todoListUl.innerHTML = '';
//     allTodos.forEach( (todo, todoIndex)=>{
//         todoItem = createTodoItem(todo, todoIndex)
//         todoListUl.append(todoItem);
//         })
// }

// function createTodoItem(todo, todoIndex) {
//     const todoLI = document.createElement('li');
//     todoLI.style.color = 'white'
//     const todoId = 'todo' + todoIndex;
//     todoLI.className = 'todo';
//     todoLI.innerHTML = `
//      <input type="checkbox" id="${todoId}">
//                 <label for="${todoId}" class="custom-checkbox">
//                   <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
//                 </label>

//                 <label for="${todoId}" class="todo-text">
//                     ${todo}
//                 </label>
//                 <button class="delete-button">
//                     <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EA3323"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
//                 </button>

//                 <button class='edit-button'>
//                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
//                 </button>
//     `
//     const deleteButtton = todoLI.querySelector('.delete-button');
//     deleteButtton.addEventListener("click", () => {
//         deleteTodoItem(todoIndex)
//     })

//     const checkbox = todoLI.querySelector("input");
//     checkbox.addEventListener('change', () => {
//         allTodos[todoIndex].completed = checkbox.checked;
//         // saveTodos();
//     })
//     checkbox.checked = todo.completed;
//     // todoListUl.append(todoLI)
//     return todoLI;
// }
// function deleteTodoItem(todoIndex) {
//     allTodos = allTodos.filter((_, i) => i !== todoIndex);
//     // saveTodos();
//     updateTodoList()
// }
  

        







const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');

let allTodos = [];
let editingIndex = -1; // Track which todo is being edited

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (editingIndex === -1) {
        addTodo();
    } else {
        saveEditedTodo();
    }
})

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        allTodos.unshift({ text: todoText, completed: false });
        updateTodoList();
        todoInput.value = "";
    }
}

function saveEditedTodo() {
    const editedText = todoInput.value.trim();
    if (editedText.length > 0) {
        allTodos[editingIndex].text = editedText;
        editingIndex = -1;
        updateTodoList();
        todoInput.value = "";
        todoForm.querySelector('button').textContent = 'Add'; // Reset button text
    }
}

function updateTodoList() {
    todoListUl.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex)
        todoListUl.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex) {
    const todoLI = document.createElement('li');
    todoLI.style.color = 'white';
    const todoId = 'todo' + todoIndex;
    todoLI.className = 'todo';
    
    todoLI.innerHTML = `   
        <input type="checkbox" id="${todoId}" ${todo.completed ? 'checked' : ''}>
        <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
        </label>

        <label for="${todoId}" class="todo-text">
            ${todo.text}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EA3323">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
            </svg>
        </button>

        <button class='edit-button'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
        </button>
    `;

    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const editButton = todoLI.querySelector('.edit-button');
    editButton.addEventListener("click", () => {
        startEditing(todoIndex);
    });

    const checkbox = todoLI.querySelector("input[type=checkbox]");
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        // Uncomment when you implement saveTodos
        // saveTodos();
    });
    
    return todoLI;
}

function startEditing(index) {
    editingIndex = index;
    todoInput.value = allTodos[index].text;
    todoInput.focus();
    todoForm.querySelector('button').textContent = 'Save'; // Change button to Save
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    if (editingIndex === todoIndex) {
        editingIndex = -1;
        todoInput.value = "";
        todoForm.querySelector('button').textContent = 'Add';
    }
    // Uncomment when you implement saveTodos
    // saveTodos();
    updateTodoList();
}