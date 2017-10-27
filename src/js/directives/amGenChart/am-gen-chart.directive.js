angular
    .module('RDash')
    .directive('amGenChart', [
        '$rootScope',
        'toolsService'
    ,function ($rootScope,tools) {
            var directive = {
                restrict: 'E',
                transclude: true,
                scope: {
                    data: '=data',
                    id: '@',
                    chartOpts : "=chartOpts",
                    contOpts:"=contOpts",
                    jsonPath:"@",
                    postCreateFunction:"&"
                },
                templateUrl: 'templates/directives/amGenChart/am-gen-chart.directive.html',
                link: function (scope, element, attrs, controllers, $jq) {
                    console.log("init link func    ++++++++++++++++++++++++++");
                    console.log(scope.jsonPath);
                    scope.addZoomScroll=function (chartObj) {
                        if(angular.isDefined(scope.zoom)){
                            var zoom=scope.zoom;
                            chartObj.listeners=[{
                                event:"init",
                                method:function (e) {
                                    if(zoom){
                                        if(zoom.hasOwnProperty("ini") && zoom.hasOwnProperty("end")){
                                            e.chart.zoomToIndexes(zoom.ini, zoom.end);
                                        }
                                    }
                                }
                            }

                            ];
                        }
                        return chartObj;
                    };

                    scope.initAttrs=function () {
                        if(angular.isDefined(attrs.zoom)){
                            scope.zoom=scope.$eval(attrs.zoom);
                        }else{
                            scope.zoom=null;
                        }
                    };

                    //<editor-fold desc="Funciones">
                    scope.initChart=function () {
                        scope.initAttrs();
                        console.log("[amGenChart].[initChart] Inicio");
                        //Establecer el id
                        //$(element).find(".chartContainer").first().attr("id",scope.mdato.idDiv);
                        //$(element).attr("id",scope.id);
                        scope.idCont=scope.id+"-cont";
                        $(element).find(".chartContainer").first().attr("id",scope.idCont);

                        //Obtener json del chart
                        tools.getLocalJson(scope.jsonPath).then(
                            function (res) {
                                console.log("[amGenChart].[getLocalJson] Inicio");
                                var dest={};
                                var jsonData=res.data;
                                //console.log(scope.chartOpts);
                                angular.merge(dest,jsonData,scope.chartOpts);
                                //console.log(dest);
                                scope.chartObj=dest;
                                scope.chartObj.dataProvider=scope.data;

                                //Crear chart
                                scope.createChart();
                                console.log("[amGenChart].[getLocalJson] Fin");
                            }
                        );

                        console.log("[amGenChart].[initChart] Fin");
                    };

                    scope.createChart=function () {
                        console.log("create chart -----------------");
                        if(angular.isDefined(scope.chartObj) && angular.isDefined(scope.chartObj.dataProvider)){
                            scope.chartObj.dataProvider=scope.data;
                            scope.chartObj=scope.addZoomScroll(scope.chartObj);
                            if(angular.isDefined(scope.postCreateFunction) && typeof scope.postCreateFunction == 'function'){
                                //console.log("Ejecutado desde directive");
                                //console.log(scope.chartObj);
                                //console.log(scope.postCreateFunction);
                                scope.postCreateFunction({chart:scope.chartObj});
                            }
                            scope.chart = AmCharts.makeChart(scope.idCont,scope.chartObj);
                        }
                    };
                    //</editor-fold desc="Funciones">

                    //<editor-fold desc="Eventos">
                    scope.$watch('data',function(newVal,oldVal){
                        if(newVal){
                            scope.createChart();
                        }
                    });
                    //</editor-fold desc="Eventos">

                    scope.initChart();
                }
            };
            return directive;
    }]);