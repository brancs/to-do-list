const UI_INPUT_NEW_TODO = document.querySelector('#to-do-title')
const UI_LIST = document.querySelector('.list-todos')
let toDos = []

const toDo = (title) => {
  return {
    index: Date.now().toString(),
    title: title,
    doState: 'false'
  }
}

const changeDoState = (index) => {
  let indexOfToDoToChange = toDos.findIndex(toDo => toDo.index == index)
  let toDoDoState = toDos[indexOfToDoToChange].doState
  toDos[indexOfToDoToChange].doState = toDoDoState === 'true' ? 'false' : 'true'
  saveActualToDoList()
}

const removeToDoFromListByIndex = (index) => {
  let indexOfToDoToRemove = toDos.findIndex(toDo => toDo.index == index)
  toDos.splice(indexOfToDoToRemove, 1)
  saveActualToDoList()
  displayToDoList()
}

const addToDoToList = (toDo) => {
  toDos.push(toDo)
}

const createToDoElement = (index, title, doState) => {
  let liToDo = document.createElement('li')
  let btnRemoveToDo = document.createElement('button')
  let labelToDo = document.createElement('label')
  let inputToDo = document.createElement('input')
  let indexString = index.toString()

  inputToDo.setAttribute('id', indexString)
  inputToDo.setAttribute('type', 'checkbox')
  if (doState==='true'){
    inputToDo.setAttribute('checked', 'true')
  }
  inputToDo.setAttribute('onchange', `changeDoState('${indexString}')`)

  labelToDo.setAttribute('for', indexString)
  labelToDo.appendChild(inputToDo)
  labelToDo.innerHTML += title

  btnRemoveToDo.setAttribute('type', 'button')
  btnRemoveToDo.setAttribute('class', 'delete')
  btnRemoveToDo.setAttribute('onclick', `removeToDoFromListByIndex('${indexString}')`)
  btnRemoveToDo.innerHTML = 'Remove <span class="icon material-icons">delete</span>'

  liToDo.appendChild(labelToDo)
  liToDo.appendChild(btnRemoveToDo)

  return liToDo
}

const displayToDoList = () => {
  UI_LIST.innerHTML = ''
  toDos.forEach((toDo)=>{
    let newLi = createToDoElement(toDo.index, toDo.title, toDo.doState)
    UI_LIST.appendChild(newLi)
  })
}

const saveActualToDoList = () => {
  localStorage.setItem('toDoList', JSON.stringify(toDos))
}

const deleteActualToDoList = () => {
  localStorage.setItem('toDoList', '')
  toDos = []
  displayToDoList()
}

const createNewToDo = () => {
  let newToDoTitle = UI_INPUT_NEW_TODO.value
  if (newToDoTitle) {
    let newToDo = toDo(newToDoTitle)
    addToDoToList(newToDo)
    saveActualToDoList()
    displayToDoList()
    UI_INPUT_NEW_TODO.value = ''
  }
}

const restoreSavedToDoList = () => {
  let savedList = localStorage.getItem('toDoList')
  if (savedList) {
    toDos = JSON.parse(savedList)
    displayToDoList(toDos)
  }
}

window.onload = function() {
  restoreSavedToDoList()
}
