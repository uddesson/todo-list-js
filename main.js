const incompleteList = document
    .getElementById('incomplete-ul'); 

    const completeList = document
    .getElementById('complete-ul'); 

const outputToUser = document 
    .getElementById('output-message-container'); 

const todoInput = document
    .getElementById('todo'); 

const button = document
    .getElementById('button');
    
const clearAllButton = document
    .getElementById('clear-button');

button.addEventListener('click', handleUserInput) 
clearAllButton.addEventListener('click', clearAll); 

//Calls refreshlist function onload, see more at refreshList();
window.onload = refreshList;

// User input is evaluated and handled
function handleUserInput(event){

    //Stop form from resending on sumbit
    event.preventDefault(); 
    
    if(checkifEmpty(todoInput.value) == true){

        var message = "Oops! Looks like you're trying to add an empty task.";
        outputToUser.innerHTML = `<p id='message'> ${message} </p`;
        return; //Exits the function and todo will not be added
    }

    if(duplicateExists(todoInput.value) == true){
        
        var message = "Oops! You already have a todo exactly like that one.";
        outputToUser.innerHTML = `<p id='message'> ${message} </p`;
        return; //Exits the function and todo will not be added
    }

    var existingTodos = getLocallyStoredTodos();

    //Add new todo as an object
    existingTodos.push({text: todoInput.value, checked: false, id: existingTodos.length});

    setTodoToLocalStorage(existingTodos); //LocalStore array with new value 

    refreshList();
}

/* Checks my locally stored todos against the ones that are in the HTML,
everytime it's called, it actually replaces the HTML with the todos in localStorage */
function refreshList(){
    
    var existingTodos = getLocallyStoredTodos();

    /* The ul of todos is emptied, so it will not have any todos lying around just as HTML-elements, 
    .. without having a counterpart locally stored */
    incompleteList.innerHTML = '';
    completeList.innerHTML = '';

    /* If you've gotten the duplicate-message before, this will remove it
    when you successfully enter a new task */
    outputToUser.innerHTML = ''; 

    
    //Loops through the locally stored array
    for (var i = 0; i < existingTodos.length; i++){

        /*Sends our todo-objects along with it's values into to the addToList-function,
        Which will put them into HTML-elements and append them to the ul*/
        addToList(existingTodos[i].text, existingTodos[i].checked, existingTodos[i].id);
    }

    todoInput.value = '';

}

function setTodoToLocalStorage(todoList){
    
    //Save the input (the array) as strings in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getLocallyStoredTodos(){ 
    
    //Fetch array from local storage
    var fetchedArray = localStorage.getItem("todoList");

    if (fetchedArray == null){
        // Return empty array if there aren't any existing todos
        return [];

    } else {
        //Use parse to turn it back from string to regular array - and return it
        return JSON.parse(fetchedArray); 
    }
}

//Changes status of todo when checkbox is marked
function setStatus(){

    //Find the todo-id
    var id = this.parentElement.id;

    var todo; 
    var existingTodos = getLocallyStoredTodos(); //Fetching our existing todos from localstorage

    //For every existing todo - check if that id is the same as this.parentElement.id
    for (var i = 0; i < existingTodos.length; i++){
        if(existingTodos[i].id == id){
            //Set that todo to the same existing todo
            todo = existingTodos[i];
        }
    }

    //Sets the checked-sate of the todo when clicked/changed
    todo.checked = !todo.checked;

    setTodoToLocalStorage(existingTodos); //LocalStore array with new value (for ex. checked = true)

    refreshList(); 

}

//Removes todo completely
function removeTodo(){  
   
    //Find the todo-id on wich we clicked the delete button
    var id = this.parentElement.id;

    var existingTodos = getLocallyStoredTodos(); 

    for (var i = 0; i < existingTodos.length; i++){
        if(existingTodos[i].id == id){
           
           //If the id is the clicked one, splice the object on that index 
           existingTodos.splice(i, 1)    

           //When our array of todos has been changed, store it again in localStorage 
           setTodoToLocalStorage(existingTodos);

           refreshList(); //Refresh the locally stored todos and and them again to the html
        }
   }

}

//Clears our stored array of todos
function clearAll(){
    
    var existingTodos = getLocallyStoredTodos()

    //First check if there actually is something to delete
    if(existingTodos.length > 0){
        
        var iamSure = confirm("Are you sure? This will delete everything. And I mean everything.");

        if(iamSure == true){
            localStorage.clear();
            refreshList();
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
function duplicateExists(todo){

    //Fetching our existing todos from localstorage
    var existingTodos = getLocallyStoredTodos(); 

    for (var i = 0; i < existingTodos.length; i++){
        
        //Check if the new todo is the (exact) same as the existing todo
        if(existingTodos[i].text == todo){
            
            return true;
        }
    }
}


//Returns true if the user is trying to enter an "empty" task
function checkifEmpty(input){
    
    if (input.trim() == ''){
        return true;

    } else {
        return false;
    }
}

//Wraps input within HTML-element and adds actions
function addToList(text,checked,id){

    //I use a li-element to contain each todo + actions
    var listElement = document.
       createElement('li');

    const checkbox = document.
        createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.checked = checked;
    checkbox.addEventListener('change', setStatus); 

    const removeButton = document
        .createElement('input'); 
    removeButton.type = "submit";
    removeButton.value = "Delete";
    removeButton.id = "removeButton";
    removeButton.addEventListener('click', removeTodo); 

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