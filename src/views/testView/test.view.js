angular
    .module('RDash')
    .controller('testCtrl', [
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
        function ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants)  {
            $scope.chart1={};
            $scope.chart1.chartOpts={
                colors:[
                    "#ee6032",
                    "#ee0305",
                    "#8aed39",
                ],
                valueAxes:[{
                    title:"Test"
                }]
            };

            $scope.chart1.data=[
                {
                    txCategoria:"test",
                    nuValor1:20,
                    nuValor2:50
                },
                {
                    txCategoria:"test2",
                    nuValor1:30,
                    nuValor2:60
                },
            ];

            $scope.gridOpt={
                showGridFooter: true,
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
                        field:"txEdo",
                        name:"ESTADO",
                        footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>"
                    },
                    {
                        field:"nuTotalReportes",
                        name:"Reportes Delegación y Brigadas",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        name:"No Aplica Seguro",
                        field:"nuNoAplicaSeguro",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        field:"nuAplicaSeguro",
                        name:"Aplica Seguro",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        field:"nuPT",
                        name:"Pérdida Total Dictamen Final Aseguradora",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        field:"nuDP",
                        name:"Daño Parcial Dictamen Final Aseguradora",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        field:"nuST_PTDP",
                        name:"Subtotal Pérdida Total y Daño Parcial",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        field:"nu_SD",
                        name:"Sin Daños Dicatmen Final Aseguradora",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        field:"nuASPD",
                        name:"Aplica Seguro en Proceso de Dictaminar",
                        type:"number",
                        cellFilter:"number:0",
                        aggregationType: uiGridConstants.aggregationTypes.sum,
                        footerCellFilter:"number:0",
                        aggregationHideLabel: true
                    },
                    {
                        field:"nuPorAvc",
                        name:"% de Avance",
                        type:"number",
                        cellFilter:'percentFilter:this'
                    },
                ]
            };

            $scope.test=function () {
                var obj=tools.getLocalJson("json/amchart/areaChart1.json");
                console.log(obj);
            };

            $scope.test();

            //Tareas ------------------------------------------------------------------------
            cds.addWorkTask('chart1',{
                url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                query:{
                    idTab:1,
                    idGra:20,
                    idQry:1
                },
                success:function (response) {
                    console.log("success");
                    console.log(response);
                },
                error:function (response,error) {
                    console.log("Error");
                    console.log(error);
                }
            });

            cds.doWorkTask('chart1');



            cds.addWorkTask('grid1',{
                url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                query:{
                    idTab:1,
                    idGra:40,
                    idQry:1
                },
                success:function (response) {
                    console.log("success");
                    console.log(response);
                    $scope.gridOpt.data=response.data;
                },
                error:function (response,error) {
                    console.log("Error");
                    console.log(error);
                }
            });

            cds.doWorkTask('grid1');

            //Tareas ------------------------------------------------------------------------

        }
    ]);