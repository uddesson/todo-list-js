//Fetches our two ul-elements from the DOM, used for output
const inCompleteTasks = document.getElementById('incomplete'); //Should contain list of incomplete tasks
const completedTasks = document.getElementById('complete'); //Should contain list of complete tasks


//Fetches the main input field
const task = document.getElementById('task'); 
//Assigns the value (the actual task) to const newTask
const newTask = task.value;

//Fetching our add-button from the document
const addButton = document.getElementById('addButton');

//Creates new input element, to be used as removeButton
const removeButton = document.createElement('input'); 
removeButton.type = "submit";
removeButton.value = "Delete";
removeButton.id = "removeButton";
//--- Function drafts

/*
addTask() 
Adds the input value (string) as a list-element in ul of incomplete tasks
.. when you click the addButton
Also needs a checkbox and a remove-button added to the specific task ..? 
*/

/* 
removeTask()
Removes the listed task itself (this) completely
wether it's in the incomplete or complete-list
Triggered by a remove-button of some kind
*/

/* markTaskComplete()
Moves a task from the incomplete task list to the top of completed task-list
This is triggered when the checkbox for that sepcific task is checked
Sets a specific css class to the completed task as well, clearly marking it as completed/done
*/

/* 
clearTasks()
Clears (removes) all your tasks - from both lists
when you click the clear button
*/