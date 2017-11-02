
angular
    .module('RDash')
    .controller('tableroReporteFormatoUnicoConsiolidado', [
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

            $scope.imagenes=[];

            //-----------------
            // OBTIENE IMAGEN POR NODO
            function generaImagenAsync(nodo, i){
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
                            //$scope.imagenes.push(base64data);
                            $scope.imagenes[i]=base64data;
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
                    promesas.push(generaImagenAsync(nodos[i],i));
                }
                console.log($scope.imagenes);
                $.when.apply($, promesas).then(function() {
                    console.log("imagenes:"+$scope.imagenes.length);
                    // generamos el pptx
                    var pptx = new PptxGenJS();
                    for(var i=0; i<$scope.imagenes.length;i++){
                        var slide = pptx.addNewSlide();
                        slide.addImage({
                            data: $scope.imagenes[i],
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



            $scope.init=function () {

            };

            $scope.init();
        }
    ]);
