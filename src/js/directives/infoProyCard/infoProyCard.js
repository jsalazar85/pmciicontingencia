
angular
    .module('RDash')
    .directive('infoproycard', ['globalsController','$state','$rootScope',infoproycard]);

function infoproycard(gc,$state,$rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato',
            isfirst:'=isfirst'
        },
        templateUrl: 'templates/directives/infoProyCard/infoProyCard.html',
        link: function(scope, element, attrs, controllers,$jq) {

            var objGerencia=gc.getGerenciaByName(scope.mdato.txGerencia);
            console.log(objGerencia);
            scope.imgPath='img/'+objGerencia.txIcon;
            scope.clickImg=function(){
                $rootScope.$emit('ipcClicked',scope.mdato);
            };
        }

    };
    return directive;
};


