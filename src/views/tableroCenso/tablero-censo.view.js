
angular
    .module('RDash')
    .controller('tableroCensoCtrl', [
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
        tableroCensoCtrl
    ]);


function tableroCensoCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,barChartFactory) {
    ///////////////////////////////////////////////////////////
    //ATRIBUTOS Y VARIABLES *************



    //Inicializador de controller
    $scope.init=function () {
        $scope.initCensoChart();
        $scope.initGrid1();
        $scope.initCensoEstado();

        cds.doWorkTask('censo.chart1');
        cds.doWorkTask('censo.chart2');
        cds.doWorkTask('grid1');
    };

    //<editor-fold desc="Funciones carga">
    $scope.initCensoChart=function () {
        $rootScope.$emit('onSubTitleChange',{txSubTitulo:'@'});

        $scope.censo={};
        $scope.censo.data=[];



        cds.addWorkTask('censo.chart1',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:2,
                idGra:10,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.censo.data=response.data;
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
        $scope.grid.setTop=function (chart) {
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
