
let selector = e => document.querySelector(e) 

let pictureChange = selector("#picture")

pictureChange.addEventListener('change' , showImage) 
function showImage() {
	let files = this.files[0]  
    let divisor = 1024*1024
    let size = Number(files.size)/divisor
	let type = files.type 
	console.log(type)
	if (size  < 10) {
		let reader = new FileReader() 
		reader.onload = function(event) {
			selector(".hide").style.display = "none"
			selector(".removePicture").style.display = "block"
			let img = new Image() 
			img.onload = function() {
				selector("#displayImage").append(img)
			}
			img.src = event.target.result 
			img.style.width = '150px'
			img.style.height = '150px'
			img.id = "previewImage"
		}
		reader.onerror = function(event) {
			selector("#displayImage").textContent = "An error just occured"
		}
		reader.readAsDataURL(files) 
	}else{
		event.preventDefault() 
      	selector("#displayImage").textContent = "File size too large."
	}
} 

let resetImage = selector("#removeImage")

resetImage.addEventListener('click' , event => {
	event.preventDefault()
	let picture = selector("#picture")
	let displayImage = selector("#previewImage")
	let hide = selector(".hide")
	if(picture.value){
		picture.value = ""
		displayImage.parentNode.removeChild(displayImage)
		hide.style.display = "block"
	}
	selector(".removePicture").style.display = "none"
})

 