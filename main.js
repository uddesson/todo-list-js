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


addButton.addEventListener('click', addToList); //The function runs when button is clicked


function remove(){    
    this.parentElement.remove(); //Remove your parent button - and yourself!!     
}

function setComplete(){
    completeList.appendChild(this.parentElement);
}


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




/* 
clearTasks()
Clears (removes) all your tasks - from both lists
when you click the clear button
*/