angular
    .module('RDash')
    .controller('tableroReporteCapturaDelegacionesViewCtrl', [
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
                {
                    txEstado:'MORELOS',
                    nuUniversoViviendas: 2371,
                    nuViviendasPendientes: 280,
                    nuViviendasProceso: 2091,
                    nuDicFinalAsePerdidaTotal: 260,
                    nuDicFinalAseDanoParcial: 1655,
                    nuDicFinalAseSinDanos: 176
                },
                {
                    txEstado:'CDMX',
                    nuUniversoViviendas: 237,
                    nuViviendasPendientes: 20,
                    nuViviendasProceso: 201,
                    nuDicFinalAsePerdidaTotal: 260,
                    nuDicFinalAseDanoParcial: 155,
                    nuDicFinalAseSinDanos: 16
                }
            ];
            $scope.rows=rows;
            $scope.imagenes=[];

            $scope.getTableData = function() {

                cds.addWorkTask('tableroReporteCapturaDelegacionesViewCtrl.tabla1',{
                    url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                    query:{
                        idTab:21,
                        idGra:1,
                        idQry:1
                    },
                    success: function(response){
                        console.log("success");
                        console.log(response);
                        $scope.rows=response.data;

                    },
                    error: function(response,error){
                        console.log("Error");
                        console.log(error);
                        $scope.gridOptDet.data=[];
                    }
                });

                cds.doWorkTask('tableroReporteCapturaDelegacionesViewCtrl.tabla1');
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
                var nodos = document.getElementsByClassName("exportarRCD");
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
                            w: 8.0,
                            h: 5.0
                        });
                    }
                    pptx.save('Reporte');
                }, function(e) {
                    console.log("error");
                });
            }

            $scope.generaXLSX = function(){
                var nodos = document.getElementsByClassName("exportarRCD");
                var nodo = nodos[0];
                console.log(nodo)
                var wb = XLSX.utils.table_to_book(nodo, {sheet:"Reporte"});
                var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
                var fname = 'Reporte.xlsx';
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