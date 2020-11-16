import {sendData, selector, selectAll} from './api.js'

const week = selector("#weekData")
const tableBody = selector('.table-body')
const table = document.createElement("table")
const tbody = document.createElement("tbody")

table.innerHTML = `
    <thead>
        <tr>
            <th>Period</th>
            <th>Date</th>
            <th>Reference Number</th>
            <th>Debit </th>
            <th>Balance</th>
            <th>Paid</th>
        </tr>
    </thead>
    ` 

week.addEventListener("change" , event => {

    sendData("/staff/get-attendance" , {week : event.target.value})
    .then(res => {
        const mapper = res.attendance
        let mapIt = mapper.map((e, i) => {
            const { 
                student
                } = e
            let tr  = document.createElement("tr")
            tr.innerHTML = 
                    `<td> ${student} </td>
                    `
            tbody.append(tr)
        })
        table.append(tbody)
        tableBody.append(table)
        console.log(mapper)
    })
    .catch(err => console.log(err))
})