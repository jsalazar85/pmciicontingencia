
angular
    .module('RDash')
    .directive('newLoading', ['$http',newLoading]);


function newLoading($http)
{
    return {
        restrict: 'E',
        templateUrl:'templates/directives/loading/loading.html' ,//'<i id="globalLoading"  class="fa fa-circle-o-notch fa-spin fa-2x fa-fw fast-spin" style="color: white;"></i>',
        link: function (scope, elm, attrs)
        {
            console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                console.log('0*************************************************');
                if(v){
                    console.log('1*************************************************');
                    $(elm).first('div').show();
                    //elm.firstChild.show();
                }else{
                    console.log('2*************************************************');
                    $(elm).first('div').hide();
                    //elm.firstChild.hide();
                }
            });
        }
    };
};
