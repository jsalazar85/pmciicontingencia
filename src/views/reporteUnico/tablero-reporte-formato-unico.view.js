
angular
    .module('RDash')
    .controller('tablerReporteFormatUnicoCtrl', [
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
        'uiGridFactoryService',
        '$http',
        function ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,gridFactory,$http) {
            var selectionCellTemplateD = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;">' +
                ' <div ng-click="grid.appScope.rowClickD(row)"><i class="fa fa-pencil" aria-hidden="true"></div>' +
                '</div>';
            $scope.detalleMedidasOpt = {
                data: []
            };

            $scope.resumenIniciativas=[];

            var detalleColDefTemplate=[
                {
                    field:"txEstado",
                    name:"Por Estado",
                    footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                    width:"30%",
                    //cellTemplate: selectionCellTemplateD
                }
            ];

            //OBTENER EL RESUMEN-----------------------------------
            $scope.getResumen=function () {
                //Obtener detalle
                cds.addWorkTask('tablerReporteFormatUnicoCtrl.getResumen',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:15,
                        idGra:1,
                        idQry:1,
                        lstObConditions:[
                            {
                                txCol:"ID_INICIATIVA",
                                txAlias:"A",
                                varValue:$scope.idIniciativa,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            }
                        ]
                    },
                    success:function (response) {
                        console.log("success ******************************************");
                        console.log(response);

                        $scope.obResumen=response.data[0];
                        console.log($scope.obResumen);
                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });

                cds.doWorkTask('tablerReporteFormatUnicoCtrl.getResumen');
            };
            //-----------------

            //OBTENER EL DETALLE DE LAS INICIATIVAS------------------
            $scope.getDetalle=function (idMedida) {
                $http({
                    url:gc.conf.xsServicesBaseUrl+'/dbResumenIniciativas.xsjs',
                    method:'POST',
                    dataType:'json',
                    data:{dataobject:JSON.stringify({idIniciativa:idMedida})},
                    //data: JSON.stringify ( {dataobject:{testob:"test"}} ),
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept':'application/json, text/javascript, */*; q=0.01'
                    }
                }).then(function(response){
                    console.log(response);
                    $scope.obDetalle=response.data.direccion;

                },function(response,error){
                    //deferred.resolve(response.data);
                    if(angular.isDefined(workTask.task.success)){
                        workTask.task.fail(response,error);
                    }else{
                        console.log("[chartDataService].[doWorkTask] Fail function not defined");
                    }
                });
            };
            //-----------------

            //OBTENER EL DETALLE DE LAS INICIATIVAS------------------
            $scope.initObjets=function () {
                //Objeto de resumen
                $scope.obResumen;

                //Objeto de detalle
                $scope.obDetalle;

            };
            //-----------------


            //OBTENER EL DETALLE DE LAS INICIATIVAS------------------
            $scope.selectView=function (idIniciativa) {
                $scope.s=1;
                if(idIniciativa==12 || idIniciativa==26 || idIniciativa==14){
                    //$scope.s2=true;
                    $scope.s=2;
                }else if(idIniciativa==22){
                    $scope.s=8;
                }else if(idIniciativa==23){
                    $scope.s=9;
                }
                else if(idIniciativa==15){
                    $scope.s=3;
                }else if(idIniciativa==24){
                    $scope.s=4;
                }else if(idIniciativa==17){
                    $scope.s=5;
                }else if(idIniciativa==21 ){
                    $scope.s=6;
                } else {
                    $scope.s=1;
                }
            };
            //-----------------


            $rootScope.$on("refreshTableroIniciativaGenerico",function (event,id) {
                //console.log("Evento refreshTableroIniciativaGenerico");
                $scope.idIniciativa=id;
                $scope.currentMaster= {
                    idIniciativa:id
                };
                $scope.init();
            });

            $scope.init=function () {
                //$scope.createDetalleColums();
                //$scope.idIniciativa=17;

                $scope.selectView($scope.idIniciativa);
                $scope.initObjets();
                $scope.getResumen();
                $scope.getDetalle($scope.idIniciativa);
            };

            $scope.init();
        }
    ]);
