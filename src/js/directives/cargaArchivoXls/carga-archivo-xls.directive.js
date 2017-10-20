
angular
    .module('RDash')
    .directive('importSheetJs', ['globalsController','$state','$rootScope','dataController',
    function (gc,$state,$rootScope,dc) {
        return {
            scope: { opts: '=' },
            link: function ($scope, $elm) {
                $elm.on('change', function (changeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        /* read workbook */
                        var validCols = [];//aqui almacenamos si la columna n del archivo Excel esta presente en "opts.matchColumnDef"
                        var cols = [];
                        var data = [];
                        var localMCD = $scope.opts.matchColumnDef;
                        var localMsgError=[];// = $scope.opts.MessageErrors;
                        var bstr = e.target.result;
                        var wb = undefined;
                        try{
                            wb = XLSX.read(bstr, {type: 'binary'});
                            /* grab first sheet */
                            for (var i in wb.SheetNames) {
                                console.log(wb.SheetNames[i]);
                            }
                            console.log("e wb")
                            console.log(e);
                            console.log(wb);
                            var wsname = wb.SheetNames[0];
                            var ws = wb.Sheets[wsname];

                            /* grab first row and generate column headers */
                            var aoa = XLSX.utils.sheet_to_json(ws, {header: 1, raw: false, blankrows: false});
                            console.log(aoa);

                            if (localMCD && localMCD.length ){ // si no lo mandas... nada será truncado
                                var lengCD = localMCD.length;
                                //Agregar e inicializar matchColumnDef.txFound
                                for(var j=0; j < lengCD ; j++) {
                                    localMCD[j].txFound = false;
                                }
                                //Buscsr l columnas
                                for(var i = 0; i < aoa[0].length; ++i){
                                    for(var j=0; j < lengCD ; j++) {
                                        validCols[i] = (aoa[0][i].toUpperCase() === localMCD[j].txField.toUpperCase());

                                        if (validCols[i]) {
                                            localMCD[j].txFound = validCols[i];
                                            //copiar solo las columnas qtenn ambos : excel y matchColumnDef
                                            cols.push({field: localMCD[j].txField, name: aoa[0][i], displayName: aoa[0][i]});
                                            aoa[0][i] = localMCD[j].txField; //Temporalmente se asigna el CaMel del txField, para que sea identico al de la BD
                                            break;
                                        }
                                    }
                                }
                                // /* generate rest of the data */
                                if (cols.length) { // si solo si, se tiene al menos una columna valida
                                    for (var r = 1; r < aoa.length; ++r) {
                                        data[r - 1] = {};
                                        for (i = 0; i < aoa[r].length; ++i) {
                                            if(validCols[i] && aoa[r][i]) {
                                                data[r - 1][aoa[0][i]] = aoa[r][i];
                                            }
                                        }
                                    }
                                }
                                else{
                                    localMsgError.push({msg:"la primer linea de la hoja de excel, debe contener el nombre de las columnas", tipo:"danger", dismiss:"alert"});
                                }
                            }
                            else {
                                for (var i = 0; i < aoa[0].length; ++i) {
                                    cols[i] = {field: aoa[0][i]};
                                }
                                //
                                // /* generate rest of the data */

                                for (var r = 1; r < aoa.length; ++r) {
                                    data[r - 1] = {};
                                    for (i = 0; i < aoa[r].length; ++i) {
                                        if (aoa[r][i] == null) continue;
                                        data[r - 1][aoa[0][i]] = aoa[r][i]
                                    }
                                }
                            }
                            }
                        catch(error){
                            console.log(error);
                            localMsgError.push({msg:error.toString(), tipo:"danger", dismiss:"alert"});
                        }
                        finally {
                            /* update scope */
                            $scope.$apply(function() {
                                $scope.opts.columnDefs = cols;
                                $scope.opts.data = data;
                                $scope.opts.MessageErrors = localMsgError;
                                if (localMCD && localMCD.length ) {
                                    $scope.opts.matchColumnDef = localMCD;
                                }
                            });
                        };

                    };
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            }
        };
    }]);