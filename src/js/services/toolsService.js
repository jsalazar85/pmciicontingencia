angular
    .module('RDash')
    .service('toolsService',['$interval','$http',function($interval,$http) {

        //Obtiene el máximo valor numérico de un arreglo de objetos y retorna el valor numérico
        this.getMaxFromArrayOfObjs=function(lstObj,attr){
            var maximator=-9999999999;

            for(var i in lstObj){
                if(lstObj[i][attr]>maximator){
                    maximator=lstObj[i][attr];
                }
            }
            return maximator;
        };

        //Get numbers with commas
        this.numberWithCommas=function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        this.getRandNumByRange=function(to,from){
            return Math.floor((Math.random() * from) + to);
        };


        this.getLocalJson=function(path){
            var p=path;
            var res=$http.get(p);
            return res;
        };

        this.getPercentage=function (val,max,suffix) {
            return  (( (val/max)*100).toFixed(2));
        };


    }]);