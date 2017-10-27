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
    $scope.currentColumnsReq = 1;
    $scope.layoutDef = {
    		//Dummy data (mokUp)
            "idArea": 1,
            "txArea": "ÁREA 1 TEST XXXX",
            "idLayout": 1,
            "txNombreLayout": "PRUEBA DE CARGA EXCEL XXX",
            "txNombreHoja": "HOJA22",
            "nuLineaEncabezado": 1
    		
    };
    $scope.muestreoExcel = [
		{nu:50,tx:'primeros 50 registros' },
		{nu:100,tx:'primeros 100 registros' },
		{nu:1000,tx:'primeros 1000 registros' },
		{nu:0,tx:'Todos los registros'  },
	]

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
                width:"20%"
            },
            {
                field:"nuObligatorio",
                name:"Requerida",
                type:"number",
                width:"10%"
            },
            {
                field:"nuNoNulo",
                name:"no nulos",
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
        ResumenInfo:{Props:{},//AppVersion:"15.0300",Application:"Microsoft Excel",Author:"Ricardo Lopez", Company:""
        	totalCols:0,
        	totalReg:0,
        },
        muestreo:$scope.muestreoExcel[0] , // cantidad maxima que se van a desplegar en el componente tabla
        MessageErrors:[], //errores generados por la carga del archivo y su "pre"procesamiento. .push({msg:error.toString(), type:"danger", dismiss:"alert"})
        canSubmit : false,

        data: dataMockExcel, //[];
        columnDefs:[
            // se recupera del excel , columna1, filtrado por los nombres que coincidan en colRequeridasOpt.data.txField
        ]
    };

    //lectura de las Columnas requeridas.
    cds.addWorkTask('gridColumnasRequeridas',{
        url:gc.conf.xsServicesBaseUrl+'/dbGetLayoutInfo.xsjs',
        query:{
            idLayout:$scope.currentColumnsReq,
        },
        success: function(response){
            console.log("success");
            console.log(response);
            $scope.layoutDef = response.layoutDef;
            //$scope.colDef  = response.colDef;
            $scope.colRequeridasOpt.data = response.colDef;
            //window.isLoaded=true;
        },
        error: function(response,error){
            console.log("Error");
            console.log(error);
            //$scope.colDef  = [];
            $scope.colRequeridasOpt.data = [];
            $scope.layoutDef = {};
        }
    });

    $scope.nuevoUploadDB = function ($event) {
        console.log("subiendo");
        cds.addWorkTask('insertXlsDataArchivo',{
            url:gc.conf.xsServicesBaseUrl+'/dbCargaJson.xsjs',
            query:{
                idLayout:$scope.currentColumnsReq,
                lstData:$scope.detalleExcelOpt.data,
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.detalleExcelOpt.canSubmit = false;
                //$scope.censo.data=response.data;
                if(response.insertStatus.blError){
                    $scope.detalleExcelOpt.MessageErrors=[];
                    $scope.detalleExcelOpt.MessageErrors.push({msg:response.insertStatus.txInsertErr, type:"danger", dismiss:"alert"});
                }
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
                $scope.detalleExcelOpt.MessageErrors=[];
                $scope.detalleExcelOpt.MessageErrors.push({msg:error, type:"danger", dismiss:"alert"});
                $scope.detalleExcelOpt.canSubmit = false;
            }
        });
        cds.doWorkTask('insertXlsDataArchivo');
    };

    this.init=function() {
        cds.doWorkTask('gridColumnasRequeridas');
    };

    this.init();

};
//app.directive("importSheetJs", [SheetJSImportDirective]);