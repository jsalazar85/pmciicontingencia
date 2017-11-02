angular
    .module('RDash')
    .controller('tableroMaestroViewCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        function ($scope,$rootScope,$state,$stateParams)  {
            $scope.emitPadronEvent=function () {
                $rootScope.$emit('clickPadronAccordion');
            };
        }]);