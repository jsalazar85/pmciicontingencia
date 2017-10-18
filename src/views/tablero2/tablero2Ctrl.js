
angular
    .module('RDash')
    .controller('tablero2Ctrl', [
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
        tablero2Ctrl
    ]);

function tablero2Ctrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval) {
    ///////////////////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************

    //Variables demo para graficas
    $scope.pieChart1={
        id:'1',

    };

    $scope.barChart1={
        id:'1'
    };

    $scope.barChart2={
        id:'2'
    };

    $scope.colChart1={
        id:'2'
    };

    $scope.colChart2={
        id:'3'
    };

    $scope.colChart3={
        id:'4'
    };


    $scope.progressChart1={
        id:'2',
        nuAvanceReal:0.0,
        nuAvanceComp:0.0,
        nuVariacion:0.0,
        nuAvanceMaximo:1,
        nuSemaforo:1, //1 verde, 2 amarillo, 3 rojo
        txTitulo:"",
        txTextTop:"",
        txTextBot:""
    };


    $scope.lastResponse=new Date();
    $scope.difMinutos=0;

    //ProgressBar
    $scope.pb={};
    $scope.pb.nuAvance=0;
    $scope.pb.nuMax=1000;
    $scope.pb.nuTiempo=10000;
    $scope.pb.nuAcumMS=0;
    $scope.pb.nuIntervaloMS=250;
    $scope.pb.nuDuracionTotalSeg=90;
    $scope.pb.nuDelayAfterRestartSeg=3;
    $scope.pb.nuDelayAfterRestart=($scope.pb.nuDelayAfterRestartSeg*1000);
    $scope.pb.nuDelayAcum=0;
    $scope.pb.interval;


    ///////////////////////////////////////////////////////////
    //Eventos **************************
    $scope.$on("$destroy", function() {

        if ( angular.isDefined($scope.pb.interval) ){
            $scope.pb.stopProgress();
        }


    });


    ///////////////////////////////////////////////////////////
    //FUNCIONES**************************

    //Inicializador de controller
    $scope.init=function () {

        cs.log('init function: Tablero 1 Controller',true);

        //Cambiar el título
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:' - Tablero de Control'});

        $scope.pb.initProgress();

        //Crear el progress bar
        $scope.progressbar=ngProgressFactory.createInstance();
        $scope.progressbar.setColor("#ffffff");
        $scope.progressbar.setHeight("5px");

        //$scope.loadPieChart1(null);
        //$scope.loadBarChart1(null);

        $scope.getColChart01();
        /*
        $scope.geTabDistTipoDictamen();
        $scope.geTabDictamenPorMcpo();
        $scope.geTabDictamenPorEdo();
        $scope.geTabDictamenPorMcpoDic();
        */
    };

    //Progress Bar
    $scope.pb.initProgress=function () {
        if ( angular.isDefined($scope.pb.interval) ) return;

        cs.log('Progress initialized',true);

        $scope.pb.interval=$interval(function () {
            if($scope.pb.nuAcumMS<($scope.pb.nuDuracionTotalSeg*1000)){
                //Acumulado intervalo
                $scope.pb.nuAcumMS=$scope.pb.nuAcumMS+$scope.pb.nuIntervaloMS;
                $scope.pb.nuAvance=( $scope.pb.nuAcumMS / ($scope.pb.nuDuracionTotalSeg*1000) )*100;
                //console.log($scope.pb.nuAcumMS+' de '+($scope.pb.nuDuracionTotalSeg*1000));

                var diff = (new Date() - $scope.lastResponse);
                var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
                $scope.difMinutos=diffMins;
                //console.log($scope.difMinutos);
            }else{
                if($scope.pb.nuDelayAcum == 0){
                    $scope.pb.stopProgress();
                    $scope.pb.nuAvance=0;
                    $scope.geTabAvanceDictamenes();
                    $scope.geTabDistTipoDictamen();
                    $scope.geTabDictamenPorMcpo();
                    $scope.pb.nuDelayAcum=1;
                    $scope.pb.initProgress();
                }else if($scope.pb.nuDelayAcum < $scope.pb.nuDelayAfterRestart){
                    $scope.pb.nuDelayAcum=$scope.pb.nuDelayAcum+$scope.pb.nuIntervaloMS;
                }else if($scope.pb.nuDelayAcum >= $scope.pb.nuDelayAfterRestart){
                    $scope.pb.stopProgress();
                    $scope.pb.nuDelayAcum=0;
                    $scope.pb.nuAcumMS=0;
                    $scope.pb.initProgress();
                }
            }
        }
        //,($scope.pb.nuDuracionTotalSeg*1000)/100);
        ,$scope.pb.nuIntervaloMS);
    };

    $scope.pb.stopProgress=function () {

        if(angular.isDefined($scope.pb.interval)){
            $interval.cancel($scope.pb.interval);
            $scope.pb.interval=undefined;
            cs.log('Progress stopped',false);
        }
    };

    //------------------------------------------------------------------------
    //Servicios Web
    $scope.geTabAvanceDictamenes=function(){
        $.when(dc.geTabAvanceDictamenes()).done(function(response){
            cs.log(response);
            $scope.loadProgressData(response.data);
        }).fail(function (response) {

        });
    };

    $scope.geTabDistTipoDictamen=function(){
        $.when(dc.geTabDistTipoDictamen()).done(function(response){
            cs.log(response);
            $scope.loadPieChart01(response.data);
        }).fail(function (response) {

        });
    };

    $scope.getColChart01=function(){

        dc.getColChart01().then(function(response){
                cs.log('$http ********* ');
                cs.log(response);
                $scope.loadColChart01(response.data.data);
            },function (response) {
            }
        );

        /*
        $.when(dc.geTabDictamenPorMcpo()).done(function(response){
            cs.log(response);
            $scope.loadColChart01(response.data);
        }).fail(function (response) {

        });
        */
    };

    $scope.geTabDictamenPorEdo=function(){

        dc.geTabDictamenPorEdo().then(function(response){
                cs.log('$http ********* ');
                cs.log(response);
                $scope.loadColChart02(response.data.data);
            },function (response) {
            }
        );

        /*
         $.when(dc.geTabDictamenPorMcpo()).done(function(response){
         cs.log(response);
         $scope.loadColChart01(response.data);
         }).fail(function (response) {

         });
         */
    };

    $scope.geTabDictamenPorMcpoDic=function(){
        cs.log('#################################  geTabDictamenPorMcpoDic');


        dc.geTabDictamenPorMcpoDic().then(function(response){
                cs.log('#################################');
                cs.log(response);
                $scope.loadColChart03(response.data.data);
            },function (response) {
            cs.log('#################################');
            }
        );

        /*
         $.when(dc.geTabDictamenPorMcpo()).done(function(response){
         cs.log(response);
         $scope.loadColChart01(response.data);
         }).fail(function (response) {

         });
         */
    };





    //------------------------------------------------------------------------







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

    $scope.loadPieChart1=function(data){
        cs.log('loadPieChart1',false);
        $scope.pieChart1=dss.templateData.pieChartData1;
        cs.log($scope.pieChart1,false);
    };

    $scope.loadBarChart1=function(data){
        cs.log('loadBarChart1',false);
        $scope.barChart1=dss.templateData.barChart1;
        cs.log($scope.barChart1,false);
    };


    //------------------------------------------------------
    //Set datos a Chart Progress
    $scope.loadProgressData=function(data){
        cs.log('loadProgressData',false);

        var tmp={};
        angular.copy($scope.progressChart1,tmp);
        tmp.nuAvanceReal=data.nuDictamenes;//(data.nuDictamenes / data.nuCreditos).toFixed(2);
        tmp.nuAvanceComp=data.nuDictamenes;//(data.nuDictamenes / data.nuCreditos).toFixed(2);
        tmp.nuVariacion=data.nuCreditos;
        tmp.nuAvanceMaximo=data.nuCreditos;
        tmp.txTop="Dictámenes : ";
        tmp.txBot="Créditos";
        tmp.txTitulo="Avance de Captura";
        cs.log(tmp,false);
        $scope.progressChart1=tmp;
        $scope.lastResponse=new Date();
    };

    //Set datos a Gráfico de Pie
    $scope.loadPieChart01=function(data){
        cs.log('loadPieChart01',false);

        var tmp={};
        angular.copy($scope.pieChart1,tmp);
        tmp.dataField='nuValor';
        tmp.txTitulo='Distribución por Tipo de Dictámen';
        tmp.categoryField='txCategoria';
        tmp.data=data;
        cs.log(tmp,false);
        $scope.pieChart1=tmp;
        $scope.lastResponse=new Date();
    };

    //Set datos al gráfico de columna
    $scope.loadColChart01=function(data){
        cs.log('loadColChart01',false);

        var tmp={};
        angular.copy($scope.colChart1,tmp);
        tmp.dataField='nuValor';
        tmp.txAxisTitle='# Reportes';
        tmp.txTitulo='Reportes por Canal';
        tmp.categoryField='txCategoria';
        tmp.data=data;
        cs.log(tmp,false);
        $scope.colChart1=tmp;
        $scope.lastResponse=new Date();
    };

    //Set datos al gráfico de columna
    $scope.loadColChart02=function(data){
        cs.log('loadColChart01',false);

        var tmp={};
        angular.copy($scope.colChart2,tmp);
        tmp.dataField='nuDictamenes';
        tmp.txAxisTitle='# Dictámenes';
        tmp.txTitulo='Cantidad de Dictámenes por Estado';
        tmp.categoryField='txMunicipio';

        tmp.data=data;
        cs.log(tmp,false);
        $scope.colChart2=tmp;
        $scope.lastResponse=new Date();
    };

    //Set datos al gráfico de columna
    $scope.loadColChart03=function(data){
        cs.log('loadColChart03',true);
        cs.log('loadColChart03',true);
        cs.log('loadColChart03',true);

        var tmp={};
        angular.copy($scope.colChart3,tmp);
        tmp.txAxisTitle='# Dictámenes';
        tmp.txTitulo='Cantidad de Dictámenes por Municipio';
        tmp.categoryField='txMunicipio';
        tmp.data=data;
        cs.log(tmp,true);
        $scope.colChart3=tmp;
        $scope.lastResponse=new Date();
    };


    $scope.regresar=function () {
        $state.go('index');
    };



    //------------------------------------------------------

    ///////////////////////////////////////////////////////////
    //INICIALIZADOR *********************
    $scope.init();
};
