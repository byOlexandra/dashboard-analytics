export function createChart(canvaId, labels, data) {
    new Chart(document.getElementById(canvaId), {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "",
                data,
                borderWidth: 2,
                // tension:0.4,
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                // scales: {
                // y: { beginAtZero: true }
                // }   
            }
        }
    })
}