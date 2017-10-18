
angular
    .module('RDash')
    .controller('tableroAreaRHCtrl', [
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
        tableroAreaRHCtrl
    ]);


function tableroAreaRHCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants) {
    console.log("tableroAreaRHCtrl ******************************************");
    //Inicializador de controller
    $scope.init=function () {
        cds.doWorkTask('grid5'); //RJLR
    };


    //<editor-fold desc="GRID">
    $scope.gridOpt5={
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
                field:"txDictaminado",
                name:"Dictaminado",
                footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                width:"25%"
            },
            {
                field:"txContrato",
                name:"Contrato",
                width:"35%"
            },
            {
                field:"txEstatus",
                name:"Estatus General",
                width:"25%"
            },
            {
                field:"nuColaboradores",
                name:"Colaboradores",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            }
        ]
    };

    cds.addWorkTask('grid5',{
        url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
        query:{
            idTab:4,
            idGra:18,
            idQry:1
        },

        success:function (response) {
            console.log("success ******************************************");
            console.log(response);
            $scope.gridOpt5.data=response.data; //<<RJLR
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
