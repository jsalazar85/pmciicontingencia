
angular
    .module('RDash')
    .controller('tableroIniciativa04ViewCtrl', [
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
            $scope.getIndicadorData=function () {

                cds.addWorkTask('iniciativa04.indicador',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:11,
                        idGra:3,
                        idQry:1
                    },
                    success:function (response) {
                        console.log("success");
                        console.log(response);
                        $scope.indicador=response.data[0];
                        //$scope.censo.data=response.data;
                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
            };

            $scope.init=function () {
                $scope.indicador={};
                $scope.getIndicadorData();
                cds.doWorkTask('iniciativa04.indicador');
            };

            $scope.init();
        }
    ]);