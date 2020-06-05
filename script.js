"use strict";

const classNames = {
    TODO_LIST: "todo-list",
    TODO_ITEM: "todo-container",
    TODO_CHECKBOX: "todo-checkbox",
    TODO_TEXT: "todo-text",
    TODO_NEW: "todo-new",
    TODO_SAVE: "todo-save",
    TODO_DELETE: "todo-delete",
    NEW_TODO_BUTTON: "new-todo-button"
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const newTodoButton = document.getElementById(classNames.NEW_TODO_BUTTON);
let newToDoContainer;
let newTextElem;

function showNewToDoElement() {
    if (newToDoContainer === undefined) {
        newToDoContainer = document.getElementById(classNames.TODO_NEW);
        // Creates <input> text with todo title.
        newTextElem = document.createElement("input");
        newTextElem.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                saveToDoItem();
            }
        });
        newTextElem.class = classNames.TODO_TEXT;
        newTextElem.type = "text";
        // Appends <input> into <DIV> wrapper
        newToDoContainer.appendChild(newTextElem);
        // Creates buttons to save/delete
        const buttons = createSaveDeleteButtons();
        // Append buttons to <DIV> wrapper
        newToDoContainer.appendChild(buttons);
        newTextElem.focus();
    } else if (newToDoContainer.classList.contains("hidden") === true) {
        newToDoContainer.classList.remove("hidden");
        newTextElem.focus();
    } else {
        alert("Can't create a new item while editing an existing one. Plase, delete or save the one in progress.");
    }

}

// I don't need to send textElem as parameter everywhere
// I could just use the newTextElem prop
function createSaveDeleteButtons() {
    const buttonsContainer = document.createElement("span");
    const saveButton = document.createElement("button");
    saveButton.classList.add(classNames.TODO_SAVE);
    saveButton.onclick = saveToDoItem.bind(this);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add(classNames.TODO_DELETE);
    deleteButton.onclick = closeNewToDoItem.bind(this);
    // Appending buttons to SPAN container
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(deleteButton);
    return buttonsContainer;
}

function saveToDoItem() {
    if (newTextElem.value !== "") {
        createToDoElement(newTextElem.value.trim());
    } else {
        alert("Can't save an empty TO-DO list item");
    }
}

function closeNewToDoItem() {
    newToDoContainer.classList.add("hidden");
    newTextElem.value = "";
    newTodoButton.focus();
}

function createToDoElement (value) {
    let id = "checkbox-" + value.replace(/\s+/g, "-").toLowerCase();
    if (document.getElementById(id) !== null) {
        alert("This new TO-DO list already exists.");
        return;
    }
    closeNewToDoItem();

    let todoList = document.getElementById(classNames.TODO_LIST);
    // Creates <LI> container element
    let todoContainer = document.createElement("li");
    todoContainer.class = classNames.TODO_ITEM;
    // Creates a <DIV> wrapper for the new to-do item
    let newItemWrapper = document.createElement("div");
    // Creates <INPUT> checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "todoItem";
    checkbox.id = id;
    checkbox.onclick = updateValues.bind(this);
    // Creates <LABEL> for the checkbox
    let label = document.createElement('label')
    label.htmlFor = id;
    label.appendChild(document.createTextNode(value));
    // Creates <BUTTON> to delete item;
    let deleteButton = document.createElement("button");
    // deleteButton.id = "delete-" + id;
    deleteButton.classList.add(classNames.TODO_DELETE);
    deleteButton.onclick = deleteItem.bind(this, id);
    // Appends checkbox, label and delete button to wrapper
    newItemWrapper.appendChild(checkbox);
    newItemWrapper.appendChild(label);
    newItemWrapper.appendChild(deleteButton);
    // Appends <DIV> wrapper in <LI> container
    todoContainer.appendChild(newItemWrapper);
    // Appends new <LI> item to <UL>
    todoList.appendChild(todoContainer);
    updateValues();
}

function deleteItem(id) {
    // alert with are you sure you want to delete item
    let checkbox = document.getElementById(id);
    // search for the LI element
    let li = checkbox.parentElement.parentElement;
    li.parentElement.removeChild(li);
    updateValues();
}

function updateValues() {
    let itemCountElem = document.getElementById("item-count");
    let allToDoItems = document.querySelectorAll("#todo-list > li");
    itemCountElem.innerHTML = allToDoItems.length;

    let uncheckedCountElem = document.getElementById("unchecked-count");
    let checkedItems = document.querySelectorAll("#todo-list > li input:checked");
    uncheckedCountElem.innerHTML = allToDoItems.length - checkedItems.length;
}

/* TODO

1) Styles like Post-it?
2) Make objects?
3) Save values in the tab localstorage

*/
