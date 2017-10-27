angular
    .module('RDash')
    .controller('tableroReporteGlobalUsoReservaViewCtrl', [
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
        function($scope, $rootScope, $state, $stateParams, dc, gc, ngProgressFactory, dss, cs, $interval, tools, cds, uiGridConstants) {
            $scope.rows;
            var rows = [
                {"id": 1, "medida": "Movilidad Habitacional/Uso de saldo de la subcuenta de vivienda", "beneficiados": "-", "monto": "-"},
                {"id": 2, "medida": "No aplicacion del SIC", "beneficiados": "-", "monto": "-"},
                {"id": 3, "medida": "Linea IV en su versión sin afectación estructural y sin garantía hipotecaria", "beneficiados": "-", "monto": "-"},
                {"id": 4, "medida": "Otorgamineto inmediato del segundo crédito", "beneficiados": "-", "monto": "-"},
                {"id": 5, "medida": "Donativo Fundación Hogares", "beneficiados": "-", "monto": "-"}
            ];
            $scope.rows=rows;

            /* $scope.getChart1 = function() {

                cds.addWorkTask('iniciativa.indicador', {
                    url: gc.conf.xsServicesBaseUrl + '/dbTableroIniciativasGenerico.xsjs',
                    query: {
                        idIniciativa: $scope.idIniciativa
                    },
                    success: function(response) {
                        console.log("success");
                        console.log(response);
                        //$scope.censo.data=response.data;

                        $scope.setChart1Data(response);

                    },
                    error: function(response, error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
            }; */

            $scope.getTableData = function() {

                cds.addWorkTask('tableroReporteGlobalUsoReservaViewCtrl.tabla1',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:14,
                        idGra:5,
                        idQry:1
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        //$scope.maestroMedidasOpt.data = response.data;
                        $scope.rows=response.data;
                        // $scope.apply();
                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                        $scope.gridOptDet.data=[];
                        //$scope.apply();
                    }
                });

                cds.doWorkTask('tableroReporteGlobalUsoReservaViewCtrl.tabla1');
            };


            $scope.init = function() {
                //$scope.getChart1();
                $scope.getTableData();

            };

            $scope.init();
        }
    ]);