
angular
    .module('RDash')
    .directive('amGanttChart', ['$rootScope',amGanttChart]);

function amGanttChart($rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato'

        },
        templateUrl: 'templates/directives/amGanttChart/amGanttChartTmpl.html',
        link: function (scope, element, attrs, controllers, $jq) {

            //Datos plantilla de ejemplo-----------
            scope.chartOpt={

                idDiv:'testDiv',
                dataField:"nuValor",
                txTitulo:'Título de la Gráfica',
                categoryField:"txCategoria",
                barColor:"#99cccc",
                data:[{
                    "category": "Migración",
                    "segments": [{
                        "start": "2016-01-01",
                        "end": "2016-06-01",
                        //"duration": 1000,
                        "color": "#7B742C",
                        "task": "Task #1"
                    }, {
                        "start": "2016-06-02",
                        "end": "2016-07-01",
                        //"duration": 20,
                        "color": "#7E585F",
                        "task": "Task #2"
                    }]
                },
                    {
                        "category": "Mig",
                        "segments": [{
                            "start": "2017-01-01",
                            "end": "2017-06-01",
                            //"duration": 1000,
                            "color": "#7B742C",
                            "task": "Task #1"
                        }, {
                            "start": "2017-06-02",
                            "end": "2017-07-01",
                            //"duration": 20,
                            "color": "#7E585F",
                            "task": "Task #2"
                        }]
                    },
                    {
                        "category": "Mig2",
                        "segments": [{
                            "start": "2017-01-01",
                            "end": "2017-06-01",
                            //"duration": 1000,
                            "color": "#7B742C",
                            "task": "Task #1"
                        }, {
                            "start": "2017-06-01",
                            "end": "2017-07-01",
                            //"duration": 20,
                            "color": "#7E585F",
                            "task": "Task #2"
                        }]
                    },

                    {
                        "category": "Mig4",
                        "segments": [{
                            "start": "2017-01-01",
                            "end": "2017-06-01",
                            //"duration": 1000,
                            "color": "#7B742C",
                            "task": "Task #1"
                        }, {
                            "start": "2017-06-02",
                            "end": "2017-07-01",
                            //"duration": 20,
                            "color": "#7E585F",
                            "task": "Task #2"
                        }]
                    }


                ]
            };

            scope.dataPrepare=function(){
                scope.chartOpt.idDiv="amgantt"+scope.mdato.id;
                scope.chartOpt.txTitulo=scope.mdato.txTitulo;
                scope.chartOpt.data=scope.mdato.data;
                //angular.extend(scope.chartOpt,scope.mdato);

                //Establecer el id del div
                $(element).find(".chartContainer").first().attr("id",scope.chartOpt.idDiv);
            };

            //Datos plantilla de ejemplo-----------
            scope.createChart=function(){
                AmCharts.monthNames = [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre'];

                scope.chart = AmCharts.makeChart(scope.chartOpt.idDiv,
                    {
                        "language": "es",
                        "type": "gantt",
                        "theme": "light",
                        "marginRight": 20,
                        "period": "DD",
                        "dataDateFormat": "YYYY-MM-DD",
                        "columnWidth": 0.3,
                        "valueAxis": {
                            "type": "date",
                            "guides": [{
                                "value": AmCharts.stringToDate( "2017-01-01", "YYYY-MM-DD"),
                                "lineThickness": 10,
                                "lineColor": "#cc0000",
                                "label": "Actual",
                                "inside": false
                            }]
                        },
                        "brightnessStep": 7,
                        "graph": {
                            "fillAlphas": 1,
                            "lineAlpha": 1,
                            "lineColor": "#fff",
                            "fillAlphas": 0.85,
                            "balloonText": "<b>[[task]]</b>:<br />[[open]] -- [[value]]"
                        },
                        "rotate": true,
                        "categoryField": "category",
                        "segmentsField": "segments",
                        "colorField": "color",
                        "startDateField": "start",
                        "endDateField": "end",
                        "dataProvider": scope.chartOpt.data,
                        /*
                        "valueScrollbar": {
                            "autoGridCount": true
                        },
                        */
                        "chartCursor": {
                            "cursorColor": "#55bb76",
                            "valueBalloonsEnabled": false,
                            "cursorAlpha": 0,
                            "valueLineAlpha": 0.5,
                            "valueLineBalloonEnabled": true,
                            "valueLineEnabled": true,
                            "zoomable": false,
                            "valueZoomable": true
                        },
                        "export": {
                            "enabled": true
                        }
                    }
                );
            };//endfunc scope.createChart

            /*
            //Registrar evento para actualizar datos
            $rootScope.$on('amBarChartUpdate_'+scope.mdato.id,function(event,data){
                console.log('Entro');
                scope.dataPrepare();
                scope.createChart();
            });


            */

            //Actualizar cuando el dato cambie
            scope.$watch('mdato',function(newVal,oldVal){
                if(newVal){
                    console.log('Entro if GantChart chart');
                    console.log(scope.mdato);
                    scope.dataPrepare();
                    scope.createChart();
                }
            });
        }
    };

    //Return de la directiva
    return directive;
};