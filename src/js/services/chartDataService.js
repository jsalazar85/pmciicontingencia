/**
 * Created by DiHG on 01/10/17.
 */
angular
    .module('RDash')
    .service('chartDataService',[
        '$interval',
        'toolsService',
        '$http',
        function($interval,tools,$http) {
            var lstWorkTask=[]; //Contiene las tareas en forma de lista
            var lstWorkList=[]; //Contiene la lista de tareas y su agrupación

            //TODO: Poner un object template para el tipo de los tasks

            //name='Nombre de la tarea'
            //obj=objeto que cuenta con los parámetros correctos para hacer la llamada
            this.addWorkTask=function(name,obj){
                lstWorkTask.push({name:name,task:obj});
            };

            //Recibe una array de nombres que se ejecutarán como una unidad
            this.addWorkList=function (txListName, lstTask) {

            };

            //Obtiene un solo objeto tarea por el nombre
            this.getWorkTask=function (txWorkTaskName) {
                var res=null;

                for(var i in lstWorkTask){
                    if( lstWorkTask[i].name == txWorkTaskName){
                        res=lstWorkTask[i];
                    }
                }

                return res;
            };

            this.doWorkTask=function(txWorkTaskName){
                //Get task name
                var workTask=this.getWorkTask(txWorkTaskName);

                if(angular.isDefined(workTask)){
                    $http({
                        url:workTask.task.url,
                        method:'POST',
                        dataType:'json',
                        data:{data:JSON.stringify({idQuery:workTask.task.query})},
                        //data: JSON.stringify ( {dataobject:{testob:"test"}} ),
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'Accept':'application/json, text/javascript, */*; q=0.01'
                        }
                    }).then(function(response){
                        //deferred.resolve(response.data);
                        if(angular.isDefined(workTask.task.success)){
                            workTask.task.success(response.data);
                        }else{
                            console.log("[chartDataService].[doWorkTask] Success function not defined");
                        }
                    },function(response,error){
                        //deferred.resolve(response.data);
                        if(angular.isDefined(workTask.task.success)){
                            workTask.task.fail(response,error);
                        }else{
                            console.log("[chartDataService].[doWorkTask] Fail function not defined");
                        }
                    });
                } else{
                    console.log("[chartDataService] No se encontró el nombre de la tarea;");
                }

            };

        }]);
