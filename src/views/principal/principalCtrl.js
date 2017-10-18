
angular
    .module('RDash')
    .controller('principalCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        'consoleService',
        principalCtrl
    ]);

function principalCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cSrv) {
    ////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************

    //Atributos demo
    $scope.lstAsignacion=[];
    $scope.txBusqueda='';




    ///////////////////////////////////////////////////////////
    //Eventos **************************

    //Evento clck sobre el título
    $rootScope.$on('iscTitleClicked',function(event,data){
        console.log('iscTitleClicked');
        console.log(data);
        if(data.hasOwnProperty('txTipo')){
            if(data.txTipo=='HANA'){
                $state.go('gerencia',{idGerencia:data.idGerencia});
            }else if(data.txTipo!='HANA'){
                $state.go('gerenciads',{idGerencia:data.idGerencia});
            }
        }
    });


    ////////////////////////////////////////////
    //FUNCIONES**************************
    $scope.nuevo=function () {
        $state.go('nuevo');
    };

    $scope.edit=function (e,m) {
        console.log(e);

        console.log(m);
        $state.go('editar',{id:m.id});
    };


    this.init=function(){

        $rootScope.$emit('onSubTitleChange',{txSubTitulo:' - Principal'});
        $rootScope.$emit('onShowReportButton',true);

        if(dss.usuario){
            console.log('usuario existe');
        }else{
            console.log('usuario no existe');
            $state.go('login');
        }

        $scope.lstAsignacion=dss.datos.lstAsignacion;
        $scope.progressbar=ngProgressFactory.createInstance();
        $scope.progressbar.setColor("#000000");
        $scope.progressbar.setHeight("5px");

        $("#botonGuardarPrin").focus();

        /*
        dss.hasLandedIndex=true;

        //Progres
        $scope.progressbar=ngProgressFactory.createInstance();
        $scope.progressbar.setColor("#000000");
        $scope.progressbar.setHeight("5px");

        //Actualizar el titulo de la página
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:'Inicio'});

        //Cargar datos del servidor
        this.getServerData();
        */

        $scope.getServerData();
    };


    $scope.getServerData=function(){

        $.when(dc.getGridConsulta()).done(function(response){
            console.log(response);
            $scope.lstAsignacion=response.direccion;
            $scope.$apply();

        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);

        });
    };

    $scope.busquedaCredito=function(){
        $scope.progressbar.start();
        $.when(dc.busquedaCredito({txNuCredito:$scope.txBusqueda})).done(function(response){

            console.log(response);
            $scope.lstAsignacion=response.direccion;
            $scope.$apply();
            $scope.progressbar.complete();

        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
            $scope.progressbar.complete();
        });
    };



    this.setData=function(response){
        console.log('setData');

        angular.copy(response,dss.principalData);
        console.log(dss.principalData);
        //Cargar lista de servidores hana
        $scope.lstServidor=response.hana;

        //Cargar lista de servidores DS
        $scope.lstServidorDS=response.ds;

    };

    $scope.typeBusqueda=function (event) {

        console.log(event);



        if($scope.txBusqueda.length>=0 && event.keyCode==13){
            console.log('entro if');
            $scope.busquedaCredito();
        }
    };

    $scope.reporte=function () {
        console.log('reportte');
        $scope.getReporte();
    };


    $scope.getReporte=function(){
        //$scope.progressbar.start();
        dc.getReporte3();
    };


    //
    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();
};
