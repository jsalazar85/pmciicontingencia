angular
    .module('RDash')
    .service('tableroAreaCreditoSrvc',[
        '$rootScope',
        'chartDataService',
        'globalsController',
        function ($rootScope,cds,gc){
            var mockEnable=false;

            this.obEvents={
                GRID_DATA_READY:'tableroAreaCreditoSrvc.TableDataResponse',
                GRA1_DATA_READY:'tableroAreaCreditoSrvc.Gra1',
                GRA2_DATA_READY:'tableroAreaCreditoSrvc.Gra2'
            };

            //<editor-fold desc="Eventos">
            this.suscribe=function (scope,callback,txEvent){
                var handler=$rootScope.$on(txEvent,callback);
                scope.$on('$destroy',handler);
            };

            this.notify=function (txEventName,obParm) {
                $rootScope.$emit(txEventName,obParm);
            };
            //</editor-fold>

            //<editor-fold desc="Definiciones">
            this.lstObServData=[];
            //</editor-fold>

            //<editor-fold desc="Funciones de Servicios">
            this.getTableData=function () {
                if(mockEnable){
                    var lstObServ=this.mockTabla();
                    this.notify(this.obEvents.GRID_DATA_READY,lstObServ);
                }else{
                    //Llamar al servicios web
                    // var obConditions=[
                    //     {
                    //         txCol:"NU_FECHA",
                    //         txAlias:"",
                    //         varValue:obFecha.nuFecha,
                    //         txValueType:"NUMERO",
                    //         txLogicOperator:"AND",
                    //         txCompOperator:"="
                    //     }
                    // ];
                    var GRID_DATA_READY=this.obEvents.GRID_DATA_READY;
                    var srv=this;
                    cds.addWorkTask('detalleServidoresSrvc.detalle',{
                        url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                        query:{
                            idTab:18,
                            idGra:1,
                            idQry:1,
                            lstObConditions:null
                        },
                        success: function(response){
                            console.log("success");
                            console.log(response);
                            srv.notify(GRID_DATA_READY,response.data);
                        },
                        error: function(response,error){
                            console.log("Error");
                            console.log(error);
                        }
                    });
                    cds.doWorkTask('detalleServidoresSrvc.detalle');
                }
            };

            this.getGra1Data=function () {
                if(mockEnable){
                    var lstObServ=this.mockGra1();
                    this.notify(this.obEvents.GRA1_DATA_READY,lstObServ);
                }else{
                    //Llamar al servicios web
                    var obConditions=[
                        {
                            txCol:"NU_FECHA",
                            txAlias:"",
                            varValue:obFecha.nuFecha,
                            txValueType:"NUMERO",
                            txLogicOperator:"AND",
                            txCompOperator:"="
                        }
                    ];
                    var TABLE_DATA_RESPONSE=this.obEvents.TABLE_DATA_RESPONSE;
                    var srv=this;
                    cds.addWorkTask('detalleServidoresSrvc.detalle',{
                        url:gc.conf.xsDEVServicesBaseUrl+'/execTabQueryFilter.xsjs',
                        query:{
                            idTab:1001,
                            idGra:301,
                            idQry:1,
                            lstObConditions:obConditions
                        },
                        success: function(response){
                            console.log("success");
                            console.log(response);
                            srv.notify(TABLE_DATA_RESPONSE,response.data);
                        },
                        error: function(response,error){
                            console.log("Error");
                            console.log(error);
                        }
                    });
                    cds.doWorkTask('detalleServidoresSrvc.detalle');
                }
            };

            this.getGra2Data=function () {
                if(mockEnable){
                    var lstObServ=this.mockGra2();
                    this.notify(this.obEvents.GRA2_DATA_READY,lstObServ);
                }else{
                    //Llamar al servicios web
                    var obConditions=[
                        {
                            txCol:"NU_FECHA",
                            txAlias:"",
                            varValue:obFecha.nuFecha,
                            txValueType:"NUMERO",
                            txLogicOperator:"AND",
                            txCompOperator:"="
                        }
                    ];
                    var TABLE_DATA_RESPONSE=this.obEvents.TABLE_DATA_RESPONSE;
                    var srv=this;
                    cds.addWorkTask('detalleServidoresSrvc.detalle',{
                        url:gc.conf.xsDEVServicesBaseUrl+'/execTabQueryFilter.xsjs',
                        query:{
                            idTab:1001,
                            idGra:301,
                            idQry:1,
                            lstObConditions:obConditions
                        },
                        success: function(response){
                            console.log("success");
                            console.log(response);
                            srv.notify(TABLE_DATA_RESPONSE,response.data);
                        },
                        error: function(response,error){
                            console.log("Error");
                            console.log(error);
                        }
                    });
                    cds.doWorkTask('detalleServidoresSrvc.detalle');
                }
            };
            //</editor-fold>


            //<editor-fold desc="Mock">
            this.mockTabla=function () {
                var mockDataGrid=[
                    {
                        txDelegacion: "07 CHIAPAS",
                        nuLinea1Form: null,
                        nuLinea1Tub: null,
                        nuLinea2Form: 19,
                        nuLinea2Tub: 108,
                        nuLinea3Form: 4,
                        nuLinea3Tub: 9,
                        nuLinea4Form: 4,
                        nuLinea4Tub: 9,
                        nuLinea5Form: 4,
                        nuLinea5Tub: 9,
                        nuLinea6Form: 4,
                        nuLinea6Tub: 9
                    },
                    {
                        txDelegacion: "09 CDMX",
                        nuLinea1Form: null,
                        nuLinea1Tub: null,
                        nuLinea2Form: 19,
                        nuLinea2Tub: 108,
                        nuLinea3Form: 4,
                        nuLinea3Tub: 9,
                        nuLinea4Form: 4,
                        nuLinea4Tub: 9,
                        nuLinea5Form: 4,
                        nuLinea5Tub: 9,
                        nuLinea6Form: 4,
                        nuLinea6Tub: 9
                    }
                ];

                //mockDataGrid= _.concat(mockDataGrid);
                return mockDataGrid;
            };
            this.mockGra1=function(){
                var mock=[
                    {
                        txMedida:"1",
                        nuFormalizado:20,
                        nuTuberia:3
                    },
                    {
                        txMedida:"2",
                        nuFormalizado:20,
                        nuTuberia:3
                    }
                ];
                return mock;
            };
            this.mockGra2=function(){
                var mock=[
                    {
                        txDelegacion:"07 Chiapas",
                        nuFormalizado:20,
                        nuTuberia:3
                    },
                    {
                        txDelegacion:"09 CDMX",
                        nuFormalizado:20,
                        nuTuberia:3
                    }
                ];
                return mock;
            };

            //</editor-fold>
        }
    ]);
