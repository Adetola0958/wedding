import {sendData , getData , selector , selectAll , createElement} from "./api.js" 
//import {validatePassword , validateEmail } from "./validate.js"

const password = selector("#password")
const confirm = selector("#cPassword")
const submit = selector("#submit")
const passwordFeedback = selector('.password-feedback')
const cpasswordFeedback = selector('.cpassword-feedback')

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
	const passValue = password.value.trim()
	const confirmValue   = confirm.value.trim()

	try{
		if(passValue != null && confirmValue != null) {
				const errorArea = selector(".submit")
				errorArea.textContent = "Loading..."
			}else {
				throw {
					name : "WrongFormValue" , 
					message : "Please , fill the fields correctly"
				}
				event.preventDefault()
			}
		}catch(error) {
			const errorArea = selector(".submit")
			errorArea.textContent = error.message 
			event.preventDefault()
	}

})