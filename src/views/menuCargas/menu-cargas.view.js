
angular
    .module('RDash')
    .controller('menuCargasViewCtrl', [
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
        function ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants) {


            $scope.initCat=function(){
                $scope.selectedArea={};
                $scope.selectedArchivo=null;

                $scope.catArea=[
                    {
                        idArea:1,
                        txArea:"Cartera"
                    }
                ];

                $scope.catAreaArchivo=[
                    {
                        idArea:1,
                        idArchivo:2,
                        txArchivo:"Resumen de Cartera"
                    }
                ];

                $scope.catArchivo=[];



                $scope.$watch('selectedArea',function (newVal,oldVal) {
                    console.log(newVal);
                    console.log(oldVal);

                    $scope.catArchivo=[];
                    $scope.selectedArchivo=null;
                    for(var i in $scope.catAreaArchivo){
                        if($scope.catAreaArchivo[i].idArea == newVal.idArea){
                            $scope.catArchivo.push($scope.catAreaArchivo[i]);
                        }
                    }
                });


                $scope.$watch('selectedArchivo',function (newVal,oldVal) {
                    if(newVal){
                        console.log(newVal);
                        $rootScope.$emit('areaArchivoSeleccionado',newVal);
                    }
                });
            };


            $scope.init=function () {
                $scope.initCat();
            };



            $scope.init();
        }
    ]);