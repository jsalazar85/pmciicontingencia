
angular
    .module('RDash')
    .controller('cargaArchivo', [
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
        cargaArchivo
    ]);

function cargaArchivo($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval) {
    //<editor-fold desc="Declaraciones">
    //Definición de las columnas
    var columnDef={
        txColumnName:"",
        blIsRequired:false,
        txDataType:""
    };
    //Objeto tipo de la definición del layout
    var obFileLayout={
        lstColumns:[
            columnDef
        ],
        txSheetName:"",
        txFileExt:"",
        nuRowHeader:0
    };
    //</editor-fold>

    //<editor-fold desc="Funciones - Datos Mock">
    $scope.loadMockData=function () {
        obFileLayout.lstColumns.push(
            {
                txColumnName:"",
                blIsRequired:false,
                txDataType:""
            }
        );
    };
    //</editor-fold>

    //<editor-fold desc="Declaraciones">
    //</editor-fold>

    $scope.init();
};
