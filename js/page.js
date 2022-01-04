let ctx = document.getElementById('monthlySales').getContext('2d')
let pieCtx = document.getElementById('deptSales').getContext('2d')

// Accessing the objects
let newAmount = document.getElementById('itemAmount');
let newMonth = document.getElementById('monthId')

let hikingRadio = document.getElementById('hiking')
let runningRadio = document.getElementById('running')
let huntingRadio = document.getElementById('hunting')

let yearlyLabel = document.getElementById('yearlyTotal');

// Monthly Totals
let yearlyTotal = 0;

const monthlySales = new Set()
const monthlyLabels = new Set()
const categories = new WeakSet() // weakset has less functionalities than a set .. but if its not used, the memory gets vacant which is good
                                 // we can only add objects in a weakset

let hiking = {category: 'Hiking'}
let running = {category: 'Running'}
let hunting = {category: 'Hunting'}

function addSale() {
    monthlySales.add(parseInt(newAmount.value))
    monthlyLabels.add(parseInt(newMonth.value))

    yearlyTotal = 0; // reset yearly total to 0
    monthlySalesChart.data.datasets.forEach((dataset) => {
        dataset.data = [] //reset dataset to empty array
    })

    for (let amount of monthlySales) { // iterare over monthlySales set
        yearlyTotal = amount + yearlyTotal 
        yearlyLabel.innerHTML = yearlyTotal // update yearlyTotal

        monthlySalesChart.data.datasets.forEach((dataset) => {
            dataset.data.push(amount)
        })
    }

    monthlySalesChart.data.labels = Array.from(monthlyLabels)
    monthlySalesChart.update()

    // check to see if any category has been selected or not
    if (hikingRadio.checked) {
        categories.add(hiking)
    } else if (runningRadio.checked) {
        categories.add(running)
    } else if (huntingRadio.checked) {
        categories.add(hunting)
    } else {
        // do something else
    }
    console.log(categories)
}

function deleteVal() {
    monthlySales.forEach((value1, value2, monthlySales) => {
        console.log(`value1: ${value1}`)
        console.log(`value2: ${value2}`)
    })

}

function addTotal() {

}


// Bar chart
var monthlySalesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# of Sales',
            data: monthlySales,
            backgroundColor: [
                'rgba(238, 184, 104, 1)',
                'rgba(75, 166, 223, 1)',
                'rgba(239, 118, 122, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

/*
// Pie Chart
var deptSalesChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: deptLabels,
        datasets: [{
            label: '# of Sales',
            data: deptSales,
            backgroundColor: [
                'rgba(238, 184, 104, 1)',
                'rgba(75, 166, 223, 1)',
                'rgba(239, 118, 122, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        
    }
})*/