angular
    .module('RDash')
    .controller('busquedaDetalleCtrl', [
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


            $rootScope.$on('consultaDetalleRegistro',function(event,data){
                console.log("consultaDetalleRegistro");
                console.log(data);
                $scope.clearData();
                var condTxCredito = {
                    txCol: "TX_CREDITO",
                    txAlias: "",
                    varValue: data.currentDetail.txCredito,
                    txValueType: "TEXTO",
                    txLogicOperator: "AND",
                    txCompOperator: "="
                };
                var condNuNSS = {
                    txCol: "TX_NSS",
                    txAlias: "",
                    varValue: data.currentDetail.txNSS,
                    txValueType: "TEXTO",
                    txLogicOperator: "OR",
                    txCompOperator: "="
                };

                var obConditions = [];

                if (data.currentDetail.txCredito != undefined
                    && data.currentDetail.txCredito != ''
                    && data.currentDetail.txCredito != null) {
                    obConditions.push(condTxCredito);
                }
                if (data.currentDetail.txNSS != undefined
                    && data.currentDetail.txNSS !=''
                    && data.currentDetail.txNSS !=null) {
                    obConditions.push(condNuNSS);
                }
                console.log(obConditions);
                // detalle
                cds.addWorkTask('gridOptDet', {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 19,
                        idGra: 3,
                        idQry: 1,
                        lstObConditions: obConditions
                    },
                    success: function (response) {
                        console.log("success");
                        console.log(response);
                        if(response.data.length>0) {
                            $scope.setData(response.data[0]);
                        }
                    },
                    error: function (response, error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
                cds.doWorkTask('gridOptDet');
                $scope.init();
                $('#exampleModal').modal();
            });

            $scope.setData=function (ob2) {

                //$scope.selDetalleIni=ob2;
                //$scope.txFuente=ob2.txFuente;
                $scope.txCredito=ob2.txCredito;
                $scope.txNSS=ob2.txNSS;
                $scope.cvEstado=ob2.cvEstado;
                $scope.txEstado=ob2.txEstado;
                $scope.txMunicipio=ob2.txMunicipio;
                $scope.txCanal=ob2.txCanal;
                $scope.txRFC=ob2.txRFC;
                $scope.txCP=ob2.txCP;
                $scope.txDictamen=ob2.txDictamen;
                $scope.txEdificacion=ob2.txEdificacion;
                $scope.txDesastre=ob2.txDesastre;
                $scope.txTipoPersona=ob2.txTipoPersona;

            };

            $scope.clearData=function () {
                data = {
                    "txCredito": "",
                    "txNSS":"",
                    "cvEstado":"",
                    "txEstado":"",
                    "txMunicipio":"",
                    "txCanal":"",
                    "txRFC":"",
                    "txCP":"",
                    "txDictamen":"",
                    "txEdificacion":"",
                    "txDesastre":"",
                    "txTipoPersona":""
                }
                $scope.setData(data);
            };

            $scope.init=function() {

            };

            $scope.init();

        }
    ]);

