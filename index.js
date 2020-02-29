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


  function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();
        reader.onload = function (e) {
          data = e.target.result.split('\n')
          var province = []
          var country = []
          var update = []
          var update_date = []
          var confirmed = []
          var confirmed_date = []
          var suspected = []
          var suspected_date = []
          var recoverd = []
          var recoverd_date = []
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
            province.push(data[i].shift())
            country.push(data[i].shift())
            update.push(new Date(data[i].shift()))
            confirmed.push(Number(data[i].shift()))
            suspected.push(Number(data[i].shift()))
            recoverd.push(Number(data[i].shift()))
            death.push(Number(data[i].shift()))
            if ( i == 1) {
              confirmed_date['c'+String(update[i-1].getDate())] = confirmed[i-1]
              recoverd_date['r'+String(update[i-1].getDate())] = recoverd[i-1]
              suspected_date['s'+String(update[i-1].getDate())] = suspected[i-1]
              death_date['d'+String(update[i-1].getDate())] = death[i-1]
              update_date.push(update[i-1])
              continue
            }
            if (update[i-1].getDate() == update[i-2].getDate()){
                confirmed_date['c'+String(update[i-1].getDate())] += confirmed[i-1]
                recoverd_date['r'+String(update[i-1].getDate())] += recoverd[i-1]
                suspected_date['s'+String(update[i-1].getDate())] += suspected[i-1]
                death_date['d'+String(update[i-1].getDate())] += death[i-1]
            }
            else {
                confirmed_date['c'+String(update[i-1].getDate())] = confirmed[i-1]
                recoverd_date['r'+String(update[i-1].getDate())] = recoverd[i-1]
                suspected_date['s'+String(update[i-1].getDate())] = suspected[i-1]
                death_date['d'+String(update[i-1].getDate())] = death[i-1]
                if (update[i-1].getDate()){
                    update_date.push(update[i-1])
                }
                
            }
          }
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          
          var s = []
          update_date.forEach(item => s.push(months[item.getMonth()] + ' ' + item.getDate()))
          var chart = Highcharts.chart('container', {

            title: {
                text: 'Global Corona Virus Situation 2020/1/21 - 2020/2/5'
            },
        
            
            yAxis: {
                title: {
                    text: 'Number of Patients'
                }
            },
            xAxis: {
                tickInterval: 1,
                labels: {
                    enabled: true,
                    formatter: function() { return s[this.value];},
                }
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
        
            series: [{
                name: 'Confirmed',
                data: Object.values(confirmed_date)
            }, {
                name: 'Suspected',
                data: Object.values(suspected_date)
            }, {
                name: 'Recovered',
                data: Object.values(recoverd_date)
            }, {
                name: 'Death',
                data: Object.values(death_date)
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
        }

        reader.readAsText(fileUpload.files[0]);
      } else {
        alert("This browser does not support HTML5.");
      }
    } else {
      alert("Please upload a valid CSV file.");
    }
  }
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: 'container'
    },
    title: {
        text: 'Global Corona Virus Situation 2020/1/21 - 2020/2/5'
    },

    xAxis: {
      type: 'date'
    },
    series: [{
      data: [],
    }]
  });
