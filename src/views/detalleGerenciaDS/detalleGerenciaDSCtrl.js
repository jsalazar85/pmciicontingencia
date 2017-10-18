
angular
    .module('RDash')
    .controller('detalleGerenciaDSCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        detalleGerenciaDSCtrl
    ]);

function detalleGerenciaDSCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss) {
    ///////////////////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************

    //Datos demo
    $scope.distribucionEsquema={
        txTitulo:'Distribución de Objetos por Esquema',
        data:[]
    };

    $scope.ejecutoresJob={
        txTitulo:'Ejecutores de Jobs',
        data:[]
    };

    $scope.jobsActivos={

        id:"sb10",
        txCategoriaTitulo1:'SI',
        txCategoriaTitulo2:'NO',
        dataField1:"nuValSi",
        dataField2:"nuValNo",
        txTitulo:'JobActivos',
        categoryField:"txCategoria",
        barColor1:"#e15954",
        barColor2:"#fddddd",

        data:[]

    };

    $scope.jobsGerencia={

        id:"sb11",
        txCategoriaTitulo1:'SI',
        txCategoriaTitulo2:'NO',
        dataField1:"nuValSi",
        dataField2:"nuValNo",
        txTitulo:'JobActivos',
        categoryField:"txCategoria",
        barColor1:"#e15954",
        barColor2:"#fddddd",

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
        console.log('detalleGerenciaDSCtrl');
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
        $.when(dc.getDetalleGerenciaDS({idGerencia:$scope.params.idGerencia})).done(function(response){
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

        angular.copy(response,dss.detalleGerenciaDS);
        console.log(dss.detalleGerenciaDS);

        var tmp={};
        angular.copy($scope.distribucionEsquema,tmp);

        //Cargar lista de servidores hana
        tmp.data=response.estatusJobArea;
        $scope.distribucionEsquema=tmp;


        //Ejecutores
        var tmp2={};
        angular.copy($scope.ejecutoresJob,tmp2);
        tmp2.data=response.ejecutoresJob;
        $scope.ejecutoresJob=tmp2;

        //Job Activos
        var tmp3={};
        angular.copy($scope.jobsActivos,tmp3);
        console.log(tmp3);
        tmp3.data=response.jobsActivos;
        $scope.jobsActivos=tmp3;

        //Job Activos
        var tmp4={};
        angular.copy($scope.jobsGerencia,tmp4);
        console.log(tmp4);
        tmp4.data=response.jobsGerencia;
        $scope.jobsGerencia=tmp4;

        console.log($scope.jobsGerencia);


        /*
        //Memoria por esquema
        var tmp3={};
        angular.copy($scope.ejecutoresJob,tmp3);
        tmp3.data=response.ejecutoresJob;
        $scope.ejecutoresJob=tmp3;
        */
    };

    ///////////////////////////////////////////////////////////
    //INICIALIZADOR *********************
    $scope.init();
};
