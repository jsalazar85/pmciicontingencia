
angular
    .module('RDash')
    .directive('amStackedBar', ['$rootScope',amStackedBar]);

function amStackedBar($rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato'

        },
        templateUrl: 'templates/directives/amStackedBar/amStackedBarTmpl.html',
        link: function (scope, element, attrs, controllers, $jq) {

            //Datos plantilla de ejemplo-----------
            scope.chartOpt={
                dataField1:"nuManto",
                dataField2:"nuProy",
                txTitulo:'Título de la Gráfica',
                txCategoriaTitulo1:'',
                txCategoriaTitulo2:'',
                categoryField:"txCategoria",
                barColor1:"#e15954",
                barColor2:"#fddddd",
                data:[
                    {
                        txCategoria:"Construcción",
                        nuManto:3,
                        nuProy:3
                    },
                    {
                        txCategoria:"desarrollo",
                        nuManto:3,
                        nuProy:3
                    }
                ],
                txValPost:''
            };

            scope.dataPrepare=function(){
                scope.chartOpt.idDiv="amcd"+scope.mdato.id;
                angular.extend(scope.chartOpt,scope.mdato);

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
                                "title": scope.chartOpt.txCategoriaTitulo1,
                                "type": "column",
                                "valueField": scope.chartOpt.dataField1,
                                "visibleInLegend": true,
                                "fillColors": scope.chartOpt.barColor1,
                                "lineColor": scope.chartOpt.barColor1
                            },
                            {
                                "balloonText": "[[title]] de [[category]]:[[value]]",
                                "color": "#000000",
                                "fillAlphas": 1,
                                "fontSize": 20,
                                "id": "AmGraph-2",
                                "labelAnchor": "middle",
                                "labelPosition": "middle",
                                "labelText": "[[value]]",
                                "title": scope.chartOpt.txCategoriaTitulo2,
                                "type": "column",
                                "valueField": scope.chartOpt.dataField2,
                                "visibleInLegend": true,
                                "fillColors": scope.chartOpt.barColor2,
                                "lineColor": scope.chartOpt.barColor2
                            }
                        ],
                        "guides": [],
                        "valueAxes": [
                            {
                                //"axisFrequency": 5,
                                "axisTitleOffset": -28,
                                "id": "ValueAxis-1",
                                "maximum": scope.chartOpt.maxVal,
                                "minimum": 0,
                                "position": "top",
                                //"strictMinMax": true,
                                "autoGridCount": true,
                                "gridCount":4,
                                "title": "",
                                "axisColor": "#AAB3B3",
                                "stackType": "regular",
                                "labelFunction":function(value){
                                    return value + scope.chartOpt.txValPost;
                                }

                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "legend": {
                            "enabled": true
                        },
                        "dataProvider": scope.chartOpt.data

                    }
                );
            };//endfunc scope.createChart

            //Registrar evento para actualizar datos
            $rootScope.$on('amBarChartUpdate_'+scope.mdato.id,function(event,data){
                console.log('Entro');
                scope.dataPrepare();
                scope.createChart();
            });

            //Actualizar cuando el dato cambie
            scope.$watch('mdato',function(newVal,oldVal){
                if(newVal){
                    console.log('Entro if progress chart');

                    scope.dataPrepare();
                    scope.createChart();
                }
            });

        }
    };

    //Return de la directiva
    return directive;
};