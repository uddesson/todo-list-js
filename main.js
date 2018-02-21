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

//Calls refreshlist function onload, see more.. refreshList();
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

        return; //Exits the function and todo will not be added
    } 

    if(checkforDuplicate(todoInput.value) == true){

                // (I should have some output for the user here)
        console.log('Woops! Duplicate found!')

        return; //Exits the entire function and todo will not be added
    }
    

    /* existing todos is set to be the return from getTodos,
    which is where I fetch the locally stored array of todos */
    var existingTodos = getTodos();
    
    //Add new todo to the array
    existingTodos.push({text: todoInput.value, checked: false, id: existingTodos.length});

    // existingTodos.push(todoInput.value);
    

    setTodos(existingTodos); //LocalStore array with new value 

    //If the input (todo) has passed the checks - the todo is added
    refreshList();

    
}

/* Checks my locally stored todos against the ones that are in the HTML,
everytime it's called, it actually replaces the HTML with the todos in localStorage */
function refreshList(){
    
    //Assigns getTodos(Returns existing, locally stored todos) to new variable
    var existingTodos = getTodos();
    
    /* The ul of todos is emptied, so it will not have any todos lying around just as HTML-elements, 
    .. without having a counterpart locally stored */
    incompleteList.innerHTML = '';
    completeList.innerHTML = '';

    //Loops through the locally stored array
    for (var i = 0; i < existingTodos.length; i++){

        /*Sends our todo-objects along with it's values into to the addToList-function,
        Which will put them into HTML-elements and append them to the ul*/
        addToList(existingTodos[i].text, existingTodos[i].checked, existingTodos[i].id);
    }

    console.log(existingTodos);

}

function setTodos(todoList){
    
    //Save the input (the array) as strings in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getTodos(){ 
    
    //Fetch array from local storage
    var fetchedArray = localStorage.getItem("todoList");
    

    if (fetchedArray == null){
        
        // Return empty array if there aren't any existing arrays, 
        return [];

    } else {
        //Use parse to turn it back from string to regular array - and return it
        return JSON.parse(fetchedArray); 
    }
    
}


//Removes todo completely
function removeTodo(){  
   
     //Find the todo-id on wich we clicked the delete button
     var id = this.parentElement.id;

     //Again, fetching our existing todos from localstorage
     var existingTodos = getTodos(); 
 
     //For every existing todo - check if that id is the same as this.parentElement.id
     for (var i = 0; i < existingTodos.length; i++){
         if(existingTodos[i].id == id){
            
            //If the id is the clicked one, splice the object on that index 
            existingTodos.splice(i, 1)    

            //When our array of todos has been changed, store it again in localStorage 
            setTodos(existingTodos);

            refreshList(); //Refresh the locally stored todos and and them again to the html
         }
    }

}

//Changes status of todo when checkbox is marked
function setStatus(){
    
    //get the id from listitem <li>
    console.log(this.parentElement.id); //Testing

    //Find the todo-id
    var id = this.parentElement.id;

    var todo; 
    var existingTodos = getTodos(); //Again, fetching our existing todos from localstorage

    //For every existing todo - check if that id is the same as this.parentElement.id
    for (var i = 0; i < existingTodos.length; i++){
        if(existingTodos[i].id == id){
            //Set that todo to the same existing todo
            todo = existingTodos[i];
        }
    }

    //Sets the checked-sate of the todo when clicked/changed!
    todo.checked = !todo.checked;

    setTodos(existingTodos); //LocalStore array with new value (for ex. checked = true)

    refreshList(); //Refresh the locally stored todos and and them again to the html

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

//Checks if the user already has added a todo with the same content
function checkforDuplicate(todo){

    //Fetching our existing todos from localstorage
    var existingTodos = getTodos(); 

    //For every existing todo ..
    for (var i = 0; i < existingTodos.length; i++){

        //Check if the new todo is the (exact) same as the existing todo
        if(existingTodos[i].text == todo){
            
            //There is a duplicate!
            return true;
        }

        else {

            //There isn't one, move along
            return false;
        }
    }
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



//Wraps input within HTML-element and adds actions
function addToList(text,checked,id){

    //Creates the li-element that will contain each todo + actions
    var listElement = document.
       createElement('li');

    //Creates a checkbox for each todo
    const checkbox = document.
        createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.checked = checked;
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
    listElement.innerHTML = '<p>' + text + '</p>'; //The user's input
    listElement.id = id;
    listElement.appendChild(checkbox); 
    listElement.appendChild(removeButton); 
    

    //Add to either complete or incomplete-list depending on checkbox -state
    if(checked == false){
        listElement.classList.add('incomplete-todo');
        incompleteList.appendChild(listElement);
        
    } else if (checked == true){
        listElement.classList.add('complete-todo');
        completeList.appendChild(listElement);
    }

}