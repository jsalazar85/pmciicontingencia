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

    // columnas que se esperan encontrar en el excel (ejemplo)
    var dataMockCols=[ //Columnas que deben ser similar o igual a ($scope.gridOptions.columnDefs [field,name,type,...])
        {
            txField:"100",
            idTipoDato:"000",
            txTipoDato:"number", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },
        {
            txField:"Campo1",
            idTipoDato:"000",
            txTipoDato:"string", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },
        {
            txField:"Campo2",
            idTipoDato:"000",
            txTipoDato:"string", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },
        {
            txField:"Nombre",
            idTipoDato:"000",
            txTipoDato:"string", //txTipoDato:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
            nuObligatorio:0
        },];

// estructura (nombre de campos por definir) para desplegar los campos esperados para la carga.
    $scope.colRequeridasOpt = {
        data:dataMockCols,
        columnDefs:[
            {
                field:"txField",
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
        matchColumnDef:dataMockCols,// aqui se copiará el arreglo de SOLO los nombres de los campos REQUERIDOS/MANDATORIOS
        matchColumnHead:[], // informacion de encabezado util, (
                                                // datos.idArea=resultSet.getInteger(1);
                                                // datos.txArea=""; //resultSet.getInteger();
                                                // datos.idLayout=resultSet.getInteger(2);
                                                // datos.txNombreLayout=resultSet.getString(3);
                                                // datos.txNombreHoja=resultSet.getString(4);
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
            //  layoutDef:getLayoutDef(JSONObj.idQuery),
            //  matchColumnDef:getLayoutColDef(JSONObj.idQuery)
            $scope.detalleExcelOpt.matchColumnHead  = response.layoutDef;
            $scope.detalleExcelOpt.matchColumnDef  = response.matchColumnDef;
            $scope.colRequeridasOpt.data = response.matchColumnDef;
            //window.isLoaded=true;
        },
        error: function(response,error){
            console.log("Error");
            console.log(error);
            $scope.detalleExcelOpt.matchColumnDef  = [];
            $scope.colRequeridasOpt.data = [];
        }
    });

    $scope.getDetalleTabla1Data=function (idMedida) {
        $http({
            url:gc.conf.xsServicesBaseUrl+'/dbResumenIniciativas.xsjs',
            method:'POST',
            dataType:'json',
            data:{dataobject:JSON.stringify({idIniciativa:idMedida})},
            //data: JSON.stringify ( {dataobject:{testob:"test"}} ),
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept':'application/json, text/javascript, */*; q=0.01'
            }
        }).then(function(response){
            console.log(response);
            $scope.detalleMedidasOpt.data = response.data.direccion;

        },function(response,error){
            //deferred.resolve(response.data);
            if(angular.isDefined(workTask.task.success)){
                workTask.task.fail(response,error);
            }else{
                console.log("[chartDataService].[doWorkTask] Fail function not defined");
            }
        });

    };

    $scope.uploadDB=function ($event) {
        console.log("subiendo");
        $scope.detalleExcelOpt.data = [];
    };

    this.init=function() {
        cds.doWorkTask('gridColumnasRequeridas');
    };

    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();

};
//app.directive("importSheetJs", [SheetJSImportDirective]);