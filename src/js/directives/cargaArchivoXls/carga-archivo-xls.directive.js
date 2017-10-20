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
                        var validCols = [];// {[Requerido,tipoConversion]//aqui almacenamos si la columna n del archivo Excel esta presente en "opts.matchColumnDef" (1 opcional 2 mandatorio, 0 ignorar) y
                        var cols = [];
                        var data = [];
                        var localMCD = $scope.opts.matchColumnDef;
                        var localMsgError=[];// = $scope.opts.MessageErrors;
                        var maxErrorTolerancia = 10; // mas errores... no  vale la pena despegar
                        var bstr = e.target.result;
                        var wb = undefined;
                        var tmpValue;
                        try{
                            wb = XLSX.read(bstr, {type: 'binary'});
                            /* grab first sheet */
                            var wsname = wb.SheetNames[0];
                            var foundSheet = false;
                            for (var i in wb.SheetNames) {
                                foundSheet = wb.SheetNames[i].toUpperCase() === $scope.opts.matchColumnHead.txNombreHoja.toUpperCase();
                                if(foundSheet){
                                    wsname = wb.SheetNames[i];
                                    break;
                                }
                            }
                            if(!foundSheet){
                                for (var i in wb.SheetNames) {
                                    foundSheet = wb.SheetNames[i].trim().toUpperCase() === $scope.opts.matchColumnHead.txNombreHoja.trim().toUpperCase();
                                    if(foundSheet){
                                        wsname = wb.SheetNames[i];
                                        localMsgError.push({
                                            msg: "No existe la Hoja '" + $scope.opts.matchColumnHead.txNombreHoja +
                                            "', pero se encontró un nombre que difiere por los espacios adicionales",
                                            type: "info",
                                            dismiss: ""
                                        });
                                        break;
                                    }
                                 }
                            }
                            if(!foundSheet) {
                                localMsgError.push({
                                    msg: "No existe la Hoja '" + $scope.opts.matchColumnHead.txNombreHoja +
                                    "', se utilizará la Hoja '" + wsname + "'",
                                    type: "warning",
                                    dismiss: ""
                                });
                            }
                            console.log(e);
                            console.log(wb);
                            console.log($scope.opts);
                            var ws = wb.Sheets[wsname];

                            /* grab first row and generate column headers */
                            var aoa = XLSX.utils.sheet_to_json(ws, {header: 1, raw: false, blankrows: false});
                            console.log(aoa);
                            console.log(localMCD);
                            if (localMCD && localMCD.length) { // si no lo mandas... nada será truncado
                                var lengCD = localMCD.length;
                                //Agregar e inicializar matchColumnDef.txFound
                                for (var j = 0; j < lengCD; j++) {
                                    localMCD[j].txFound = false;
                                }
                                console.log("localMCD:" + localMCD);
                                //Buscsr l columnas
                                for (var i = 0; i < aoa[0].length; ++i) {
                                    validCols[i] = [0,""]; // Ignorar
                                    for (var j = 0; j < lengCD; j++) {
                                        if (aoa[0][i].toUpperCase() === localMCD[j].txColumna.toUpperCase()) {
                                            localMCD[j].txFound = true;
                                            validCols[i] = [1, localMCD[j].idTipoDato]; // incluir, pero puede faltar
                                            if (localMCD[j].nuObligatorio) {
                                                validCols[i] = [2, localMCD[j].idTipoDato]; //Obligatoria su presencia
                                            }

                                            cols.push({
                                                field: localMCD[j].txColumnaFisica,
                                                name: aoa[0][i],
                                                displayName: aoa[0][i]
                                            });
                                            aoa[0][i] = localMCD[j].txColumnaFisica; //Temporalmente se asigna el CaMel del txColumna, para que sea identico al de la BD
                                            break;
                                        }
                                    }
                                }
                                // si la columna es mandatoria y esta marcada como (NO existe en el excel): error
                                for (var j = 0; j < lengCD; j++) {
                                    if (!(localMCD[j].txFound) && localMCD[j].nuObligatorio) {
                                        localMsgError.push({
                                            msg: "La columna '" + localMCD[j].txColumna +
                                            "' es mandatoria, debe existir en el Excel",
                                            type: "danger",
                                            dismiss: "alert"
                                        });
                                        //
                                    }
                                    else if (!(localMCD[j].txFound)) {
                                        localMsgError.push({
                                            msg: "La columna '" + localMCD[j].txColumna +
                                            "' es opcional, aún asi, se recomienda incluir en el Excel",
                                            type: "warning",
                                            dismiss: "alert"
                                        });
                                    }
                                }
                                // /* generate rest of the data */
                                if (cols.length) { // si solo si, se tiene al menos una columna valida
                                    for (var r = 1; r < aoa.length; ++r) {
                                        data[r - 1] = {};
                                        for (i = 0; i < aoa[r].length; ++i) {
                                            if (validCols[i][0] > 0){ // SOLO los que INTERESAN
                                                data[r - 1][aoa[0][i]] = aoa[r][i]; //pretendemos que el campo esta Ok
                                                if (validCols[i][0] > 1 ){
                                                    if(!(aoa[r][i])){
                                                        localMsgError.push({
                                                            msg: "La columna '" + aoa[0][i] +
                                                            "' es mandatoria, y requiere un valor en el renglon " + r,
                                                            type: "danger",
                                                            dismiss: "alert"
                                                        });
                                                        maxErrorTolerancia--;
                                                    }
                                                }
                                                if(aoa[r][i]) {
                                                    if (validCols[i][1] === "3"){
                                                        tmpValue = new Date(data[r - 1][aoa[0][i]]);
                                                        if(tmpValue) {
                                                            data[r - 1][aoa[0][i]] = tmpValue;
                                                        }else{
                                                            localMsgError.push({
                                                                msg: "el Campo '" + aoa[0][i] + "' del renglon "+ r +
                                                                ", Es una Fecha Invalida ",
                                                                type: "danger",
                                                                dismiss: "alert"
                                                            });
                                                            maxErrorTolerancia--;

                                                        }
                                                    // si está presente. validar si aplica conversion de Fecha, Hora o FechaHora (talvez timeStamp)
                                                    }
                                                    if (validCols[i][1] === "3"){
                                                        tmpValue = Number(data[r - 1][aoa[0][i]]);
                                                        if(tmpValue) {
                                                            data[r - 1][aoa[0][i]] = tmpValue;
                                                        }else{
                                                            localMsgError.push({
                                                                msg: "el Campo '" + aoa[0][i] + "' del renglon "+ r +
                                                                ", Es una Fecha Invalida ",
                                                                type: "danger",
                                                                dismiss: "alert"
                                                            });
                                                            maxErrorTolerancia--;

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (maxErrorTolerancia<0){
                                            localMsgError.push({
                                                msg: " Existen demasiados errores, la carga del archivo se ha interrumpido",
                                                type: "info",
                                                dismiss: "alert"
                                            });

                                            break;
                                        }
                                    }
                                }
                                else {
                                    localMsgError.push({
                                        msg: "No se encontraron columnas conocidas, la primer linea de la hoja de excel debe contener el nombre de las columnas",
                                        type: "danger",
                                        dismiss: "alert"
                                    });
                                }
                            }
                            else { // Ejecutar Codigo original
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
                            localMsgError.push({msg:error.toString(), type:"danger", dismiss:"alert"});
                        }
                        finally {
                            /* update scope */
                            $scope.$apply(function() {
                                console.log("Data:");
                                console.log(data);
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