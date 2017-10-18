
angular
    .module('RDash')
    .controller('detalleGerenciaCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        detalleGerenciaCtrl
    ]);

function detalleGerenciaCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss) {
    ///////////////////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************

    //Datos demo
    $scope.distribucionEsquema={
        txTitulo:'Distribución de Objetos por Esquema',
        data:[]
    };

    $scope.regPorEsquema={
        txTitulo:'Registros por Esquema',
        data:[]
    };

    $scope.memPorEsquema={
        txTitulo:'Memoria por Esquema',
        data:[]
    };

    ///////////////////////////////////////////////////////////
    //Eventos **************************


    ///////////////////////////////////////////////////////////
    //FUNCIONES**************************

    //Inicializador de controller
    $scope.init=function () {

        //Validar que este en index
        console.log('//////');
        if(!dss.hasLandedIndex){
            console.log('//////');
            console.log(dss.hasLandedIndex);
            $state.go('index');
        }

        //Crear el progress bar
        $scope.progressbar=ngProgressFactory.createInstance();
        $scope.progressbar.setColor("#ffffff");
        $scope.progressbar.setHeight("5px");

        //Obtener parametros de url
        $scope.params={
            idGerencia:$stateParams.idGerencia
        };

        $scope.params.hanaSrv=dss.getHanaSrvByIdGer($scope.params.idGerencia);
        console.log($scope.params.hanaSrv);

        //Actualizar el titulo de la página
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:$scope.params.hanaSrv.txGerencia});

        //Obtener el valor demo
        var tmpData={
            txTitulo:'Tablas por Esquema',
            data:dss.detalleHana['Gerencia1'].tablasEsquema.lstData
        };

        $scope.lstTablasEsquema=tmpData;

        //Obtener el valor demo del pie
        var tmpData2={
            txTitulo:'Esquemas por Sub Dirección',
            data:dss.detalleHana['Gerencia1'].distribucionEsquema.lstData
        };

        //$scope.distribucionEsquema=tmpData2;


        //console.log($scope.lstTablasEsquema);

        $scope.getServerData();
    };

    //Funcion del click para regresar a la página anterior
    $scope.regresar=function () {
        $state.go('index');
    };

    //Obtiene datos del servidor
    $scope.getServerData=function(){
        var that=this;
        $scope.progressbar.start();
        $.when(dc.getDetalleGerenciaHana({idGerencia:$scope.params.idGerencia})).done(function(response){
            console.log(response);
            $scope.setData(response);
            $scope.progressbar.complete();
        }).fail(function (response) {
            console.log('Error en la llamada al servicio');
            console.log(response);
            $scope.progressbar.complete();
        });
    };

    //Establecer datos
    $scope.setData=function(response){
        console.log('setData');

        angular.copy(response,dss.detalleGerenciaHana);
        console.log(dss.detalleGerenciaHana);

        var tmp={};
        angular.copy($scope.distribucionEsquema,tmp);

        //Cargar lista de servidores hana
        tmp.data=response.objPorEsquema;
        $scope.distribucionEsquema=tmp;

        //Registros por esquema
        var tmp2={};
        angular.copy($scope.regPorEsquema,tmp2);
        tmp2.data=response.regPorEsquema;
        $scope.regPorEsquema=tmp2;

        //Memoria por esquema
        var tmp3={};
        angular.copy($scope.memPorEsquema,tmp3);
        tmp3.data=response.memPorEsquema;
        $scope.memPorEsquema=tmp3;

    };

    ///////////////////////////////////////////////////////////
    //INICIALIZADOR *********************
    $scope.init();
};
