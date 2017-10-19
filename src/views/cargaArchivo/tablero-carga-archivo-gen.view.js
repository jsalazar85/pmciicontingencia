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
    $scope.currentColumnsReq = 100;

    // columnas que se esperan encontrar en el excel (ejemplo)
    var dataMockCols=[ //Columnas que deben ser similar o igual a ($scope.gridOptions.columnDefs [field,name,type,...])
        {
            txField:"campo1",
            blMandatory:true,
            txType:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
        },
        {
            txField:"campo2",
            blMandatory:true,
            txType:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
        },
        {
            txField:"campo3",
            blMandatory:false,
            txType:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
        },
        {
            txField:"name",
            blMandatory:false,
            txType:"string" // 'string', 'boolean', 'number', 'date', 'object', 'numberStr'
        },
    ];

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
                field:"txType",
                name:"Tipo",
                type:"string",
                width:"30%"
            },
            {
                field:"blMandatory",
                name:"Obligado",
                type:"boolean",
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
        data: dataMockExcel, //[];
        columnDefs:[
            // se recupera del excel , columna1, filtrado por los nombres que coincidan en colRequeridasOpt.data.txField
            {
                field:"timestamp",
                name:"timestamp",
                type:"string"},
            {
                field:"campo1",
                name:"campo1",
                type:"string"}
        ]
    };

    //Carga de Archivo
    $scope.fileNameChanged = function ($event) {
        console.log("my UPLOAD files namesArr ele");
        console.log($event);
        var files = ele.files;
        var l = files.length;
        var namesArr = [];

        var reader = new FileReader();

        for (var i = 0; i < l; i++) {
            namesArr.push(files[i].name);
        }
        console.log("my UPLOAD files namesArr ele");
        console.log(files);
        console.log(namesArr);

    };



    //lectura de las Columnas requeridas.
    cds.addWorkTask('gridColumnasRequeridas',{
        url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
        query:{
            idTab:120,
            idGra:$scope.currentColumnsReq,
            idQry:10
        },
        success: function(response){
            console.log("success");
            console.log(response);
            $scope.colRequeridasOpt.data = response.data;
            //window.isLoaded=true;
        },
        error: function(response,error){
            console.log("Error");
            console.log(error);
            //$scope.gridOptDet.data=dataMockCols; //[];
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
        //cds.doWorkTask('gridColumnasRequeridas');
    };

    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();

};
//app.directive("importSheetJs", [SheetJSImportDirective]);