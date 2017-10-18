
angular
    .module('RDash')
    .controller('tableroAtnSrvCtrl', [
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
        'barChartFactoryService',
        tableroAtnSrvCtrl
    ]);


function tableroAtnSrvCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,barChartFactory) {
    ///////////////////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************



    //Inicializador de controller
    $scope.init=function () {
        $scope.initAreaAtnSrv();
        $scope.initAreaAtnSrvPie();
        $scope.initGrid1();

        //$scope.initGrid1();
        //$scope.initCensoEstado();

        cds.doWorkTask('areaAtnSrv.chart1');
        cds.doWorkTask('areaAtnSrvPie.chart1');
        cds.doWorkTask('areaAtnSrv.grid');

        //cds.doWorkTask('censo.chart2');
        //cds.doWorkTask('grid1');
    };

    //<editor-fold desc="Funciones carga">
    $scope.initAreaAtnSrv=function () {
        $scope.areaAtnSrv={};
        $scope.areaAtnSrv.data=[];

        cds.addWorkTask('areaAtnSrv.chart1',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:3,
                idGra:14,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.areaAtnSrv.data=response.data;
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });

        $scope.areaAtnSrv.setTop=function (chart) {
            console.log('on set top');
            console.log(chart);
            if(angular.isDefined(chart)){
                console.log('antes de');
                barChartFactory.setValueOnTop(chart,{attr:"nuTotal"},function (maxValue,value) {
                    return value;
                });
                console.log('despues de ');
            }
        };
    };

    $scope.initAreaAtnSrvPie=function () {
        $scope.areaAtnSrvPie={};
        $scope.areaAtnSrvPie.data=[];

        cds.addWorkTask('areaAtnSrvPie.chart1',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:3,
                idGra:15,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.areaAtnSrvPie.data=response.data;
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });

            $scope.areaAtnSrvPie.setTop=function (chart) {
            console.log('on set top');
            console.log(chart);
            if(angular.isDefined(chart)){
                console.log('antes de');
                barChartFactory.setValueOnTop(chart,{attr:"nuTotal"},function (maxValue,value) {
                    return value;
                });
                console.log('despues de ');
            }
        };

    };

    $scope.initGrid1=function () {
        $scope.gridAtnSrv={};
        $scope.gridAtnSrv.opt={
            data:[
                {
                    txEdo:"TEst",
                    nuTotalReportes:100,
                    nuNoAplicaSeguro:200,
                    nuAplicaSeguro:200,
                    nuPT:90,
                    nuDP:50,
                    nuAS:90,
                    nuST_PTDP:10,
                    nu_SD:20,
                    nuASPD:20,
                    nuPorAvc:20
                }
            ],
            columnDefs:[
                {
                    field:"txEstado",
                    name:"ESTADO",
                    footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                    width:"35%"

                },
                {
                    field:"nuBrigadas",
                    name:"Brigada",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    name:"Pérdita Total",
                    field:"nuCesi",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuDelegacion",
                    name:"Delegacion",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuInfonatel",
                    name:"Infonatel",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuOtro",
                    name:"Otro",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuTotal",
                    name:"Total",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true
                }
            ]
        };

        cds.addWorkTask('areaAtnSrv.grid',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:3,
                idGra:17,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.gridAtnSrv.opt.data=response.data;

            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });
    };

    //</editor-fold desc="Funciones carga">

    //<editor-fold desc="Nav Tabs">
    $scope.selectedTabIndex=0;
    $scope.tabSelectedClass={
        active:true
    };
    $scope.tabInactiveClass={
        active:false
    };
    $scope.navTabs=[
        {
            nuId:1,
            txTitulo:"Censo",
            objClass:{
                "active":true
            }

        },
        {
            nuId:2,
            txTitulo:"Dictamenes",
            objClass:{
                "active":false
            }
        },
        /*{
         nuId:3,
         txTitulo:"Plataforma Brigada Infonavit",
         objClass:{
         "active":false
         }
         },*/
        {
            nuId:3,
            txTitulo:"Tuberia",
            objClass:{
                "active":false
            }
        }
    ];
    $scope.selectTab=function (nt) {
        var tmp=[];
        console.log("Click selectTab");
        console.log(nt);
        for(var i in $scope.navTabs){
            //var curObj={};
            if($scope.navTabs[i].nuId==nt.nuId){
                $scope.navTabs[i].objClass={
                    "active":true
                };
            }else{
                $scope.navTabs[i].objClass={
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
