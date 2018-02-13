//Fetches our two ul-elements from the document, to be used for output
const incompleteList = document
    .getElementById('incomplete'); //Will contain list of incomplete tasks
const completeList = document
    .getElementById('complete'); //Will contain list of complete tasks


//Fetches the main input field and button from the document
const todoInput = document
    .getElementById('todo'); 
const addButton = document
    .getElementById('addButton');

//Fetching our add-button from the document
const addButton = document.getElementById('addButton');

//Creates new input element, to be used as removeButton
const removeButton = document.createElement('input'); 
removeButton.type = "submit";
removeButton.value = "Delete";
removeButton.id = "removeButton";
addButton.addEventListener('click', addTodo); //The function addTodo runs when button is clicked
//--- Function drafts

/*
addTodo() 
Adds the input value (string) as a list-element in ul of incomplete tasks
.. when you click the addButton
Also needs a checkbox and a remove-button added to the specific task ..? 
*/
//Function creates new todo and it's actions in a new list item
function addToList(event){

    //Stop form from resending on sumbit
    event.preventDefault(); 

    //Creates the li-element that will contain each todo + actions
    var listItem = document
        .createElement('li');

    //Creates a checkbox for each todo
    const checkbox = document
        .createElement('input');

    checkbox.type = "checkbox";
    checkbox.id = "checkbox";

    //Creates a remove-button for each todo
    const removeButton = document
        .createElement('input'); 

    removeButton.type = "submit";
    removeButton.value = "Delete";
    removeButton.id = "removeButton";
  
    //Append our todo and actions to the list-element
    listItem.innerHTML = todoInput.value; //The user's input
    listItem.appendChild(checkbox); 
    listItem.appendChild(removeButton); 

    //Add the listitem (li) to the list (ul)
    incompleteList.appendChild(listItem);
    
}


}
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