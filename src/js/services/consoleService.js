
angular
    .module('RDash')
    .service('consoleService',['globalsController',function(gc){
        this.log=function (txMsg,bnBreak) {
            if(bnBreak){
                console.log('=========================');
            }

            console.log(txMsg);
        };
    }]);
