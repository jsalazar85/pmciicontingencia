//angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies','nvd3']);
angular.module('RDash', [
    'ui.router',
    'ngCookies',
    'nvd3',
    'ngProgress',
    'ui.grid',
    'ngMap',
    'ui.grid.autoResize'
]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]).config(["$locationProvider", function($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);

