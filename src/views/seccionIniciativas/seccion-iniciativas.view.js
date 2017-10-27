
angular
    .module('RDash')
    .controller('seccionIniciativasViewCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        'consoleService',
        '$interval',
        'toolsService',
        'chartDataService',
        'uiGridConstants',
        function ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants) {

            //Servicio para cargar las iniciativas
            $scope.lstIniciativas=[];
            cds.addWorkTask('iniciativas.get',{
                url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                query:{
                    idTab:12,
                    idGra:3,
                    idQry:1
                },
                success:function (response) {
                    console.log("success");
                    console.log(response);
                    $scope.lstIniciativas=response.data;
                },
                error:function (response,error) {
                    console.log("Error");
                    console.log(error);
                }
            });

            cds.doWorkTask('iniciativas.get');

            /*
            $scope.areaAtnSrv.setTop=function (chart) {
                console.log('on set top');
                console.log(chart);
                if(angular.isDefined(chart)){
                    console.log('antes de');
                    barChartFactory.setValueOnTop(chart,{attr:"nuTotal"},function (maxValue,value) {
                        return value;
                    });
                    console.log('despues de ');
                }
            };
            */


            $scope.loadChart=function (id) {
                console.log(id);
                $rootScope.$emit("refreshTableroIniciativaGenerico",id);
            };
        }
    ]);