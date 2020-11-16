import {sendData , getData , selector , selectAll , createElement } from "./api.js" 
import {validateEmail } from "./validate.js" 

const email = selector("#email")
const password = selector("#password")
const confirm = selector("#confirmPass")
const submit = selector("#submit")
const final = selector(".submit")
const school = selector(".school")
const admin = selector(".admin")
const office = selector(".office")
const address = selector(".address")
const state = selector(".state")
const country = selector(".country")
const passwordFeedback = selector('.password-feedback')
const cpasswordFeedback = selector('.cpassword-feedback')
const emailFeedBack = selector(".email-feedback")


email.addEventListener("blur" , event => {
	try {
		const emailValue = validateEmail(email.value.trim())
		if ( emailValue.value != null ) {
			emailFeedBack.textContent = ""
		}else {
			emailFeedBack.textContent = "Incorrect Password"
			emailFeedBack.classList.add('text-danger', 'text-small')
		}
	}catch(error) {
		emailFeedBack.textContent = error
	}
})

password.addEventListener("blur" , event => {
	try {
		if ( event.target.value.length > 3) {
			passwordFeedback.textContent = ""
		}else {
			passwordFeedback.textContent = "Your password should be a minimum of 3 characters."
			passwordFeedback.classList.add('text-danger', 'text-small')
		}
	}catch(error) {
		passwordFeedback.textContent = error
	}
})

confirm.addEventListener("blur" , event => {
	try{
		cpasswordFeedback.classList.add('text-small')
		cpasswordFeedback.classList.remove('text-success', 'text-danger')
		if(event.target.value === password.value && event.target.value.length > 3){
			cpasswordFeedback.textContent = "Matched"
			cpasswordFeedback.classList.add('text-success')
		}else{
			cpasswordFeedback.textContent = "Your password does not match"
			cpasswordFeedback.classList.add('text-danger')
		}
	}catch(error) {
		cpasswordFeedback.textContent = error
	}
})

submit.addEventListener("click", event => {
	const emailValue = email.value.trim()
    const passValue   = password.value.trim()
	const confirmValue   = confirm.value.trim()
	const schoolValue = school.value.trim()
	const adminValue = admin.value.trim()
	const officeValue = office.value.trim()
	const addressValue = address.value.trim()
	const stateValue = state.value.trim()
	const countryValue = country.value.trim()

	try{
		if(emailValue != "" && passValue != "" && confirmValue != "" && schoolValue != "" && adminValue != "" &&
			officeValue != "" && addressValue != "" && stateValue != "" && countryValue != "") {
            const checkbox = selector(".check")
            if(checkbox.checked){
                console.log("Redirecting...")
            }else{
                event.preventDefault()
                if(event.target.previousSibling) {
                    event.target.previousSibling.remove()
                }
				final.textContent = "Please, accept our terms and conditions"
				final.classList.add('text-danger')
                event.target.parentNode.insertBefore(final, event.target)
            }
        }else {
            final.textContent = "Please fill all the fields correctly!"
			final.classList.add('text-danger')
            event.preventDefault()
        }
    }catch(error) {
        const errorArea = selector(".submit")
        errorArea.textContent = error.message 
        event.preventDefault()
	}

})