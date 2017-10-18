
angular
    .module('RDash')
    .controller('tableroIniciativaCtrl', [
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
        tableroIniciativaCtrl
    ]);


function tableroIniciativaCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,barChartFactory) {
    ///////////////////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************



    //Inicializador de controller
    $scope.init=function () {
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:'@'});
        $scope.iniciativa={};
        $scope.initIniciativaChart1();
        $scope.initIniciativaChart2();
        $scope.initIniciativaChart3();


        cds.doWorkTask('iniciativa.chart1');
        cds.doWorkTask('iniciativa.chart2');
        cds.doWorkTask('iniciativa.chart3');
    };

    //<editor-fold desc="Funciones carga">
    $scope.initIniciativaChart1=function () {

        $scope.iniciativa.chart1={};
        $scope.iniciativa.chart1.data=[];
        $scope.iniciativa.chart1.chartOpt=[];

        $scope.iniciativa.chart1.setTop=function (chart) {
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


        cds.addWorkTask('iniciativa.chart1',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:5,
                idGra:20,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.iniciativa.chart1.data=response.data;
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });
    };

    $scope.initIniciativaChart2=function () {

        $scope.iniciativa.chart2={};
        $scope.iniciativa.chart2.data=[];
        $scope.iniciativa.chart2.chartOpt=[];


        cds.addWorkTask('iniciativa.chart2',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:5,
                idGra:21,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.iniciativa.chart2.data=response.data;
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });
    };

    $scope.initIniciativaChart3=function () {

        $scope.iniciativa.chart3={};
        $scope.iniciativa.chart3.data=[];
        $scope.iniciativa.chart3.chartOpt=[];


        cds.addWorkTask('iniciativa.chart3',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:5,
                idGra:22,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.iniciativa.chart3.data=response.data;

            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });
    };

    $scope.initCensoEstado=function () {
        $scope.censoEstado={};
        $scope.censoEstado.data=[];
        $scope.censoEstado.chartOpt={
            "listeners": [{
                "event": "zoomed",
                "method": function(e) {
                    console.log('Start zoom index: ', e.chart.startIndex,  'End zoom index: ', e.chart.endIndex);
                }
            },
                {
                    event: "init",
                    method: function(e) {
                        e.chart.zoomToIndexes(0, 3); //set default zoom

                    }
                }
            ]
        };

        cds.addWorkTask('censo.chart2',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:2,
                idGra:13,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.censoEstado.data=response.data;
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });
    };

    $scope.initGrid1=function () {
        $scope.grid={};
        $scope.grid.opt={
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
                    field:"txFuente",
                    name:"ESTADO",
                    footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                    width:"35%"

                },
                {
                    field:"nuDP",
                    name:"Daño Parcial",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:'percentFilter:this'
                },
                {
                    name:"Pérdita Total",
                    field:"nuPT",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:'percentFilter:this'
                },
                {
                    field:"nuSD",
                    name:"Sin Daño",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:'percentFilter:this'
                },
                {
                    field:"nuSDA",
                    name:"Sin Dictámen",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:'percentFilter:this'
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


        cds.addWorkTask('grid1',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:2,
                idGra:11,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.grid.opt.data=response.data;

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
