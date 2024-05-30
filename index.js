import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue }  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-86a88-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addBtnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDb, inputValue)
    clearInput()
})

onValue(shoppingListInDb, function(snapshot) {
    let listArray = Object.values(snapshot.val())
    clearList()

    for (let i = 0; i < listArray.length; i++) {
        let listItem = listArray[i]
        addItemToList(listItem)

    }

  
}) 

function clearInput() {
    inputFieldEl.value = ""
}

function clearList() {
    shoppingListEl.innerHTML = ""
}

function addItemToList(item) {
    shoppingListEl.innerHTML += `<li>${item}</li>`
}