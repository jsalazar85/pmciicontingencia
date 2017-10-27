angular
    .module('RDash')
    .directive('infoBitCont', [
        '$rootScope',
        'toolsService',
        function ($rootScope,tools) {
            var directive = {
                restrict: 'E',
                transclude: true,
                scope: {
                    'classIcon':'=?',
                    'title':'=',
                    'nuData':'=',
                    'titleClass':'=?',
                    'txFormat':'@'
                },
                templateUrl: 'templates/info-bit-container.directive.html',
                link: function (scope, element, attrs, controllers, $jq) {
                    scope.$watch('nuData',function (newVal, oldVal) {
                        if(angular.isDefined(scope.txFormat)){
                            scope.txVal="";
                            scope.txVal=$.formatNumber(scope.nuData.toString(), {format:scope.txFormat, locale:"us"});
                        }else{
                            scope.txVal=scope.nuData.toString();
                        }
                    });



                }
            };
            return directive;
        }]);