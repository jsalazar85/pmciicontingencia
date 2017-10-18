
angular
    .module('RDash')
    .directive('infoServCardDir', [
        'globalsController',
        '$state',
        '$rootScope',
        infoServCardDir
    ]);

function infoServCardDir(gc,$state,$rootScope) {
    var directive = {
        restrict: 'E',
        transclude: true,
        scope: {
            mdato: '=mdato'
        },
        templateUrl: 'templates/directives/infoServCard/infoServCard.html',
        link: function(scope, element, attrs, controllers,$jq) {
            ////////////////////////////////////////////
            //ATRIBUTOS Y VARIABLES *************

            ////////////////////////////////////////////
            //Eventos *************


            ////////////////////////////////////////////
            //FUNCIONES**************************
            scope.tituloClick=function(){
                $rootScope.$emit('iscTitleClicked',scope.mdato);
            };

            scope.formatter=function(value,decimals,txTipo,noApply){
                var res;
                res=value;

                if(!noApply && txTipo=='Registros'){
                    if(value>999999){
                        res=(value/1000000).toFixed(decimals);
                    }else if(value>999){
                        res=(value/1000).toFixed(decimals);
                    }
                }

                return res;
            }

            scope.txformatter=function(value,decimals,txTipo,noApply){
                var res;
                res='';

                if(!noApply && txTipo=='Registros'){
                    if(value>999999){
                        res='m';
                    }else if(value>999){
                        res='k';
                    }
                }

                return res;
            }

            ////////////////////////////////////////////
            //INICIALIZADOR *********************
        }
    };
    return directive;
};


