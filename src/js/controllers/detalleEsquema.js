
angular
    .module('RDash')
    .controller('detalleEsquema', ['$scope', 'dataController', 'globalsController','$rootScope', '$state',detalleEsquema]);

function detalleEsquema($scope,dc,gc,$rootScope,$state) {

    $scope.scEsquemaDataConf={categoryAttr:'txEsquema',val1Attr:'nuCompletados',val2Attr:'nuFaltantes',txChartTitle:'Objetos por Esquema',showScroll:true};
    $scope.stackedDataEsquema={
        id:"stacked02",
        arrayData:[
            {txEsquema:"",}
        ]
    };
    $scope.gaugeData={
        nombre:"nodata",
        nuvalor:0,
        txvalor:"0%",
        idServidor:0,
        nuTotalTablas:0
    };

    $scope.scServidoresData={
        id:"stacked01",
        arrayData:[
            {txEsquema:"",}
        ]
    };
    $scope.scServidoresChartConf={categoryAttr:'txServidor',val1Attr:'nuCompletados',val2Attr:'nuFaltantes',txChartTitle:'Objetos por Servidor'};

    if(!gc.conf.selectedDataContext){
        $state.go('index');
    }


    $scope.getData=function(){
        if(!gc.pageData.page1){
            dc.getDetalleEsquemaXs(gc.conf.selectedDataContext)
                .done(function(response){

                    gc.pageData.page1=response;
                    $scope.setDataAll(response);

                })
                .fail(function(error){
                    console.log('promise fail');
                    console.log(error);
                });
        }else{
            $scope.setDataAll(response);
        }
    };

    $scope.setDataAll=function(response){
        console.log('promise done');
        console.log(gc.conf.dashboard.gaugesData);

        var stData={};
        stData.id="stacked02";
        stData.arrayData=response;

        //Obtener el dato del gauge
        for(var i in gc.conf.dashboard.gaugesData){
            if(  gc.conf.dashboard.gaugesData[i].idServidor == gc.conf.selectedDataContext.idServidor){
                $scope.gaugeData=gc.conf.dashboard.gaugesData[i];
                console.log($scope.gaugeData);
            }
        }

        $scope.stackedDataEsquema=stData;
        $scope.scServidoresData=gc.conf.dashboard.stackedData;
        console.log($scope.scServidoresData);
        $scope.$apply();

    };


};