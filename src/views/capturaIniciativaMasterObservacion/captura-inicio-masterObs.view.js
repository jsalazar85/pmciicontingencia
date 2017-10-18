angular
    .module('RDash')
    .controller('capturaObservacionViewCtrl', [
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
                idIniciativa:0,
                txObservaciones:""
            };



            $scope.init=function() {


             //   $scope.consultaRegistro();

                //$scope.setServicioInicitiva();
                //$scope.setServicioEstado();

                //$scope.lstAsignacion=dss.datos.lstAsignacion;
                //$scope.busqueda.nuFuente = $scope.catLoc.tipos[0];
                //$scope.busqueda.txDictmen = $scope.catLoc.tiposDanos[0];
                //$scope.busqueda.txEstado = $scope.catLoc.estados[0];
            };

            ////////////////////////////////////////////
            //INICIALIZADOR *********************



            $scope.cancelar=function () {
                $('#observacionMasterModal').modal('hide');
            };

            $scope.guardar=function () {
                console.log("click");
                $scope.guardarServidor();
            };

            $scope.guardarServidor=function () {

                $scope.request.idIniciativa=$scope.idIniciativa;
                $scope.request.txObservaciones=($scope.txObservaciones)?$scope.txObservaciones:"";

                /*
                $scope.request.txMontoUnitario=$scope.txMontoUnitario;
                $scope.request.txMontoTotal=$scope.txMontoTotal;
                $scope.request.txObservaciones=$scope.txObservaciones;
                */

                    $http({
                        url:gc.conf.xsServicesBaseUrl+'/dbActulizaObservaciones.xsjs',
                        method:'POST',
                        dataType:'json',
                        data:{dataobject:JSON.stringify($scope.request)},
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
                        //deferred.resolve(response.data);
                        console.log(response);
                        $('#observacionMasterModal').modal('hide');
                        $rootScope.$emit('capturaMasterObsRefresh',{}); //capturaDetalleRefresh
                    },function(response,error){
                        //deferred.resolve(response.data);
                        console.log(response);
                    });

            };


            $rootScope.$on('consultaIncidenteMasterObs',function(event,data){
                console.log(data);
                $scope.idIniciativa=data.currentMaster.idIniciativa;
                $scope.init();
                $('#observacionMasterModal').modal();
            });



            $scope.consultaRegistro=function () {
                console.log("consultaRegistro");

                $scope.consulta={};
                //$scope.consulta.txEstado=$rootScope.selectedIniciativaDetalle.txEstado.;

                $http({
                    url:gc.conf.xsServicesBaseUrl+'/dbDetalleIniciativaEstado.xsjs',
                    method:'POST',
                    dataType:'json',
                    data:{dataobject:JSON.stringify($scope.consulta)},
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
                    //deferred.resolve(response.data);
                    console.log(response);
                },function(response,error){
                    //deferred.resolve(response.data);
                    console.log(response);
                });

            };


            $scope.init();

        }
    ]);

