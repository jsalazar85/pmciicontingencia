angular
    .module('RDash')
    .directive('amGenChart', [
        '$rootScope',
        'toolsService'
        ,function ($rootScope,tools) {
            var directive = {
                restrict: 'E',
                transclude: true,
                scope: {
                    data: '=data',
                    id: '@',
                    chartOpts : "=chartOpts",
                    contOpts:"=contOpts",
                    jsonPath:"@",
                },
                templateUrl: 'templates/directives/amGenChart/am-gen-chart.directive.html',
                link: function (scope, element, attrs, controllers, $jq) {

                }
            }
        }]);