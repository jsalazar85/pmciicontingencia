angular
    .module('RDash')
    .controller('tableroCargaArchivoGenCtrl', [
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
        '$http',
        tableroCargaArchivoGenCtrl
    ]);

function tableroCargaArchivoGenCtrl ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,$http)  {
    //Conjunto de columnas requeridas (debe venir por parametro externo
    $scope.currentColumnsReq = 2;

    // columnas que se esperan encontrar en el excel (ejemplo)
    var dataMockCols=[ //Columnas que deben ser similar o igual a ($scope.gridOptions.columnDefs [field,name,type,...])
    {
            nuOrden:0,
        txColumna:"Fecha",
            idTipoDato:"000",
            txTipoDato:"DAT", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },
        {
            nuOrden:0,
        txColumna:"100",
            idTipoDato:"000",
            txTipoDato:"NUM", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },
        {
            nuOrden:0,
        txColumna:"Campo1",
            idTipoDato:"000",
            txTipoDato:"string", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },
        {
            nuOrden:0,
        txColumna:"Campo2",
            idTipoDato:"000",
            txTipoDato:"string", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:1
        },
        {
            nuOrden:0,
        txColumna:"Nombre",
            idTipoDato:"000",
            txTipoDato:"string", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },];

// estructura (nombre de campos por definir) para desplegar los campos esperados para la carga.
    $scope.colRequeridasOpt = {
        data:dataMockCols,
        columnDefs:[
            {
                field:"txColumna",
                name:"Nombre",
                type:"string",
                width:"50%"
            },
            {
                field:"txTipoDato",
                name:"Tipo",
                type:"string",
                width:"30%"
            },
            {
                field:"nuObligatorio",
                name:"Obligado",
                type:"number",
                width:"10%"
            },
            {
                field:"txFound",
                name:"status", //marcar si esta presente en el excel (verde = presente, rojo = ausente y es mandatorio, gris= ausente no mandatorio, )
                width:"10%",
                type: 'object' //TBD
            }
        ]
    };

    dataMockExcel = [
        // se recupera del UPLOAD del excel (no txt, no csv), columna 2 .. n
    ];
    $scope.detalleExcelOpt = {
        enableHorizontalScrollbar:uiGridConstants.scrollbars.ALWAYS,
        MessageErrors:[], //errores generados por la carga del archivo y su "pre"procesamiento. .push({msg:error.toString(), type:"danger", dismiss:"alert"})
        matchColumnDef:dataMockCols,// aqui se copiará el arreglo de SOLO los nombres de los campos REQUERIDOS/MANDATORIOS
        matchColumnHead:{
            idArea:2,
            txArea:"Area X",
            idLayout:$scope.currentColumnsReq,
            txNombreLayout:"Layout X",
            txNombreHoja:" HojaVarios "
        },
        data: dataMockExcel, //[];
        columnDefs:[
            // se recupera del excel , columna1, filtrado por los nombres que coincidan en colRequeridasOpt.data.txField
        ]
    };



//////////////////////


//////////////////
    $scope.nuevoUploadDB = function ($event) {
        if($scope.detalleExcelOpt.data.length == 0){
            return;
        }
        console.log("subiendo");
        $("#btnUploadFile").prop("disabled",true);

        cds.addWorkTask('insertXlsDataArchivo',{
            url:gc.conf.xsServicesBaseUrl+'/dbCargaJson.xsjs',
            query:{
                idLayout:$scope.currentColumnsReq,
                lstData:$scope.detalleExcelOpt.data,
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                //$scope.censo.data=response.data;
                if(response.insertStatus.blError){
                    $scope.detalleExcelOpt.MessageErrors=[];
                    $scope.detalleExcelOpt.MessageErrors.push({msg:response.insertStatus.txInsertErr, type:"danger", dismiss:"alert"});
                }
                $("#btnUploadFile").prop("disabled",false);
                alert("Archivo cargado correctamente");
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
                $("#btnUploadFile").prop("disabled",false);
                alert("Ocurrió un error al cargar el archivo");

            }
        });
        cds.doWorkTask('insertXlsDataArchivo');
    };

    $scope.init=function() {
        //lectura de las Columnas requeridas.
        cds.addWorkTask('gridColumnasRequeridas',{
            url:gc.conf.xsServicesBaseUrl+'/dbGetLayoutInfo.xsjs',
            query:{
                idLayout:$scope.currentColumnsReq,
            },
            success: function(response){
                console.log("success");
                console.log(response);
                $scope.detalleExcelOpt.matchColumnHead  = response.layoutDef;
                $scope.detalleExcelOpt.matchColumnDef  = response.colDef;
                $scope.colRequeridasOpt.data = response.colDef;
                //$scope.$apply();
            },
            error: function(response,error){
                console.log("Error");
                console.log(error);
                $scope.detalleExcelOpt.matchColumnDef  = [];
                $scope.colRequeridasOpt.data = [];
                $scope.detalleExcelOpt.matchColumnHead = [];
            }
        });

        cds.doWorkTask('gridColumnasRequeridas');
    };
    $scope.init();

    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    //$scope.init();

    $rootScope.$on('areaArchivoSeleccionado',function ($event,valor) {
        console.log(valor);
        $scope.currentColumnsReq = valor.idArchivo;
        $scope.init();
    });

};
//app.directive("importSheetJs", [SheetJSImportDirective]);