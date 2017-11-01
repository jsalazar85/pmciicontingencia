
angular
    .module('RDash')
    .controller('tablerReporteFormatUnicoCtrl', [
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
        'uiGridFactoryService',
        '$http',
        '$element',
        function ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants,gridFactory,$http,$element) {
            var selectionCellTemplateD = '<div class="ngCellText ui-grid-cell-contents" style="cursor: pointer;">' +
                ' <div ng-click="grid.appScope.rowClickD(row)"><i class="fa fa-pencil" aria-hidden="true"></div>' +
                '</div>';
            $scope.detalleMedidasOpt = {
                data: []
            };

            $scope.resumenIniciativas=[];
            $scope.imagenes=[];

            var detalleColDefTemplate=[
                {
                    field:"txEstado",
                    name:"Por Estado",
                    footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                    width:"30%",
                    //cellTemplate: selectionCellTemplateD
                }
            ];

            //OBTENER EL RESUMEN-----------------------------------
            $scope.getResumen=function () {
                //Obtener detalle
                cds.addWorkTask('tablerReporteFormatUnicoCtrl.getResumen',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQueryFilter.xsjs',
                    query:{
                        idTab:15,
                        idGra:1,
                        idQry:1,
                        lstObConditions:[
                            {
                                txCol:"ID_INICIATIVA",
                                txAlias:"A",
                                varValue:$scope.idIniciativa,
                                txValueType:"NUMERO",
                                txLogicOperator:"AND",
                                txCompOperator:"="
                            }
                        ]
                    },
                    success:function (response) {
                        console.log("success ******************************************");
                        console.log(response);

                        $scope.obResumen=response.data[0];
                        console.log($scope.obResumen);
                    },
                    error:function (response,error) {
                        console.log("Error");
                        console.log(error);
                    }
                });

                cds.doWorkTask('tablerReporteFormatUnicoCtrl.getResumen');
            };
            //-----------------

            //OBTENER EL DETALLE DE LAS INICIATIVAS------------------
            $scope.getDetalle=function (idMedida) {
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
                    $scope.obDetalle=response.data.direccion;

                },function(response,error){
                    //deferred.resolve(response.data);
                    if(angular.isDefined(workTask.task.success)){
                        workTask.task.fail(response,error);
                    }else{
                        console.log("[chartDataService].[doWorkTask] Fail function not defined");
                    }
                });
            };
            //-----------------

            //OBTENER EL DETALLE DE LAS INICIATIVAS------------------
            $scope.initObjets=function () {
                //Objeto de resumen
                $scope.obResumen;

                //Objeto de detalle
                $scope.obDetalle;

            };
            //-----------------


            //OBTENER EL DETALLE DE LAS INICIATIVAS------------------
            $scope.selectView=function (idIniciativa) {
                $scope.s=1;
                if(idIniciativa==12 || idIniciativa==26 || idIniciativa==14){
                    //$scope.s2=true;
                    $scope.s=2;
                }else if(idIniciativa==22){
                    $scope.s=8;
                }else if(idIniciativa==23){
                    $scope.s=9;
                }
                else if(idIniciativa==15){
                    $scope.s=3;
                }else if(idIniciativa==24){
                    $scope.s=4;
                }else if(idIniciativa==17){
                    $scope.s=5;
                }else if(idIniciativa==21 ){
                    $scope.s=6;
                } else {
                    $scope.s=1;
                }
            };
            //-----------------
            // OBTIENE IMAGEN POR NODO
            function generaImagenAsync(nodo){
                console.log("generaImagenAsync");
                var deferred = $.Deferred();
                console.log('nodo:'+nodo);
                domtoimage.toBlob(nodo)
                    .then(function(blob) {
                        var reader = new window.FileReader();
                        reader.readAsDataURL(blob);
                        var df2=deferred;
                        reader.onloadend = function() {
                            base64data = reader.result;
                            $scope.imagenes.push(base64data);
                            console.log($scope.imagenes);
                            df2.resolve(base64data);
                        }
                    });
                return deferred.promise();
            }
            // FUNCION PARA GENERAR PPTX
            $scope.generaPPTX = function(){
                $scope.imagenes=[];
                //obtenemos los nodos a generar imagenes
                console.log("generaPPTX");
                var nodos = document.getElementsByClassName("exportar-pptx");
                var promesas = [];
                console.log(nodos);
                console.log(nodos.length);
                //obtenemos las imagenes por cada nodo
                for(var i=0; i<nodos.length;i++){
                    promesas.push(generaImagenAsync(nodos[i]));
                }
                console.log($scope.imagenes);
                $.when.apply($, promesas).then(function() {
                    console.log("imagenes:"+$scope.imagenes.length);
                    // generamos el pptx
                    var pptx = new PptxGenJS();
                    for(var i=0; i<$scope.imagenes.length;i++){
                        var slide = pptx.addNewSlide();
                        slide.addImage({
                            data: $scope.imagenes[($scope.imagenes.length-1)-i],
                            x: 1.0,
                            y: 0.5,
                            w: 7.0,
                            h: 5.0
                        });
                    }
                    pptx.save('Iniciativa');
                }, function(e) {
                    console.log("error");
                });
            }

            $scope.generaXLSX = function(){
                var nodos = document.getElementsByClassName("exportar-pptx");
                var nodo = nodos[0];
                console.log(nodo)
                var wb = XLSX.utils.table_to_book(nodo, {sheet:"Iniciativa"});
                var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
                var fname = 'Iniciativa.xlsx';
                try {
                    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fname);
                } catch(e) { if(typeof console != 'undefined') console.log(e, wbout); }
                return wbout;
            }

            function s2ab(s) {
                if(typeof ArrayBuffer !== 'undefined') {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                } else {
                    var buf = new Array(s.length);
                    for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
            }

            $rootScope.$on("refreshTableroIniciativaGenerico",function (event,id) {
                //console.log("Evento refreshTableroIniciativaGenerico");
                $scope.idIniciativa=id;
                $scope.currentMaster= {
                    idIniciativa:id
                };
                $scope.init();
            });

            $scope.init=function () {
                //$scope.createDetalleColums();
                //$scope.idIniciativa=17;
                console.log("init ----------");
                console.log();

                if(!_.isEmpty($($element).parent().attr("iniciativa"))){
                    $scope.idIniciativa=$($element).parent().attr("iniciativa");
                }

                $scope.selectView($scope.idIniciativa);
                $scope.initObjets();
                $scope.getResumen();
                $scope.getDetalle($scope.idIniciativa);


            };

            $scope.init();
        }
    ]);
