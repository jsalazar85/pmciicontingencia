
angular
    .module('RDash')
    .controller('loginCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        'consoleService',
        loginCtrl
    ]);

function loginCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cSrv) {
    ////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************

    //Atributos demo
    $scope.dataLogin={
        txUsuario:'',
        txPassword:''

    };
    $scope.showPwdIncorrecto=false;


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
    $scope.guardar=function () {
        cSrv.log('nuevo',true);
        cSrv.log($scope.selDictamen,false);
        cSrv.log($scope.asignacion,false);
        cSrv.log($scope.txEquipo,false);


        if($scope.creditoEncontrado==true ){

            if( $scope.asignacion.txEquipo!=""
                && $scope.asignacion.txZona!=""
                && $scope.asignacion.txNuCredito!=""
                && $scope.asignacion.txTelefono!=""
                && !$scope.asignacion.dictamen
                ){
                $scope.insertData();
            } else{
                alert('Llene la información para guardar información');
            }
        }else{
            alert('Llene la información para guardar información');
        }

    };

    $scope.buscar=function () {
        cSrv.log('Cancelar',false);
        $scope.getDataCred();
    };

    $scope.cancelar=function () {
        $state.go('index');
    };


    this.init=function(){
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:' - Inicio de Sesión'});
        $rootScope.$emit('onShowReportButton',false);
        //$rootScope.$emit('onIndexTitlePageChange',{txTitulo:''});


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
    };


    $scope.insertData=function(){
        //$scope.progressbar.start();
        $.when(dc.insertData1($scope.asignacion)).done(function(response){
            console.log(response);
            //$scope.progressbar.complete();
        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
            //$scope.progressbar.complete();
        });
    };

    $scope.getLogin=function(){
        //$scope.progressbar.start();
        console.log('GetData');
        $scope.busquedaCred=true;
        $.when(dc.getLogin($scope.dataLogin) ).done(function(response){
            console.log(response);

            if(response.direccion){
                console.log('logeado');
                dss.usuario=response.direccion;
                $state.go('index');
            }else{
                console.log('ERROR DE CONTRASEÑA');
                $scope.showPwdIncorrecto=true;
                $scope.$apply();
            }

        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
            //$scope.progressbar.complete();
            $scope.busquedaCred=false;
            $scope.showPwdIncorrecto=true;
            $scope.$apply();
        });
    };

    $scope.setDataNoDir=function(){
        $scope.direccion=$scope.direccionTmp;
    };

    $scope.login=function(){
        //$scope.direccion=$scope.direccionTmp;
        console.log($scope.dataLogin);
        $scope.getLogin();

    };

    $scope.enter=function(event){
        if(event.code=='Enter'){
            $scope.getLogin();
        }
    }

    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();
};
