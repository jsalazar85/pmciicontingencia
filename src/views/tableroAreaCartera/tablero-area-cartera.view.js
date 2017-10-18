
angular
    .module('RDash')
    .controller('tableroAreaCarteraCtrl', [
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
        tableroAreaCarteraCtrl
    ]);


function tableroAreaCarteraCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants) {
    console.log("tableroAreaCarteraCtrl ******************************************");
    //Inicializador de controller
    $scope.init=function () {
        cds.doWorkTask('grid2'); //RJLR
    };


    //<editor-fold desc="GRID">
    $scope.gridOpt2={
        showColumnFooter: true,
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
                field:"txEdo",
                name:"ESTADO",
                footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>"
            },
            {
                field:"nuTotalReportes",
                name:"Reportes Delegación y Brigadas",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                name:"No Aplica Seguro",
                field:"nuNoAplicaSeguro",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                field:"nuAplicaSeguro",
                name:"Aplica Seguro",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                field:"nuPT",
                name:"Pérdida Total Dictamen Final Aseguradora",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                field:"nuDP",
                name:"Daño Parcial Dictamen Final Aseguradora",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                field:"nuST_PTDP",
                name:"Subtotal Pérdida Total y Daño Parcial",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                field:"nu_SD",
                name:"Sin Daños Dicatmen Final Aseguradora",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                field:"nuASPD",
                name:"Aplica Seguro en Proceso de Dictaminar",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            },
            {
                field:"nuPorAvc",
                name:"% de Avance",
                type:"number",
                cellFilter:'percentFilter:this'
            },
        ]
    };

    cds.addWorkTask('grid2',{
        url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
        query:{
            idTab:1,
            idGra:40,
            idQry:1
        },
        success:function (response) {
            console.log("success ******************************************");
            console.log(response);
            $scope.gridOpt2.data=response.data; //<<RJLR
        },
        error:function (response,error) {
            console.log("Error");
            console.log(error);
        }
    });

    ///////////////////////////////////////////////////////////
    //INICIALIZADOR *********************
    $scope.init();
};
