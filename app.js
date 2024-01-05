//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function(taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'todo__item';

  label.innerText = taskString;
  label.className = 'todo__label';

  checkBox.className = 'todo__checkbox';
  checkBox.type = 'checkbox';

  editInput.className = 'todo__input';
  editInput.type = 'text';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'todo__btn todo__btn-edit';

  deleteButton.className = 'todo__btn todo__btn-delete';
  deleteButtonImg.className = 'todo__btn-delete-icon';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Task deletion icon';

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

const addTask = function() {
  console.log('Add Task...');
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

const editTask = function() {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type="text"]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.todo__btn-edit');
  const isEditMode = listItem.classList.contains('todo__item--edit-mode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('todo__item--edit-mode');
}

const deleteTask = function() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

const taskCompleted = function() {
  console.log('Complete Task...');

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  console.log('Incomplete Task...');

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function() {
  console.log('AJAX Request');
}

addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');

  const checkBox = taskListItem.querySelector('input[type="checkbox"]');
  const editButton = taskListItem.querySelector('.todo__btn-edit');
  const deleteButton = taskListItem.querySelector('.todo__btn-delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', checkBoxEventHandler);
}

for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.