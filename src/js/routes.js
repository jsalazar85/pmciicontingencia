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
            .state('jsd', {
                url: '/jsd',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-mapa.view.html',
                        controller: 'tableroMapaViewCtrl'
                    },
                    'cargaArchivos@jsd':{
                        templateUrl: 'templates/tablero-carga-archivo-gen.view.html',
                        controller: 'tableroCargaArchivoGenCtrl'
                    },
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
                        templateUrl: 'templates/reporte-pptx-global.view.html'
                    },
                    'tableroReporteGlobalImplMedidasView@test':{
                        templateUrl: 'templates/tablero-reporte-global-impl-medidas.view.html',
                        controller: 'tableroReporteGlobalImplMedidasViewCtrl'
                    },
                    'tableroReporteGlobalUsoReservaView@test':{
                        templateUrl: 'templates/tablero-reporte-global-uso-reserva.view.html',
                        controller: 'tableroReporteGlobalUsoReservaViewCtrl'
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
            .state('tableroMaster', {
                url: '/tabmas',
                views:{
                    '':{
                        templateUrl: 'templates/tablero-maestro.view.html',
                    },
                    'seccionSeguimientoGlobal@tableroMaster':{
                        templateUrl: 'templates/tablero-seguimiento-global.view.html',
                        controller: 'tableroSeguimientoGlobalDinCtrl',
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
                        templateUrl: 'templates/captura-inicio-detalle-dinamico.view.html',
                        controller: 'capturaInicioDetalleDinamicoViewCtrl'
                    },
                    'capturaObservacion@tableroMaster':{
                        templateUrl: 'templates/captura-inicio-masterObs.view.html',
                        controller: 'capturaObservacionViewCtrl'
                    },
                    'tableroIniciativaGenericoView@tableroMaster':{
                        templateUrl: 'templates/tablero-iniciativa-generico.view.html',
                        controller: 'tableroIniciativaGenericoViewCtrl'
                    },
                    'tableroTablaIniciativaGenericoView@tableroMaster':{
                        templateUrl: 'templates/tablero-tabla-iniciativa-generico.view.html',
                        controller: 'tableroTablaIniciativaGenericoViewCtrl'
                    },
                    'tableroReporteGlobalImplMedidas@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-global-impl-medidas.view.html',
                        controller: 'tableroReporteGlobalImplMedidasViewCtrl'
                    },
                    'tableroReporteGlobalUsoReserva@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-global-uso-reserva.view.html',
                        controller: 'tableroReporteGlobalUsoReservaViewCtrl'
                    },
                    'tableroReporteFormatoUnico@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS1@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s1.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS2@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s2.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS3@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s3.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS4@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s4.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS5@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s5.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS6@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s6.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS7@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s7.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS8@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s8.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    },
                    'tableroReporteFormatoUnicoS9@tableroMaster':{
                        templateUrl: 'templates/tablero-reporte-formato-unico-s9.view.html',
                        controller: 'tablerReporteFormatUnicoCtrl'
                    }

                    //

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


