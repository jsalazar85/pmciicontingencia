
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

    $scope.edit=function (m) {
        console.log(m);
        $state.go('editar',{id:m.id});
    };


    this.init=function(){
        $scope.lstAsignacion=dss.datos.lstAsignacion;

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

    this.setData=function(response){
        console.log('setData');

        angular.copy(response,dss.principalData);
        console.log(dss.principalData);
        //Cargar lista de servidores hana
        $scope.lstServidor=response.hana;

        //Cargar lista de servidores DS
        $scope.lstServidorDS=response.ds;

    };

    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();
};
