angular
    .module('RDash')
    .controller('tableroMapaViewCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'dataStoreService',
        'consoleService',
        '$interval',
        'toolsService',
        'chartDataService',
        'uiGridConstants',
        'NgMap',
function ($scope,$rootScope,$state,$stateParams,dc,gc,dss,cs,$interval,tools,cds,uiGridConstants,ngMap)  {



    $scope.initAttrs=function () {
        $scope.hashMapeo={
            "Coahuila":"",
            "Nuevo Leon":"",
            "Tamaulipas":"",
            "Sinaloa":"",
            "Durango":"",
            "Zacatecas":"",
            "San Luis Potosi":"",
            "Jalisco":"",
            "Aguascalientes":"",
            "Veracruz":"Veracruz",
            "Guanajuato":"",
            "Queretaro":"",
            "Yucatan":"",
            "Quintana Roo":"",
            "Hidalgo":"Hidalgo",
            "Campeche":"",
            "Puebla":"Puebla",
            "Michoacan":"Michoacán",
            "Mexico":"EDOMEX",
            "Tlaxcala":"Tlaxcala",
            "Distrito Federal":"CDMX",
            "Morelos":"Morelos",
            "Guerrero":"Guerrero",
            "Oaxaca":"Oaxaca",
            "Tabasco":"Tabasco",
            "Chiapas":"Chiapas",
            "Sonora":"",
            "Baja California":"",
            "Baja California Sur":"",
            "Nayarit":"",
            "Chihuahua":""
        };
        $scope.mock={};
        $scope.mock.data=[
            {
                txEstado:"CDMX",
                nuReportes:100,
                nuNoAplicaSeguiro:123,
                nuAplicaSeguro:123,
                nuPTDFA:123,
                nuDPDFA:123,
                nuPTDP:123,
                nuSDDFA:123,
                nuAplicaSegProcesoDic:123,
                procentaje:"",
                nuSemaforo:1
            },
            {
                txEstado:"Chiapas",
                nuReportes:100,
                nuNoAplicaSeguiro:123,
                nuAplicaSeguro:123,
                nuPTDFA:123,
                nuDPDFA:123,
                nuPTDP:123,
                nuSDDFA:123,
                nuAplicaSegProcesoDic:123,
                procentaje:"",
                nuSemaforo:2
            }
        ];
        $scope.carteraData={};
        $scope.carteraData=$scope.mock.data;
        $scope.obColorSem={
            "1":"red",
            "2":"yellow",
            "3":"green"
        };

        $scope.mapData=[
            {
                lat:19.346058,
                long:-99.194968
            },
            {
                lat:19.126058,
                long:-99.194968
            }
        ];

        $scope.selObEstado={};

        $scope.gridOpt2={
            showColumnFooter: true,
            enableHorizontalScrollbar: 1,
            data:[
                {
                    txEdo:"TEst",
                    nuTotalReportes:100,
                    nuNoAplicaSeguro:200,
                    nuAplicaSeguro:200,
                    nuPT:90,
                    nuDP:50,
                    nuAS:90,
                    nuST_PTDP:10,
                    nu_SD:20,
                    nuASPD:20,
                    nuPorAvc:20
                }
            ],
            columnDefs:[
                {
                    field:"txEdo",
                    name:"ESTADO",
                    footerCellTemplate:"<div style='height: 100%; padding-top: 5px;'><span>Totales: </span></div>",
                    width:100
                },
                {
                    field:"nuTotalReportes",
                    name:"Reportes Delegación y Brigadas",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    name:"No Aplica Seguro",
                    field:"nuNoAplicaSeguro",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    field:"nuAplicaSeguro",
                    name:"Aplica Seguro",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    field:"nuPT",
                    name:"Pérdida Total Dictamen Final Aseguradora",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    field:"nuDP",
                    name:"Daño Parcial Dictamen Final Aseguradora",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    field:"nuST_PTDP",
                    name:"Subtotal Pérdida Total y Daño Parcial",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    field:"nu_SD",
                    name:"Sin Daños Dicatmen Final Aseguradora",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    field:"nuASPD",
                    name:"Aplica Seguro en Proceso de Dictaminar",
                    type:"number",
                    cellFilter:"number:0",
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    footerCellFilter:"number:0",
                    aggregationHideLabel: true,
                    width:80
                },
                {
                    field:"nuPorAvc",
                    name:"% de Avance",
                    type:"number",
                    cellFilter:'percentFilter:this',
                    width:80
                },
            ]
        };
    };



    //<editor-fold desc="Map Events and Attributes">
    ngMap.getMap().then(function (map) {
        $scope.map=map;
    });


    //Funcion para ocasionar un resize del mapa junton con un timeout
    $scope.mapResizeTimeout=function () {
        var st01=setTimeout(function () {
            console.log("timeout");
            google.maps.event.trigger($scope.map,"resize");
            st01=null;
            $scope.mapRecenter();
        },250);
    };

    $rootScope.$on('clickPadronAccordion',function (event,data) {
        console.log("clickPadronAccordion event");
        $scope.mapResizeTimeout();
    });

    $scope.mapCenter={lat:23.35, lng:-102.10};

    $scope.mapOnMouseOver=function (event,data) {

        $scope.map.data.overrideStyle(event.feature, {strokeWeight: 3,strokeColor: "black"});
    };

    $scope.mapOnMouseOut=function (event,data) {
        console.log(event);
        console.log(data);

        $scope.map.data.revertStyle();
    };

    $scope.mapOnClick=function (event,data) {
        /*
        var bounds = new google.maps.LatLngBounds();
        $scope.processPoints(event.feature.getGeometry(), bounds.extend, bounds);
        $scope.map.fitBounds(bounds);
        console.log(event);



        console.log(event);
        */

        var txEstadoServicio=$scope.hashMapeo[event.feature.f.ADMIN_NAME];
        $scope.selObEstado=$scope.getEStadoByGeoName(txEstadoServicio);
        console.log($scope.selObEstado);

        var anchor = new google.maps.MVCObject();
        anchor.set("position", event.latLng);
        $scope.map.showInfoWindow("bar",event.latLng);
    };

    $scope.mapSetStyle=function (feature) {
        console.log(feature.f.ADMIN_NAME);

        //Obtener nombre de estado=
        var estado=$scope.hashMapeo[feature.f.ADMIN_NAME];
        //console.log(estado);
        var obEstado=$scope.getEStadoByGeoName(estado);
        //console.log(obEstado);

        var color;

        if(obEstado){
            console.log($scope.selectedIndicador);
            if($scope.selectedIndicador){
               if($scope.selectedIndicador.idIndicador==1){
                   color = $scope.getSemaforoRule(obEstado.nuPorcentaje); // $scope.obColorSem[obEstado.nuSemaforo];
               } else if($scope.selectedIndicador.idIndicador==2){
                   color = $scope.getSemaforoRule2(obEstado.nuPTD);
               } else if($scope.selectedIndicador.idIndicador==3){
                   color = $scope.getSemaforoRule3(obEstado.nuDPD);
               } else if($scope.selectedIndicador.idIndicador==4){
                   color = $scope.getSemaforoRule(obEstado.nuSDD);
               }
            }
        }else{
            color = "gray";
        }
        //Obtienen el color del semaforo
        //var color = '#3f3';

        if (feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
        }


        return /** @type {google.maps.Data.StyleOptions} */({
            fillColor: color,
            strokeColor: "gray",
            strokeWeight: 1
        });
    };

    $scope.processPoints=function(geometry, callback, thisArg) {
        if (geometry instanceof google.maps.LatLng) {
            callback.call(thisArg, geometry);
        } else if (geometry instanceof google.maps.Data.Point) {
            callback.call(thisArg, geometry.get());
        } else {
            geometry.getArray().forEach(function(g) {
                $scope.processPoints(g, callback, thisArg);
            });
        }
    };

    $scope.mapRecenter=function () {
        $scope.map.setZoom(5);
        $scope.map.setCenter($scope.mapCenter);
    };
    //</editor-fold>

    $scope.getSemaforoRule=function (nuValor) {
        var sem=0;
        if(nuValor>90){
            sem=3
        }else if(nuValor>75){
            sem=2
        }else{
            sem=1
        }

        console.log(sem);
        return $scope.obColorSem[sem];
        //return sem;
    };

    $scope.getSemaforoRule2=function (nuValor) {
        console.log("getSemaforoRule2 ini");
        console.log(nuValor);
        var sem=0;
        if(nuValor>0){
            sem=1
        }else{
            sem=3
        }

        console.log(sem);
        console.log("getSemaforoRule2 end");
        return $scope.obColorSem[sem];
        //return sem;
    };

    $scope.getSemaforoRule3=function (nuValor) {
        console.log("getSemaforoRule2 ini");
        console.log(nuValor);
        var sem=0;
        if(nuValor>0){
            sem=2
        }else{
            sem=3
        }

        console.log(sem);
        console.log("getSemaforoRule2 end");
        return $scope.obColorSem[sem];
        //return sem;
    };

    $scope.getEStadoByGeoName=function (txEstado) {
        var ob=null;
        for(var i in $scope.carteraData){
            if($scope.carteraData[i].txEstado == txEstado){
                ob= $scope.carteraData[i];
                break;
            }
        }
        return ob;
    };



    $scope.callServiceTablaPadron=function () {
        cds.addWorkTask('grid2',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:1,
                idGra:40,
                idQry:1
            },
            success:function (response) {
                console.log("success ******************************************");
                console.log(response);
                $scope.gridOpt2.data=response.data; //<<RJLR
            },
            error:function (response,error) {
                console.log("Error");
                console.log(error);
            }
        });
        cds.doWorkTask('grid2'); //RJLR

    };

    $scope.callSrv=function () {
        cds.addWorkTask('tableroMapaViewCtrl.CallData',{
            url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
            query:{
                idTab:17,
                idGra:1,
                idQry:1
            },
            success: function(response){
                console.log("success");
                console.log(response);
                $scope.carteraData=response.data;
                // $scope.apply();

                google.maps.event.trigger($scope.ngMap, 'resize');
            },
            error: function(response,error){
                console.log("Error");
                console.log(error);
                $scope.gridOptDet.data=[];
                //$scope.apply();
            }
        });
        cds.doWorkTask('tableroMapaViewCtrl.CallData');
    };

    $scope.init=function () {
        $scope.catIndicador=[
            {
                txindicador:"Porcentaje de Avance",
                idIndicador:1
            },
            {
                txindicador:"Pérdida Total",
                idIndicador:2
            },
            {
                txindicador:"Daño Parcial",
                idIndicador:3
            }
        ];
        $scope.selectedIndicador=$scope.catIndicador[0];

        //Evento para resize del mapa. Cuando el mapa se inicializa en un div oculto
        //no se muestre de forma corecta


        $scope.callSrv();
        $scope.initAttrs();
        $scope.callServiceTablaPadron();
    };

    $scope.init();

    $scope.$watch("selectedIndicador",function (newVal, oldVal) {


        $scope.map.data.setStyle({});
        $scope.map.data.setStyle($scope.mapSetStyle);
        $scope.mapRecenter();
    });

}]);
