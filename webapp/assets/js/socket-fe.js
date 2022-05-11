var socket = io();


socket.on('connection', (socket) => {
    console.log('connected to socket');
});

socket.on('redis-message', function(msg) {
    console.log('received msg from redis:');
    var data = JSON.parse(msg);
    var datetime = Object.keys(data)[0];
    console.log('datetime: ' + datetime)
    var weatherData = data[datetime];
    // console.log('datetime: ' + datetime);
    // console.log('data: ');
    // console.log(weatherData);

    updateChart(chartTemperature, weatherData, datetime, "Temperature");
    updateChart(chartHumidity, weatherData, datetime, "Humidity");
    updateChart(chartWindSpeed, weatherData, datetime, "WindSpeed");
});

function updateChart(chart, data, datetime, label){
    var dataObject = {
        avg: data['avg' + label],
        min: data['min' + label],
        max: data['max' + label]
    }

    allData[label].push(dataObject);
    allData['min' + label] = Math.min(allData['min' + label], data['min' + label]);
    document.getElementById('min' + label).innerHTML = allData['min' + label];
    allData['max' + label] = Math.max(allData['max' + label], data['max' + label]);
    document.getElementById('max' + label).innerHTML = allData['max' + label];
    
    chart.data.datasets[0].data.push(data['avg' + label]);
    var d = new Date(0);
    d.setUTCSeconds(datetime / 1000);
    chart.data.labels.push(d);
    chart.update();
}