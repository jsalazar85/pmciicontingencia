
angular
    .module('RDash')
    .directive('topBarDir', ['$rootScope','$state',topBarDir]);

function topBarDir($rootScope,$state) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato'

        },
        templateUrl: 'templates/directives/topBar/topBarTmpl.html',
        link: function (scope, element, attrs, controllers, $jq) {
            ////////////////////////////////////////////
            //ATRIBUTOS Y VARIABLES *************
            scope.spinner={};
            scope.spinner.loading=false;
            scope.btns={};
            scope.btns.showReporte=true;

            ////////////////////////////////////////////
            //EVENTOS****************************
            $rootScope.$on('onSubTitleChange',function(event,data){
                scope.mdato.txSubTitulo=data.txSubTitulo;
            });

            $rootScope.$on('onShowReportButton',function(event,data){
                console.log('onShowReportButton');
                console.log(data);
                if(data){
                    scope.btns.showReporte=true;
                }else{
                    scope.btns.showReporte=false;
                }
                //scope.$apply();
            });

            $rootScope.$on('onHttpActivity', function (event,data){
                //console.log('onHttpActivity *****************');
                //console.log(data);
                var isLoading=data;
                if(isLoading){
                    $('#globalLoading').show();
                }else{
                    $('#globalLoading').hide();
                }
            });

            ////////////////////////////////////////////
            //FUNCIONES**************************
            scope.goTablero1=function(){
                $state.go('tablero1');
            };

            scope.menu=function (txMenu) {
                var tx=txMenu.toString().toLowerCase();
                if(tx == "busqueda"){
                    $state.go('consulta');
                }else if (tx == "tablero"){
                    $state.go('tableroMaster');
                }
            };

            ////////////////////////////////////////////
            //INICIALIZADOR *********************
        }//endFunc link
    };

    //Return de la directiva
    return directive;
};