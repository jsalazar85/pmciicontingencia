
angular
    .module('RDash')
    .controller('tableroIniciativaGenericoViewCtrl', [
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
            $scope.iniciativa={};
            $scope.iniciativa.chart1={};
            $scope.iniciativa.chart1.data=[];
            $scope.iniciativa.chart2={};
            $scope.iniciativa.chart2.data=[];
            $scope.idIniciativa=1;

            /*
            $scope.iniciativa.filtros={
                {
                    txCol:"TX_AREA_NEGOCIO",
                        txAlias:"",
                    varValue:txArea,
                    txValueType:"TEXTO",
                    txLogicOperator:"AND",
                    txCompOperator:"="
                }

            };
            */

            $scope.getChart1=function () {
                cds.addWorkTask('iniciativa.indicador',{
                    url:gc.conf.xsServicesBaseUrl+'/dbTableroIniciativasGenerico.xsjs',
                    query:{
                        idIniciativa:$scope.idIniciativa
                    },
                    success:function (response) {
                        console.log("success");
                        console.log(response);
                        //$scope.censo.data=response.data;

                        $scope.setChart1Data(response);

                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
            };

            $scope.getChart2=function () {
                cds.addWorkTask('iniciativa.indicador2',{
                    url:gc.conf.xsServicesBaseUrl+'/dbTableroIniciativasGenerico.xsjs',
                    query:{
                        idIniciativa:$scope.idIniciativa
                    },
                    success:function (response) {
                        console.log("success");
                        console.log(response);
                        //$scope.censo.data=response.data;

                        $scope.setChart1Data(response);
                        $scope.setChart2Data(response);

                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
            };

            $scope.setChart1Data=function (data) {
                console.log(data);
                $scope.iniciativa.chart1.data=data.porEdo;

                $scope.iniciativa.nuBeneficiados=data.total.nuBeneficiados;
                $scope.iniciativa.nuMonto=data.total.nuMontoTotal;
            };

            $scope.setChart2Data=function (data) {
                console.log(data);
                $scope.iniciativa.chart2.data=data.porEdo;

            };


            $scope.init=function () {
                $scope.getChart1();
                $scope.getChart2();
                cds.doWorkTask('iniciativa.indicador');
                cds.doWorkTask('iniciativa.indicador2');
            };

            $rootScope.$on("refreshTableroIniciativaGenerico",function (event,id) {
                //console.log("Evento refreshTableroIniciativaGenerico");
                $scope.idIniciativa=id;
                $scope.init();
            });

            $scope.init();
        }
    ]);