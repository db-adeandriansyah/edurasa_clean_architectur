import charts from 'charts'
export default class GrafikChart{
    constructor(){
        //elementControl 
        
        charts.load('current', {'packages':['corechart']});
        this.dataSumber = [];
        this.dataVisual = null;
        this.options = null;
        this.container = null;
    }
    
    set settingData(dataa){
        this.dataSumber =  dataa;
        
    }
    get settingData(){
        return this.dataSumber;
        
    }
    set settingOptions(option){
        this.options = option;
      
    }
    
    get settingOptions(){
        return this.options
      
    }
    
    executeInThisDom(container){
        this.container = container;
        return this;
    }
    initExec(data,option,container,mode){
      this.container = container;
      const ddata = google.visualization.arrayToDataTable(data);
      let opt = {};
      let tipeCart = ''
      if(mode.indexOf('PieChart')>-1){
        if(mode.indexOf('_')>-1){
          opt = Object.assign({},option,{
            // seriesType: 'bars',
            // series: {1: {type: 'line'}},
            // is3D: true,
            chartArea: {width: '50%'},
            pieHole:0.4,
            colors: ['#66CDAA', '#FF00FF', '#F0E68C','#DC143C',  '#B22222'],
          });

        }else{
          opt = Object.assign({},option,{
            chartArea: {width: '50%'},
            // seriesType: 'bars',
            // series: {1: {type: 'line'}},
            is3D: true,
            // pieHole:0.4
            colors: ['#66CDAA', '#FF00FF', '#F0E68C','#DC143C',  '#B22222'],
          });
        }
        tipeCart ='PieChart'
      }else{
        opt = Object.assign({},option,{
          chartArea: {width: '80%'},
          seriesType: 'bars',
          series: {5: {type: 'line'}},
          // is3D: true,
          // pieHole:0.4
        });
        tipeCart = mode;
      }
      const chart = new google.visualization[tipeCart](this.container);
      chart.draw(ddata, opt);

    }
    execFinalIn(data,option,container,mode){
      charts.setOnLoadCallback(()=>this.initExec(data,option,container,mode),{
          width: 400,
          height: 400,
          legend: 'right'
        })
    }
    sampleDrawChart() {
        const data = google.visualization.arrayToDataTable([
          ['City', '2010 Population',],
          ['New York City, NY', 8175000],
          ['Los Angeles, CA', 3792000],
          ['Chicago, IL', 2695000],
          ['Houston, TX', 2099000],
          ['Philadelphia, PA', 1526000]
        ]);
      
        const options = {
          title: 'Population of Largest U.S. Cities',
          chartArea: {width: '50%',height:'90%'},
          hAxis: {
            title: 'Total Population',
            minValue: 0
          },
          vAxis: {
            title: 'City'
          }
        };
        const container = document.getElementById('canvasgrafik');
        const chart = new google.visualization.BarChart(container);
        chart.draw(data, options);
    }
    exec(){
        
          charts.setOnLoadCallback(this.sampleDrawChart,{
            width: 400,
            height: 300,
          })

      }
}