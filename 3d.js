Highcharts.setOptions({
    chart: {
      backgroundColor: {
        linearGradient: [0, 0, 500, 500],
        stops: [
          [0, 'rgb(255, 255, 255)'],
          [1, 'rgb(240, 240, 255)']
        ]
      },
      borderWidth: 2,
      plotBackgroundColor: 'rgba(255, 255, 255, .9)',
      plotShadow: true,
      plotBorderWidth: 1
    }
  });


function Upload1() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
            data = e.target.result.split('\n')
            var update = []
            var update_date = []
            var death = []
            var death_date = []
            for (i in data) {
                if (data[i].includes('"')){
                    data[i] = data[i].split('"')
                    data[i].shift()
                    lt = data[i].pop().split(',')
                    lt.shift()
                    for (index in lt){
                        data[i].push(lt[index])
                    }
                }
                else data[i] = data[i].split(',')
                if (i == 0) continue
                update.push(new Date(data[i].slice(2,3)))
                death.push(Number(data[i].slice(-1)))
                if ( i == 1) {
                    death_date['d'+String(update[i-1].getDate())] = death[i-1]
                    update_date.push(update[i-1])
                    continue
                }
                if (update[i-1].getDate() == update[i-2].getDate()){
                    death_date['d'+String(update[i-1].getDate())] += death[i-1]
                }
                else {
                    death_date['d'+String(update[i-1].getDate())] = death[i-1]
                    if (update[i-1].getDate()){
                        update_date.push(update[i-1])
                    }
                }
            }
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var s = []
            update_date.forEach(item => s.push(months[item.getMonth()] + ' ' + item.getDate()))
            var chart = Highcharts.chart('container1', {
                chart: {
                    type: 'cylinder',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 50,
                        viewDistance: 25
                    }
                },
                title: {
                    text: 'Global Death due to Corona Virus'
                },
                plotOptions: {
                    series: {
                        depth: 25,
                        colorByPoint: true
                    }
                },
                xAxis: {
                    tickInterval: 1,
                    labels: {
                        enabled: true,
                        formatter: function() { return s[this.value];},
                    }
                },
                series: [{
                    data: Object.values(death_date),
                    name: 'Death',
                    showInLegend: false
                }]
            });
        }

        reader.readAsText(fileUpload.files[0]);
        } else {
        alert("This browser does not support HTML5.");
        }
    } 
    else {
      alert("Please upload a valid CSV file.");
    }
}
var chart = new Highcharts.Chart({
    title: {
        text:"Global Death due to Corona Virus"
    },
    chart: {
        renderTo: 'container1'
    },
    xAxis: {
        type: 'date'
    },
    series: [{
        data: [],
    }]
});
