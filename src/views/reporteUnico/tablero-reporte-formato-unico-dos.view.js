angular
    .module('RDash')
    .controller('tableroReporteFormatoUnicoDosViewCtrl', [
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
           $scope.resumen;
           $scope.observaciones;
           $scope.encabezado;
            var rows = [
                {"id": 1, "estado": "Baja California Sur", "beneficiados": "4234", "monto": "136,973,235"},
                {"id": 2, "estado": "CDMX", "beneficiados": "34", "monto": "36,973,235"},
                {"id": 3, "estado": "Chiapas", "beneficiados": "343", "monto": "13,973,235"},
                {"id": 4, "estado": "Estado de México", "beneficiados": "45", "monto": "16,973,235"},
                {"id": 5, "estado": "Guerrero", "beneficiados": "786", "monto": "973,235"}
            ];

            var resumen = {"id": 1, "medida": "10a. Medidas de recaudación fiscal", "unidad":"Prorroga", "beneficiados": "100","empresas":"324","monto": "136,973,235"};
            var observaciones = "Observaciones de prueba";
            var encabezado = "10a. ROA - Medidas de recaudación fiscal. se otorgarán apoyos generales como prórrogas de pao. Pagos en mensualidades"
            $scope.rows=rows;
            $scope.resumen=resumen;
            $scope.observaciones=observaciones;
            $scope.encabezado=encabezado;
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

            $scope.init = function() {
                //$scope.getChart1();

            };

            $scope.init();
        }
    ]);