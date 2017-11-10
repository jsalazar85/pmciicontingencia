angular
	.module('RDash')
	.controller('busquedaCtrl', [
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
			busquedaCtrl
		]);

function busquedaCtrl ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants)  {

    $rootScope.selectedRowDetalle={};
    $scope.mostrar=false;
    $scope.currentMaster = {};
    $scope.currentDetail = {};

    var selectionCellTemplateCredito = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;">' +
        ' <div ng-click="grid.appScope.rowClickGetDetalle(row)">{{COL_FIELD}}</div>' +
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
	$scope.catLoc={
		estados:[
			{nuId:"%%",txEstado:'todos'  },
			{nuId:"01",txEstado:'AGUASCALIENTES'  },
			{nuId:"02",txEstado:'BAJA CALIFORNIA NORTE'  },
			{nuId:"03",txEstado:'BAJA CALIFORNIA SUR'  },
			{nuId:"04",txEstado:'CAMPECHE'  },
			{nuId:"05",txEstado:'COAHUILA'  },
			{nuId:"06",txEstado:'COLIMA'  },
			{nuId:"07",txEstado:'CHIAPAS'  },
			{nuId:"08",txEstado:'CHIHUAHUA'  },
			{nuId:"09",txEstado:'DISTRITO FEDERAL'  },
			{nuId:"10",txEstado:'DURANGO'  },
			{nuId:"11",txEstado:'GUANAJUATO'  },
			{nuId:"12",txEstado:'GUERRERO'  },
			{nuId:"13",txEstado:'HIDALGO'  },
			{nuId:"14",txEstado:'JALISCO'  },
			{nuId:"15",txEstado:'MEXICO'  },
			{nuId:"16",txEstado:'MICHOACAN'  },
			{nuId:"17",txEstado:'MORELOS'  },
			{nuId:"18",txEstado:'NAYARIT'  },
			{nuId:"19",txEstado:'NUEVO LEON'  },
			{nuId:"20",txEstado:'OAXACA'  },
			{nuId:"21",txEstado:'PUEBLA'  },
			{nuId:"22",txEstado:'QUERETARO'  },
			{nuId:"23",txEstado:'QUINTANA ROO'  },
			{nuId:"26",txEstado:'SONORA'  },
			{nuId:"27",txEstado:'TABASCO'  },
			{nuId:"28",txEstado:'TAMAULIPAS'  },
			{nuId:"29",txEstado:'TLAXCALA'  },
			{nuId:"30",txEstado:'VERACRUZ'  },
			{nuId:"31",txEstado:'YUCATAN'  }
		],
		/*tipos:[
			{nu:0,tx:'todas'  },
			{nu:1,tx:'DICTÁMENES ASEGURADORA'  },
			{nu:2,tx:'ATENCIÓN Y SERVICIOS'  },
			{nu:3,tx:'DELEGACIONES'  },
			{nu:4,tx:'PORTAL INFONAVIT'  },
			{nu:5,tx:'BRIGADA INFONAVIT'  },
			{nu:6,tx:'ADAI'  },
		],*/
		tiposDanos:[
			{nu:'%%',tx:'todos'  },
			{nu:'SD',tx:'SIN DAÑO'  },
			{nu:'DP',tx:'DAÑO PARCIAL'  },
			{nu:'PT',tx:'PÉRDIDA TOTAL'  },
            {nu:'N',tx:'NOTIFICADO'  },
            {nu:'NA',tx:'DESCONOCIDO'  }
		]

	};
	//Atributos demo
	$scope.busqueda={
		txCredito : "",
		nuNSS:null,
		txEstado : {},
		///nuFuente : {},
		txDictamen:{}
	};

	$scope.gridOptEstado = {
		data:[
			{
				txEdo:"Test",
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
				name:"ESTADO",
				footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
				width:"120"
			},
			{
				field:"nuBrigadas",
				name:"Brigada",
				type:"number",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: false,
				cellFilter:"number:0",
                width:"150"
			},
			{
				name:"CESI",
				field:"nuCesi",
				type:"number",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: false,
				cellFilter:"number:0"
			},
			{
				field:"nuDelegacion",
				name:"Delegación",
				type:"number",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: false,
				cellFilter:"number:0"
			},
			{
				field:"nuInfonatel",
				name:"Infonatel",
				type:"number",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: true,
				cellFilter:"number:0"
			},
			{
				field:"nuOtro",
				name:"Otro",
				type:"number",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: true,
				cellFilter:"number:0"
			},
            {
                field:"nuDesconocido",
                name:"Desconocido",
                type:"number",
                aggregationType: uiGridConstants.aggregationTypes.sum,
                footerCellFilter:"number:0",
                aggregationHideLabel: true,
                cellFilter:"number:0"
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


	$scope.gridOptDet={
		//showColumnFooter: true,
		//showGridFooter: true,
		data:[],// dataRh,
		columnDefs:[
            {
                field:"txNSS", width: '6%',
                displayName:"NSS" ,
                width:130,
                cellTemplate: selectionCellTemplateCredito
            },
			{
				field:"txCredito", 
				width: '6%',
				name:"Crédito",
                width:150,
                cellTemplate: selectionCellTemplateCredito
			},
			{
				field:"txEstado", width: '12%',
				name:"Estado" ,
                width:125,
                cellTemplate: selectionCellTemplateCredito
			},
            {
                field:"txDano", width: '6%',
                displayName:"Daño" ,
                width:130,
                cellTemplate: selectionCellTemplateCredito
            },
            {
                field:"txCaso", width: '6%',
                displayName:"Caso" ,
                width:130,
                cellTemplate: selectionCellTemplateCredito
            },
			{
				field:"nuBrigadas", width: '6%',
				displayName:"Brigada" ,
                width:125,
                cellTemplate: selectionCellTemplateCredito
			},
			{
				field:"nuCesi", width: '6%',
				displayName:"CESI" ,
                width:125,
                cellTemplate: selectionCellTemplateCredito
			},
			{
				field:"nuDelegacion", width: '4%',
				name:"Delegación" ,
                width:125,
                cellTemplate: selectionCellTemplateCredito
			},
			{
				field:"nuInfonatel", width: '6%',
				name:"Infonatel" ,
                width:125,
                cellTemplate: selectionCellTemplateCredito
			},
			{
				field:"nuOtro", width: '6%',
				name:"Otro" ,
                width:125,
                cellTemplate: selectionCellTemplateCredito
			},
			{
				field:"nuDesconocido", width: '12%',
				displayName:"Desconocido" ,
                width:125,
                cellTemplate: selectionCellTemplateCredito
			}

		]
	};

    $scope.initGrid2=function () {
        $scope.gridAtnSrv={};
        $scope.gridAtnSrv.opt={
            showColumnFooter: true,
            data:[
                {
                    txEdo:"Test",
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
                    name:"ESTADO",
                    footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                    width:"23%"

                },
                {
                    field:"nuBrigadas",
                    name:"Brigada",
                    type:"number",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    name:"CESI",
                    field:"nuCesi",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true
                },
                {
                    field:"nuDelegacion",
                    name:"Delegacion",
                    type:"number",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuInfonatel",
                    name:"Infonatel",
                    type:"number",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuOtro",
                    name:"Otro",
                    type:"number",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuDesconocido",
                    name:"Desconocido",
                    type:"number",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
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

        cds.addWorkTask('areaAtnSrv.grid',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:3,
                idGra:17,
                idQry:1
            },
            success:function (response) {
                console.log("success");
                console.log(response);
                $scope.gridAtnSrv.opt.data=response.data;

            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });
    };

	////////////////////////////////////////////
	//FUNCIONES**************************


	$scope.buscar=function ($event) {
        var elm = $event.currentTarget;
        $(elm).prop('disabled', true);
        var obConditions = [];
        var condTxCredito = {
            txCol: "TX_CREDITO",
            txAlias: "",
            varValue: $scope.busqueda.nuCredito,
            txValueType: "TEXTO",
            txLogicOperator: "AND",
            txCompOperator: "="
        };
        var condTxEstado = {
            txCol: "CV_ESTADO",
            txAlias: "",
            varValue: $scope.busqueda.txEstado.nuId,
            txValueType: "TEXTO",
            txLogicOperator: "AND",
            txCompOperator: "LIKE"
        };
        var condNuNSS = {
            txCol: "TX_NSS",
            txAlias: "",
            varValue: $scope.busqueda.nuNSS,
            txValueType: "TEXTO",
            txLogicOperator: "AND",
            txCompOperator: "="
        };

        var condTxDictamen = {
            txCol: "TX_DICTAMEN",
            txAlias: "",
            varValue: $scope.busqueda.txDictamen.nu,
            txValueType: "TEXTO",
            txLogicOperator: "AND",
            txCompOperator: "="
        };

        var condTxCaso = {
            txCol: "CASO",
            txAlias: "",
            varValue: $scope.busqueda.txCaso,
            txValueType: "TEXTO",
            txLogicOperator: "AND",
            txCompOperator: "="
        };
        var flag = false;

        if ($scope.busqueda.nuCredito != undefined && $scope.busqueda.nuCredito !='') {
            obConditions.push(condTxCredito);
            flag = true;
        }
        if ($scope.busqueda.nuNSS != undefined && $scope.busqueda.nuNSS !='') {
            obConditions.push(condNuNSS);
            flag = true;
        }
        if ($scope.busqueda.txCaso != undefined && $scope.busqueda.txCaso!='') {
            obConditions.push(condTxCaso);
            flag = true;
        }

        if($scope.busqueda.txDictamen.nu !="%%"){
            obConditions.push(condTxDictamen);
            flag = true;
        }

        if($scope.busqueda.txEstado.nuId !="%%"){
            obConditions.push(condTxEstado);
        }else if(!flag && $scope.busqueda.txEstado.nuId =="%%"){
            obConditions.push(condTxEstado);
        }


        console.log(obConditions);
        // general
        cds.addWorkTask('gridAtnSrv', {
            url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
            query: {
                idTab: 19,
                idGra: 1,
                idQry: 1,
                lstObConditions: obConditions
            },
            success: function (response) {
                console.log("success");
                console.log(response);
                $scope.gridAtnSrv.opt.data = response.data;
                $(elm).prop('disabled', false);
            },
            error: function (response, error) {
                console.log("Error");
                console.log(error);
                $(elm).prop('disabled', false);
            }
        });
        cds.doWorkTask('gridAtnSrv');
        // detalle
        cds.addWorkTask('gridOptDet', {
            url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
            query: {
                idTab: 19,
                idGra: 2,
                idQry: 1,
                lstObConditions: obConditions
            },
            success: function (response) {
                console.log("success");
                console.log(response);
                $scope.gridOptDet.data = response.data;
                $(elm).prop('disabled', false);
            },
            error: function (response, error) {
                console.log("Error");
                console.log(error);
                $(elm).prop('disabled', false);
            }
        });
        cds.doWorkTask('gridOptDet');

    };

    $scope.rowClickGetDetalle = function (row) {
        console.log(row);
        console.log(row.entity.txCredito);
        gc.consulta={};
        gc.consulta.currentDetail=$scope.currentDetail;

        $rootScope.selectedRowDetalle.txEstado=row.entity.txEstado;
        gc.selectedRowDetalle=$rootScope.selectedRowDetalle;
        $scope.currentDetail = row.entity;
        console.log(row.entity);
        $scope.$emit('consultaDetalleRegistro', {currentDetail:$scope.currentDetail});

    };

	this.init=function() {
		//$scope.lstAsignacion=dss.datos.lstAsignacion;
		//$scope.busqueda.nuFuente = $scope.catLoc.tipos[0];
		$scope.busqueda.txDictamen = $scope.catLoc.tiposDanos[0];
		$scope.busqueda.txEstado = $scope.catLoc.estados[0];
        $scope.initGrid2();

	};

	////////////////////////////////////////////
	//INICIALIZADOR *********************
	this.init();

};