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
                enableGridMenu: true,
                exporterMenuCsv: false,
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

            $scope.generaXLSXTmp = function(){
                var nodos = document.getElementsByClassName("gridExportar");
                var nodo = nodos[0];
                console.log(nodo)
                var wb = XLSX.utils.table_to_book(nodo, {sheet:"Reporte"});
                var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
                var fname = 'Reporte.xlsx';
                try {
                    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fname);
                } catch(e) { if(typeof console != 'undefined') console.log(e, wbout); }
                return wbout;
            }

            function s2ab(s) {
                if(typeof ArrayBuffer !== 'undefined') {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                } else {
                    var buf = new Array(s.length);
                    for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
            }

            $scope.init = function() {
                $scope.getTableData();
            };

            $scope.init();
        }
    ]);