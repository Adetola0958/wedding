import {sendData , selector} from "./api.js"

const submit = selector("#submit")
//const classHead = selector("#classHead")
const displayError = selector(".err-msg")
const role = selector(".role")
const classes = selector(".classes")
const subjects = selector(".subjects")
const confirmParent = selector("#confirmParent")

// classHead.addEventListener("change" , event => { 
//     event.preventDefault()
//     let data = {
//         classHead : event.target.value
//     }
//     sendData("/school/staff/confirm-head" , data)
//     .then(res => {
//         displayError.textContent = res.message
//         submit.disabled = res.button
//     }) 
//     .catch(err => console.log(err.message))
// })

confirmParent.addEventListener("change" , event => { 
    event.preventDefault()
    let data = {
        confirmParent : event.target.value
    }
    sendData("/school/parent/confirm-parent" , data)
    .then(res => {
        displayError.textContent = res.message
        submit.disabled = res.button
    }) 
    .catch(err => console.log(err.message))
})

// role.addEventListener("change", event => {
//     try{
//         if(event.target.value == "Other"){
//             classes.style.display = "none"
//             subjects.style.display = "none"
//         }else{
//             classes.style.display = "show"
//             subjects.style.display = "show"
//         }
//     }catch(error) {
// 		role.textContent = error
// 	}
// })