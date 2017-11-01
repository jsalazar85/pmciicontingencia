angular
    .module('RDash')
    .controller('tableroReporteFormatoUnicoComp',[
        '$scope',
        '$rootScope',
        function ($scope,$rootScope){
            var ctrl=this;

            ctrl.createTotal=function (lstOb) {
                console.log("createTotal init");
                var total={
                    nuLinea1Form: 0,
                    nuLinea1Tub: 0,
                    nuLinea2Form: 0,
                    nuLinea2Tub: 0,
                    nuLinea3Form: 0,
                    nuLinea3Tub: 0,
                    nuLinea4Form: 0,
                    nuLinea4Tub: 0,
                    nuLinea5Form: 0,
                    nuLinea5Tub: 0,
                    nuLinea6Form: 0,
                    nuLinea6Tub: 0
                };

                _.forEach(lstOb,function (o) {
                    total.nuLinea1Form+=o.nuLinea1Form;
                    total.nuLinea1Tub+=o.nuLinea1Tub;
                    total.nuLinea2Form+=o.nuLinea2Form;
                    total.nuLinea2Tub+=o.nuLinea2Tub;
                    total.nuLinea3Form+=o.nuLinea3Form;
                    total.nuLinea3Tub+=o.nuLinea3Tub;
                    total.nuLinea4Form+=o.nuLinea4Form;
                    total.nuLinea4Tub+=o.nuLinea4Tub;
                    total.nuLinea5Form+=o.nuLinea5Form;
                    total.nuLinea5Tub+=o.nuLinea5Tub;
                    total.nuLinea6Form+=o.nuLinea6Form;
                    total.nuLinea6Tub+=o.nuLinea6Tub;
                });

                console.log(total);
                console.log("createTotal end");
                return total;
            };

            //<editor-fold desc="Events Callbacks">
            $scope.$watch("$ctrl.gridData",function (newVal,oldVal) {
                ctrl.gridDataTotal=ctrl.createTotal(newVal);
            });

            //</editor-fold>

            //<editor-fold desc="Component Lifecycle">
            ctrl.$onInit=function () {
                console.log('InitExecuted');

                //ctrl.gr={};
            };
            ctrl.$onChanges=function () {
                console.log(ctrl.gridData);
            };
            ctrl.$doCheck=function () {

            };
            ctrl.$onDestroy=function () {

            };
            ctrl.$postLink=function () {

            };
            //</editor-fold>
        }
    ])
    .component('tableroAreaCreditoTabla', {
        templateUrl:'templates/tablero-area-credito-tabla.comp.html',
        controller:'tableroReporteFormatoUnicoComp',
        bindings:{
            gridData:'<'
        }
    });