/**
 * Created by DiHG on 01/10/17.
 */
angular
    .module('RDash')
    .service('barChartFactoryService',[
        '$interval',
        'toolsService',
    function($interval,tools) {

        //>> OBJETOS TIPO /////////////////////////
        //<editor-fold desc="Defaults">
        var gaphTypo={
            "balloonText": "[[category]]:[[value]]",
            "color": "#5bdaaf",
            "fillAlphas": 1,
            "fontSize": 18,
            "id": "AmGraph-1",
            "labelPosition": "right",
            "title": "graph 1",
            "type": "column",
            "valueField": "nuValor",
            "visibleInLegend": false,
            "fillColors": "#5bdaaf",
            "lineColor": "#5bdaaf",
            //"valueAxis":"va1",
            "columnWidth":'0.8'
        };

        var valueAxisTypo={
            "id": "va1",
            //"maximum": 10,
            //"minimum": 0,
            "position": "left",
            "strictMinMax": true,
            //"autoGridCount": false,
            //"gridCount":15,
            //"labelFrequency":5,
            "title": "",
            "labelsEnabled":true,
            "fontSize": 10,
            "rotate": true,
            "axisAlpha": 1
        };

        var chartOpt={
            "columnWidth": 1,
            "marginBottom": 0,
            "marginTop": 5,
            "type": "serial",
            //"categoryField": scope.chartOpt.txCategoryField,
            "categoryField": "",
            "rotate": true,
            "startDuration": 1,
            "fontFamily": "Helvetica",
            "fontSize": 12,
            //"color":"#ffffff",
            "categoryAxis": {
                "gridPosition": "start",
                "axisColor": "#AAB3B3",
                "gridThickness": 0,
                "position":"left",
                //"labelOffset":-50
                "inside":true,
                axisThickness:0,
                "axisAlpha": 0
            },
            "trendLines": [],
            color:"#111111",
            "graphs": [
            ],
            "guides": [],
            "valueAxes": [
            ],
            "legend": {
                "enabled": false
            },
            "responsive": {
                "enabled": true
            },
            "dataProvider": []
        };
        //</editor-fold>
        //<< OBJETOS TIPO /////////////////////////


        //<editor-fold desc="Functions">

        //Obtiene el chart
        this.getChartObj=function(customChartOpt,txVersion){
            console.log("getChartObj inicio");
            var returnObj={};
            if(!angular.isDefined(txVersion)){
                txVersion="1";
            }


            if(txVersion=="1"){
                returnObj=this.createChart(customChartOpt);
            }

            console.log(returnObj);
            console.log("getChartObj fin");
            return returnObj;
        };

        //Crea el objeto chart y lo retorna.
        this.createChart=function(customChartOpt){
            console.log('*****************************************');
            console.log('INICIA: createChart');
            var newChart={};
            newChart=angular.copy(chartOpt);

            //Establecer los graphs
            newChart.graphs=this.createGraphsArray(customChartOpt);
            newChart.valueAxes=this.createValueAxisArray(customChartOpt);
            newChart.dataProvider=customChartOpt.data;
            newChart=this.setChartAttrs(customChartOpt,newChart);

            console.log(newChart);
            console.log('FIN: createChart');
            console.log('*****************************************');

            return newChart;
        };

        //Crea los objetos graphs con base al array
        this.createGraphsArray=function (customChartOpt) {
            var lstGraph=[];
            //Si existe el array de opciones de dataFields para construir el array de graphs
            if(angular.isDefined(customChartOpt.lstTxDataField)){
                for(var i in customChartOpt.lstTxDataField){
                    customChartOpt.lstTxDataField[i]
                    var tmpGraph={};
                    angular.merge(tmpGraph,gaphTypo,customChartOpt.lstTxDataField[i]);
                    console.log(customChartOpt.lstTxDataField[i]);
                    tmpGraph.id="gp"+i;
                    lstGraph.push(tmpGraph);
                }
            }
            return lstGraph;
        };

        //Crear el value Axis
        this.createValueAxisArray=function (customChartOpt) {
            var lstValueAxis=[];

            if(angular.isDefined(customChartOpt.lstValueAxis)){
                for(var i in customChartOpt.lstValueAxis){
                    var tmpObj={};
                    angular.merge(tmpObj,customChartOpt.lstValueAxis[i],valueAxisTypo);
                    tmpObj.id="va"+i;
                    lstValueAxis.push(tmpObj);
                }
            }else{
                var tmpObj={};
                tmpObj=angular.copy(valueAxisTypo);
                lstValueAxis.push(tmpObj);
            }

            return lstValueAxis;
        };

        //EStablecer los valores por defecto del chart
        this.setChartAttrs=function (customChartOpt,newChart) {
            var tmpObj={};

            if(angular.isDefined(customChartOpt.chart)){

                angular.merge(tmpObj,newChart,customChartOpt.chart);
            }

            return tmpObj;
        };

        this.setValueOnTop=function (newChart,opt,convertFunction) {
            var maxValue=tools.getMaxFromArrayOfObjs(newChart.dataProvider,opt.attr);

            for(var i in newChart.dataProvider){
                newChart.dataProvider[i].maxValue=maxValue;
                //newChart.dataProvider[i].txValue=tools.numberWithCommas(newChart.dataProvider[i][opt.attr]);
                newChart.dataProvider[i].txValue=convertFunction(maxValue,newChart.dataProvider[i][opt.attr]);
            }

            var tmp={
                "balloonText": "[[category]]:[[value]]",
                "color": "#5bdaaf",
                "fillAlphas": 0,
                "lineAlpha":0,
                "fontSize": 20,
                "id": "ag"+newChart.dataProvider.length+1,
                "labelPosition": "right",
                "labelText": "[["+"txValue"+"]]",
                "title": "graph 1",
                "type": "column",
                "clustered":false,
                "valueField": "maxValue",
                "visibleInLegend": false,
                "fillColors": "#000000",
                "lineColor": "#000000",
                "color":"#000000",
                "valueAxis":"va1",
                "columnWidth":'0.1',
                "labelOffset":-100
            };

            newChart.graphs.push(tmp);

            return newChart;

        };
        //</editor-fold>

    }]);
