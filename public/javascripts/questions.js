const selector = e => document.querySelector(e)

const optionA = selector("#optionA")
const optionB = selector("#optionB")
const optionC = selector("#optionC")
const optionD = selector("#optionD")
const correctOption = selector("#correctOption")
const onSubmit = selector("#on-submit")
const submit = selector("#submit")

submit.addEventListener("click", event => {
    if(!(correctOption.value === optionA.value || correctOption.value === optionB.value || correctOption.value === optionC.value || correctOption.value === optionD.value)){
        onSubmit.textContent = "One of the options must be the correct option."
        event.preventDefault()
    }
})



