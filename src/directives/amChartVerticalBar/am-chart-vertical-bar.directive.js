angular
    .module('RDash')
    .directive('amChartVerticalBar', [
        '$rootScope',
        'toolsService',
        'chartDataService',
        'globalsController',
        '$compile',
    function ($rootScope,tools,cds,gc,$compile) {
            var directive = {
                restrict: 'E',
                transclude: true,
                scope: {
                    id: '@',
                    chartOpts : "=?chartOpts",
                    jsonChartPath:"@",
                    mockData:"=?",
                    lstObConditions:"=?"
                },
                templateUrl: 'templates/am-chart-vertical-bar.directive.html',
                compile: function (element, attrs) {
                    console.log("[amChartVerticalBar].[compile] ini");
                    var setOnTopAttrs={};
                    //console.log(attrs);

                    //Anadir los atributos
                    var addAttr=[];
                    if(angular.isDefined(attrs.id)){
                        addAttr.push('id="'+attrs.id+'"' );
                    }
                    if(angular.isDefined(attrs.jsonChartPath)){
                        addAttr.push('json-chart-path="' +attrs.jsonChartPath+'"' );
                    }
                    if(angular.isDefined(attrs.serviceCnf)){
                        addAttr.push('service-cnf="' +attrs.serviceCnf+'"' );
                    }
                    if(angular.isDefined(attrs.mockData)){
                        addAttr.push('mock-data="mockData"' );
                    }
                    if(angular.isDefined(attrs.clickEventName)){
                        addAttr.push('click-event-name="'+attrs.clickEventName+'"' );
                    }
                    if(angular.isDefined(attrs.lstObConditions)){
                        addAttr.push('lst-ob-conditions="lstObConditions"' );
                    }
                    if(angular.isDefined(attrs.zoom)){
                        addAttr.push('zoom="'+attrs.zoom+'"' );
                    }
                    if(angular.isDefined(attrs.setOnTop)){
                        var blSetOnTop=$rootScope.$eval(attrs.setOnTop);
                        if(blSetOnTop){
                            setOnTopAttrs.blSetOnTop=blSetOnTop;
                            if(angular.isDefined(attrs.maximizeAttr)){
                                setOnTopAttrs.maximizeAttr=attrs.maximizeAttr;
                            }
                            if(angular.isDefined(attrs.maxAttr)){
                                setOnTopAttrs.maxAttr=attrs.maxAttr;
                            }
                            if(angular.isDefined(attrs.maxAttrFormat)){
                                setOnTopAttrs.maxAttrFormat=attrs.maxAttrFormat;
                            }
                            if(angular.isDefined(attrs.maxGraphId)){
                                setOnTopAttrs.maxGraphId=attrs.maxGraphId;
                            }

                            //postCreateFunction
                            addAttr.push('post-create-function="postCreateFunction"' );
                        }
                    }

                    //console.log('<am-chart '+addAttr.join(" ")+' "></am-chart>');
                    var x = angular.element('<am-chart '+addAttr.join(" ")+'></am-chart>');
                    element.append(x);

                    console.log("[amChartVerticalBar].[compile] End");

                    return {
                        post:function postLink (scope, element, attrs) {
                            console.log(setOnTopAttrs);
                            var DATA_TASK_NAMESPACE="amChart";
                            var DATA_XSSERVICE_NAME="execTabQuery.xsjs";

                            scope.initAttrs=function () {
                                if(angular.isDefined(attrs.zoom)){
                                    scope.zoom=scope.$eval(attrs.zoom);
                                }else{
                                    scope.zoom=null;
                                }

                                if(angular.isDefined(attrs.serviceCnf)){
                                    scope.dataServiceCnf=scope.$eval(attrs.serviceCnf);
                                }else{
                                    scope.dataServiceCnf=null;
                                }

                                if(angular.isDefined(attrs.serviceCnf)){
                                    scope.dataServiceCnf=scope.$eval(attrs.serviceCnf);
                                }else{
                                    scope.dataServiceCnf=null;
                                }

                                if(angular.isDefined(attrs.lblOffset)){
                                    scope.lblOffset=scope.$eval(attrs.lblOffset);
                                }else{
                                    scope.lblOffset=15;
                                }


                            };

                            //<editor-fold desc="Funciones">
                            scope.initChart=function () {
                                console.log("[amChartVerticalBar].[initChart] Inicio");

                                scope.initAttrs();

                                //console.log(scope.id);
                                //console.log(scope.jsonChartPath);

                                console.log("[amChartVerticalBar].[initChart] Fin");
                            };


                            scope.postCreateFunction=function (chartObj) {
                                var chart=chartObj.chart;
                                console.log("[amChartVerticalBar].[postCreateFunction] Inicio");
                                var graph;
                                //console.log(chart);
                                if(setOnTopAttrs.blSetOnTop){
                                    var maxValue=tools.getMaxFromArrayOfObjs(chart.dataProvider,setOnTopAttrs.maximizeAttr);
                                    var len= maxValue.toString().length;
                                    //console.log(len);
                                    for(var i in chart.dataProvider){
                                        chart.dataProvider[i][setOnTopAttrs.maxAttr]=maxValue;
                                    }
                                    //console.log(chartObj);

                                    //Obtener el graph
                                    for(var i in chart.graphs){
                                        //console.log(chart.graphs[i]);
                                        if(chart.graphs[i].id == setOnTopAttrs.maxGraphId){
                                            graph=chart.graphs[i];
                                        }
                                    }

                                    if(graph){
                                        graph.labelFunction=function (value, valueString, axis) {
                                            //console.log(valueString);
                                            //console.log($.formatNumber(valueString, {format:setOnTopAttrs.maxAttrFormat, locale:"us"}));
                                            valueString=$.formatNumber(valueString, {format:setOnTopAttrs.maxAttrFormat, locale:"us"});
                                            graph.labelOffset=len*(-scope.lblOffset);
                                            //return  $.parseNumber(value, {format:setOnTopAttrs.maxAttrFormat, locale:"us"});
                                            return valueString;
                                        };
                                    }
                                }
                                console.log("[amChartVerticalBar].[postCreateFunction] Fin");
                            };


                            scope.initChart();
                        }
                    }

                    /*

                    var DATA_TASK_NAMESPACE="amChart";
                    var DATA_XSSERVICE_NAME="execTabQuery.xsjs";

                    scope.initAttrs=function () {
                        if(angular.isDefined(attrs.zoom)){
                            scope.zoom=scope.$eval(attrs.zoom);
                        }else{
                            scope.zoom=null;
                        }

                        if(angular.isDefined(attrs.serviceCnf)){
                            scope.dataServiceCnf=scope.$eval(attrs.serviceCnf);
                        }else{
                            scope.dataServiceCnf=null;
                        }
                    };

                    //<editor-fold desc="Funciones">
                    scope.initChart=function () {
                        console.log("[amChartVerticalBar].[initChart] Inicio");

                        scope.initAttrs();

                        console.log(scope.id);
                        console.log(scope.jsonChartPath);


                        $compile(x)(scope);

                        console.log("[amChartVerticalBar].[initChart] Fin");
                    };

                    scope.initChart();
                    */
                }
            };
            return directive;
    }]);