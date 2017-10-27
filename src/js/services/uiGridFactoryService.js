angular
    .module('RDash')
    .service('uiGridFactoryService',['$interval','$http',function($interval,$http) {

        //Arma columnas desde un objeto de definición de campos
        this.createColumunsIniciativa=function(lstObColDef,lstObColSetting,nuRemainPercent){
            if(_.isNull(nuRemainPercent)){
                nuRemainPercent=50;
            }
            nuRemainPercent=60;
            console.log(nuRemainPercent);

            var colTemplate={
                field:"txIniciativa",
                name:"MEDIDA",
                footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                width:"15%"
            };

            var lstObCol=[];
            var obColDef;
            var obCol;
            var strField="";
            var tmpArr;

            //obColDef
            var numCol=lstObColDef.length;
            console.log("createColumunsIniciativa");
            console.log(numCol);


            for(var i in lstObColDef){
                obColDef=lstObColDef[i];
                obCol={};

                //Generar objeto de definición de columna
                _.merge(obCol,colTemplate);
                if(!_.isEmpty(lstObColSetting[i])){
                    _.merge(obCol,lstObColSetting[i]);
                }

                //Establecer el nombre y campo
                obCol.name=obColDef.txNombreCampo;
                strField=obColDef.txColumna;

                //convertir a camel case
                tmpArr=strField.split("_");
                for(var i in tmpArr){
                    tmpArr[i]=tmpArr[i].toLowerCase();
                    if(i>0){
                        tmpArr[i]=tmpArr[i].substr(0,1).toUpperCase()+tmpArr[i].substr(1,tmpArr[i].length).toLowerCase();
                    }
                }

                if(obColDef.txTipo.toLowerCase() != "string"){
                    obCol.cellFilter="number:0";
                }

                console.log((nuRemainPercent/numCol).toString());
                obCol.width= ((nuRemainPercent/numCol).toFixed(0)).toString() +"%";
                console.log(obCol.width);
                obCol.field=tmpArr.join("");

                //meter al array de salida
                lstObCol.push(obCol);
            }
            console.log(lstObCol);

            return lstObCol;
        };

    }]);