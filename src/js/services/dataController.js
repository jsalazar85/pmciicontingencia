
angular
    .module('RDash')
    .service('dataController',['globalsController','$q','$http',function(gc,$q,$http){


        $('#globalLoading').bind('ajaxStart', function(){
            console.log('JQUERY AJAX START GLOBAL EVENT *********************')
        }).bind('ajaxStop', function(){
            console.log('JQUERY AJAX STOP GLOBAL EVENT *********************')
        });

        /////////////////////////////////////////////////////////
        //Servicios web para Tablero 01

        //Grafica 01: Avance de Dictámenes
        this.geTabAvanceDictamenes=function(){
            var deferred = $.Deferred();

            $http({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra01.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
            }).then(function(response){
                deferred.resolve(response.data);
            },function(response,error){
                deferred.reject(error.data);
            });

            /*
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra01.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });
            */

            return deferred.promise();
        };

        this.geTabDistTipoDictamen=function(){
            var deferred = $.Deferred();

            $http({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra02.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
            }).then(function(response){
                deferred.resolve(response.data);
            },function(response,error){
                deferred.reject(error.data);
            });

            /*
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra02.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });
            */

            return deferred.promise();
        };

        this.geTabDictamenPorMcpo=function(){

            var prom=$http({
                    url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
                    method:'POST',
                    dataType:'json',
                    crossDomain:true,
            });

            /*
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
            */
            return prom;

        };

        this.getColChart01=function(){

            var prom=$http({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra06.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
            });

            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return prom;

        };

        this.getColChart04=function(){

            var prom=$http({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra07.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
            });

            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return prom;

        };

        //
        this.geTabDictamenPorEdo=function(){

            var prom=$http({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra04.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
            });

            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return prom;

        };

        this.geTabDictamenPorMcpoDic=function(){

            var prom=$http({
                url:gc.conf.xsServicesBaseUrl+'/dbTabGra05.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
            });

            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return prom;

        };


        this.getChartRelacion=function(){

            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                data:{data:JSON.stringify({
                    idQuery:{
                        idTab:1,
                        idGra:20,
                        idQry:1
                    }
                })},
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });


            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return deferred.promise();

        };
        this.getChartCanal=function(){

            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                data:{data:JSON.stringify({
                    idQuery:{
                        idTab:1,
                        idGra:21,
                        idQry:1
                    }
                })},
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });


            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return deferred.promise();

        };

        this.getChartTipoDictamen=function(){

            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                data:{data:JSON.stringify({
                    idQuery:{
                        idTab:1,
                        idGra:22,
                        idQry:1
                    }
                })},
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });


            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return deferred.promise();

        };

        this.getChartDetalleDictamen=function(){

            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/execTabQuery.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                data:{data:JSON.stringify({
                    idQuery:{
                        idTab:1,
                        idGra:23,
                        idQry:1
                    }
                })},
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });


            /*
             var deferred = $.Deferred();
             $.ajax({
             url:gc.conf.xsServicesBaseUrl+'/dbTabGra03.xsjs',
             method:'POST',
             dataType:'json',
             crossDomain:true,
             success: function(response){
             deferred.resolve(response);
             },
             error: function(response,error){
             deferred.reject(error);
             }
             });

             return deferred.promise();
             */
            return deferred.promise();

        };
        /////////////////////////////////////////////////////////



        this.getPorcentajesServidores=function(){

            return [
                { nombre:"BD112", txvalor:"70%", nuvalor:"0.7",idServidor:1 },
                { nombre:"BD155", txvalor:"90%", nuvalor:"0.9",idServidor:2 },
                { nombre:"BD96", txvalor:"77%", nuvalor:"0.77",idServidor:3 },
                { nombre:"WB77", txvalor:"76%", nuvalor:"0.76",idServidor:4 },
            ];
        };

        //Obtiene los datos de avance de porcentaje por server
        this.insertData1=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbinsert1.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                data:{dataobject:JSON.stringify(params)},
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        //Obtiene del detalle por gerencia, para la 2da pantalla
        this.getCreditoDireccion=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbInicio.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        //Busca por el número de crédito y regresa todos los registros que coincidan
        //la busqueda se hace en el servidor mediante un like
        this.busquedaCredito=function(params){
            var deferred = $.Deferred();


            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbBusqueda.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });


            return deferred.promise();
        };






        //Obtiene del detalle por gerencia, para la 2da pantalla
        this.getReporte=function(){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/download_remates.xsjs',
                method:'GET',
                //dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        this.getReporte2=function(){
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/download_remates.xsjs',
                method:'GET',
                //dataType:'json',
                //crossDomain:true,
                success: function(response){
                    console.log('ajax sucess');
                },
                error: function(response,error){
                    console.log('ajax err');
                }
            });
        };

        this.getReporte3=function(){

            /*
            var req = new XMLHttpRequest();
            req.open("GET", gc.conf.xsServicesBaseUrl+'/download_remates.xsjs', true);
            req.responseType = "blob";
*/

            window.location.href=gc.conf.xsServicesBaseUrl+'/download_remates.xsjs';

        };






        //Obtiene del detalle por gerencia, para la 2da pantalla
        this.getGridConsulta=function(){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbconsultaReg.xsjs',
                method:'POST',
                //data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };


        //Obtiene registro por id
        this.getDictamenById=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbConsultaDictamen.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };


        //Obtiene registro por id
        this.getLogin=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbLogin.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        //Obtiene registro por id
        this.insertResumenAseguradora=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbInsertResumenAsegurado.xsjs',
                method:'POST',
                data:{data:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };




        //Obtiene registro por id
        this.validaExistNumCred=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbBusca.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        //Obtiene registro por id
        this.actualizaReg=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbUpdate.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };




        //Obtiene los datos de avance de porcentaje por server
        this.getPrincipalData=function(){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbInicio.xsjs',
                method:'POST',
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };



        //Obtiene del detalle por gerencia, para la 2da pantalla

        this.getDetalleGerenciaDS=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbdsgerencia.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        //Obtiene del detalle por gerencia, para la 3ra pantalla
        this.getDetalleTipo=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/detalleTipo.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        //Obtiene gauges
        this.getDetalleGauges=function(params){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/detalleGauges.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify(params)},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };



        //Obtiene los datos detalle por servidor
        this.getDetalleEsquemaXs=function(selectedEsquemaDC){
            var deferred = $.Deferred();
            $.ajax({
                url:gc.conf.xsServicesBaseUrl+'/dbDetalleEsquema.xsjs',
                method:'POST',
                data:{dataobject:JSON.stringify({txServidor:selectedEsquemaDC.txServidor,idServidor:selectedEsquemaDC.idServidor})},
                dataType:'json',
                crossDomain:true,
                success: function(response){
                    deferred.resolve(response);
                },
                error: function(response,error){
                    deferred.reject(error);
                }
            });

            return deferred.promise();
        };

        this.getTotalesPorServidor=function(){
            return {
                    id:"stackedTotales01",
                arrayData:[
                {txServidor:"BD112",nuCompletados:10, nuFaltantes:20,idServidor:1},
                {txServidor:"BD155",nuCompletados:10, nuFaltantes:20,idServidor:2},
                {txServidor:"BD96",nuCompletados:10, nuFaltantes:20,idServidor:3},
                {txServidor:"WB77",nuCompletados:10, nuFaltantes:20,idServidor:4}
            ]};
        };

        this.getSelectedEsquema=function(selectedDataContext){
            console.log('1 - En funcion getSelectedEsquema');
            console.log(selectedDataContext);

            //Si no existe, establecer el primer valor
            if(!selectedDataContext){
                console.log('2 - No existe valor en selectedDataContext; tomar el primero');
                this.conf.selectedEsquema = dc.getPorcentajesServidores()[0];
            }else{
                console.log('3 - Obtener el dato con base al selectedDataContext');
                var tmpPorcentajes=dc.getPorcentajesServidores();
                console.log('4 - Valor de tmpPorcentajes');
                console.log(tmpPorcentajes);
                for(var el in tmpPorcentajes){
                    console.log(tmpPorcentajes[el].idServidor);
                    console.log(this.conf.selectedDataContext.idServidor);

                    if(tmpPorcentajes[el].idServidor == this.conf.selectedDataContext.idServidor){
                        console.log('4 - Coincidencia con elemento: '+tmpPorcentajes[el].idServidor);
                        this.conf.selectedEsquema = tmpPorcentajes[el];
                        console.log(this.conf.selectedEsquema);
                        break;
                    }
                };
            }

            return this.conf.selectedEsquema;
        };


        this.getBusquedaTabla1Data=function (request1,request2) {
            return $http({
                url:gc.conf.xsServicesBaseUrl+'/dbConsultaDetalle.xsjs',
                method:'POST',
                dataType:'json',
                data:{
                    data:JSON.stringify(request1)
                    //dataobject2:JSON.stringify(request2),
                },
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
            })
        };


    }]);
