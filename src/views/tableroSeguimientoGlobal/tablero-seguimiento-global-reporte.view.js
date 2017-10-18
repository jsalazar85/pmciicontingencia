angular
    .module('RDash')
    .controller('tableroSeguimientoGlobalReportCtrl', [
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
        tableroSeguimientoGlobalReportCtrl
    ]);

function tableroSeguimientoGlobalReportCtrl ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,$http)  {

    $rootScope.selectedIniciativaDetalle={};

    $scope.mostrar=false;
    $scope.currentMaster = {};
    $scope.currentDetail = {};

    var selectionCellTemplateM = '<div class="ngCellText ui-grid-cell-contents">' +
        ' <div ng-click="grid.appScope.rowClick(row)">{{COL_FIELD}}</div>' +
        '</div>';
    var selectionCellTemplateMObs = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;">' +
        ' <div ng-click="grid.appScope.rowClickMasterObs(row)"><i class="fa fa-pencil" aria-hidden="true"></i></div>' +
        '</div>';
    var selectionCellTemplateD = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;">' +
        ' <div ng-click="grid.appScope.rowClickD(row)"><i class="fa fa-pencil" aria-hidden="true"></div>' +
        '</div>';



    var dataRh=[
        {
            "txFuente": "DICTÁMENES ASEGURADORA",
            "txCredito": "715037823",
            "txNSS": "",
            "cvEstado": "07",
            "cvEstado5": "07000",
            "txEstado": "CHIAPAS",
            "txMunicipio": "CHIAPA DE CORZO",
            "txCanal": "",
            "txRFC": "",
            "txCP": "",
            "txDictamen": "PT",
            "txEdificacion": "",
            "txDesastre": "SISMO",
            "txTipoPersona": "DERECHOHABIENTE"
        }
    ];
    //Atributos demo

    $scope.maestroMedidasOpt = {
        data:[
            {   txControl:"0",
                idIniciativa:0, // 22 elementos
                txIniciativa:"Test1",
//                nuTotalUnidad:100,
                nuBeneficiados:200,
                nuMontoUnitario:200,
                nuMontoTotal:200,
                txObservaciones:""
            },
            ],
        columnDefs:[
            {
                field:"txControl",
                name:"No.",
                width:"3%",
                //cellTemplate: selectionCellTemplateM
            },
            {
                field:"txIniciativa",
                name:"MEDIDA",
                footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                width:"34%",
                //cellTemplate: selectionCellTemplateM
            },
            {
                field:"nuBeneficiados",
                name:"No. de derechohabientes beneficiarios",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: false,
                cellFilter:"number:0",
                width:"16%",
                //cellTemplate: selectionCellTemplateM

            },
            {
                field:"nuMontoTotal",
                name:"Monto",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: false,
                cellFilter:"number:0",
                width:"14%",
                //cellTemplate: selectionCellTemplateM
            },
            {
                field:"txObservaciones",
                name:"Observaciones",
                width:"30%"
                //cellTemplate: selectionCellTemplateMObs
            }
        ]
    };

    $scope.detalleMedidasOpt = {
        data:[
 /*           {
                idIniciativa:0, //
                idEstado:"Test1", //estado
                txEstado:"Test1",
//                nuTotalUnidad:100,
                nuBeneficiados:200,
                nuMontoUnitario:200,
                nuMontoTotal:200,
                txObservaciones:"txt"
            },
*/        ],
        columnDefs:[
            {
                field:"txEstado",
                name:"Por Estado",
                footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                width:"33.6%",
                //cellTemplate: selectionCellTemplateD
            },
            {
                field:"nuBeneficiados",
                name:"No. de derechohabientes beneficiarios",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: false,
                cellFilter:"number:0",
                width:"16.6%",
                //cellTemplate: selectionCellTemplateD
            },
            {
                field:"nuMontoUnitario",
                name:"Monto Unitario",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: false,
                cellFilter:"number:0",
                width:"16.6%",
                //cellTemplate: selectionCellTemplateD
            },
            {
                field:"nuMontoTotal",
                name:"Monto Total",
                type:"number",
                cellFilter:"number:0",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: false,
                cellFilter:"number:0",
                width:"16.6%",
                //cellTemplate: selectionCellTemplateD

            },
            {
                field:"txObservaciones",
                name:"Observaciones",
                width:"14.6%"

            }
        ]
    };

    cds.addWorkTask('grid3Medidas',{
        url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
        query:{
            idTab:12,
            idGra:1,
            idQry:1
        },
        success: function(response){
            console.log("success");
            console.log(response);
            $scope.maestroMedidasOpt.data = response.data;
            window.isLoaded=true;
           // $scope.apply();


        },
        error: function(response,error){
            console.log("Error");
            console.log(error);
            $scope.gridOptDet.data=[];
            //$scope.apply();
        }
    });

    $scope.rowClick = function (row) {
        $rootScope.selectedIniciativaDetalle.idIniciativa=row.entity.idIniciativa;
        console.log(row.entity);
        //var index = row.grid.renderContainers.body.visibleRowCache.indexOf(row);
        //$scope.gridApi.selection.selectRow($scope.gridOptions.data[index]);

        $scope.currentMaster = row.entity;
        $scope.getDetalleTabla1Data(row.entity.idIniciativa);
    };

    $scope.rowClickMasterObs = function (row) {
        $rootScope.selectedIniciativaDetalle.idIniciativa=row.entity.idIniciativa;
        console.log(row.entity);
        //var index = row.grid.renderContainers.body.visibleRowCache.indexOf(row);
        //$scope.gridApi.selection.selectRow($scope.gridOptions.data[index]);

        $scope.currentMaster = row.entity;
        $scope.getDetalleTabla1Data(row.entity.idIniciativa);


        gc.consulta={};
        gc.consulta.currentMaster=$scope.currentMaster;
        gc.consulta.currentDetail=$scope.currentDetail;

        $rootScope.selectedIniciativaDetalle.txEstado=row.entity.txEstado;
        gc.selectedIniciativaDetalle=$rootScope.selectedIniciativaDetalle;
        //gc.selectedIniciativaDetalle="asdfasdf";
        console.log(row.entity.idIniciativa);



        $scope.$emit('consultaIncidenteMasterObs', {currentMaster:$scope.currentMaster});


    };

    $scope.rowClickD = function (row) {

        gc.consulta={};
        gc.consulta.currentMaster=$scope.currentMaster;
        gc.consulta.currentDetail=$scope.currentDetail;

        $rootScope.selectedIniciativaDetalle.txEstado=row.entity.txEstado;
        gc.selectedIniciativaDetalle=$rootScope.selectedIniciativaDetalle;
        //gc.selectedIniciativaDetalle="asdfasdf";
        console.log(row.entity.idIniciativa);



        $scope.currentDetail = row.entity;
        console.log(row.entity);
        $scope.$emit('consultaIncidenteDetalle', {currentMaster:$scope.currentMaster,currentDetail:$scope.currentDetail});

    };

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

            $scope.mostrar=($scope.detalleMedidasOpt.data.length>0)?true:false;
            /*
            //deferred.resolve(response.data);
            if(angular.isDefined(workTask.task.success)){
                workTask.task.success(response.data);
            }else{
                console.log("[chartDataService].[doWorkTask] Success function not defined");
            }
            */
        },function(response,error){
            //deferred.resolve(response.data);
            if(angular.isDefined(workTask.task.success)){
                workTask.task.fail(response,error);
            }else{
                console.log("[chartDataService].[doWorkTask] Fail function not defined");
            }
        });

    };

    $scope.nuevo=function ($event) {
        $scope.$emit('consultaIncidenteDetalle', {currentMaster:$scope.currentMaster,currentDetail:{
            txEstado:"",
            nuBeneficiados:0,
            nuMontoUnitario:0,
            nuMontoTotal:0,
            txObservaciones:""
        }});

    };


    $scope.PrintElem = function(elem){ //tableroSeguimientoGlobalElement

       /* var myWindow = window.open('', 'Imprimir tablero de Seguimiento Global', 'height=400, width=600');
        myWindow.document.write('<html><head><title>' + "Iniciativas" + '</title></head>');
        myWindow.document.write('<body><h1>' + $("#tableroSeguimientoGlobalElement").html() + '</h1></body></html>');

        myWindow.document.close();
        myWindow.focus();

        myWindow.print();
        myWindow.close();
*/

        var w=window.open('http://localhost:63342/AppCaptura/dist/index.html?_ijt=ni0jol341f5s1akh607elc5m3p#!/reporteseguimiento', 'Imprimir tablero de Seguimiento Global', 'height=400, width=600');
        console.log(w);

        w.addEventListener('load', function () {
            var topbar=w.document.getElementById('mainTopBar');
            topbar.parentNode.removeChild(topbar);


            var myInt=setInterval(function(){
                console.log("chequeo --------");
                if(w.isLoaded){
                    w.isLoaded=false;
                    myInt=null;
                    w.document.close();
                    w.focus();

                    w.print();
                    w.close();
                }
            }, 1000);
            

        }, true);



        return true;

    };



    this.init=function() {

        console.log('entrando');
        cds.doWorkTask('grid3Medidas');

    };

    $rootScope.$on('capturaMasterObsRefresh',function (event, data) {
        cds.doWorkTask('grid3Medidas');
    });

    $rootScope.$on('capturaDetalleRefresh',function (event, data) {
        cds.doWorkTask('grid3Medidas');
        if($scope.currentMaster && $scope.currentMaster.idIniciativa){
            $scope.getDetalleTabla1Data($scope.currentMaster.idIniciativa);
        }
    });

    ////////////////////////////////////////////
    //INICIALIZADOR *********************
    this.init();

};
