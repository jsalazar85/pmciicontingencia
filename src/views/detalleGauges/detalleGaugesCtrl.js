
angular
    .module('RDash')
    .controller('detalleGaugesCtrl', ['$scope','$state','$stateParams', 'dataController','globalsController','ngProgressFactory',detalleGaugesCtrl]);

function detalleGaugesCtrl($scope,$state,$stateParams,dc,gc,ngProgressFactory) {

    //Datos ejemplos----------------------
    //2) Resumen de avance
    $scope.mdato={
        data:[]

    }
    $scope.totalProyecto=[
        {
            id:1,
            txLabel:"Total",
            nuVal:120
        },
        {
            id:2,
            txLabel:"Proyectos",
            nuVal:123
        },
        {
            id:1,
            txLabel:"Mantenimientos",
            nuVal:100
        },
    ];

    $scope.proyFase={
        id:"sb1",
        txCategoriaTitulo1:'Proyectos',
        txCategoriaTitulo2:'Mantenimientos',
        dataField1:"nuProy",
        dataField2:"nuMant",
        txTitulo:'Iniciativas por estatus',
        categoryField:"txLabel",
        barColor1:"#e15954",
        barColor2:"#fddddd",
        data:[]
    };


    $scope.proyAvance={
        id:"sb2",
        dataField1:"nuAvanceReal",
        dataField2:"nuAvanceRest",
        txTitulo:'Avance de proyectos',
        categoryField:"txLabel",
        barColor1:"#e15954",
        barColor2:"#fddddd",
        data:[],
        maxVal:100,
        txValPost:'%',
        txCategoriaTitulo1:'Real',
        txCategoriaTitulo2:'Comprometido',

    };

    //3) Gauge
    $scope.avanceGral={
        id:"ag1",
        nuAvanceReal:0.0,
        nuAvanceComp:0.0,
        nuVariacion:0.0,
        nuSemaforo:1, //1 verde, 2 amarillo, 3 rojo
        txTitulo:"Avance Proyecto SGTI",
        nuAvanceMaximo:1,
    };


    ////////////////////////////////////////////////////////////////
    // FUNCIONES
    ////////////////////////////////////////////////////////////////
    $scope.init=function () {
        //Obtener parametos de $state
        $scope.params={
            txGerencia:$stateParams.txGerencia,
            txTipos:$stateParams.txTipo
        };

        //Crear el progress bar
        $scope.progressbar=ngProgressFactory.createInstance();
        $scope.progressbar.setColor("#ffffff");
        $scope.progressbar.setHeight("5px");

        $scope.getData();
    };

    $scope.getData=function(){
        $scope.progressbar.start();
        $.when(dc.getDetalleGauges($scope.params)).done(function (response) {
            console.log('////////////////////////////////////////////////////////////////');
            console.log(response);

            /*
            $scope.setAvanceGral(response.avanceGral);
            $scope.setProyFase(response.proyFase);
            $scope.setProyAvance(response.proyAvance);
            */
            $scope.setData(response.data);
            $scope.progressbar.complete();

        });
    };

    $scope.setData=function(data){
        //Establecer valor
        var oldval={};
        angular.copy($scope.mdato,oldval);
        oldval.data=data;
        for(var i in oldval.data){
            oldval.data[i]=gc.setSemaforoFromAvanceObj(oldval.data[i]);
            oldval.data[i]=gc.setAvanceMaximoFromAvanceObj(oldval.data[i]);
            oldval.data[i].titleClass={
                'base-font-black-normal-md':true
            };

        }
        $scope.mdato=oldval;
        console.log($scope.mdato);

    };

    $scope.setProyFase=function(proyFase) {
        var tmpProyFase={};
        angular.copy($scope.proyFase,tmpProyFase);
        tmpProyFase.data=proyFase;
        $scope.proyFase=tmpProyFase;
    };

    $scope.setProyAvance=function(proyAvance) {
        var tmpProyAvance={};
        angular.copy($scope.proyAvance,tmpProyAvance);
        tmpProyAvance.data=proyAvance;
        $scope.proyAvance=tmpProyAvance;
    };

    $scope.regresar=function () {
        $state.go('gerencia',{idGerencia:$scope.params.txGerencia});
    };

    $scope.init();

};
