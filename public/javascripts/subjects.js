const selector = e => document.querySelector(e)

const addButton = selector("#add")
const hideForm = selector(".hide-form")
const cancelButton = selector("#cancel")

addButton.addEventListener("click", event => {
    event.preventDefault()
    if(hideForm.style.display = "none"){
        hideForm.style.display = "block"
    }
})

cancelButton.addEventListener("click", event => {
    event.preventDefault()
    if(hideForm.style.display = "block"){
        hideForm.style.display = "none"
    }
})