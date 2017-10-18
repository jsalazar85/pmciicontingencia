
angular
    .module('RDash')
    .directive('amprogresschart', amprogresschart);

function amprogresschart() {
    var directive = {
        //require: ['^^myTabs', 'ngModel'],
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato'
        },
        templateUrl: 'templates/directives/amProgressChart/amProgressChart.html',
        link: function(scope, element, attrs, controllers,$jq) {

            scope.title1=false;
            scope.title2=true;



            //Debug
            console.log(scope.mdato);

            //Carga de datos
            scope.setData=function(){

                if(!scope.mdato){
                    scope.mdato={
                        nuAvanceReal:0.0,
                        nuAvanceComp:0.0,
                        nuVariacion:0.0,
                        nuAvanceMaximo:1,
                        nuSemaforo:1, //1 verde, 2 amarillo, 3 rojo
                        txTitulo:"",
                        txTop:"Test",
                        txBot:"",
                    };
                }

                scope.mdato.idDiv="id"+scope.mdato.id;
                scope.chartData={};

                scope.chartData.nuAvanceStartVal=0;
                scope.chartData.nuAvanceEndVal=scope.mdato.nuAvanceReal;

                scope.chartData.nuRestoStartVal=scope.mdato.nuAvanceReal;
                scope.chartData.nuRestoEndVal=scope.mdato.nuAvanceMaximo;

                scope.chartData.txBottomText=scope.mdato.nuAvanceReal;
                scope.chartData.txBottomText=scope.chartData.txBottomText+"";

                //Establecer id para div que contendrá el chart.
                $(element).find(".pm-progressChart-chart").first().attr("id",scope.mdato.idDiv);

                //Establecer color del semaforo
                if(scope.mdato.nuSemaforo == 1){//1=verde
                    scope.mdato.hexColor="#99cc66";
                } else if(scope.mdato.nuSemaforo == 2){ //2 amarillo
                    scope.mdato.hexColor="#ff9933";
                }else if(scope.mdato.nuSemaforo == 3){ //3 rojo
                    scope.mdato.hexColor="#cc3333";
                }

                if(scope.mdato.titleClass){
                    scope.titleClass =scope.mdato.titleClass;
                }else{
                    scope.titleClass={
                        'pm-progressChart-title':true
                    };
                }


                //Establecer el color al texto
                $(element).find(".pm-progressChart-txavance-p").first().css("color",scope.mdato.hexColor);
                console.log($(element).find(".pm-progressChart-txavance-p").first());
            };



            //Creación del chart
            scope.createChart=function(){
                scope.chart = AmCharts.makeChart(scope.mdato.idDiv,
                    {
                        "type": "gauge",
                        "autoResize": false,
                        "fontFamily": "Helvetica",
                        "arrows": [
                            {
                                "color": "#888888",
                                "id": "GaugeArrow-1",
                                "innerRadius": "60%",
                                "nailRadius": 0,
                                //"radius": "90%",
                                "startWidth": 5,
                                "value": scope.mdato.nuAvanceComp
                            }
                        ],
                        "axes": [
                            {
                                "axisAlpha": 0,
                                "tickAlpha": 0.0,
                                "labelsEnabled": false,
                                "inside": false,
                                "gridInside": false,
                                "bottomText": scope.chartData.txBottomText,
                                "bottomTextFontSize": 25,
                                "bottomTextYOffset": -59,
                                "bottomTextColor": scope.mdato.hexColor,
                                "endAngle": 130,
                                "endValue": scope.chartData.nuRestoEndVal,
                                "id": "GaugeAxis-1",
                                "startAngle": -130,
                                //"valueInterval": 25,
                                "radius": "100%",
                                "bands": [
                                    {
                                        "color": scope.mdato.hexColor,
                                        "endValue": scope.chartData.nuAvanceEndVal,
                                        "id": "GaugeBand-2",
                                        "innerRadius": "70%",
                                        "startValue": scope.chartData.nuAvanceStartVal
                                    },
                                    {
                                        "color": "#e0e0e0",
                                        "endValue": scope.chartData.nuRestoEndVal,
                                        "id": "GaugeBand-3",
                                        "innerRadius": "70%",
                                        "startValue": scope.chartData.nuRestoStartVal
                                    }
                                ]
                            }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "responsive": {
                            "enabled": true
                        },
                    }
                    );
            };

            scope.setData();
            scope.createChart();

            //Observar para cuando dato cambie y actualizar el chart
            /*
            scope.$watch('mdato',function(newVal,oldVal){
                console.log('Wath!!!!');
                if(newVal){
                    console.log('Entro if progress chart');

                    scope.setData();
                    scope.createChart();
                }
            });
            */

            scope.$watch('mdato',function(newVal,oldVal){
                console.log('ProgresChart');
                if(newVal){
                    scope.mdato=newVal;
                    console.log('Entro if progress chart');
                    console.log(newVal);

                    scope.setData();
                    console.log('End setdata');
                    console.log(scope.chartData);
                    scope.createChart();
                }
            });

        }
    };
    return directive;
};

