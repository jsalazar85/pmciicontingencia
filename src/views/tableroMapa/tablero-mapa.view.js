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

        ngMap.getMap().then(function (map) {
            $scope.map=map;
        });


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
            "Veracruz":"",
            "Guanajuato":"",
            "Queretaro":"",
            "Yucatan":"",
            "Quintana Roo":"",
            "Hidalgo":"",
            "Campeche":"",
            "Puebla":"",
            "Michoacan":"",
            "Mexico":"",
            "Tlaxcala":"",
            "Distrito Federal":"CDMX",
            "Morelos":"",
            "Guerrero":"",
            "Oaxaca":"",
            "Tabasco":"",
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
        $scope.lstObColorSem={
            "1":"red",
            "2":"yellow",
            "3":"green"
        };

    //<editor-fold desc="Mapa">
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

    $scope.mapCenter={lat:23.35, lng:-102.10};

    $scope.mapOnMouseOver=function (event,data) {
        console.log(event);
        console.log(data);

        $scope.map.data.overrideStyle(event.feature, {strokeWeight: 3});
    };

    $scope.mapOnMouseOut=function (event,data) {
        console.log(event);
        console.log(data);

        $scope.map.data.revertStyle();
    };

    $scope.mapOnClick=function (event,data) {
        var bounds = new google.maps.LatLngBounds();
        $scope.processPoints(event.feature.getGeometry(), bounds.extend, bounds);
        $scope.map.fitBounds(bounds);
    };

    $scope.mapSetStyle=function (feature) {

        console.log(feature.f.ADMIN_NAME);

        //Obtener nombre de estado=
        var estado=$scope.hashMapeo[feature.f.ADMIN_NAME];
        console.log(estado);
        var obEstado=$scope.getEStadoByGeoName(estado);
        console.log(obEstado);


        var color = '#3f3';
        if (feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
        }




        return /** @type {google.maps.Data.StyleOptions} */({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
        });
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


    ///<editor-fold desc="Mapa">
}]);
