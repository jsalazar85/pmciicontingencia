

angular
    .module('RDash')
    .service('LoadingInterceptor',['$q', '$rootScope', '$log',
        function ($q, $rootScope, $log) {
            'use strict';

            var xhrCreations = 0;
            var xhrResolutions = 0;

            function isLoading() {
                return xhrResolutions < xhrCreations;
            }

            function updateStatus() {
                $rootScope.loading = isLoading();
                $rootScope.$emit('onHttpActivity',$rootScope.loading);
            }

            return {
                request: function (config) {
                    console.log('li 1********************************************************');
                    xhrCreations++;
                    updateStatus();
                    return config;
                },
                requestError: function (rejection) {
                    console.log('li 2********************************************************');
                    xhrResolutions++;
                    updateStatus();
                    $log.error('Request error:', rejection);
                    return $q.reject(rejection);
                },
                response: function (response) {
                    console.log('li 3********************************************************');

                    xhrResolutions++;
                    updateStatus();
                    return response;
                },
                responseError: function (rejection) {
                    console.log('li 4********************************************************');
                    xhrResolutions++;
                    updateStatus();
                    $log.error('Response error:', rejection);
                    return $q.reject(rejection);
                }
            };
        }]);