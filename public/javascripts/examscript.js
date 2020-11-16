import {sendData , getData , selector , selectAll , createElement } from "./api.js"   

let remainingTime = selector("#remainingTime") ,
currentTime = selector(".currentTime") ,
endTime = selector(".endTime") 

function returnTime(arg){
    let formatArg = arg.split(":")
    let currentDate = new Date() 
    currentDate.setHours(currentDate.getHours() + Number(formatArg[0])) 
    currentDate.setMinutes(currentDate.getMinutes() + Number(formatArg[1]))
    currentDate.setSeconds(currentDate.getSeconds() + Number(formatArg[2])) 
    let time = currentDate.getTime() 
    return time
} 

var t = returnTime(currentTime.id)
let now = returnTime(endTime.id) - t , 
hours = Math.floor((now%(1000*60*60*24))/(1000*60*60)) ,
minutes = Math.floor((now%(1000*60*60))/(1000*60)) ,
seconds = Math.floor((now%(1000*60))/(1000)) 

let examCountDown = (area ,  hr , min ,sec) => {
   // if (hr == 0 && sec == 0) { 
    let date = new Date() 
    date.setHours(hr) 
    date.setMinutes(min) 
    date.setSeconds(sec)
    let hrs = date.getHours() 
    let mins = date.getMinutes() 
    let secs = date.getSeconds()  
    let timerId = setInterval(() => {  
         
    //selector(text).textContent = "Remaining Time" 
    let mimi = String(mins).length === 1 ? `0${mins}` : mins 
    let sisi = String(secs).length === 1 ? `0${secs}` : secs
    selector(area).textContent = `${hrs} : ${mimi} : ${sisi} left` 
    
    if ( secs == 0 && mins !== 0) {
        mins-- 
        secs = 60
    }
    if (mins == 0 && secs == 0) {
        clearInterval(timerId) 
        let studentResponse
        if (localStorage.response){
            studentResponse = JSON.parse(localStorage.response).response 
        
            let examDetails = {
                response : studentResponse, 
                courseName : courseName,
                className : className
            }

            sendData("/student/exam/:examname/courses/:coursename/running" , examDetails)
            .then(res => selector("body").textContent = res.message)
            .catch(err => selector("body").textContent = err)
            delete localStorage.response 
            window.location = '/student/exam/congrats'
        }
    }
    secs-- 
    } , 1000)
}
examCountDown("#remainingTime" , hours , minutes,seconds) 

const courseName = selector(".courseName").id
const className = selector(".className").id

let questionID = selector(".question-para").id


window.addEventListener("click" , e => {
    if (e.target.type === "radio") {
        let checkedRadioValue = e.target.value 
        let id = e.target.getAttribute("data-id")
        let saveResponse = ((i ,c ) => {
            //console.log(a , b) 
            try {
                if (localStorage.response) {
                    let responses = JSON.parse(localStorage.response).response
                    let addResponse = ((m , n ) => {
                         let checkRes = responses.find(res => res.id == m ) 
                         if (checkRes) { 
                            let idex =  responses.findIndex(res => res.id === checkRes.id) 
                            responses.splice(idex , 1)
                            responses.push({
                                id : i ,  
                                value: c  
                             })
                             localStorage.response = JSON.stringify({response : responses})
                             return localStorage.response
                         }else{
                             responses.push({
                                id : i ,  
                                value: c 
                             })
                             localStorage.response = JSON.stringify({response : responses})
                             return localStorage.response
                         }
                    })(i , c)
                }else {
                    let responses =  [{
                        id : i ,  
                        value: c 
                    }]
                    localStorage.response = JSON.stringify({response : responses})
                    return localStorage.response
                }
            }catch(error) {
                console.log(error.message)
            }
        })(id ,  checkedRadioValue)
       
    }

    if (e.target.id === "quit"){ 
        let studentResponse
        if (localStorage.response){
           studentResponse = JSON.parse(localStorage.response).response 
        } 
        let examDetails = {
            response : studentResponse , 
            courseName : courseName,
            className : className
        }
        sendData("/student/exam/:examname/courses/:coursename/running" , examDetails)
        .then(res => selector("body").textContent = res.message)
        .catch(err => selector("body").textContent = err)
        delete localStorage.response
        window.location = '/student/exam/congrats'
    }
}) 

window.addEventListener("DOMContentLoaded" , e => {
   if (localStorage.response){
       let responses = JSON.parse(localStorage.response).response 
       let checkRes = responses.find(res => res.id == questionID) 
       if (checkRes) {
        let inputs    = Array.from(selectAll("input")) 
        inputs.map((input , i) => {
            if (input.value === checkRes.value){
                input.checked = true 
            }
        })
       } 

       let checkREs = JSON.parse(localStorage.response).response 
       if (checkREs){
        let displayed = Array.from(selectAll(".display-all")) 
        displayed.map((elem , i) => {
            if(checkREs.find(val => val.id == elem.id)){
               elem.style.background = "orange"
               elem.style.color = "#fff"
            }
            
        })
       }
       
   }
}) 

