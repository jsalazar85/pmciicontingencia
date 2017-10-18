'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/tabmas');

        // Application routes
        $stateProvider
            .state('consulta', {
                url: '/consulta',
                views:{
                    '':{
                        templateUrl: 'templates/busqueda.view.html',
                        controller: 'busquedaCtrl'
                    }
                }
            })
            /*
            .state('test', {
                url: '/test',
                views:{
                    '':{
                        templateUrl: 'templates/seccion-iniciativas.view.html',
                        controller: 'seccionIniciativasViewCtrl'
                    },
                    'tableroIniciativaGenericoView@test':{
                        templateUrl: 'templates/tablero-iniciativa-generico.view.html',
                        controller: 'tableroIniciativaGenericoViewCtrl'
                    }
                }
            })
            */


            .state('reporteSeguimiento', {
                url: '/reporteseguimiento',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-seguimiento-global-reporte.view.html',
                        controller: 'tableroSeguimientoGlobalReportCtrl'
                    }
                }
            })
            .state('reporteSeguimientoDetalle', {
                url: '/reporteseguimientodetalle',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-seguimiento-global-reporte-detalle.view.html',
                        controller: 'tableroSeguimientoDetalleGlobalReportCtrl'
                    }
                }
            })
            .state('tableroMaster', {
                url: '/tabmas',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-maestro.view.html',
                    },
                    'seccionSeguimientoGlobal@tableroMaster':{
                        templateUrl: 'templates/tablero-seguimiento-global.view.html',
                        controller: 'tableroSeguimientoGlobalCtrl',
                    },
                    'seccionPadron@tableroMaster':{
                        templateUrl: 'templates/seccion-padron.view.html',
                    },
                    'seccionAreas@tableroMaster':{
                        templateUrl: 'templates/seccion-areas.view.html',
                    },
                    'seccionIniciativas@tableroMaster':{
                        templateUrl: 'templates/seccion-iniciativas.view.html',
                        controller: 'seccionIniciativasViewCtrl',
                    },
                    'seccionResumen@tableroMaster':{
                        templateUrl: 'templates/seccion-resumen.view.html',
                    },
                    'tableroCenso@tableroMaster':{
                        templateUrl: 'templates/tablero-censo.view.html',
                        controller: 'tableroCensoCtrl',
                    },
                    'tableroDictamen@tableroMaster':{
                        templateUrl: 'templates/tablero-dictamen.view.html',
                        controller: 'tableroDictamenCtrl',
                    },
                    'tableroAreaCartera@tableroMaster':{
                        templateUrl: 'templates/tablero-area-cartera.view.html',
                        controller: 'tableroAreaCarteraCtrl',
                    },
                    'tableroAreaRH@tableroMaster':{
                        templateUrl: 'templates/tablero-area-rh.view.html',
                        controller: 'tableroAreaRHCtrl',
                    },
                    'tableroAreaDel@tableroMaster':{
                        templateUrl: 'templates/tablero-area-del.view.html',
                        controller: 'tableroAreaDelCtrl',
                    },
                    'tableroAreaAtencion@tableroMaster':{
                        templateUrl: 'templates/tablero-area-atencion.view.html',
                        controller: 'tableroAtnSrvCtrl',
                    },
                    'tableroIniciativaMonto@tableroMaster':{
                        templateUrl: 'templates/tablero-iniciativa-rentas.view.html',
                        controller: 'tableroIniciativaCtrl'
                    },
                    'notaInformativa@tableroMaster':{
                        templateUrl: 'templates/nota-informativa.view.html'
                    },
                    'tableroIniciativaCedRev':{
                        templateUrl: 'templates/tablero-iniciativa-04.view.html',
                        controller: 'tableroIniciativa04ViewCtrl'
                    },
                    'capturaInicioDetalle@tableroMaster':{
                        templateUrl: 'templates/captura-inicio-detalle.view.html',
                        controller: 'capturaInicioDetalleViewCtrl'
                    },
                    'capturaObservacion@tableroMaster':{
                        templateUrl: 'templates/captura-inicio-masterObs.view.html',
                        controller: 'capturaObservacionViewCtrl'
                    },
                    'tableroIniciativaGenericoView@tableroMaster':{
                        templateUrl: 'templates/tablero-iniciativa-generico.view.html',
                        controller: 'tableroIniciativaGenericoViewCtrl'
                    }

                }
            })

    }
]).filter('percentFilter', function () {
    return function (value, scope) {
        var res="";
        if(angular.isDefined(value)){
            if(angular.isDefined(value.toFixed)){
                res=(value.toFixed(1)) +" %";
            }else{
                res=value+" %";
            }

        }
        return res;
    };
});;


