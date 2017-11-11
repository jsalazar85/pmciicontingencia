angular
    .module('RDash')
    .controller('capturaDelegacionesViewCtrl', [
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
        '$http',
        function ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,$http)  {

            $scope.request={
                idEstado:0,
                nuViviendasPendientes:0,
                nuDicFinalAsePerdidaTotal:0,
                nuDicFinalAseDanoParcial:0,
                nuDicFinalAseSinDanos:0
            };

            $rootScope.$on('capturaRegistroDelegaciones',function(event,data){
                console.log("capturaRegistroDelegaciones");
                console.log(data);
                $scope.clearData();
                $scope.setData(data.currentDetail);
                $scope.init();
                $('#modalCaptura').modal();
            });

            $scope.setData=function (ob2) {
                $scope.selectedEstado={};
                for(var i in $scope.lstEstado){
                    if($scope.lstEstado[i].idEstado == ob2.idEstado){
                        $scope.selectedEstado=$scope.lstEstado[i];
                        break;
                    }
                }
                $scope.nuUniversoViviendas=ob2.nuUniversoViviendas;
                $scope.nuViviendasPendientes=ob2.nuViviendasPendientes;
                $scope.nuViviendasProceso=ob2.nuViviendasProceso;
                $scope.nuDicFinalAsePerdidaTotal=ob2.nuDicFinalAsePerdidaTotal;
                $scope.nuDicFinalAseDanoParcial=ob2.nuDicFinalAseDanoParcial;
                $scope.nuDicFinalAseSinDanos=ob2.nuDicFinalAseSinDanos;
            };

            $scope.clearData=function () {
                data = {
                    idEstado:0,
                    txEstado:"",
                    nuUniversoViviendas:0,
                    nuViviendasPendientes:0,
                    nuViviendasProceso:0,
                    nuDicFinalAsePerdidaTotal:0,
                    nuDicFinalAseDanoParcial:0,
                    nuDicFinalAseSinDanos:0
                };
                $scope.setData(data);
            };

            $scope.setServicioEstado=function () {
                console.log("setServicioEstado");
                cds.addWorkTask('capturaDelegaciones.Estado',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:12,
                        idGra:2,
                        idQry:1
                    },
                    success:function (response) {
                        console.log("success ******************************************");
                        console.log(response);
                        $scope.lstEstado=response.data;
                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
            };

            $scope.guardar=function () {
                console.log("guardar");
                $scope.guardarServidor();
            };

            $scope.guardarServidor=function () {
                if( !($scope.selectedEstado) ){
                    return;
                }

                $scope.request.idEstado=$scope.selectedEstado.idEstado;
                $scope.request.nuViviendasPendientes=($scope.nuViviendasPendientes)?$scope.nuViviendasPendientes:"0";
                $scope.request.nuDicFinalAsePerdidaTotal=($scope.nuDicFinalAsePerdidaTotal)?$scope.nuDicFinalAsePerdidaTotal:"0";
                $scope.request.nuDicFinalAseDanoParcial=($scope.nuDicFinalAseDanoParcial)?$scope.nuDicFinalAseDanoParcial:"0";
                $scope.request.nuDicFinalAseSinDanos=($scope.nuDicFinalAseSinDanos)?$scope.nuDicFinalAseSinDanos:"0";
                console.log("request");
                console.log($scope.request);
                $http({
                    url:gc.conf.xsServicesBaseUrl+'/dbInsertDelegaciones.xsjs',
                    method:'POST',
                    dataType:'json',
                    data:{dataobject:JSON.stringify($scope.request)},
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
                    $('#modalCaptura').modal('hide');
                    $rootScope.$emit('capturaDelRefresh',{});
                },function(response,error){
                    console.log(response);
                });

            };

            $scope.cancelar=function () {
                $('#modalCaptura').modal('hide');
            };

            $scope.init=function() {
                $scope.setServicioEstado();
                cds.doWorkTask('capturaDelegaciones.Estado');
            };

            $scope.init();

        }
    ]);

