
angular
    .module('RDash')
    .directive('chartDetalleDictamen', ['$rootScope',chartDetalleDictamen]);

function chartDetalleDictamen($rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato',
            id: '=id'
        },
        templateUrl: 'templates/directives/chartDetalleDictamen/chart-detalle-dictamen.directive.html',

        link: function (scope, element, attrs, controllers, $jq) {
            //Datos plantilla de ejemplo-----------
            var templateMDato={
                dataField:'nuValor',
                txTitulo:'Título de la gráfica',
                categoryField:'txCategoria',
                barColor:'#99cccc',
                data:[],
                series:[]
            };

            var garphTypo={
                "balloonText": "[[category]]:[[value]]",
                "color": "#000000",
                "fillAlphas": 1,
                "fontSize": 12,
                "id": "AmGraph-1",
                "labelAnchor": "middle",
                "labelPosition": "middle",
                "title": "graph 1",
                "type": "column",
                "valueField": '',
                "visibleInLegend": false,
                "fillColors": '',
                "lineColor": ''
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
                templateMDat=angular.merge(templateMDato,scope.mdato);
                //scope.mdato=templateMDato;
                scope.chartOpt.idDiv="amcd"+scope.id;
                //angular.extend(scope.chartOpt,scope.mdato);
                scope.chartOpt=angular.merge(scope.chartOpt,templateMDato);

                if(angular.isDefined(scope.mdato.series)){
                    console.log('################################################');
                    for(var i in scope.mdato.series){
                        scope.mdato.series[i]=angular.extend(garphTypo,scope.mdato.series[i]);
                        console.log(scope.mdato.series[i]);
                    }
                }

                //Establecer el id del div
                $(element).find(".chartContainer").first().attr("id",scope.chartOpt.idDiv);
            };

            //Datos plantilla de ejemplo-----------
            scope.createChart=function(){
                var tmpSerie={};
                angular.copy(tmpSerie,scope.mdato.series);


                scope.chart = AmCharts.makeChart(scope.chartOpt.idDiv,
                {
                    "language": "es",
                    "type": "serial",
                    "categoryField": "txCategoria",
                    "startDuration": 1,
                    "colors": [
                        '#9ADED2',
                        '#84C263',
                        '#7E0212',
                        '#d4d4d4',
                    ],
                    'pathToImages':'amcharts/images/',
                    'svgIcons': false,
                    "categoryAxis": {
                    "gridPosition": "start"
                },
                    "trendLines": [],
                    "graphs": [
                        {
                            "balloonText": "[[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "title": "Total",
                            "type": "column",
                            "valueField": "nuTO",
                            "labelText": "[[value]]",
                        },
                    {
                        "balloonText": "[[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-2",
                        "title": "Con Dictamen",
                        "type": "column",
                        "valueField": "nuDT",
                        "labelText": "[[value]]",
                    },
                    {
                        "balloonText": "[[category]]:[[value]]",
                        "fillAlphas": 1,
                        "id": "AmGraph-3",
                        "title": "Sin Dictamen",
                        "type": "column",
                        "valueField": "nuDP",
                        "labelText": "[[value]]",
                    },
                        {
                            "balloonText": "[[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-4",
                            "title": "NA",
                            "type": "column",
                            "valueField": "nuDO",
                            "labelText": "[[value]]",
                        },

                        /*
                        {
                            "balloonText": "[[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-3",
                            "title": "Daño Parcial",
                            "type": "column",
                            "valueField": "nuDP",
                            "labelText": "[[value]]",
                        },
                        {
                            "balloonText": "[[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-4",
                            "title": "Sin Daño",
                            "type": "column",
                            "valueField": "nuSD",
                            "labelText": "[[value]]",
                        },
                        {
                            "balloonText": "[[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-5",
                            "title": "Notificado",
                            "type": "column",
                            "valueField": "nuN",
                            "labelText": "[[value]]",
                        },
                        {
                            "balloonText": "[[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-6",
                            "title": "Sin Dictámen",
                            "type": "column",
                            "valueField": "nuNA",
                            "labelText": "[[value]]",
                        }*/
                ],
                    "guides": [],
                    "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "title": "Reportes"
                    }
                ],

                    "allLabels": [],
                    "balloon": {},
                    "legend": {
                    "enabled": true,
                        "useGraphSettings": true
                },
                    /*
                    "titles": [
                    {
                        "id": "Title-1",
                        "size": 15,
                        "text": "Chart Title"
                    }
                ],
                */
                    "dataProvider": scope.mdato.data,
                    "chartScrollbar": {
                        //"autoGridCount": true,
                        "graph": 'scrollbar',
                        "scrollbarHeight": 30,
                        "graphType": "AmGraph-1",

                    },

                    "listeners": [{
                        "event": "zoomed",
                        "method": function(e) {
                            console.log('Start zoom index: ', e.chart.startIndex,  'End zoom index: ', e.chart.endIndex);
                        }
                    },
                        {
                            event: "init",
                            method: function(e) {
                                e.chart.zoomToIndexes(0, 5); //set default zoom

                            }
                        }
                    ]
                });

                /*
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
                        "graphs":tmpSerie,
                        /*
                            [
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
*/


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