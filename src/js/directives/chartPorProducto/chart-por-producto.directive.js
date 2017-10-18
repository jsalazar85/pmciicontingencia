
angular
    .module('RDash')
    .directive('chartPorProducto', [
        '$rootScope',
        'barChartFactoryService',
        'toolsService',
        chartPorProducto
    ]);


function chartPorProducto($rootScope,barChartSrv,tools) {


    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=?mdato'
        },
        templateUrl: 'templates/directives/chartPorProducto/chart-por-producto.directive.html',
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
                id:"1",
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
                var opts={
                    lstTxDataField:[
                        {
                            valueField:"nuTO",
                            color:"#8FD9CC",
                        }
                    ],
                    lstValueAxis:[
                        {
                            title:"Hola",
                        }
                    ],
                    chart:{
                        categoryField:"txMunicipio"
                    },
                    data: scope.mdato.data
                };
                var tmpChart=barChartSrv.getChartObj(opts);
                //obtener el total
                var total=0;
                for(var i in scope.mdato.data){
                    total=scope.mdato.data[i].nuTO+total;
                }
                tmpChart=barChartSrv.setValueOnTop(tmpChart,{
                    attr:"nuTO",
                },function (maxValue,value) {
                    //Obtener el total

                    return tools.numberWithCommas( ((value/total)*100).toFixed(2))+" %";
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