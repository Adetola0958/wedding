$(function() {
    var a = {
            labels: ["Sunday", "Munday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            datasets: [{
                label: "Data 1",
                borderColor: 'rgba(52,152,219,1)',
                backgroundColor: 'rgba(52,152,219,1)',
                pointBackgroundColor: 'rgba(52,152,219,1)',
                data: [29, 48, 40, 19, 78, 31, 85]
            },{
                label: "Data 2",
                backgroundColor: "#DADDE0",
                borderColor: "#DADDE0",
                data: [45, 80, 58, 74, 54, 59, 40]
            }]
        },
        t = {
            responsive: !0,
            maintainAspectRatio: !1
        },
        e = document.getElementById("bar_chart").getContext("2d");
    new Chart(e, {
        type: "line",
        data: a,
        options: t
    });

});