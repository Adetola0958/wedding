import {sendData , selector} from "./api.js"

const session_select = selector(".session_select")
const displayError = selector(".err-msg")

session_select.addEventListener("change" , event => { 
    let mainOption = (session_select.options[session_select.selectedIndex]).id
    let selectField = selector('.term-select')
    selectField.textContent = null
    let firstOption = document.createElement('option')
    firstOption.textContent = "Select a term"
    selectField.append(firstOption)
    sendData('/school/populate-terms', {session : mainOption})
    .then(res => {
        console.log(res)
        res.map( item => {
            let optionitems = document.createElement('option')
            optionitems.value = item._id
            optionitems.textContent = item.name
            selectField.append(optionitems)
        })
    })
    .catch(err => displayError.textContent = err)
})