
angular
    .module('RDash')
    .directive('importSheetJs', ['globalsController','$state','$rootScope','dataController',
    function (gc,$state,$rootScope,dc) {
        return {
            scope: { opts: '=' },
            link: function ($scope, $elm) {
                $elm.on('change', function (changeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        /* read workbook */
                        var bstr = e.target.result;
                        var wb = XLSX.read(bstr, {type:'binary'});

                        /* grab first sheet */
                        for(var i in wb.SheetNames){
                            console.log(wb.SheetNames[i]);
                        }

                        var wsname = wb.SheetNames[0];
                        var ws = wb.Sheets[wsname];

                        /* grab first row and generate column headers */
                        var aoa = XLSX.utils.sheet_to_json(ws, {header:1, raw:false, blankrows:false});
                        console.log(aoa);

                        $.when(dc.insertResumenAseguradora(aoa)).done(function(response){
                            console.log(response);
                        }).fail(function (response) {
                            console.log('Error en la llamada al servicio');
                            console.log(response);
                        }).then(function(response){
                            $elm.val("");
                        });



                        // var cols = [];
                        // for(var i = 0; i < aoa[0].length; ++i) cols[i] = { field: aoa[0][i] };
                        //
                        // /* generate rest of the data */
                        // var data = [];
                        // for(var r = 1; r < aoa.length; ++r) {
                        //     data[r-1] = {};
                        //     for(i = 0; i < aoa[r].length; ++i) {
                        //         if(aoa[r][i] == null) continue;
                        //         data[r-1][aoa[0][i]] = aoa[r][i]
                        //     }
                        // }

                        /* update scope */
                        $scope.$apply(function() {
                            //$scope.opts.columnDefs = cols;
                            //$scope.opts.data = data;
                        });
                    };

                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });
            }
        };
    }]);