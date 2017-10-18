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
			{nuId:1,txEstado:'AGUASCALIENTES'  },
			{nuId:2,txEstado:'BAJA CALIFORNIA NORTE'  },
			{nuId:3,txEstado:'BAJA CALIFORNIA SUR'  },
			{nuId:4,txEstado:'CAMPECHE'  },
			{nuId:5,txEstado:'COAHUILA'  },
			{nuId:6,txEstado:'COLIMA'  },
			{nuId:7,txEstado:'CHIAPAS'  },
			{nuId:8,txEstado:'CHIHUAHUA'  },
			{nuId:9,txEstado:'DISTRITO FEDERAL'  },
			{nuId:10,txEstado:'DURANGO'  },
			{nuId:11,txEstado:'GUANAJUATO'  },
			{nuId:12,txEstado:'GUERRERO'  },
			{nuId:13,txEstado:'HIDALGO'  },
			{nuId:14,txEstado:'JALISCO'  },
			{nuId:15,txEstado:'MEXICO'  },
			{nuId:16,txEstado:'MICHOACAN'  },
			{nuId:17,txEstado:'MORELOS'  },
			{nuId:18,txEstado:'NAYARIT'  },
			{nuId:19,txEstado:'NUEVO LEON'  },
			{nuId:20,txEstado:'OAXACA'  },
			{nuId:21,txEstado:'PUEBLA'  },
			{nuId:22,txEstado:'QUERETARO'  },
			{nuId:23,txEstado:'QUINTANA ROO'  },
			{nuId:26,txEstado:'SONORA'  },
			{nuId:27,txEstado:'TABASCO'  },
			{nuId:28,txEstado:'TAMAULIPAS'  },
			{nuId:29,txEstado:'TLAXCALA'  },
			{nuId:30,txEstado:'VERACRUZ'  },
			{nuId:31,txEstado:'YUCATAN'  }
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
            {nu:'NA',tx:'DESCONOCIDO'  },
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
				name:"Pérdida Total",
				field:"nuCesi",
				type:"number",
				cellFilter:"number:0",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: false,
				cellFilter:"number:0"
			},
			{
				field:"nuDelegacion",
				name:"Delegación",
				type:"number",
				cellFilter:"number:0",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: false,
				cellFilter:"number:0"
			},
			{
				field:"nuInfonatel",
				name:"Infonatel",
				type:"number",
				cellFilter:"number:0",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: true,
				cellFilter:"number:0"
			},
			{
				field:"nuOtro",
				name:"Otro",
				type:"number",
				cellFilter:"number:0",
				aggregationType: uiGridConstants.aggregationTypes.sum,
				footerCellFilter:"number:0",
				aggregationHideLabel: true,
				cellFilter:"number:0"
			},
            {
                field:"nuDesconocido",
                name:"Desconocido",
                type:"number",
                cellFilter:"number:0",
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
				field:"txFuente", width: '12%',
				name:"Fuente" ,
				width:200
			},
			{
				field:"txCredito", 
				width: '6%',
				name:"Crédito",
                width:150
			},
			{
				field:"txNSS", width: '6%',
				displayName:"NSS" ,
                width:130
			},
			{
				field:"cvEstado", width: '4%',
				displayName:"EstadoID",
                width:125
			},
			{
				field:"txEstado", width: '12%',
				name:"Estado" ,
                width:125
			},
			{
				field:"txMunicipio", width: '12%',
				name:"Municipio" ,
                width:125
			},
			{
				field:"txCanal", width: '6%',
				name:"Canal" ,
                width:125
			},
			{
				field:"txRFC", width: '6%',
				displayName:"RFC" ,
                width:125
			},
			{
				field:"txCP", width: '6%',
				displayName:"CP" ,
                width:125
			},
			{
				field:"txDictamen", width: '4%',
				name:"Dictamen" ,
                width:125
			},
			{
				field:"txEdificacion", width: '6%',
				name:"Edificación" ,
                width:125
			},
			{
				field:"txDesastre", width: '6%',
				name:"Desastre" ,
                width:125
			},
			{
				field:"txTipoPersona", width: '12%',
				displayName:"Tipo de Persona" ,
                width:125
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
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    name:"Pérdita Total",
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
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuInfonatel",
                    name:"Infonatel",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuOtro",
                    name:"Otro",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    cellFilter:"number:0"
                },
                {
                    field:"nuDesconocido",
                    name:"Desconocido",
                    type:"number",
                    cellFilter:"number:0",
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
		var elm=$event.currentTarget;
		$(elm).prop('disabled', true);
		var request={
			txCredito : $scope.busqueda.nuCredito,
			txEstado : $scope.busqueda.txEstado.nuId, //$scope.selectedEstado.nuId,
			nuNSS : $scope.busqueda.nuNSS,
			txDictamen: $scope.busqueda.txDictamen.nu
		};

		console.log(request);
        console.log($scope.busqueda.txDictamen.nu);


		//cds.doWorkTask('gridAtnSrv.busqueda.grid');
        dc.getBusquedaTabla1Data(request,{}).then(
        	function (response) {
                console.log(response);
        		$scope.gridOptDet.data=response.data.direccion;
                $scope.gridAtnSrv.opt.data=response.data.data2;
                $(elm).prop('disabled', false);

            },function (response) {
				console.log(response);
                $(elm).prop('disabled', false);
            }
		);

/*
		$.ajax({
				url:gc.conf.xsServicesBaseUrl+'/dbConsultaDetalle.xsjs',
				method:'GET',
				dataType:'json',
				crossDomain:true,
				data:{dataobject:JSON.stringify(request)},
			success: function(response){
				console.log("success");
				console.log(response);
				$scope.gridOptDet.data=response.direccion;
				$scope.apply();
			},
			error: function(response,error){
				console.log("Error");
				console.log(error);
				$scope.gridOptDet.data=[];
				$scope.apply();
			}
		});
*/
		
		// Falta proceso de Busqueda
	};



	this.init=function() {
		//$scope.lstAsignacion=dss.datos.lstAsignacion;
		//$scope.busqueda.nuFuente = $scope.catLoc.tipos[0];
		$scope.busqueda.txDictmen = $scope.catLoc.tiposDanos[0];
		$scope.busqueda.txEstado = $scope.catLoc.estados[0];
        $scope.initGrid2();

	};

	////////////////////////////////////////////
	//INICIALIZADOR *********************
	this.init();

};