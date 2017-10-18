angular
    .module('RDash')
    .controller('capturaInicioDetalleViewCtrl', [
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
                idEstado:0,
                txEstado:"",
                txDerechohabientes:"",
                txMontoUnitario:"",
                txMontoTotal:"",
                txObservaciones:""
            };


            $scope.selectedMedida={};
            $scope.lstMedidas=[
                {
                    id:1,
                    tx:"Iniciativa 1"
                },
                {
                    id:2,
                    tx:"Iniciativa 2"
                },
            ]   ;
            $scope.selectedEstado={};
            $scope.lstEstado=[
                {
                    id:1,
                    tx:"Iniciativa 1"
                },
                {
                    id:2,
                    tx:"Iniciativa 2"
                },
            ]   ;

            $scope.init=function() {


                $scope.consultaRegistro();
                $scope.setServicioInicitiva();
                $scope.setServicioEstado();
                cds.doWorkTask('capturaInicioDetalle.Iniciativa');
                cds.doWorkTask('capturaInicioDetalle.Estado');
                //$scope.lstAsignacion=dss.datos.lstAsignacion;
                //$scope.busqueda.nuFuente = $scope.catLoc.tipos[0];
                //$scope.busqueda.txDictmen = $scope.catLoc.tiposDanos[0];
                //$scope.busqueda.txEstado = $scope.catLoc.estados[0];
            };

            ////////////////////////////////////////////
            //INICIALIZADOR *********************


            $scope.setServicioInicitiva=function () {
                cds.addWorkTask('capturaInicioDetalle.Iniciativa',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:12,
                        idGra:1,
                        idQry:1
                    },
                    success:function (response) {
                        console.log("success ******************************************");
                        console.log(response);
                        $scope.lstMedidas=response.data;
                        //$scope.gridOpt2.data=response.data; //<<RJLR
                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
            };

            $scope.setServicioEstado=function () {
                cds.addWorkTask('capturaInicioDetalle.Estado',{
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
                        //$scope.gridOpt2.data=response.data; //<<RJLR
                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
            };

            $scope.guardar=function () {
                console.log("click");
                $scope.guardarServidor();
            };

            $scope.guardarServidor=function () {
                    if( !($scope.selectedMedida && $scope.selectedEstado) ){
                        return;
                    }

                $scope.request.idIniciativa=$scope.selectedMedida.idIniciativa;
                $scope.request.idEstado=$scope.selectedEstado.idEstado;
                $scope.request.txEstado=$scope.selectedEstado.txEstado;
                $scope.request.txDerechohabientes=($scope.txDerechohabientes)?$scope.txDerechohabientes:"0" ;
                $scope.request.txMontoUnitario=($scope.txMontoUnitario)?$scope.txMontoUnitario:"0";
                $scope.request.txMontoTotal=($scope.txMontoTotal)?$scope.txMontoTotal:"0";
                $scope.request.txObservaciones=($scope.txObservaciones)?$scope.txObservaciones:"";

                /*
                $scope.request.txMontoUnitario=$scope.txMontoUnitario;
                $scope.request.txMontoTotal=$scope.txMontoTotal;
                $scope.request.txObservaciones=$scope.txObservaciones;
                */

                    $http({
                        url:gc.conf.xsServicesBaseUrl+'/dbInsertIniciativa.xsjs',
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
                        $('#exampleModal').modal('hide');
                        $rootScope.$emit('capturaDetalleRefresh',{});
                    },function(response,error){
                        //deferred.resolve(response.data);
                        console.log(response);
                    });

            };


            $rootScope.$on('consultaIncidenteDetalle',function(event,data){
                console.log(data);
                $scope.setData(data.currentMaster,data.currentDetail);
                $scope.init();
                $('#exampleModal').modal();
            });

            $scope.setData=function (ob1, ob2) {
                $scope.selectedMedida={};
                $scope.selectedEstado={};
                for(var i in $scope.lstMedidas){
                    if($scope.lstMedidas[i].idIniciativa == ob1.idIniciativa){
                        $scope.selectedMedida=$scope.lstMedidas[i];
                        break;
                    }
                }

                for(var i in $scope.lstEstado){
                    if($scope.lstEstado[i].txEstado == ob2.txEstado){
                        $scope.selectedEstado=$scope.lstEstado[i];
                        break;
                    }
                }

                $scope.txDerechohabientes=ob2.nuBeneficiados;
                $scope.txMontoUnitario=ob2.nuMontoUnitario;
                $scope.txMontoTotal=ob2.nuMontoTotal;
                $scope.txObservaciones=ob2.txObservaciones;
            };


            $scope.cancelar=function () {
                $('#exampleModal').modal('hide');
            };

            $scope.consultaRegistro=function () {
                console.log("consultaRegistro");
                console.log(gc.selectedIniciativaDetalle);
                if(!angular.isDefined(gc.selectedIniciativaDetalle)){
                    return;
                }

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

