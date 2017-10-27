
angular
    .module('RDash')
    .controller('tableroTablaIniciativaGenericoViewCtrl', [
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

            //Funcion para traer el detalle de las columnas
            $scope.createDetalleColums=function () {
                //Obtener detalle
                cds.addWorkTask('tableroTablaIniciativaGenericoViewCtrl.createDetalleColumns',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:14,
                        idGra:1,
                        idQry:1,
                        lstObConditions:[
                            {
                                txCol:"ID_INICIATIVA",
                                txAlias:"",
                                varValue:$scope.currentMaster.idIniciativa,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            }
                        ]
                    },
                    success:function (response) {
                        console.log("success ******************************************");
                        console.log(response);

                        //Con la definición de columnas, generar las necesarias para mapear el objeto
                        var cols=gridFactory.createColumunsIniciativa(response.data,[],70);
                        var newCols=[];
                        newCols=_.concat(detalleColDefTemplate,cols);
                        $scope.detalleMedidasOpt.columnDefs=newCols;
                        $scope.getDetalleTabla1Data($scope.currentMaster.idIniciativa);

                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });

                cds.doWorkTask('tableroTablaIniciativaGenericoViewCtrl.createDetalleColumns');
            };

            $scope.getDetalleTabla1Data=function (idMedida) {
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
                    $scope.detalleMedidasOpt.data = response.data.direccion;

                    $scope.mostrar=($scope.detalleMedidasOpt.data.length>0)?true:false;
                    /*
                     //deferred.resolve(response.data);
                     if(angular.isDefined(workTask.task.success)){
                     workTask.task.success(response.data);
                     }else{
                     console.log("[chartDataService].[doWorkTask] Success function not defined");
                     }
                     */
                },function(response,error){
                    //deferred.resolve(response.data);
                    if(angular.isDefined(workTask.task.success)){
                        workTask.task.fail(response,error);
                    }else{
                        console.log("[chartDataService].[doWorkTask] Fail function not defined");
                    }
                });

            };



            $rootScope.$on("refreshTableroIniciativaGenerico",function (event,id) {
                //console.log("Evento refreshTableroIniciativaGenerico");
                $scope.idIniciativa=id;
                $scope.currentMaster= {
                    idIniciativa:id
                };
                $scope.init();
            });

            $scope.init=function () {
                $scope.createDetalleColums();
            };

            //$scope.init();
        }
    ]);
