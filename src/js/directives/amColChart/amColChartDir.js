
angular
    .module('RDash')
    .directive('amColChart', ['$rootScope',amColChart]);

function amColChart($rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato',
            id: '=id'
        },
        templateUrl: 'templates/directives/amColChart/amColChartTmpl.html',
        link: function (scope, element, attrs, controllers, $jq) {
            //Datos plantilla de ejemplo-----------
            var templateMDato={
                dataField:'nuValor',
                txTitulo:'Título de la gráfica',
                categoryField:'txCategoria',
                barColor:'#99cccc',
                data:[]
            };

            scope.chartOpt={
                dataField:"nuValor",
                txTitulo:'Título de la Gráfica',
                categoryField:"txCategoria",
                barColor:"#99cccc",
                data:[
                    {
                        txCategoria:"Gerente Centro 1",
                        nuValor:3
                    }
                ]
            };

            scope.dataPrepare=function(){
                angular.extend(templateMDato,scope.mdato);
                //scope.mdato=templateMDato;
                scope.chartOpt.idDiv="amcd"+scope.id;
                //angular.extend(scope.chartOpt,scope.mdato);
                angular.extend(scope.chartOpt,templateMDato);

                //Establecer el id del div
                $(element).find(".chartContainer").first().attr("id",scope.chartOpt.idDiv);
            };

            //Datos plantilla de ejemplo-----------
            scope.createChart=function(){
                scope.chart = AmCharts.makeChart(scope.chartOpt.idDiv,
                    {
                        "language": "es",
                        "type": "serial",
                        "categoryField": scope.chartOpt.categoryField,
                        //"rotate": true,
                        "startDuration": 1,
                        "fontFamily": "Helvetica",
                        "fontSize": 12,
                        "autoDisplay": true,
                        "autoResize": true,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisColor": "#AAB3B3",
                            "gridThickness": 0
                        },
                        //'pathToImages':'/TableroSacsyr/AppCaptura/amcharts/images/',
                        'pathToImages':'amcharts/images/',
                        'svgIcons': false,

                        "trendLines": [],
                        "graphs": [
                            {
                                "balloonText": "[[category]]:[[value]]",
                                "color": "#000000",
                                "fillAlphas": 1,
                                "fontSize": 12,
                                "id": "AmGraph-1",
                                "labelAnchor": "middle",
                                "labelPosition": "middle",
                                //"labelText": "[[value]]",
                                "title": "graph 1",
                                "type": "column",
                                "valueField": scope.chartOpt.dataField,
                                "visibleInLegend": false,
                                "fillColors": scope.chartOpt.barColor,
                                "lineColor": scope.chartOpt.barColor
                            },
                            {
                                "id": "scrollbar",
                                "valueField": scope.chartOpt.dataField,
                                "lineAlpha": 0,
                                "labelText": "[[value]]",
                                //"type": "column",
                                "visibleInLegend": false,
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                "id": "ValueAxis-1",
                                "title": scope.chartOpt.txAxisTitle
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "legend": {
                            "enabled": false
                        },
                        "chartScrollbar": {
                            //"autoGridCount": true,
                            "graph": 'scrollbar',
                            "scrollbarHeight": 30,
                            "graphType": "column",

                        },
                        "chartCursor": {
                            "limitToGraph":"scrollbar"
                        },
                        "dataProvider": scope.chartOpt.data,
                        "listeners": [{
                            "event": "zoomed",
                            "method": function(e) {
                                console.log('Start zoom index: ', e.chart.startIndex,  'End zoom index: ', e.chart.endIndex);
                            }
                        },
                            {
                                event: "init",
                                method: function(e) {
                                    e.chart.zoomToIndexes(0, 6); //set default zoom
                                }
                            }
                        ]
                    }
                );



                //scope.chart.addListener("rendered",scope.zoomChart);



            };//endfunc scope.createChart



            //Registrar evento para actualizar datos
            $rootScope.$on('amBarChartUpdate_'+scope.mdato.id,function(event,data){
                scope.dataPrepare();
                scope.createChart();
            });

            //Actualizar cuando el dato cambie
            scope.$watch('mdato',function(newVal,oldVal){
                if(newVal){
                    scope.dataPrepare();
                    scope.createChart();
                }
            });
        }//endFunc:link
    };

    //Return de la directiva
    return directive;
};