
angular
    .module('RDash')
    .directive('amstackedcolumn', ['globalsController','$state','$rootScope',amstackedcolumn]);

function amstackedcolumn(gc,$state,$rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato',
            dataConf :'=dataconf'
        },
        templateUrl: 'templates/directives/amstackedcolumn/amstackedcolumn.html',
        link: function(scope, element, attrs, controllers,$jq) {

            //Carga de datos
            scope.setData=function(){
                scope.mdato.idDiv="idSC"+scope.mdato.id;
                scope.chartData={};
                scope.chartData.category=scope.dataConf.categoryAttr;
                scope.chartData.val1=scope.dataConf.val1Attr;
                scope.chartData.val2=scope.dataConf.val2Attr;
                scope.chartData.tituloBar1="Completados";
                scope.chartData.tituloBar2="Faltantes";
                scope.chartData.tituloGrafica=scope.dataConf.txChartTitle;
                scope.chartData.tituloEjeVeritcal="Tablas";

                if(scope.dataConf.showScroll){
                    scope.chartData.scrollBar={
                        "autoGridCount": true,
                        "graph": "AmGraph-1",
                        "scrollbarHeight": 30

                    };
                }else{
                    scope.chartData.scrollBar=null;
                }

                //Establecer id para div que contendrá el chart.
                $(element).find(".chartContainer").first().attr("id",scope.mdato.idDiv);
            };


            scope.createChart=function(){
                //Cargar datos en el chart y sus propiedades
                scope.chart = AmCharts.makeChart(scope.mdato.idDiv, {
                    "type": "serial",
                    "categoryField": scope.chartData.category,
                    "columnSpacing": 15,
                    "autoMarginOffset": 9,
                    "marginBottom": 19,
                    "marginLeft": 19,
                    "marginRight": 19,
                    "marginTop": 19,
                    "minMarginBottom": 0,
                    "minMarginLeft": 0,
                    "minMarginRight": 0,
                    "plotAreaBorderColor": "#E7E7E7",
                    "startDuration": 1,
                    "theme": "light",
                    "categoryAxis": {
                        "gridPosition": "start"
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                            "balloonText": "[[title]] de [[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "title": scope.chartData.tituloBar1,
                            "type": "column",
                            "valueField": scope.chartData.val1
                        },
                        {
                            "balloonText": "[[title]] de [[category]]:[[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-2",
                            "title": scope.chartData.tituloBar2,
                            "type": "column",
                            "valueField": scope.chartData.val2
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "stackType": "regular",
                            "title": scope.chartData.tituloEjeVeritcal
                        }
                    ],
                    "allLabels": [],
                    "balloon": {},
                    "legend": {
                        "enabled": true,
                        "useGraphSettings": true
                    },
                    "chartScrollbar": scope.chartData.scrollBar,
                    "titles": [
                        {
                            "id": "Title-1",
                            "size": 15,
                            "text": scope.chartData.tituloGrafica
                        }
                    ],
                    "dataProvider": scope.mdato.arrayData
                });

                //Evento que se detona cuando se de click a un elemento de la grafica
                scope.chart.addListener("clickGraphItem",function(event){
                    console.log(event.item.dataContext);
                    $rootScope.$emit("amChartClickedItem",{
                        id:scope.mdato.id,
                        contextData:event.item.dataContext
                    });
                });
            };

            scope.setData();
            scope.createChart();

            //Observar para cuando dato cambie y actualizar el chart
            scope.$watch('mdato',function(newVal,oldVal){
                console.log('Wath!!!!');
                if(newVal){
                    scope.mdato=newVal;
                    console.log('Entro if stacked');

                    scope.setData();
                    scope.createChart();
                }
            });
        }
    };
    return directive;
};

