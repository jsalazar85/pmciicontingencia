
angular
    .module('RDash')
    .controller('tableroAreaComViewCtrl', [
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'dataController',
        'globalsController',
        'ngProgressFactory',
        'dataStoreService',
        'consoleService',
        '$interval',
        'toolsService',
        'chartDataService',
        'uiGridConstants',
        function ($scope,$rootScope,$state,$stateParams,dc,gc,ngProgressFactory,dss,cs,$interval,tools,cds,uiGridConstants) {

            $scope.generaReporteXLS=function(elem){
                console.log("generarReporte");
                // detalle
                cds.addWorkTask('reporteXLS', {
                    url: gc.conf.xsServicesBaseUrl + '/execTabQueryFilter.xsjs',
                    query: {
                        idTab: 20,
                        idGra: 1,
                        idQry: 1,
                    },
                    success: function (response) {
                        console.log("success");
                        console.log(response);
                        if(response.data.length>0) {
                            $scope.generaXLSX(response.data);
                        }
                    },
                    error: function (response, error) {
                        console.log("Error");
                        console.log(error);
                    }
                });
                cds.doWorkTask('reporteXLS');

            };

            $scope.generaXLSX = function exportSheetJS(dataJson) {
                console.log("generaXLSX");
                console.log(dataJson);
                var columns = $scope.getColumsName(dataJson[0]);
                var fileName = 'reporte.xlsx';
                var sheetName = 'Reporte';
                var wopts ={ bookType: 'xlsx', bookSST: true, type: 'binary' };

                var wb = XLSX.utils.book_new(), ws = $scope.uigridToSheet(dataJson, columns);
                XLSX.utils.book_append_sheet(wb, ws, sheetName);
                var wbout = XLSX.write(wb, wopts);
                saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), fileName);
                return wbout;
            }

            /* utilities */
            $scope.uigridToSheet = function (data, columns) {
                console.log("uigridToSheet");
                console.log(columns);
                console.log(data.length);
                var o = [], oo = [], i = 0, j = 0;

                /* column headers */
                for(j = 0; j < columns.length; ++j) oo.push(columns[j]);
                o.push(oo);

                /* table data */
                for(i = 0; i < data.length; ++i) {
                    var values = $scope.getValues(data[i]);
                    oo = [];
                    for(j = 0; j < values.length; ++j) oo.push(values[j]);
                    o.push(oo);
                }
                /* aoa_to_sheet converts an array of arrays into a worksheet object */
                return XLSX.utils.aoa_to_sheet(o);
            }

            $scope.getColumsName = function (data) {
                var columnsNames = [];
                for (var key in data) {
                    console.log(key.substring(2,key.length));
                    columnsNames.push(key.substring(2,key.length));
                }
                return columnsNames;
            }

            $scope.getValues = function (data) {
                var columnValues = [];
                for (var key in data) {
                    columnValues.push(data[key]);
                }
                return columnValues;
            }

            function s2ab(s) {
                if(typeof ArrayBuffer !== 'undefined') {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                } else {
                    var buf = new Array(s.length);
                    for (var i=0; i!=s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
            }


        }
    ]);