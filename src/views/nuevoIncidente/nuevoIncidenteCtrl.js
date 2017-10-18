
angular
    .module('RDash')
    .controller('nuevoIncidenteCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        'consoleService',
        '$http',
        '$window',
        nuevoIncidenteCtrl
    ]);

function nuevoIncidenteCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cSrv,$http,$window) {
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
        txComentario:''
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


    ////////////////////////////////////////////
    //FUNCIONES**************************

    //Función de Guardar
    $scope.guardar=function () {
        cSrv.log('Enter Guardar',true);

        if($scope.creditoEncontrado==true ){

            if( $scope.asignacion.txEquipo!=""
                && $scope.asignacion.txZona!=""
                && $scope.asignacion.txNuCredito!=""
                && $scope.asignacion.txTelefono!=""
                ){
                $scope.insertData();
            } else{
                alert('Llene la información para guardar información');
            }
        }else{
            alert('Llene la información para guardar información 1');
        }

    };

    $scope.buscar=function () {
        cSrv.log('Cancelar',false);
        $scope.cargaImagen($scope.asignacion.txNuCredito);
        $scope.getDataCred();
    };

    $scope.cancelar=function () {
        $state.go('index');

    };


    this.init=function(){
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:' - Nueva Captura'});

        if(dss.usuario){
            console.log('usuario existe');
        }else{
            console.log('usuario no existe');
            $state.go('login');
        }

        $scope.lstDictamen=dss.catalogos.lstDictamen;

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


    //Inserta los datos en la base
    $scope.insertData=function(){

        $.when(dc.validaExistNumCred({txNuCredito:$scope.asignacion.txNuCredito})).done(function(response){
            console.log(response);
            $scope.asignacion.idUsuario=dss.usuario.id;
            if(response.direccion && response.direccion.txExiste=='SI'){
                console.log('El');
                if (confirm('El crédtio capturado ya existe. ¿Desea actualizar?')) {
                    $scope.updateData(response.direccion.id);
                }

            }else{
                console.log('No Exite num cred');

                //$scope.progressbar.start();
                $.when(dc.insertData1($scope.asignacion)).done(function(response){
                    console.log(response);
                    $state.go('index');
                    //$scope.progressbar.complete();
                }).fail(function (response) {
                    console.log('Error en la llamada al servicio');
                    console.log(response);
                    //$scope.progressbar.complete();
                });

            }
        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
        });
    };

    $scope.updateData=function(id){
        console.log('Entro updateData');
        console.log($scope.asignacion);
        $scope.asignacion.idUsuario=dss.usuario.id;
        $scope.asignacion.id=id;
        $.when(dc.actualizaReg($scope.asignacion)).done(function(response){
            console.log(response);
            $state.go('index');
        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
        });
    };


    $scope.validaNumCred=function(){
        //$scope.progressbar.start();
        $.when(dc.validaExistNumCred({txNuCredito:$scope.asignacion.txNuCredito})).done(function(response){
            console.log(response);
            //$scope.progressbar.complete();
            if(response.direccion && response.direccion.txExiste=='SI'){
                console.log('Ya Exite num cred');
            }else{
                console.log('No Exite num cred');
            }
        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
            //$scope.progressbar.complete();
        });
    };

    //Busca la información del creido
    $scope.getDataCred=function(){
        cSrv.log('En getDataCred',true);
        $scope.busquedaCred=true;
        $.when(dc.getCreditoDireccion( {txNuCredito:$scope.asignacion.txNuCredito}) ).done(function(response){
            console.log(response);
            if(response.direccion){
                $scope.direccion=response.direccion;
                $scope.creditoEncontrado=true;

                //Si existe el id, llenar la información
                console.log('Antes de fin');
                if(response.direccion.id){
                    console.log('Antes de despues del ');
                    $scope.getDataDictamen(response.direccion.id,function(response){
                        //Llenar asignación
                        $scope.asignacion.txEquipo=($scope.asignacion.txEquipo=="")?response.direccion.asignacion.txEquipo:$scope.asignacion.txEquipo;
                        $scope.asignacion.txZona=($scope.asignacion.txZona=="")?response.direccion.asignacion.txZona:$scope.asignacion.txZona;
console.log(dss.getDictamenByTx(response.direccion.asignacion.dictamen));


                        $scope.asignacion.dictamen=dss.getDictamenByTx(response.direccion.asignacion.dictamen.txDictamen);
                        $scope.asignacion.txTelefono=response.direccion.asignacion.txTelefono;
                        $scope.asignacion.txComentario=response.direccion.asignacion.txComentario;

                        $scope.$apply();
                    });
                }
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


    $scope.getDataDictamen=function(id,onGetData){

        console.log('getDataDictamen');
        $.when(dc.getDictamenById( {id:id} )).done(function(response){
            console.log(response);
            onGetData(response);
        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
        });
    };

    $scope.setDataNoDir=function(){
        $scope.direccion=$scope.direccionTmp;
    };

    $scope.blurEv=function(){
        console.log('eventossssss');
    };

    $scope.enterGuardar=function(){
        console.log('enter guardar comentario');
        if(event.keyCode==13){
            $scope.insertData();
        }
    };

    //Servicio para cargar la imagen, con base al url
    $scope.cargaImagen=function(txNuCredito){
        /*
        var link = document.createElement("a");
        link.download = txNuCredito;
        link.href = 'http://091402OT003.infonavit.net/OTCS/cs.exe?func=LL.login&username=consulta&password=infonavit2017&NextURL=/OTCS/cs.exe/open/CR_'+txNuCredito;
        link.click();
        */

/*

        console.log("Carga imagen Func");
        console.log("txNuCredito: "+txNuCredito);
        console.log(gc.getUrlFoto(txNuCredito));
        //Tira llamada para traer el número de crédito

        $http({
            method:'GET',
            url:gc.getUrlFoto(txNuCredito),


        }).then(function (response) {
            console.log('On Function Then');
            console.log(response);
        },function (response) {
            console.log('On Function Fail');
            console.log(response);
        });

        $http({
            method:'POST',
            url:gc.getUrlFoto(txNuCredito),


        }).then(function (response) {
            console.log('On Function Then');
            console.log(response);
        },function (response) {
            console.log('On Function Fail');
            console.log(response);
        });

*/
        /*
        $http.jsonp(gc.getUrlFoto(txNuCredito)
        ).then(function (response) {
            console.log('On Function Then');
            console.log(response);
        },function (response) {
            console.log('On Function Fail');
            console.log(response);
        });
        */

        //$window.open(gc.getUrlFoto(txNuCredito), '_blank');
        //window.location(gc.getUrlFoto(txNuCredito));

        /*
        var wnd = window.open();
        wnd.location="http://091402OT003.infonavit.net/OTCS/cs.exe?func=LL.login&username=consulta&password=infonavit2017&NextURL=/OTCS/cs.exe/open/CR_0999165409";
*/
        //window.location.href='http://091402OT003.infonavit.net/OTCS/cs.exe?func=LL.login&username=consulta&password=infonavit2017&NextURL=/OTCS/cs.exe/open/CR_0999165409';

    };


    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();
};
