angular
    .module('RDash')
    .controller('tableroMapaCtrl', [
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
function ($scope,$rootScope,$state,$stateParams,dc,gc,dss,cs,$interval,tools,cds,uiGridConstants)  {
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

    ///<editor-fold desc="Mapa">
}]);
