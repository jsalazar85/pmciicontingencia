angular
    .module('RDash')
    .service('globalsController',function(){

        this.pageData={
            page2:{}
        };

        console.log('CONSTRUCTOR -- globalsController');
        this.conf={
            font1:"Helvetica",



            xsServicesBaseUrl:"http://10.81.0.24:8010/SMFIND/APP/xsservices/", //Desarrollo
            //Productivo // xsServicesBaseUrl:"http://10.80.0.24:8020/DICTAMEN/AppCaptura/xsservices",

            //xsServicesBaseUrl:"/DICTAMEN/AppCaptura/xsservices",
            //xsServicesBaseUrl:"http://10.81.0.24:8010/TableroSacsyr/AppCaptura/xsservices",
            fotosBaseUrl:"http://091402OT003.infonavit.net/OTCS/cs.exe?func=LL.login&username=consulta&password=infonavit2017&NextURL=/OTCS/cs.exe/open/CR_@@CRED"
            //0999165409
        };

        this.setSelectedEsquemaDataContext=function(dataContext){
            this.conf.selectedDataContext=dataContext;
            console.log(this.conf.selectedDataContext);
        };

        //Regresa la url armada de forma correcta
        //Recibe como texto, el crédito a 10 posiciones
        this.getUrlFoto=function(txNuCredito10){
            return this.conf.fotosBaseUrl.replace(/@@CRED/g,txNuCredito10);
        };


        //Diccionario de gerencias
        this.gerenciaById={
            '1':{
                id:1,
                txGerencia:'CENTRO DE INFORMACIÓN',
                txIcon:'gerenciaIcon1.png',
                txGerenciaLabel:'Centro de Información'
            },
            '2':{
                id:2,
                txGerencia:'GESTIÓN DE SOLUCIONES TECNOLÓGICAS',
                txIcon:'gerenciaIcon2.png',
                txGerenciaLabel:'Gestión de Soluciones Tecnológicas'
            },
            '3':{
                id:3,
                txGerencia:'GERENCIA SR DE ARQUITECTURA E INGENIERÍA DE TI',
                txIcon:'gerenciaIcon3.png',
                txGerenciaLabel:'Arquitectura e Ingeniería de TI'
            },
            '4':{
                id:4,
                txGerencia:'SGTI-SERVICIOS DE INFORMÁTICA',
                txIcon:'gerenciaIcon4.png',
                txGerenciaLabel:'Servicios de Informática'
            },
            '5':{
                id:5,
                txGerencia:'GERENCIA SR CALIDAD Y GOBIERNO DE PROCESOS',
                txIcon:'gerenciaIcon5.png',
                txGerenciaLabel:'Calidad y Gobierno de Procesos'
            },
            '6':{
                id:6,
                txGerencia:'GERENCIA SR SOLUCIONES TECNOLÓGICAS',
                txIcon:'gerenciaIcon6.png',
                txGerenciaLabel:'Soluciones Tecnológicas'
            },
            '7':{
                id:7,
                txGerencia:'GERENCIA SR SEGURIDAD INFORMÁTICA',
                txIcon:'gerenciaIcon7.png',
                txGerenciaLabel:'Seguridad Informática'
            },
            '8':{
                id:8,
                txGerencia:'GERENCIA SR PLANEACION CONTROL Y GOBIERNO DE TI',
                txIcon:'gerenciaIcon8.png',
                    txGerenciaLabel:'Planeación, Control y Gobierno de TI'
            }
        };

        //Functions--------------------------
        this.getGerenciaById=function(txId){
            return this.gerenciaById[txId];
        };

        this.getGerenciaByName=function(txGerencia){
            for(var i in this.gerenciaById){
                if(this.gerenciaById[i].txGerencia == txGerencia){
                    return this.gerenciaById[i];
                }
            }
        };

        this.setSemaforoFromAvanceObj=function(obj){
            if( (obj.nuAvanceComp - obj.nuAvanceReal) <=0.000){
                obj.nuSemaforo=1;
            }else if( (obj.nuAvanceComp - obj.nuAvanceReal) >=0.001 &&  (obj.nuAvanceComp - obj.nuAvanceReal) <=0.1){
                obj.nuSemaforo=2;
            }else{
                obj.nuSemaforo=3;
            }

            return obj;
        };

        this.setAvanceMaximoFromAvanceObj=function(obj){
            if(obj.nuAvanceReal+obj.nuRestante < obj.nuAvanceComp){
                obj.nuAvanceMaximo = obj.nuAvanceComp;
            }else{
                obj.nuAvanceMaximo = obj.nuAvanceReal+obj.nuRestante;
            }
            return obj;
        };


    });
