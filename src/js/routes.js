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
                    },
                    'detalleBusqueda@consulta':{
                        templateUrl: 'templates/detalle-busqueda.view.html',
                        controller: 'busquedaDetalleCtrl'
                    }
                }
            })
            // .state('jsd', {
            //     url: '/jsd',
            //     views:{
            //         '':{
            //             templateUrl: 'templates/tablero-area-credito.view.html',
            //             controller: 'tableroAreaCarteraCtrl'
            //         }
            //     }
            // })
            .state('jsd', {
                url: '/jsd',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-consolidado.view.html'
                    },
                    'tableroReporteFormatoUnicoS1@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s1.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS2@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s2.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS3@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s3.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS4@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s4.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS5@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s5.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS6@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s6.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS7@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s7.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS8@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s8.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS9@jsd':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s9.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroAreaCreditoView@jsd':{
                        templateUrl: 'templates/tablero-area-credito.view.html',
                        controller: 'tableroAreaCredtioCtrl'
                    }
                }
            })


            .state('menuCargaArchivo', {
                url: '/cargaarchivo',
                views:{
                    '':{
                        templateUrl: 'templates/menu-cargas.view.html',
                        controller: 'menuCargasViewCtrl'
                    },
                    'cargaArchivos@menuCargaArchivo':{
                        templateUrl: 'templates/tablero-carga-archivo-gen.view.html',
                        controller: 'tableroCargaArchivoGenCtrl'
                    },
                }
            })
            .state('test', {
                url: '/test',
                views:{
                    '':{
                        templateUrl: 'templates/reporte-comunicacion.view.html',
                        controller: 'reporteComunicacionView'
                    }
                }
            })
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
            .state('recons', {
                url: '/recons',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-consolidado.view.html',
                        controller:'tableroReporteFormatoUnicoConsiolidado'
                    },
                    'tableroReporteFormatoUnicoS1@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s1.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS2@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s2.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS3@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s3.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS4@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s4.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS5@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s5.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS6@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s6.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS7@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s7.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS8@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s8.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS9@recons':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s9.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroAreaCreditoView@recons':{
                        templateUrl: 'templates/tablero-area-credito.view.html',
                        controller: 'tableroAreaCredtioCtrl'
                    }
                }
            })
            .state('tableroMaster', {
                url: '/tabmas',
                views: {
                    '': {
                        templateUrl: 'templates/tablero-maestro.view.html',
                        controller: 'tableroMaestroViewCtrl'
                    },
                    'seccionSeguimientoGlobal@tableroMaster': {
                        templateUrl: 'templates/tablero-seguimiento-global.view.html',
                        controller: 'tableroSeguimientoGlobalDinCtrl',
                    },
                    'seccionPadron@tableroMaster': {
                        templateUrl: 'templates/seccion-padron.view.html',
                    },
                    'seccionAreas@tableroMaster': {
                        templateUrl: 'templates/seccion-areas.view.html',
                    },
                    'tableroAreaCartera@tableroMaster': {
                        templateUrl: 'templates/tablero-area-cartera.view.html',
                        controller: 'tableroAreaCarteraCtrl',
                    },
                    'seccionIniciativas@tableroMaster': {
                        templateUrl: 'templates/seccion-iniciativas.view.html',
                        controller: 'seccionIniciativasViewCtrl',
                    },
                    'seccionResumen@tableroMaster': {
                        templateUrl: 'templates/seccion-resumen.view.html',
                    },
                    'tableroCenso@tableroMaster': {
                        templateUrl: 'templates/tablero-censo.view.html',
                        controller: 'tableroCensoCtrl',
                    },
                    'tableroDictamen@tableroMaster': {
                        templateUrl: 'templates/tablero-dictamen.view.html',
                        controller: 'tableroDictamenCtrl',
                    },

                    'tableroMapaView@tableroMaster': {
                        templateUrl: 'templates/tablero-mapa.view.html',
                        controller: 'tableroMapaViewCtrl'
                    },
                    'tableroAreaRH@tableroMaster': {
                        templateUrl: 'templates/tablero-area-rh.view.html',
                        controller: 'tableroAreaRHCtrl',
                    },
                    'tableroAreaDel@tableroMaster': {
                        templateUrl: 'templates/tablero-area-del.view.html',
                        controller: 'tableroAreaDelCtrl',
                    },
                    'tableroAreaAtencion@tableroMaster': {
                        templateUrl: 'templates/tablero-area-atencion.view.html',
                        controller: 'tableroAtnSrvCtrl',
                    },
                    'tableroAreaCom@tableroMaster': {
                        templateUrl: 'templates/tablero-area-com.view.html',
                        controller: 'tableroAreaComViewCtrl',
                    },
                    'tableroIniciativaMonto@tableroMaster': {
                        templateUrl: 'templates/tablero-iniciativa-rentas.view.html',
                        controller: 'tableroIniciativaCtrl'
                    },
                    'notaInformativa@tableroMaster': {
                        templateUrl: 'templates/nota-informativa.view.html'
                    },
                    'tableroIniciativaCedRev': {
                        templateUrl: 'templates/tablero-iniciativa-04.view.html',
                        controller: 'tableroIniciativa04ViewCtrl'
                    },
                    'capturaInicioDetalle@tableroMaster': {
                        templateUrl: 'templates/captura-inicio-detalle-dinamico.view.html',
                        controller: 'capturaInicioDetalleDinamicoViewCtrl'
                    },
                    'capturaObservacion@tableroMaster': {
                        templateUrl: 'templates/captura-inicio-masterObs.view.html',
                        controller: 'capturaObservacionViewCtrl'
                    },
                    'tableroIniciativaGenericoView@tableroMaster': {
                        templateUrl: 'templates/tablero-iniciativa-generico.view.html',
                        controller: 'tableroIniciativaGenericoViewCtrl'
                    },
                    'tableroTablaIniciativaGenericoView@tableroMaster': {
                        templateUrl: 'templates/tablero-tabla-iniciativa-generico.view.html',
                        controller: 'tableroTablaIniciativaGenericoViewCtrl'
                    },
                    'tableroReporteGlobalImplMedidas@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-global-impl-medidas.view.html',
                        controller: 'tableroReporteGlobalImplMedidasViewCtrl'
                    },
                    'tableroReporteGlobalUsoReserva@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-global-uso-reserva.view.html',
                        controller: 'tableroReporteGlobalUsoReservaViewCtrl'
                    },
                    'tableroReporteFormatoUnico@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS1@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s1.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS2@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s2.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS3@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s3.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS4@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s4.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS5@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s5.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS6@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s6.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS7@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s7.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS8@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s8.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS9@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-formato-unico-s9.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroAreaCreditoView@tableroMaster': {
                        templateUrl: 'templates/tablero-area-credito.view.html',
                        controller: 'tableroAreaCredtioCtrl'
                    },
                    'seccionCapturaDel@tableroMaster': {
                        templateUrl: 'templates/tablero-captura-delegaciones.view.html',
                        controller: 'tableroCapturaDelegacionesViewCtrl'
                    },
                    'capturaRegistroDel@tableroMaster': {
                        templateUrl: 'templates/captura-delegaciones.view.html',
                        controller: 'capturaDelegacionesViewCtrl'
                    },
                    'reporteCapturaDel@tableroMaster': {
                        templateUrl: 'templates/tablero-reporte-captura-delegaciones.view.html',
                        controller: 'tableroReporteCapturaDelegacionesViewCtrl'
                    }
                }
            })

            // .state('jsd', {
            //     url: '/tabmas',
            //     views:{
            //         '':{
            //             templateUrl: 'templates/tablero-maestro.view.html',
            //             controller:'tableroMaestroViewCtrl'
            //         },
            //         'seccionAreas@jsd':{
            //             templateUrl: 'templates/seccion-areas.view.html',
            //         },
            //         'tableroAreaCreditoView@jsd':{
            //             templateUrl: 'templates/tablero-area-credito.view.html',
            //             controller: 'tableroAreaCarteraCtrl'
            //         }
            //     }
            // })

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


