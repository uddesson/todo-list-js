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
const clearAllButton = document
    .getElementById('clearAllButton');


addButton.addEventListener('click', addToList); //The main-function runs when button is clicked

clearAllButton.addEventListener('click', clearAll); 



// ------- Functions


//Removes todo completely
function removeTodo(){  
    this.parentElement.remove(); //Remove your parent (the listItem) - and therefore yourself!!     
}

//Checks status of todo
function setStatus(){
    
    //If checkbox is checked:
    if(this.checked == true){ 
        //Add styling class to listitem
        this.parentElement.classList.add('complete-todo');
        //Add the listItem (li) to completeList (ul)
        completeList.appendChild(this.parentElement);
    }
    
    //If checkbox is unchecked:
    if(this.checked == false){
        //Remove styling class to listitem
        this.parentElement.classList.remove('complete-todo');
        //Add the listItem (li) to incompleteList (ul)
        incompleteList.appendChild(this.parentElement);
    }
}
   
//Clears both lists, removing all todos
function clearAll(){
    
    //Put all tasks (the children of the list) in the same variable
    var incompleteTodos = incompleteList.children; 
    var completeTodos = completeList.children; 

    //First check if there actually is something to delete
    if((incompleteTodos.length > 0) || (completeTodos.length > 0)){
        
        //Ask user if they are sure
        var iamSure = confirm("Are you sure? This will delete everything. And I mean everything.");

        if(iamSure == true){
            //Remove the variables created in this function (all todos everywhereee)
            incompleteList.remove(incompleteTodos); 
            completeList.remove(completeTodos);
        }
        else {
            return; //Do nothing, keep your todos!
        }
    }
    
    else {
        return; //Don't ask the user anything
    }
}

//Checks for identical todos in the incomplete-list
function checkforDuplicate(todo){
    var incompleteTodos = incompleteList.children; 
    var duplicateExists = false; //Set as default

    //Don't run the rest of the function unless there aren't any tasks
    if((incompleteTodos.length > 0)){


        console.log(todo); //The todo only
        console.log(incompleteList.firstElementChild) //<li>..</li>
        console.log(incompleteTodos) //HTML Collection[]

        
        // //Loop through the list of existing tasks here..somehow
       
        // if(){
        //     duplicateExists = true;

        // } else{ 
        //     duplicateExists = false;
        // }
    }
  
    return;

}


//Stops user from entering an empty task
function checkifEmpty(input){
    if (input.trim() == ''){
        console.log('Oppps that is not a string') //Temporary output for testing
        return true;
    } else {
        return false;
    }
}


//Main-Function: Adds new todo and actions in a new list item
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
    //Binds each checkbox to setStatus-function, triggered when changed
    checkbox.addEventListener('change', setStatus); 


    //Creates a remove-button for each todo
    const removeButton = document
        .createElement('input'); 
    removeButton.type = "submit";
    removeButton.value = "Delete";
    removeButton.id = "removeButton";
    //Binds each removeButton to remove-function, triggered when clicked
    removeButton.addEventListener('click', removeTodo); 


    //Putting our todo and actions to the list-element in DOM
    listItem.innerHTML = todoInput.value; //The user's input
    listItem.appendChild(checkbox); 
    listItem.appendChild(removeButton); 
    
    //Checks if the user has tried to enter an empty string
    if(checkifEmpty(todoInput.value) == true){

        //I should have some output for the user here

        return; //Exits the entire function and todo will not be added
    } 

    //Checks if the user is entering a todo that already exists
    if(checkforDuplicate(listItem) == true){

        //I should have some output for the user here
        console.log('Duplicate found!'); //Temp
    }

    //Add the listitem (li) to the list (ul)
    incompleteList.appendChild(listItem);

    
}

