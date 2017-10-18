
angular
    .module('RDash')
    .directive('amDonutPie', [
        '$rootScope'
        ,amDonutPie
    ]);

function amDonutPie($rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato',
            id: '=id'
        },
        templateUrl: 'templates/directives/amDonutPie/amDonutPie.html',
        link: function (scope, element, attrs, controllers, $jq) {
            //Datos plantilla de ejemplo-----------
            var templateMDato={
                dataField:"nuValor",
                txTitulo:'Título de la Gráfica',
                categoryField:"txCategoria",
                //barColor:"#99cccc",
                data:[
                    {
                        txCategoria:"Otro",
                        nuValor:3
                    }
                ]
            };

            /*
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
            */

            scope.dataPrepare=function(){
                console.log("111111111111111111111");
                angular.extend(templateMDato,scope.mdato);
                //scope.mdato=templateMDato;
                //scope.chartOpt.idDiv="amdp"+scope.id;
                //angular.extend(scope.chartOpt,scope.mdato);
                var tmpObj={};
                angular.merge(tmpObj,templateMDato,scope.mdato.chartOpt);
                scope.chartOpt=tmpObj;
                scope.chartOpt.idDiv="amdp"+scope.id;
                console.log(scope.chartOpt);

                //Establecer el id del div
                $(element).find(".chartContainer").first().attr("id",scope.chartOpt.idDiv);
            };

            //Datos plantilla de ejemplo-----------
            scope.createChart=function(){
                scope.chart = AmCharts.makeChart(scope.chartOpt.idDiv,
                    {
                        "type": "pie",
                        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
                        "innerRadius": "40%",
                        "titleField": scope.chartOpt.categoryField,
                        "valueField": scope.chartOpt.dataField,
                        "marginBottom": 1,
                        "marginLeft": 1,
                        "marginRight": 1,
                        "marginTop": 1,
                        "colors":scope.mdato.chartOpt.colors,
                        "theme": "light",
                        "labelsEnabled": true,

                        "labelRadius": -25,
                        "labelText": "[[value]]",
                        //"allLabels": [],
                        "balloon": {},
                        "legend": {
                            "enabled": true,
                            "align": "center",
                            "markerType": "circle",
                            "maxColumns": 0,
                            "position": "right"
                        },
                        //"titles": [],
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