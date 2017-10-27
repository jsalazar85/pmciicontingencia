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
                    jsonChartPath:"@",
                    mockData:"=?",
                    postCreateFunction:"=?",
                    lstObConditions:"=?"
                },
                templateUrl: 'templates/am-chart.directive.html',
                link: function (scope, element, attrs, controllers, $jq) {
                    console.log(attrs);
                    console.log(scope.$eval(attrs.serviceCnf));
                    scope.dataServiceCnf=scope.$eval(attrs.serviceCnf);

                    var DATA_TASK_NAMESPACE="amChart";
                    var DATA_XSSERVICE_NAME="execTabQueryFilter.xsjs";

                    //<editor-fold desc="Funciones">
                    scope.initChart=function () {
                        console.log("[amChart].[initChart] Inicio");
                        //console.log(scope.id);
                        //console.log(scope.jsonChartPath);
                        //Establecer el id
                        //$(element).find(".chartContainer").first().attr("id",scope.mdato.idDiv);
                        //$(element).attr("id",scope.id);
                        scope.idCont=scope.id+"-cont";
                        $(element).find(".chartContainer").first().attr("id",scope.idCont);
                        scope.runTimes=0;

                        if(angular.isDefined(scope.lstObConditions)){
                            scope.$watch('lstObConditions',function (newVal,oldVal) {
                                //scope.lstObConditions=newVal;
                                console.log("on Watch");
                                console.log("on lstObConditions");
                                /*
                                scope.initDataService();
                                scope.getData();
                                */
                                if(scope.runTimes<1){
                                    return;
                                }

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

                                console.log("end Watch");
                            });
                        }


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

                        if(angular.isDefined(attrs.clickEventName)){
                            scope.clickEventName=attrs.clickEventName;
                        }
                    };

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

                    scope.addClickGraph=function (chartObj) {
                        if(angular.isDefined(scope.clickEventName)){
                            if(scope.clickEventName!=""){
                                chartObj.addListener("clickGraphItem",function (event) {
                                    $rootScope.$emit(scope.clickEventName,event,scope.chartObj);
                                });
                            }
                        }
                    };

                    scope.initDataService=function () {
                        console.log("[amChart].[initDataService] Init");
                        //Añadir nombre de la tarea
                        scope.dataTaskName=DATA_TASK_NAMESPACE+"."+scope.id;
                        //console.log(attrs.dataServiceCnf);
                        //console.log(scope.$eval(attrs.dataServiceCnf));

                        //scope.dataServiceCnf=scope.$eval(attrs.dataServiceCnf);
                        if(angular.isDefined(scope.lstObConditions)){
                            scope.dataServiceCnf.lstObConditions=scope.lstObConditions;
                        }

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
                                scope.addClickGraph(scope.chart);
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
                        if(!angular.isDefined(scope.mockData)){
                            cds.doWorkTask(scope.dataTaskName);
                        }else{
                            scope.data=scope.mockData;
                            scope.chartObj.dataProvider=scope.mockData;
                            scope.createChart();
                            scope.addClickGraph(scope.chart);
                        }

                        console.log("[amChart].[getData] End get data");
                    };

                    scope.createChart=function () {
                        scope.runTimes=scope.runTimes+1;
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