//These are the elements I will need from the DOM
const todoInput = document
    .getElementById('todo'); 

const handleInputButton = document
    .getElementById('add-button');

const incompleteList = document
    .getElementById('incomplete-ul'); 

const completeList = document
    .getElementById('complete-ul'); 

const outputToUser = document 
    .getElementById('output-message-container'); 
    
const clearAllButton = document
    .getElementById('clear-button');

handleInputButton.addEventListener('click', handleUserInput) 
clearAllButton.addEventListener('click', clearAll); 

window.onload = refreshTodoList; //See more at refreshTodoList();

//User input is evaluated, checks if task can be added correctly - then adds it
function handleUserInput(event){

    //Stop page from refreshing on submit
    event.preventDefault(); 
    
    if(checkifEmpty(todoInput.value) == true){
        var message = "Oops! Looks like you're trying to add an empty task.";
        
        outputToUser.innerHTML = `<p id='message'> ${message} </p`;
        
        return; //Todo will not be added
    }

    if(duplicateExists(todoInput.value) == true){
        var message = "Oops! You already have a todo exactly like that one.";
        
        outputToUser.innerHTML = `<p id='message'> ${message} </p`;
        
        return; //Todo will not be added
    }

    //I fetch my array of locally stored todos!
    var existingTodos = getLocallyStoredTodos(); 

    //I push the new todo as an object in to my array, and sets it's default values
    existingTodos.push({text: todoInput.value, checked: false, id: existingTodos.length});

    //LocalStore array with new value 
    setTodosToLocalStorage(existingTodos);

    //Refresh list
    refreshTodoList();
}


/* 
When refreshing, the list elements (HTML) are replaced with the content in localStorage.
This way the HTML (output to user) will always stay up to date with what's been stored.
*/
function refreshTodoList(){
    
    var existingTodos = getLocallyStoredTodos();

    //By setting the ul.innerHTML to "empty", all <li>:s will be removed
    incompleteList.innerHTML = '';
    completeList.innerHTML = ''; 

    /* If the user has gotten a message when the input was handled,
    this will remove it when you successfully enter a new task */
    outputToUser.innerHTML = ''; 
    
    //Loops through the locally stored array
    for (var i = 0; i < existingTodos.length; i++){

        /*Sends our todo-objects along with it's values into to the addToList-function,
        Which will put them into HTML-elements and append them to the ul*/
        addToList(existingTodos[i].text, existingTodos[i].checked, existingTodos[i].id);
    }

    //Empty the input-field after todo has been submitted
    todoInput.value = '';
}

function setTodosToLocalStorage(todoList){
    
    //Save the input (the array of todos) as strings in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getLocallyStoredTodos(){ 
    
    //Fetch array from local storage
    var fetchedArray = localStorage.getItem("todoList");

    //If there are no todos
    if (fetchedArray == null){
        //Define an empty array, otherwise the user won't be able to push anything into it
        return [];

    } else {
        //Turn array back from string to regular array - and return it
        return JSON.parse(fetchedArray); 
    }
}

//Changes the checked-status of our locally stored todos
function setStatusOfTodo(){

    //Find the todo-id that is changed in the DOM
    var id = this.parentElement.id;

    var todo; 
    var existingTodos = getLocallyStoredTodos(); 

    //For every existing todo - check if that id is the same as the one that was changed
    for (var i = 0; i < existingTodos.length; i++){
        if(existingTodos[i].id == id){
            //Set that todo to the same existing todo
            todo = existingTodos[i];
        }
    }

    //Sets the checked-sate of the todo when clicked/changed
    todo.checked = !todo.checked;

    setTodosToLocalStorage(existingTodos); //LocalStore array with new checked-values

    refreshTodoList(); 

}

function removeSingleTodo(){  
   
    //Find the todo that was clicked (delete button)
    var id = this.parentElement.id;

    var existingTodos = getLocallyStoredTodos(); 

    for (var i = 0; i < existingTodos.length; i++){
        if(existingTodos[i].id == id){
           
           //If the id is the clicked one, splice the (one) object on that index 
           existingTodos.splice(i, 1)    

           //When our array of todos has been changed, store it again in localStorage 
           setTodosToLocalStorage(existingTodos);

           refreshTodoList(); 
        }
    }
}

//Gives the user the option to clear all todos (remove them)
function clearAll(){
    
    var existingTodos = getLocallyStoredTodos()

    //First check if there actually is something to delete
    if(existingTodos.length > 0){
        
        var iAmSure = confirm("Are you sure? This will delete everything. And I mean everything.");

        if(iAmSure == true){
            localStorage.clear();
            refreshTodoList();
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


//Tells us if the user is trying to enter an "empty" task
function checkifEmpty(input){
    
    if (input.trim() == ''){
        return true;

    } else {
        return false;
    }
}

//Wraps input within HTML-element and adds actions
function addToList(text,checked,id){

    //A li-element will contain each todo + actions
    var listElement = document.
       createElement('li');

    const checkbox = document.
        createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.checked = checked;
    checkbox.addEventListener('change', setStatusOfTodo); 

    const removeButton = document
        .createElement('input'); 
    removeButton.type = "submit";
    removeButton.value = "Delete";
    removeButton.id = "remove-button";
    removeButton.addEventListener('click', removeSingleTodo); 

    listElement.innerHTML = '<p>' + text + '</p>'; //The user's input
    listElement.id = id;
    listElement.appendChild(checkbox); 
    listElement.appendChild(removeButton); 
    
    //Add to either complete or incomplete-ul depending on checkbox-status
    if(checked == false){
        listElement.classList.add('incomplete-todo'); 
        incompleteList.appendChild(listElement);
        
    } else if (checked == true){
        listElement.classList.add('complete-todo'); 
        completeList.appendChild(listElement);
    }
}