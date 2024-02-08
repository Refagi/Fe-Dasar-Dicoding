const todos = [];
const RENDER_EVENT = 'render-todo';
const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';
const SUBMIT_DATA = 'Data-submit'
const DATA_COMPLETED = 'Data-completed'
const UNDO_DATA = 'Data-undo'
const REMOVE_DATA = 'Data-remove'
// const QUESTION_REMOVE = 'Question-DAta'


function generateId() {
  //tanda (+) untuk mengubah default date menjadi format dd/mm/yyyy
  return +new Date();
}
 

function generateTodoObject(id, task, timestamp, isCompleted) {
  return {
    id,
    task,
    timestamp,
    isCompleted
  }
}


function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}


function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
 
  return -1;
}


function makeTodo(todoObject) {
  const textTitle = document.createElement('h2');
  textTitle.innerText = todoObject.task;
 
  const textTimestamp = document.createElement('p');
  textTimestamp.innerText = todoObject.timestamp;
 
  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textTimestamp);
 
  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer);
  container.setAttribute('id', `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undo-button');
 
    undoButton.addEventListener('click', function () {
      undoTaskFromCompleted(todoObject.id);
    });
 
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
 
    trashButton.addEventListener('click', function () {
      removeTaskFromCompleted(todoObject.id);
    });
 
    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');
    
    checkButton.addEventListener('click', function () {
      addTaskToCompleted(todoObject.id);
    });
    
    container.append(checkButton);
  }
 
  return container;
}

 
function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}


function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}



function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;
   
    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObject);

    //mengirim sebuah event ke dalam object
    document.dispatchEvent(new Event(RENDER_EVENT));

    document.dispatchEvent( new Event(SUBMIT_DATA))
    saveData();

  }


  function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));

    document.dispatchEvent( new Event(DATA_COMPLETED))
    saveData();

  }


  function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);
   
    if (todoTarget === -1) return;
   
    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));

    document.dispatchEvent( new Event(REMOVE_DATA))

    saveData();

  }
   
   
  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));

    document.dispatchEvent( new Event(UNDO_DATA))
    saveData();

  }


  function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const todo of data) {
        todos.push(todo);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }




  function showPopUp (text) {
    alert(text)
  }

  document.addEventListener(SAVED_EVENT, function(data){
    if(data.submitted){
      showPopUp('Data is Saved')
    }
  })

  document.addEventListener(SUBMIT_DATA, function() {
    showPopUp('Data is Submit')

    //membuat event object 
    const savedEvent = new Event(SAVED_EVENT);
    //menambahkan properti object ke event
    savedEvent.submitted = true;
    //mentrigger obejct event
    document.dispatchEvent(savedEvent);  
  });
//event SAVED_EVENT dan SUBMIT_EVENT memunculkan popup Data is Saved, hanya pada ketika data di submit
//jadi popUP Data is Saved tidak muncul di popUp lainnya spertu popup undo , remove, dan addCompleted
 


  document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');

    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTodo();
    });

    if (isStorageExist()) {
      loadDataFromStorage();
    }
  });


  document.addEventListener(RENDER_EVENT, function () {
    // console.log(todos);

    //untuk mengambil data yang ada pada array todos dan menampilkanyya pada html
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted)
        uncompletedTODOList.append(todoElement);
      else
        completedTODOList.append(todoElement);
    }  
  });




  
