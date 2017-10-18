
angular
    .module('RDash')
    //.controller('dashboard', ['$scope', 'dataController', dashboard]);
    .controller('dashboard', ['$scope', '$rootScope','$state','dataController','globalsController','ngProgressFactory',dashboard]);


function dashboard($scope,$rootScope,$state,dc,gc,ngProgressFactory) {

    $scope.progressbar=ngProgressFactory.createInstance();
    $scope.progressbar.setColor("#ffffff");
    $scope.progressbar.setHeight("5px");

    $scope.avanceGral={
        id:"1",
        nuAvanceReal:0.8122,
        nuAvanceComp:0.712,
        nuVariacion:0.1,
        nuAvanceMaximo:1,

        nuSemaforo:3, //1 verde, 2 amarillo, 3 rojo
        txTitulo:"Avance Proyecto SGTI"
    };

    $scope.totalProyecto= [
        {
            id:1,
            txLabel:"Total",
            nuVal:100
        },
        {
            id:2,
            txLabel:"Proyectos",
            nuVal:100
        },
        {
            id:1,
            txLabel:"Mantenimientos",
            nuVal:100
        },
    ];

    $scope.avanceGerencia=[
        {
            id:1,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'CENTRO DE INFORMACIÓN'
        },
        {
            id:2,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'GESTIÓN DE SOLUCIONES TECNOLÓGICAS'
        },
        {
            id:3,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'GERENCIA SR DE ARQUITECTURA E INGENIERÍA DE TI'
        },
        {
            id:4,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'SGTI-SERVICIOS DE INFORMÁTICA',
        },
        {
            id:5,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'GERENCIA SR CALIDAD Y GOBIERNO DE PROCESOS',
        },
        {
            id:6,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'GERENCIA SR SOLUCIONES TECNOLÓGICAS',
        },
        {
            id:7,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'GERENCIA SR SEGURIDAD INFORMÁTICA',
        },
        {
            id:8,
            nuProyectos:10,
            nuAvance:0.7,
            txGerencia:'GERENCIA SR PLANEACION CONTROL Y GOBIERNO DE TI',
        },
    ];

    $scope.getInicioData=function(){
        //cfpLoadingBar.start();
        $scope.progressbar.start();
        if(!gc.pageData.page1){
            $.when(dc.getInicioData()).done(function(response) {
                $scope.setDataAll(response);
            });
        }else{
            $scope.setDataAll(gc.pageData.page1);
        }


    };

    $scope.setDataAll=function (response) {
        gc.pageData.page1=response;

        console.log('getInicioData DONE');
        console.log(response);

        //Cargar datos de Avance (Tacometro)-----------
        var tmpAvanceGral={};
        angular.copy($scope.avanceGral,tmpAvanceGral);
        angular.extend(tmpAvanceGral,response.avanceGral);
        tmpAvanceGral=gc.setSemaforoFromAvanceObj(tmpAvanceGral);
        tmpAvanceGral=gc.setAvanceMaximoFromAvanceObj(tmpAvanceGral);
        $scope.avanceGral=tmpAvanceGral;
        //console.log(($scope.avanceGral.nuAvanceComp - $scope.avanceGral.nuAvanceReal));



        $scope.avanceGral.txTitulo="Avance Proyecto de la SGTI";



        //Cargar datos de detalle por Proyecto------------
        $scope.totalProyecto=response.totalTipo;

        //Cargar datos de detalle por gerencia-------------
        var tmp=$scope.avanceGerencia;
        for(var i in response.avancePorGerencia){
            for(var j in tmp){
                if(tmp[j].id == response.avancePorGerencia[i].id ){
                    angular.extend(tmp[j],response.avancePorGerencia[i]);
                    break;
                }
            }
        }
        $scope.avanceGerencia=tmp;


        //cfpLoadingBar.complete();
        $scope.progressbar.complete();
    };

    $scope.getInicioData();

    //Eventos
    $rootScope.$on('ipcClicked',function(event,data){
        console.log('Evento ipcClicked');
        console.log($scope.avanceGral);
        $state.go('gerencia',{idGerencia:data.txLabel});
    });



    /*
    $scope.mdata=dc.getPorcentajesServidores();
    $scope.stackedData=dc.getTotalesPorServidor();
    $scope.stackedDataConf={categoryAttr:'txServidor',val1Attr:'nuCompletados',val2Attr:'nuFaltantes',txChartTitle:'Número de objetos por Servidor'};

    //Llama al web service y carga información.
    dc.getPorcentajesServidoresXs().
        done(function(response){
            console.log('promise done');
            console.log(response);
            //----
            $scope.mdata=[];
            $scope.stackedArrayData=[];
            for(var i in response){
                //Datos para los radiales
                var newData={};

                newData.nombre=response[i].nombre;
                newData.nuvalor=response[i].nutotal;
                newData.txvalor=response[i].nutotal*100;
                newData.txvalor=newData.txvalor+'%';
                newData.idServidor=response[i].id;
                newData.nuTotalTablas=response[i].nufaltantes + response[i].nucompletados;
                newData.nuTablasDif=response[i].nufaltantes;
                $scope.mdata.push(newData);

                //Datos para el stacked data
                //{txServidor:"BD112",nuCompletados:10, nuFaltantes:20,idServidor:1}
                var newStackedData={};
                newStackedData.txServidor=response[i].nombre;
                newStackedData.nuCompletados=response[i].nucompletados;
                newStackedData.nuFaltantes=response[i].nufaltantes;
                newStackedData.idServidor=response[i].id;
                $scope.stackedArrayData.push(newStackedData);
            }
            console.log("Promise - Termino de cargar "+$scope.mdata.length);
            //console.log($scope.mdata);

            //console.log(gc.conf.dashboard.gaugesData);

            $scope.stackedData={
                arrayData:$scope.stackedArrayData,
                id:"stackedTotales01"
            };
            $scope.$apply();

            gc.conf.dashboard={};
            gc.conf.dashboard.stackedData=$scope.stackedData;
            gc.conf.dashboard.gaugesData=$scope.mdata;

            //console.log($scope.stackedData);


        }).
        fail(function(){
            console.log('promise fail');
        });
        */
};