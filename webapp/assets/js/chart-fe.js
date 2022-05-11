var allData = {
    'Temperature': [],
    'Humidity': [],
    'WindSpeed' : [],
    'minTemperature': 100000,
    'maxTemperature': 0,
    'minHumidity': 100000,
    'maxHumidity': 0,
    'minWindSpeed': 100000,
    'maxWindSpeed': 0
}
var chartOptions = {
    plugins: {
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    var label = tooltipItem.dataset.label.replace(/\s+/g, '');
                    var pointData = allData[label][tooltipItem.dataIndex];
                    return "min: " + pointData.min + " | max: " + pointData.max;
                },
                footer: function(tooltipItem){
                    var label = tooltipItem[0].dataset.label.replace(/\s+/g, '');
                    var pointData = allData[label][tooltipItem[0].dataIndex];
                    return "avg: " + pointData.avg;
                }
            }
        }
    },
    scales: {
        x: {
            type: 'time',
            display: true,
        },
    },
}

const ctxTemperature = document.getElementById('tempCanvas').getContext('2d');
const chartTemperature = new Chart(ctxTemperature, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: chartOptions
});

const ctxHumidity = document.getElementById('humCanvas').getContext('2d');
const chartHumidity = new Chart(ctxHumidity, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Humidity',
            data: [],
            fill: false,
            borderColor: 'rgb(150, 192, 100)',
            tension: 0.1
        }]
    },
    options: chartOptions
});

const ctxWindSpeed = document.getElementById('wsCanvas').getContext('2d');
const chartWindSpeed = new Chart(ctxWindSpeed, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Wind Speed',
            data: [],
            fill: false,
            borderColor: 'rgb(200, 50, 192)',
            tension: 0.1
        }]
    },
    options: chartOptions
});