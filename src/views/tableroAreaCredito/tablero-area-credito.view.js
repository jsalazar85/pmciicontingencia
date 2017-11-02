angular
    .module('RDash')
    .controller('tableroAreaCredtioCtrl', [
        '$scope',
        '$rootScope',
        'tableroAreaCreditoSrvc',
        function($scope,$rootScope,tabSrvc){
            var ctrl=this;

            //Eventos------------------------
            ctrl.onGetTableData=function(event,data){
                console.log('onGetTableData');
                $scope.gridData=data;
                console.log(data);
            };

            ctrl.onGetGra1Data=function(event,data){
                console.log('onGetGra1Data');
                $scope.gra1Data=data;
                console.log(data);
            };

            ctrl.onGetGra2Data=function(event,data){
                console.log('onGetGra2Data');
                $scope.gra2Data=data;
                console.log(data);
            };

            //Funcion de inicialización--------------
            ctrl.init=function(){
                console.log('tableroAreaCarteraCtrl init');
                $scope.grid1Data=[];
                $scope.gra2Data=[];

                //Inscripción de eventos
                tabSrvc.suscribe($scope,ctrl.onGetTableData,tabSrvc.obEvents.GRID_DATA_READY);
                //tabSrvc.suscribe($scope,ctrl.onGetGra1Data,tabSrvc.obEvents.GRA1_DATA_READY);
                //tabSrvc.suscribe($scope,ctrl.onGetGra2Data,tabSrvc.obEvents.GRA2_DATA_READY);

                //Accionar respuesta
                tabSrvc.getTableData();
                //tabSrvc.getGra1Data();
                //tabSrvc.getGra2Data();
            };

            ctrl.init();
        }
    ]);