
angular
    .module('RDash')
    .service('dataStoreService',['globalsController',function(gc){

        ////////////////////////////////////////////////////////////
        // Template data
        this.templateData={};
        this.templateData.pieChartData1={
            dataField:'nuValor',
            txTitulo:'Título de la gráfica',
            categoryField:'txCategoria',
            barColor:'#99cccc',
            data:[
                {
                    txCategoria:'Dato 1',
                    nuValor:30,
                },
                {
                    txCategoria:'Dato 1',
                    nuValor:50,
                },
                {
                    txCategoria:'Dato 1',
                    nuValor:60,
                }
            ]
        };

        this.templateData.barChart1={
            dataField:'nuValor',
            txTitulo:'Título de la gráfica',
            categoryField:'txCategoria',
            barColor:'#99cccc',
            data:[
                {
                    txCategoria:'Dato 1',
                    nuValor:30,
                },
                {
                    txCategoria:'Dato 1',
                    nuValor:50,
                },
                {
                    txCategoria:'Dato 1',
                    nuValor:60,
                }
            ]
        };

        this.templateData.progressChart1={
            nuAvanceReal:0.0,
            nuAvanceComp:0.0,
            nuVariacion:0.0,
            nuAvanceMaximo:1,
            nuSemaforo:1, //1 verde, 2 amarillo, 3 rojo
            txTitulo:""
        };





        //Datos
        this.datos={};

        //Consulta Grid
        /*
        this.datos.lstAsignacion=[
            {
                id:1,
                txEquipo:'Equipo 1',
                txZona:'Zona 1',
                txNuCredito:'1212313',
                dictamen:{
                    idDictamen:1,
                    txDictamen:'DP'
                },
                txTelefono:'123123123',
            },
            {
                id:2,
                txEquipo:'Equipo 1',
                txZona:'Zona 1',
                txNuCredito:'1212313',
                dictamen:{
                    idDictamen:1,
                    txDictamen:'DP'
                },
                txTelefono:'123123123',
            },
            {
                id:3,
                txEquipo:'Equipo 1',
                txZona:'Zona 1',
                txNuCredito:'1212313',
                dictamen:{
                    idDictamen:1,
                    txDictamen:'DP'
                },
                txTelefono:'123123123',
            },
            {
                id:4,
                txEquipo:'Equipo 1',
                txZona:'Zona 1',
                txNuCredito:'1212313',
                dictamen:{
                    idDictamen:1,
                    txDictamen:'DP'
                },
                txTelefono:'123123123',
            },
        ];
        */

        this.datos.lstAsignacion=[];

        this.catalogos={};
        this.catalogos.lstDictamen=[
            {
                idDictamen:1,
                txDictamen:'PT'
            },
            {
                idDictamen:2,
                txDictamen:'DP'
            },
            {
                idDictamen:3,
                txDictamen:'SD'
            },
            {
                idDictamen:4,
                txDictamen:'N'
            },
        ]





        ////////////////////////////////////////////////////////////
        //Funciones
        this.getDictamenByTx=function(txDictamen){
            for(var i in this.catalogos.lstDictamen){
                if(this.catalogos.lstDictamen[i].txDictamen == txDictamen){
                    return this.catalogos.lstDictamen[i] ;
                }
            }
        };

        //Obtener el objeto de hana servidor mediante el nombre de la gerencia
        this.getHanaSrvByTxGer=function(txGerencia){
            for(var i in this.lstHanaServidor){
                if(this.lstHanaServidor[i].txGerencia == txGerencia){
                    return this.lstHanaServidor[i];
                }
            }
            return null;
        };

        this.getHanaSrvByIdGer=function(idGerencia){
            console.log('getHanaSrvByIdGer');
            console.log(idGerencia);
            console.log(this.principalData);
            if(this.principalData){
                console.log('getHanaSrvByIdGer if');
                for(var i in this.principalData.hana){
                    console.log(this.principalData.hana[i]);
                    if(this.principalData.hana[i].idGerencia == idGerencia){
                        console.log('getHanaSrvByIdGer if 2');
                        return this.principalData.hana[i];
                    }
                }
            }

            return null;
        };

    }]);
