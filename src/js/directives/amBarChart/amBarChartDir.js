
angular
    .module('RDash')
    .directive('amBarChart', ['$rootScope',amBarChart]);

function amBarChart($rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato',
            id: '=id'
        },
        templateUrl: 'templates/directives/amBarChart/amBarChartTmpl.html',
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
                        "type": "serial",
                        "categoryField": scope.chartOpt.categoryField,
                        "rotate": true,
                        "startDuration": 1,
                        "fontFamily": "Helvetica",
                        "fontSize": 12,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "axisColor": "#AAB3B3",
                            "gridThickness": 0
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                                "balloonText": "[[title]] de [[category]]:[[value]]",
                                "color": "#000000",
                                "fillAlphas": 1,
                                "fontSize": 20,
                                "id": "AmGraph-1",
                                "labelAnchor": "middle",
                                "labelPosition": "middle",
                                "labelText": "[[value]]",
                                "title": "graph 1",
                                "type": "column",
                                "valueField": scope.chartOpt.dataField,
                                "visibleInLegend": false,
                                "fillColors": scope.chartOpt.barColor,
                                "lineColor": scope.chartOpt.barColor
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                "axisFrequency": 5,
                                "axisTitleOffset": -28,
                                "id": "ValueAxis-1",
                                //"maximum": 8,
                                "minimum": 0,
                                "position": "top",
                                "strictMinMax": true,
                                //"autoGridCount": false,
                                "title": "",
                                "axisColor": "#AAB3B3",
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "legend": {
                            "enabled": false
                        },
                        "dataProvider": scope.chartOpt.data
                    }
                );
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