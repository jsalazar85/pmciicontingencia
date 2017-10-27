angular
    .module('RDash')
    .directive('lightChartContainer', [
        '$rootScope',
        'toolsService',
        function ($rootScope,tools) {
            var directive = {
                restrict: 'E',
                transclude: {
                    'chart':'?chart'
                },
                scope: {
                    strTitle:"@",
                    strFooter:"@"
                },
                templateUrl: 'templates/light-chart-container.directive.html',
                link: function (scope, element, attrs, controllers, $jq) {

                }
            };
            return directive;
        }]);