
angular
    .module('RDash')
    .directive('chartPorRelacion', [
        '$rootScope',
        'barChartFactoryService',
        'toolsService',
        chartPorRelacion
    ]);


function chartPorRelacion($rootScope,barChartSrv,tools) {


    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=?mdato'
        },
        templateUrl: 'templates/directives/chartPorRelacion/chart-por-relacion.directive.html',
        link: function (scope, element, attrs, controllers, $jq) {

            //>>Objeto prototipo /////////////////////////////
            var protoObj={
                txTitulo:'Titulo de Prueba',
                chartOpt:{
                    txCategoryField:'txCategoria',
                    lstTxDataField:[
                        "nuValor"
                    ],
                    chart:{
                        categoryField:"tx"
                    }
                },
                id:"20",
                data:[]
            };

            //>> Funcion de Inicialización ///////////////////
            scope.init=function(){
                this.loadOpts();
                this.createChart();
            };

            //>> Funcion de seteo de datos por defecto de la directiva //////////////////
            scope.loadOpts=function () {
                var tmp={};
                angular.merge(tmp,protoObj,scope.mdato);
                scope.mdato=tmp;
                scope.mdato.idDiv="barChart"+scope.mdato.id;
            };

            scope.createChart=function () {
                console.log("CREATE CHART ------------------------------");
                var opts={
                    lstTxDataField:[
                        {
                            valueField:"nuValor",
                            color:"#8FD9CC",
                        }
                    ],
                    lstValueAxis:[
                        {
                            title:"Hola",
                        }
                    ],
                    chart:{
                        categoryField:"txCategoria"
                    },
                    data: scope.mdato.data
                };
                var tmpChart=barChartSrv.getChartObj(opts);
                //obtener el total

                var total=0;

                for(var i in scope.mdato.data){
                    total=scope.mdato.data[i].nuValor+total;
                }

                tmpChart=barChartSrv.setValueOnTop(tmpChart,{
                    attr:"nuValor",
                },function (maxValue,value) {
                    //Obtener el total

                    return tools.numberWithCommas( value );
                });

                //console.log(tmpChart);
                $(element).find(".chartContainer").first().attr("id",scope.mdato.idDiv);
                scope.chart = AmCharts.makeChart(scope.mdato.idDiv,tmpChart);
            };

            scope.$watch('mdato',function(newVal,oldVal){
                if(newVal){
                    scope.mdato=newVal;
                    scope.createChart();
                }
            });


            scope.init();
        }//endFunc:link
    };

    //Return de la directiva
    return directive;
};