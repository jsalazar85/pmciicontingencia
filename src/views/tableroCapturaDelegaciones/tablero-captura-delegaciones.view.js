angular
    .module('RDash')
    .controller('tableroCapturaDelegacionesViewCtrl', [
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

            var selectionCellTemplateMObs = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;">' +
                ' <div ng-click="grid.appScope.rowClicModReg(row)"><i class="fa fa-pencil" aria-hidden="true"></i></div>' +
                '</div>';

            $scope.gridCapturaDel = {
                data:[
                    {
                        idEstado:17000,
                        txEstado:'MORELOS',
                        nuUniversoViviendas: 2371,
                        nuViviendasPendientes: 280,
                        nuViviendasProceso: 2091,
                        nuDicFinalAsePerdidaTotal: 260,
                        nuDicFinalAseDanoParcial: 1655,
                        nuDicFinalAseSinDanos: 176
                    }
                ],
                columnDefs:[
                    {
                        field:"txEstado",
                        name:"ESTADO",
                        width:"11%"
                    },
                    {
                        field:"nuUniversoViviendas",
                        name:"VIVIENDAS INFONAVIT",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: false,
                        width:"16%"
                    },
                    {
                        field:"nuViviendasPendientes",
                        name:"POR VISITAR",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: false,
                        width:"11%"

                    },
                    {
                        field:"nuViviendasProceso",
                        name:"PROCESO REVISIÓN",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: false,
                        width:"14%"
                    },
                    {
                        field:"nuDicFinalAsePerdidaTotal",
                        name:"D. PÉRDIDA TOTAL",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: false,
                        width:"14%"
                    },
                    {
                        field:"nuDicFinalAseDanoParcial",
                        name:"D. DAÑO PARCIAL",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: false,
                        width:"14%"
                    },
                    {
                        field:"nuDicFinalAseSinDanos",
                        name:"D. SIN DAÑOS",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: false,
                        width:"11%"
                    },
                    {
                        name:"EDITAR",
                        width:"5%",
                        cellTemplate: selectionCellTemplateMObs
                    }
                ]
            };

            $scope.getTableData = function() {
                console.log("getTableData");
                cds.addWorkTask('tableroCapturaDelegacionesViewCtrl.tabla1',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:21,
                        idGra:1,
                        idQry:1
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        $scope.gridCapturaDel.data=response.data;

                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                        $scope.gridCapturaDel.data=[];
                    }
                });

                cds.doWorkTask('tableroCapturaDelegacionesViewCtrl.tabla1');
            };

            $rootScope.$on('capturaDelRefresh',function (event, data) {
                cds.doWorkTask('tableroCapturaDelegacionesViewCtrl.tabla1');
            });

            $scope.actualizar=function ($event) {
                cds.doWorkTask('tableroCapturaDelegacionesViewCtrl.tabla1');
            };

            $scope.rowClicModReg = function (row) {
                console.log(row);
                console.log(row.entity);
                $scope.currentDetail = row.entity;
                $scope.$emit('capturaRegistroDelegaciones', {currentDetail:$scope.currentDetail});
            };

            $scope.init = function() {
                $scope.getTableData();
            };

            $scope.init();
        }
    ]);