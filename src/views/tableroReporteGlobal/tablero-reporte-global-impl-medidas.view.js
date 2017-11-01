angular
    .module('RDash')
    .controller('tableroReporteGlobalImplMedidasViewCtrl', [
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
        function($scope, $rootScope, $state, $stateParams, dc, gc, ngProgressFactory, dss, cs, $interval, tools, cds, uiGridConstants) {
            $scope.rows;
            var rows = [
                {"id": 1, "medida": "Movilidad Habitacional/Uso de saldo de la subcuenta de vivienda", "beneficiados": "-", "monto": "-"},
                {"id": 2, "medida": "No aplicacion del SIC", "beneficiados": "-", "monto": "-"},
                {"id": 3, "medida": "Linea IV en su versión sin afectación estructural y sin garantía hipotecaria", "beneficiados": "-", "monto": "-"},
                {"id": 4, "medida": "Otorgamineto inmediato del segundo crédito", "beneficiados": "-", "monto": "-"},
                {"id": 5, "medida": "Donativo Fundación Hogares", "beneficiados": "-", "monto": "-"}
            ];
            $scope.rows=rows;
            $scope.imagenes=[];

            $scope.getTableData = function() {

                cds.addWorkTask('tableroReporteGlobalImplMedidasViewCtrl.tabla1',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:14,
                        idGra:3,
                        idQry:1
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        //$scope.maestroMedidasOpt.data = response.data;
                        $scope.rows=response.data;
                        // $scope.apply();


                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                        $scope.gridOptDet.data=[];
                        //$scope.apply();
                    }
                });

                cds.doWorkTask('tableroReporteGlobalImplMedidasViewCtrl.tabla1');
            };

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
                var nodos = document.getElementsByClassName("exportarRG-pptx");
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
                    pptx.save('ReporteGlobal');
                }, function(e) {
                    console.log("error");
                });
            }

            $scope.generaXLSX = function(){
                var nodos = document.getElementsByClassName("exportarRG-pptx");
                var nodo = nodos[0];
                console.log(nodo)
                var wb = XLSX.utils.table_to_book(nodo, {sheet:"Iniciativa"});
                var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
                var fname = 'ReporteGlobal.xlsx';
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

            $scope.init = function() {
                $scope.getTableData();
            };

            $scope.init();
        }
    ]);