
angular
    .module('RDash')
    .controller('tableroDictamenCtrl', [
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
        'toolsService',
        'chartDataService',
        'uiGridConstants',
        tableroDictamenCtrl
    ]);


function tableroDictamenCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants) {
    ///////////////////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************

    //Variables demo para graficas
    $scope.pieChart1={
        id:'1',

    };

    $scope.pieChart2={
        id:'2',

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

    $scope.colChart4={
        id:'5'
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

        $scope.viewDic={};



        cs.log('init function: Tablero Dictamen Controller',true);

        //Cambiar el título
        //$rootScope.$emit('onSubTitleChange',{txSubTitulo:''});

        console.log('geTabAvanceDictamenes');
        $scope.geTabAvanceDictamenes();
        console.log('geTabDistTipoDictamen');
        $scope.geTabDistTipoDictamen();
        console.log('geTabDictamenPorEdo');
        $scope.geTabDictamenPorEdo();
        console.log('getColChart04');
        $scope.getColChart04();
        //$scope.loadCensoChart1();
        //$scope.loadCensoChart2();
        console.log('doWorkTask grid1');
        cds.doWorkTask('grid1');

        $scope.hoy=new Date();
    };

    //Set datos a Gráfico de Pie------------
    $scope.loadPieChart01=function(data){
        cs.log('loadPieChart01',false);

        var tmp={};
        angular.copy($scope.pieChart1,tmp);
        tmp.dataField='nuValor';
        //tmp.txTitulo='Distribución por Tipo de Dictámen';
        tmp.txTitulo='Dictamen por Aseguradora';
        tmp.categoryField='txCategoria';
        tmp.data=data;
        tmp.chartOpt={
            colors:[
                '#7E0212',
                '#fef31d',
                '#84C263',
            ]
        };

        cs.log(tmp,false);
        $scope.pieChart1=tmp;
        $scope.lastResponse=new Date();
    };
    $scope.geTabDistTipoDictamen=function(){
        $.when(dc.geTabDistTipoDictamen()).done(function(response){
            cs.log(response);
            $scope.loadPieChart01(response.data);
        }).fail(function (response) {

        });
    };
    //Set datos a Gráfico de Pie------------

    //Set datos de Total de Credito----------
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
    $scope.geTabAvanceDictamenes=function(){
        $.when(dc.geTabAvanceDictamenes()).done(function(response){
            cs.log(response);
            $scope.loadProgressData(response.data);
        }).fail(function (response) {

        });
    };
    //Set datos de Total de Credito----------

    //Set datos de Grid----------------------
    /*
    $scope.chartOpt={
        data:$scope.data,
        columnDefs:$scope.columnDefs
    };
    */

    $scope.loadGridData=function(data) {
        console.log("99999999999999999999999999999999999999999999999999999999");
        var tmp=[];
        console.log(data);

        //Prepara datos de data
        for(var i in data){
            var tmpData={};
            var total=data[i].nuTO;
            tmpData.estado=data[i].txMunicipio;
            tmpData.perdidaTotal= tools.getPercentage(data[i].nuPT,total," %"); //  data[i].nuPT / total;
            tmpData.danioParcial=tools.getPercentage(data[i].nuDP,total," %");//data[i].nuDP / total;
            tmpData.sinDanio=tools.getPercentage(data[i].nuSD,total," %")//data[i].nuSD / total;
            tmpData.total=data[i].nuTO;
            tmp.push(tmpData);
        }

        console.log(tmp);
        $scope.chartOpt.data=tmp;
    };
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
        tmp.colors=[
            '#7E0212',
            '#fef31d',
            '#FEAF6D'
        ];
        $scope.lastResponse=new Date();

        $scope.loadGridData(data);
    };
    $scope.geTabDictamenPorEdo=function(){

        dc.geTabDictamenPorEdo().then(function(response){
                cs.log('$http ********* ');
                cs.log(response);
                $scope.loadColChart02(response.data.data);
            },function (response) {
            }
        );
    };
    //Set datos de Grid----------------------

    //Set datos de chart4--------------------
    $scope.loadColChart04=function(data){
        cs.log('loadColChart04',true);
        cs.log('loadColChart04',true);
        cs.log('loadColChart04',true);

        var tmp={};
        angular.copy($scope.colChart4,tmp);
        tmp.dataField='nuValor';
        tmp.txAxisTitle='$ Importe';
        tmp.txTitulo='Importe por Pérdida Total Estados';
        tmp.categoryField='txCategoria';
        tmp.data=data;
        tmp.barColor='#7E0212';
        tmp.colors=[
            '#7E0212',
            '#fef31d',
            '#FEAF6D'
        ];

        cs.log(tmp,true);
        $scope.colChart4=tmp;
        $scope.lastResponse=new Date();
    };
    $scope.getColChart04=function(){
        cs.log('#################################  getColChart04');


        dc.getColChart04().then(function(response){
                cs.log('#################################');
                cs.log(response);
                $scope.loadColChart04(response.data.data);
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
    //Set datos de chart4--------------------

    //<editor-fold desc="TAB CENSO">
    $scope.loadCensoChart1=function() {
        $scope.censoChart1={};
        $scope.censoChart1.chartOpts={};
        $scope.censoChart1.data=[];

        //Tareas ------------------------------------------------------------------------
        cds.addWorkTask('censo.chart1',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:1,
                idGra:30,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.censoChart1.data=response.data;
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });

        cds.doWorkTask('censo.chart1');
    };

    //<editor-fold desc="GRID">
    $scope.chartOpt={
        showColumnFooter: true,
        data:[
            {
                estado:"test",
                perdidaTotal:100,
                perdidaTotal:200,
                sinDanio:200,
                total:90
            }
        ],
        /*
         tmpData.estado=data[i].txMunicipio;
         tmpData.perdidaTotal= tools.getPercentage(data[i].nuPT,total," %"); //  data[i].nuPT / total;
         tmpData.danioParcial=tools.getPercentage(data[i].nuDP,total," %");//data[i].nuDP / total;
         tmpData.sinDanio=tools.getPercentage(data[i].nuSD,total," %")//data[i].nuSD / total;
         tmpData.total=data[i].nuTO;
         */
        columnDefs:[
            {
                field:"estado",
                name:"Estado",
                width:'40%'
            },
            {
                field:"perdidaTotal",
                name:"Pérdida Total",
                type:"number",
                cellFilter:'percentFilter:this',
                aggregationHideLabel: true
            },
            {
                field:"danioParcial",
                name:"Daño Parcial",
                type:"number",
                cellFilter:'percentFilter:this',
                aggregationHideLabel: true
            },
            {
                field:"sinDanio",
                name:"Sin Daño",
                type:"number",
                cellFilter:'percentFilter:this',
                aggregationHideLabel: true
            },
            {
                field:"total",
                name:"Total",
                type:"number",
                aggregationHideLabel: false
            },
        ]
    };

    cds.addWorkTask('grid1',{
        url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
        query:{
            idTab:1,
            idGra:40,
            idQry:1
        },
        success:function (response) {
            console.log("success");
            console.log(response);
            $scope.gridOpt.data=response.data;
        },
        error:function (response,error) {
            console.log("Error");
            console.log(error);
        }
    });
    //</editor-fold desc="GRID">

    //<editor-fold desc="Nav Tabs 2">
    $scope.selectedTabIndex2=0;
    $scope.tabSelectedClass2={
        active:true
    };
    $scope.tabInactiveClass2={
        active:false
    };
    $scope.navTabs2=[
        {
            nuId:1,
            txTitulo:"Cantidad de Dictámenes",

            objClass:{
                "active":true
            }
        },
        {
            nuId:2,
            txTitulo:"Importe del Crédito - Pérdida Total",
            objClass:{
                "active":false
            }
        }
    ];

    $scope.selectTab2=function (nt) {
        var tmp=[];
        console.log("Click selectTab");
        console.log(nt);
        for(var i in $scope.navTabs2){
            //var curObj={};
            if($scope.navTabs2[i].nuId==nt.nuId){
                $scope.navTabs2[i].objClass={
                    "active":true
                };
            }else{
                $scope.navTabs2[i].objClass={
                    "active":false
                };
            }
        }

        if(nt.nuId==1){
            //$scope.createChart1();
        }else if(nt.nuId==2){
            //$scope.createChart2();
        }else if(nt.nuId==3){
        }
    };


    $scope.regresar=function () {
        $state.go('index');
    };
    //</editor-fold>

    ///////////////////////////////////////////////////////////
    //INICIALIZADOR *********************
    $scope.init();
};
