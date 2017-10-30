angular
    .module('RDash')
    .directive('importSheetJs', ['globalsController','$state','$rootScope','dataController',
    function (gc,$state,$rootScope,dc) {
        return {
            scope: { opts: '=', hcfg: '=', ccfg: '=' },
            link: function ($scope, $elm) {
                $elm.on('change', function (changeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                    	console.log(Date());
                        /* read workbook */
                        var validCols = [];// {[Requerido,tipoConversion]//aqui almacenamos si la columna n del archivo Excel esta presente en "$scope.ccfg" (1 opcional 2 mandatorio, 0 ignorar) y
                        var cols = [];//solo las columnas que coinciden
                        var data = [];
                        var localMCD = $scope.ccfg;
                        var localResumenInfo = $scope.opts.ResumenInfo;
                        //console.log($scope);
                        var localMsgError=[];// = $scope.opts.MessageErrors;
                        var maxErrorTolerancia = 10; // mas errores... no  vale la pena despegar
                        var bstr = e.target.result;
                        var wb = undefined;
                        var tmpValue;
                        try{
                            wb = XLSX.read(bstr, {type: 'binary'});
                            localResumenInfo.Props = wb.Props;
                            
                            /* grab first sheet */
                            var wsname = wb.SheetNames[0];
                            var foundSheet = false;
                            for (var i in wb.SheetNames) {
                                foundSheet = wb.SheetNames[i].toUpperCase() === $scope.hcfg.txNombreHoja.toUpperCase();
                                if(foundSheet){
                                    wsname = wb.SheetNames[i];
                                    break;
                                }
                            }
                            if(!foundSheet){
                                for (var i in wb.SheetNames) {
                                    foundSheet = wb.SheetNames[i].trim().toUpperCase() === $scope.hcfg.txNombreHoja.trim().toUpperCase();
                                    if(foundSheet){
                                        wsname = wb.SheetNames[i];
                                        localMsgError.push({
                                            msg: "No existe la Hoja '" + $scope.hcfg.txNombreHoja +
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
                                    msg: "No existe la Hoja '" + $scope.hcfg.txNombreHoja +
                                    "', se utilizará la Hoja '" + wsname + "'",
                                    type: "warning",
                                    dismiss: ""
                                });
                            }
                            //console.log(e);
                            //console.log(wb);
                            //console.log($scope.opts);
                            var ws = wb.Sheets[wsname];

                        	console.log(Date());
                            /* grab first row and generate column headers */
                            var aoa = XLSX.utils.sheet_to_json(ws, {header: $scope.hcfg.nuLineaEncabezado, raw: true, blankrows: false});
                            //console.log(aoa);
                            localResumenInfo.totalReg = 0;
                            localResumenInfo.totalCols = 0;
                            
                            if(aoa){
                            	localResumenInfo.totalReg = aoa.length;
                            	if(aoa.length){
                            		localResumenInfo.totalCols = aoa[0].length;
                            	}
                            };
                            //console.log(localMCD);
                        	console.log(Date());

                            if (localMCD && localMCD.length) { // si no lo mandas... nada será truncado
                            	var tmpIdx = 0;
                                var lengCD = localMCD.length;
                                //Agregar e inicializar $scope.ccfg.txFound
                                for (var j = 0; j < lengCD; j++) {
                                    localMCD[j].txFound = false;
                                }
                                //console.log( localMCD);
                                //Buscsr l columnas
                                for (var i = 0; i < aoa[0].length; ++i) {
                                    validCols[i] = [0,"",0]; // [0 Ignorar Columna, tipo de dato, permite nulo/vacio el campo]
                                    for (var j = 0; j < lengCD; j++) {
                                        if (aoa[0][i].toUpperCase() === localMCD[j].txColumna.toUpperCase()) {
                                            localMCD[j].txFound = true;
                                            validCols[i] = [1, localMCD[j].idTipoDato,localMCD[j].nuNoNulo]; // 1 incluir, pero puede faltar
                                            if (localMCD[j].nuObligatorio) {
                                                validCols[i] = [2, localMCD[j].idTipoDato,localMCD[j].nuNoNulo]; //2 Columna obligatoria 
                                            }

                                            tmpIdx = cols.push({
                                            	enableHiding:false,
                                            	field: localMCD[j].txColumnaFisica,
                                                displayName: aoa[0][i],
                                                visible: true
                                            });
                                            switch(localMCD[j].idTipoDato){
                                            case "1": //Numero;
                                            	break;
                                            case "2"://texto;
                                            	break;
                                            case "3": //Fecha;
                                            	cols[tmpIdx-1].cellFilter = 'date';
                                            	break;
                                            case "TIME": //Fecha;
                                            	cols[tmpIdx-1].cellFilter = 'date:"HH:mm:ss"';
                                            	break;
                                            case "TIMESTAMP": //Fecha;
                                            	cols[tmpIdx-1].cellFilter = 'date:"YYYY-MM-DD HH:mm:ss.sss"';	
                                            }
                                            aoa[0][i] = localMCD[j].txColumnaFisica; //Temporalmente se asigna el CaMel del txColumna, para que sea identico al de la BD
                                            break;
                                        } // if columna name
                                        /*else{
                                        	tmpIdx = cols.push({
                                            	enableHiding:false,
                                            	//field: localMCD[j].txColumnaFisica,
                                                displayName: aoa[0][i],
                                                visible: false
                                            });
                                        }*/
                                    } //for j
                                }//For Columnas analisis
                                console.log("validCols");
                                console.log(validCols);
                                console.log(aoa);
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
                                            tmpValue = aoa[r][i];
                                            if (validCols[i][0] > 0){ // SOLO los que INTERESAN
                                                data[r - 1][aoa[0][i]] = tmpValue; //pretendemos que el campo esta Ok
                                                if (validCols[i][2] > 0 && !tmpValue ){
                                                    
                                                    localMsgError.push({
                                                        msg: "La columna '" + aoa[0][i] +
                                                        "' no permite nulos o vacios, y requiere un valor en el renglon " + r,
                                                        type: "danger",
                                                        dismiss: "alert"
                                                    });
                                                    maxErrorTolerancia--;

                                                }
                                                if(tmpValue) { // procesar si tiene valor (sea o no nulo o requerido  o  no
                                                    //001 Numero
                                                    //002 Texto
                                                    //003 Fecha
                                                    if (validCols[i][1] === "3"){//Fecha

                                                    	switch(typeof(tmpValue)){
                                                    	case "string":
                                                    		tmpValue = new Date(tmpValue);
                                                    		break;
                                                    	case "number":
                                                    		tmpDate = new Date("01/01/1900");
                                                    		tmpDate.setDate(tmpValue-1);
                                                    		tmpValue = tmpDate;
                                                    	default:
                                                    		//sin cambios
                                                    	}
                                                    	
                                                        if(tmpValue) {
                                                            data[r - 1][aoa[0][i]] = tmpValue;
                                                        }else{
                                                            localMsgError.push({
                                                                msg: "el Campo '" + aoa[0][i] + "' del renglon "+ r +
                                                                ", Es una Fecha Invalida, Cambie el formato de fecha.",
                                                                type: "warning",
                                                                dismiss: "alert"
                                                            });
                                                            maxErrorTolerancia--;

                                                        }
                                                    // si está presente. validar si aplica conversion de Fecha, Hora o FechaHora (talvez timeStamp)
                                                    }
                                                    else if (validCols[i][1] === "1"){ //Numero
                                                    	if(typeof(tmpValue)==="string"){
                                                    		tmpValue = tmpValue.replace(/[$%()\s,a-df-zA-DF-Z]/g, '');
                                                        	tmpValue = parseFloat(tmpValue);
                                                    	}
                                                    	else{//"number":
                                                    		//sin cambios
                                                    	}
                                                    	if(tmpValue) {
                                                            data[r - 1][aoa[0][i]] = tmpValue;
                                                        }else{
                                                            localMsgError.push({
                                                                msg: "el Campo '" + aoa[0][i] + "' del renglon "+ r +
                                                                ", No se puede interpretar como número.",
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
                            //console.log(error);
                            localMsgError.push({msg:error.toString(), type:"danger", dismiss:"alert"});
                        }
                        finally {
                            /* update scope */
                            $scope.$apply(function() {
                                console.log("Data:");
                                //console.log(data);

                                $scope.opts.canSubmit = true; //Cualquier error lo pone en false;
                                if(localMsgError.findIndex(function (elem){return elem.type==="danger";})>=0) {
                                    $scope.opts.canSubmit = false;
                                }

                                $scope.opts.columnDefs = cols;
                                $scope.opts.data = data;
                                $scope.opts.MessageErrors = localMsgError;
                                if (localMCD && localMCD.length ) {
                                    $scope.ccfg = localMCD;
                                };
                                $scope.opts.ResumenInfo = localResumenInfo;
                            });
                        };
                    	console.log(Date());

                    };
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            }
        };
    }]);