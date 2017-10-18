
angular
    .module('RDash')
    .controller('editIncidenteCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        'consoleService',
        editIncidenteCtrl
    ]);

function editIncidenteCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cSrv) {
    ////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************

    //Atributos demo
    $scope.lstDictamen=[];
    $scope.selDictamen={};
    $scope.asignacion={
        id:1,
        txEquipo:'',
        txZona:'',
        txNuCredito:'',
        dictamen:{},
        txTelefono:'',
    };
    $scope.direccion={
        txColonia:'-',
        txCalle:'-',
        txCodigoPostal:'-',
        txMunicipio:'-',
    };

    $scope.direccionTmp={
        txColonia:'-',
        txCalle:'-',
        txCodigoPostal:'-',
        txMunicipio:'-',
    };

    $scope.busquedaCred=false;
    $scope.creditoEncontrado=null;



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





            if( $scope.asignacion.txEquipo!=""
                && $scope.asignacion.txZona!=""
                && $scope.asignacion.txNuCredito!=""
                && $scope.asignacion.txTelefono!=""
                ){
                $scope.insertData();
            } else{
                alert('Llene los campos para guardar la información');
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
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:' - Edición'});

        if(dss.usuario){
            console.log('usuario existe');
        }else{
            console.log('usuario no existe');
            $state.go('login');
        }

        console.log('on init----------');
        $scope.lstDictamen=dss.catalogos.lstDictamen;
        $scope.getDataDictamen();
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
        console.log($scope.asignacion);
        $scope.asignacion.idUsuario=dss.usuario.id;
        $.when(dc.actualizaReg($scope.asignacion)).done(function(response){
            console.log(response);
            //$scope.progressbar.complete();
            $state.go('index');
        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
            //$scope.progressbar.complete();
        });
    };

    $scope.getDataCred=function(){
        //$scope.progressbar.start();
        console.log('GetData');
        $scope.busquedaCred=true;
        $.when(dc.getCreditoDireccion( {txNuCredito:$scope.asignacion.txNuCredito}) ).done(function(response){
            console.log(response);
            if(response.direccion){
                $scope.direccion=response.direccion;
                $scope.creditoEncontrado=true;
            }else{
                $scope.creditoEncontrado=false;
                $scope.setDataNoDir();
            }

            $scope.busquedaCred=false;
            $scope.$apply();

        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
            //$scope.progressbar.complete();
            $scope.busquedaCred=false;

            $scope.$apply();
        });
    };

    $scope.getDataDictamen=function(){
        //$scope.progressbar.start();
        console.log('GetData');
        $scope.busquedaCred=true;
        $.when(dc.getDictamenById( {id:$stateParams.id}) ).done(function(response){
            console.log(response);
            $scope.asignacion=response.direccion.asignacion;
            $scope.direccion=response.direccion.direccion;

            $scope.asignacion.dictamen=dss.getDictamenByTx($scope.asignacion.dictamen.txDictamen);

            $scope.$apply();



        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
        });
    };


    $scope.setDataNoDir=function(){
        $scope.direccion=$scope.direccionTmp;
    };


    $scope.descargar=function(){
        var link = document.createElement("a");
        link.download = $scope.asignacion.txNuCredito;
        link.href = 'http://091402OT003.infonavit.net/OTCS/cs.exe?func=LL.login&username=consulta&password=infonavit2017&NextURL=/OTCS/cs.exe/open/CR_'+$scope.asignacion.txNuCredito;
        link.click();
    };


    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();
};
