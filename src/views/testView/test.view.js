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
            /*$scope.chart1={};
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
            */

            /*
            cds.addWorkTask('grid1',{
                url:gc.conf.xsServicesBaseUrl+'/dbGetLayoutInfo.xsjs',
                query:{
                    idLayout:1
                },
                success:function (response) {
                    console.log("success");
                    console.log(response);
                    //$scope.gridOpt.data=response.data;
                },
                error:function (response,error) {
                    console.log("Error");
                    console.log(error);
                }
            });


            cds.doWorkTask('grid1');
            */

            //Tareas ------------------------------------------------------------------------

            //Parámetros:
            //txInsertTemplate: Cadena que contiene el template de la insertucción, donde se listan todas las columnas.
            //lstOrderedCol: Array; listado ordenado de columnas que van en el insert.
            //txColPlaceHolder: Texto; palabra clave que se utilizará para insertar el listado de columnas del insert.
            //Dependencias:
            //      this.safeReplaceVal();
            //Retorno: cadena con la instrucción insert con las columnas requeridas
            this.generateInsertStmt=function (txInsertTemplate, lstOrderedCol,txColPlaceHolder) {
                var res="";
                var value="";
                if(lstOrderedCol){
                    value=lstOrderedCol.join(",");
                }
                res=this.safeReplaceVal(txColPlaceHolder,value,txInsertTemplate);

                return res;
            };

            //generateSelectFromDummy
            //      Genera la cadena select {values} from dummy para el insert select
            //Parametros:
            //  txSelectFromDummyTemplate: Template que contiene la cadena tipo para formar el select
            //  lstObAttributes: Array de objetos que contiene el nombre de los atribuos y su tipo de dato:
            //
            //{
            //    txAttr:"",
            //    txTipo:"",
            //}
            //  lstObValues: Arreglo de objetos con los valores para formar el insert
            //

            this.generateSelectFromDummy=function (txSelectFromDummyTemplate,lstObAttributes,obValues,txColPlaceHolder) {
                var res="";
                var seekVal="";
                var lstJoin=[];
                for(var i in lstObAttributes){


                    if(obValues.hasOwnProperty(lstObAttributes[i].txAttr)){
                        if(lstObAttributes[i].txTipo.toLowerCase() == "texto"){
                            lstJoin.push( this.setStringVal(obValues[lstObAttributes[i].txAttr] ));
                        }else{
                            lstJoin.push(obValues[lstObAttributes[i].txAttr]);
                        }
                    }else{
                        lstJoin.push("NULL");
                    }
                }

                var res=lstJoin.join(",");

                res=this.safeReplaceVal(txColPlaceHolder,res,txSelectFromDummyTemplate);


                return res;
            };

            this.generateSelectFromDummy2=function (txSelectFromDummyTemplate,lstObAttributes,obValues,txColPlaceHolder) {
                var res="";
                var seekVal="";
                var lstJoin=[];
                for(var i in lstObAttributes){
                    if(lstObAttributes[i].txTipo.toLowerCase() == "texto") {
                        if(obValues.hasOwnProperty(lstObAttributes[i].txAttr)) {
                            lstJoin.push( this.setStringVal(obValues[lstObAttributes[i].txAttr] ));
                        }else {

                        }
                    }else{
                        lstJoin.push(obValues[lstObAttributes[i].txAttr]);
                    }
                }

                var res=lstJoin.join(",");

                res=this.safeReplaceVal(txColPlaceHolder,res,txSelectFromDummyTemplate);


                return res;
            };

            this.setStringVal=function (value) {
                var res="";

                res="'"+value+"'";

                return res;
            };


            this.safeReplaceVal=function (seekValue,value,str){
                var rg=new RegExp(seekValue,"g");
                str=str.replace(rg,value);
                return str;
            };

            this.generateSelectFromDummyAll=function (txSelectFromDummyTemplate,lstObAttributes,lstObValues,txColPlaceHolder) {
                var res="";
                var localRes="";
                var lstSelects=[];
                var union=" union all ";
                for(var i in lstObValues){
                    localRes=this.generateSelectFromDummy(txSelectFromDummyTemplate,lstObAttributes,lstObValues[i],txColPlaceHolder);
                    lstSelects.push(localRes);
                }



                return lstSelects.join(union);
            };


            this.test=function () {
                //Generar insert ----
                var txInsertTemplate="INSERT INTO (@@COLS) ";
                var lstOrderedCol=["TX_NOMBRE","TX_DATO"];
                var txColPlaceHolder="@@COLS";
                var insert=this.generateInsertStmt(txInsertTemplate,lstOrderedCol,txColPlaceHolder);
                console.log(insert);

                //Generar select -------------
                var res2="";

                var txSelectFromDummyTemplate="SELECT @@COLS FROM DUMMY;";
                var lstObAttributes=[
                    {
                        txAttr:"TX_NOMBRE",
                        txTipo:"TEXTO"
                    },
                    {
                        txAttr:"DATO",
                        txTipo:"NUMERO"
                    }
                ];
                var lstObValues=[
                    {
                        "TX_NOMBRE":"TEST"
                    },
                    {
                        "TX_NOMBRE":"TEST2",
                        "DATO":2.1
                    },
                    {
                        "TX_NOMBRE":"TEST3",
                        "DATO":1
                    }
                ];
                var obValues=lstObValues[0];
                var txColPlaceHolder="@@COLS";
                res2=this.generateSelectFromDummy(txSelectFromDummyTemplate,lstObAttributes,obValues,txColPlaceHolder);
                console.log(res2);


                var res3=this.generateSelectFromDummyAll(txSelectFromDummyTemplate,lstObAttributes,lstObValues,txColPlaceHolder);
                console.log(res3);
            };


            //this.test();

            cds.addWorkTask('insertXlsData',{
                url:gc.conf.xsServicesBaseUrl+'/dbCargaJson.xsjs',
                query:{
                    idLayout:1,
                    lstData:[
                        {
                            "TX_NOMBRE":"TEST"
                        },
                        {
                            "TX_NOMBRE":"TEST2",
                            "DATO":2.1
                        },
                        {
                            "TX_NOMBRE":"TEST3",
                            "DATO":1
                        }
                    ]
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

            cds.doWorkTask('insertXlsData');


        }
    ]);