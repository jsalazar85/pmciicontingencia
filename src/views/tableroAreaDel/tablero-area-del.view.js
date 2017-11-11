
angular
    .module('RDash')
    .controller('tableroAreaDelCtrl', [
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
        tableroAreaDelCtrl
    ]);


function tableroAreaDelCtrl($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants) {
    console.log("tableroAreaDelCtrl ******************************************");
    //Inicializador de controller
    $scope.init=function () {
        $scope.initMock();
        cds.doWorkTask('grid4'); //RJLR
    };
    $scope.initMock = function() {
        $scope.dataChart = [
            {
                "txEstado": "MORELOS",
                "nuUniversoViviendas": "2371"
            },
            {
                "txEstado": "TLAXCALA",
                "nuUniversoViviendas": "32"
            },
            {
                "txEstado": "BAJA CALIFORNIA SUR",
                "nuUniversoViviendas": "9"
            },
            {
                "txEstado": "CHIAPAS",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "DISTRITO FEDERAL",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "GUERRERO",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "MEXICO",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "OAXACA",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "PUEBLA",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "QUERETARO",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "TABASCO",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "TAMAULIPAS",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "VERACRUZ",
                "nuUniversoViviendas": "0"
            },
            {
                "txEstado": "MICHOACAN",
                "nuUniversoViviendas": "0"
            }
        ];
    };


    //<editor-fold desc="GRID">
    $scope.gridOpt4={
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
                field:"txEstado",
                name:"Estado",
                width:"30%",
                aggregationHideLabel: true,
                footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>"
            },
            {
                field:"txDelegado",
                name:"Delegado",
                aggregationHideLabel: true,
                width:"40%",
            },
            {
                field:"txFecha",
                type:"date",
                name:"Fecha",
                aggregationHideLabel: true
            },
            {
                field:"nuRegistros",
                name:"Total de Registros",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true
            }
        ]
    };

    cds.addWorkTask('grid4',{
        url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
        query:{
            idTab:21,
            idGra:2,
            idQry:1
        },
        success:function (response) {
            console.log("success tableroAreaDelCtrl ******************************************");
            console.log(response);
            $scope.gridOpt4.data=response.data; //<<RJLR
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
