const selectAll = e => document.querySelectorAll(e)

let grades  = Array.from(selectAll(".grade")) 

grades.map((grade , i) => {
    if(grade.id >= 70){
        grade.textContent = "A"
    }else if(grade.id >=60 && grade.id < 70){
        grade.textContent = "B"
    }else if(grade.id >= 50 && grade.id < 60){
        grade.textContent = "C"
    }else if(grade.id >= 45 && grade.id < 50){
        grade.textContent = "D"
    }else if(grade.id >= 40 && grade.id < 45){
        grade.textContent = "E"
    }else if(grade.id < 40){
        grade.textContent = "F"
    }
})



