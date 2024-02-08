const dataBook = []
const RENDER_BOOK = 'render-input'
const BOOK_SAVED = 'save-data'
const KEY_STORAGE = 'storage-key'



const generateId = () => {return +new Date()}

const generateData = (id, tittle, author, date, year, isCompleted) => {
    return {
        id,
        tittle,
        author,
        date,
        year,
        isCompleted
    }
}

const isStorageExist = () => {
    if (typeof (Storage) === undefined) {
        alert('Browser anda terlalu jadul')
        return false
    } 
    return true
}

const saveData = () => {
    if (isStorageExist()){
        const parsedData = JSON.stringify(dataBook)
        localStorage.setItem(KEY_STORAGE, parsedData)
        document.dispatchEvent(new Event(BOOK_SAVED))
    }
}

const addData = () => {
    const tittleBook = document.getElementById("inputBookTitle").value
    const authorBook = document.getElementById("inputBookAuthor").value
    const dateBook = document.getElementById("inputBookDate").value
    const yearBook = document.getElementById("inputBookYear").value
    const checkValid =document.getElementById("inputBookIsComplete").checked

    const generateDataId = generateId()
    const changeYear = parseInt(yearBook)
    const generateDataObject = generateData(generateDataId, tittleBook, authorBook, dateBook, changeYear, checkValid)
    dataBook.push(generateDataObject)

        document.dispatchEvent(new Event(RENDER_BOOK))
    

    saveData()
}

const findDataBook = (bookId) => {
    for (const itemBook of dataBook){
        if (itemBook.id === bookId){
            return itemBook
        }
    }
    return null
}

const findIndexBook = (bookId) => {
   for (const keyindex in dataBook){
    if (dataBook[keyindex].id === bookId){
        return keyindex
    }
   }

   return -1
}

const addBookFinish = (bookId) => {
    const targetBook = findDataBook(bookId)

    if (targetBook === null) return

    const confirmationFinish = confirm('Apakah kamu benar sudah selesai\nmembaca buku ini?')

    if (confirmationFinish){
    targetBook.isCompleted = true
    document.dispatchEvent(new Event(RENDER_BOOK))

    saveData()
    } else {
        return 
    }
}

const removeBookFinish = (bookId) => {
    const targetBook = findIndexBook(bookId)

    if (targetBook === -1) return;

    const confirmation = confirm('Apakah kamu benar ingin\nmenghapus buku ini?')

    if (confirmation){
    dataBook.splice(targetBook, 1)
    document.dispatchEvent(new Event(RENDER_BOOK))

    saveData()
    } else {
        return
    }
}

const undoFinishBook = (bookId) => {
    const targetBook = findDataBook(bookId)

    if (targetBook === null) return

    targetBook.isCompleted = false

    document.dispatchEvent(new Event(RENDER_BOOK))

    saveData()
}

const loadDataBookStorage = () => {
    const datastorageBook = localStorage.getItem(KEY_STORAGE)

    let book = JSON.parse(datastorageBook)

    if (book !== null){
        for (const bookKey of book){
            dataBook.push(bookKey)
        }
    }

    document.dispatchEvent(new Event(RENDER_BOOK))
}


const  makeDataBook = (generateDataObject) => {
    const tittleBookText = document.createElement('h3')
    tittleBookText.innerText = generateDataObject.tittle

    const authorBookText = document.createElement('p')
    authorBookText.innerText = generateDataObject.author

    const dateBookText = document.createElement('p')
    dateBookText.innerText = generateDataObject.date

    const yearBookText = document.createElement('p')
    yearBookText.innerText = generateDataObject.year

    const containerBookText = document.createElement('article')
    containerBookText.classList.add('book_item')
    containerBookText.setAttribute('id', `bookID-${generateDataObject.id}`)

    containerBookText.append(tittleBookText, authorBookText, dateBookText, yearBookText)

    const conatainerBookButton = document.createElement('div')
    conatainerBookButton.classList.add('action')
    containerBookText.append(conatainerBookButton)
    
    if (generateDataObject.isCompleted){
        const buttonTextFinish = document.createElement('button')
        buttonTextFinish.innerText = 'Belum selesai di Baca'
        buttonTextFinish.classList.add('finish')

        buttonTextFinish.addEventListener('click', function(){
            undoFinishBook(generateDataObject.id)
        })

        const buttonRemove = document.createElement('button')
        buttonRemove.innerText = 'Hapus Book'
        buttonRemove.classList.add('remove')

        buttonRemove.addEventListener('click', function(){
            removeBookFinish(generateDataObject.id)
        })

        conatainerBookButton.append(buttonTextFinish, buttonRemove)

    } else {
        const buttonBookCheck = document.createElement('button')
        buttonBookCheck.innerText = 'Selesai dibaca'
        buttonBookCheck.classList.add('finish')

        buttonBookCheck.addEventListener('click', function(){
            addBookFinish(generateDataObject.id)
        })

        const buttonRemove = document.createElement('button')
        buttonRemove.innerText = 'Hapus Book'
        buttonRemove.classList.add('remove')

        buttonRemove.addEventListener('click', function(){
            removeBookFinish(generateDataObject.id)
        })

        conatainerBookButton.append(buttonBookCheck, buttonRemove)
    }


    return containerBookText
}


const loadWindow = () => {
    document.addEventListener('DOMContentLoaded', function() {
        const formSubmit = document.getElementById('inputBook')
    
        formSubmit.addEventListener('submit', function(event){
            event.preventDefault()
            addData()
        })
    
        if(isStorageExist()){
            loadDataBookStorage()
        }
    })
}
loadWindow()



const saveBook = () => {
    document.addEventListener(RENDER_BOOK, function() {
        const uncompleteBookList = document.getElementById("incompleteBookshelfList")
        uncompleteBookList.innerHTML = ''
    
        const completeBookList = document.getElementById("completeBookshelfList")
        completeBookList.innerHTML = ''
    
    
        for (const itemBookKey of dataBook){
            const elementBook = makeDataBook(itemBookKey)
            if (!itemBookKey.isCompleted) {
                uncompleteBookList.append(elementBook)
            }  else {
                completeBookList.append(elementBook)
            }
    
        }
    })
}
saveBook()


const searchBook = () => {
    const buttonSearch = document.getElementById("searchSubmit")
    buttonSearch.addEventListener('click', function(ev) {
        ev.preventDefault()

    const searchinput = document.getElementById("searchBookTitle").value.toUpperCase()
    const tittleBookSearch = document.querySelectorAll('.book_item > h3 ')
    

    for (const keyBook of tittleBookSearch){
        const itemBook = keyBook.innerText.toUpperCase()
        if (itemBook.includes(searchinput)){
            keyBook.parentElement.style.display = ''
        } else {
            keyBook.parentElement.style.display = 'none'
        }
    }

    })
}
searchBook()


