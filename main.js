//Fetches our two ul-elements from the document, to be used for output
const incompleteList = document
    .getElementById('incomplete'); //Will contain list of incomplete tasks
const completeList = document
    .getElementById('complete'); //Will contain list of complete tasks


//Fetches the main input field and button from the document
const todoInput = document
    .getElementById('todo'); 

const button = document
    .getElementById('button');
const clearAllButton = document
    .getElementById('clearAllButton');


button.addEventListener('click', handleInput)

clearAllButton.addEventListener('click', clearAll); 

window.onload = refreshList;

// ------- Functions

/* When the user presses the add button
the input is evaluated and handled by this function */ 
function handleInput(event){

    //Stop form from resending on sumbit
    event.preventDefault(); 
    
    //Checks if the user has tried to enter an empty string
    if(checkifEmpty(todoInput.value) == true){

        // (I should have some output for the user here)

        return; //Exits the entire function and todo will not be added
    } 

    // checkforDuplicate(todoInput.value); (Not working yet)
    

    /* existing todos is set to be the return from getTodos,
    which is where I fetch the locally stored array of todos */
    var existingTodos = getTodos();
    
    //Add new todo to the array
    existingTodos.push({text: todoInput.value, done: false, id: existingTodos.length});

    setTodos(existingTodos); //LocalStore array with new value 

    //If the input (todo) has passed the checks - the todo is added
    refreshList();

    console.log('existing todos : ' , existingTodos) //Testing

    
}


function refreshList(){
    var list = getTodos();

    // need to empty list here, now refresh adds the list again

    for (var i = 0; i < list.length; i++){
        addToList(list[i]);
    }
}

function setTodos(todoList){
    
    //Save the input (the array) as strings in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getTodos(){ 
    
    //Fetch array from local storage
    var fetchedArray = localStorage.getItem("todoList");

    if (fetchedArray == null){
        /* return empty array if there aren't any existing arrays, 
        otherwise array method push will give warning message */
        return [];

    } else {
        //Use parse to turn it back from string to regular array - and return it
        return JSON.parse(fetchedArray); 
    }

}

//Removes todo completely
function removeTodo(){  
    this.parentElement.remove(); //Remove your parent (the listElement) - and therefore yourself!!     
}

//Checks status of todo
function setStatus(){
    
    //If checkbox is checked:
    if(this.checked == true){ 
        //Add styling class to listElement
        this.parentElement.classList.add('complete-todo');
        //Add the listElement (li) to completeList (ul)
        completeList.appendChild(this.parentElement);
    }
    
    //If checkbox is unchecked:
    if(this.checked == false){
        //Remove styling class to listElement
        this.parentElement.classList.remove('complete-todo');
        //Add the listElement (li) to incompleteList (ul)
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

            //Clear localStorage
            localStorage.clear();

            //Remove all todos everywhereee
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

//Adds an id to every listElement
function addID(){
    if (incompleteList.children.length == 0){ //If there aren't any todos yet

    /* Some sort of temporary solution for avoiding 
    the first id to be "undefined" or double 0*/
        var todoID = -1; 

    } else {
        
        //Set a new id for every todo, based on list-count
        for (var i = 0; i < incompleteList.children.length; i++){ 
            var todoID = i;
        }
    }
    
    return todoID;
}


//Adds the users input to a list-element
function addToList(todo){

    //Creates the li-element that will contain each todo + actions
    var listElement = document.
       createElement('li');

    //Creates a checkbox for each todo
    const checkbox = document.
        createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.checked = todo.done;
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
    listElement.innerHTML = '<p>' + todo.text + '</p>'; //The user's input
    listElement.id = todo.id;
    listElement.appendChild(checkbox); 
    listElement.appendChild(removeButton); 
    
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


    //Add the listElement (li) to the list (ul)
    incompleteList.appendChild(listElement);

    
}

