angular
    .module('RDash')
    .directive('amChart', [
        '$rootScope',
        'toolsService',
        'chartDataService',
        'globalsController',
    function ($rootScope,tools,cds,gc) {
            var directive = {
                restrict: 'E',
                transclude: true,
                scope: {
                    id: '@',
                    chartOpts : "=?chartOpts",
                    jsonChartPath:"@"
                },
                templateUrl: 'templates/directives/amGenChart/am-gen-chart.directive.html',
                link: function (scope, element, attrs, controllers, $jq) {
                    console.log(attrs);
                    console.log(scope.$eval(attrs.serviceCnf));
                    scope.dataServiceCnf=scope.$eval(attrs.serviceCnf);

                    var DATA_TASK_NAMESPACE="amChart";
                    var DATA_XSSERVICE_NAME="execTabQuery.xsjs";

                    //<editor-fold desc="Funciones">
                    scope.initChart=function () {
                        console.log("[amChart].[initChart] Inicio");
                        //Establecer el id
                        //$(element).find(".chartContainer").first().attr("id",scope.mdato.idDiv);
                        //$(element).attr("id",scope.id);
                        scope.idCont=scope.id+"-cont";
                        $(element).find(".chartContainer").first().attr("id",scope.idCont);

                        //Obtener json del chart
                        tools.getLocalJson(scope.jsonChartPath).then(
                            function (res) {
                                console.log("[amChart].[getLocalJson] Inicio");
                                var dest={};
                                var jsonData=res.data;
                                //console.log(scope.chartOpts)
                                if(!angular.isDefined(scope.chartOpts)){
                                    scope.chartOpts={};
                                }

                                angular.merge(dest,jsonData,scope.chartOpts);
                                console.log(dest);
                                scope.chartObj=dest;
                                scope.chartObj.dataProvider=scope.data;

                                //Crear chart
                                //scope.createChart();
                                console.log("[amChart].[getLocalJson] Fin");

                                scope.initAttrs();
                                scope.initDataService();
                                scope.getData();
                            }
                        );

                        console.log("[amChart].[initChart] Fin");
                    };

                    scope.initAttrs=function () {
                        if(angular.isDefined(attrs.zoom)){
                            scope.zoom=scope.$eval(attrs.zoom);
                        }else{
                            scope.zoom=null;
                        }
                    };

                    scope.addZoomScroll=function (chartObj) {
                        if(angular.isDefined(scope.zoom)){
                            var zoom=scope.zoom;
                            chartObj.listeners=[{
                                event:"init",
                                method:function (e) {
                                    e.chart.zoomToIndexes(zoom.ini, zoom.end);
                                }
                            }

                            ];
                        }
                        return chartObj;
                    };

                    scope.initDataService=function () {
                        console.log("[amChart].[initDataService] Init");
                        //Añadir nombre de la tarea
                        scope.dataTaskName=DATA_TASK_NAMESPACE+"."+scope.id;
                        //console.log(attrs.dataServiceCnf);
                        //console.log(scope.$eval(attrs.dataServiceCnf));

                        //scope.dataServiceCnf=scope.$eval(attrs.dataServiceCnf);

                        var taskURL=gc.conf.xsServicesBaseUrl+'/'+DATA_XSSERVICE_NAME;
                        cds.addWorkTask(scope.dataTaskName,{
                            url:taskURL,
                            query:scope.dataServiceCnf,
                            success:function (response) {
                                console.log("[amChart].[initDataService].[success] Init");
                                console.log("success");
                                console.log(response);
                                scope.data=response.data;
                                scope.chartObj.dataProvider=scope.data;
                                scope.createChart();
                                console.log("[amChart].[initDataService].[success] End");
                            },
                            error:function (response,error) {
                                console.log("[amChart].[initDataService].[error] Init");
                                console.log("Error");
                                console.log(error);
                                console.log("[amChart].[initDataService].[error] End");
                            }
                        });
                        console.log("[amChart].[initDataService] End");
                    };

                    scope.getData=function () {
                        console.log("[amChart].[getData] Init get data");
                        cds.doWorkTask(scope.dataTaskName);
                        console.log("[amChart].[getData] End get data");
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
                            console.log("Chart created -----------------");
                        }
                    };
                    //</editor-fold desc="Funciones">

                    //<editor-fold desc="Eventos">
                    /*
                    scope.$watch('data',function(newVal,oldVal){
                        if(newVal){
                            scope.createChart();
                        }
                    });
                    **/
                    //</editor-fold desc="Eventos">

                    scope.initChart();
                }
            };
            return directive;
    }]);