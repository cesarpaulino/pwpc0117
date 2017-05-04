//cargar el modulo http
var http = require('http');
//cargar el modulo fs
var fs = require('fs');
//cargar el modulo Path
var path = require('path');
// cargar colors
var colors = require('colors');
//cargando el modulo mime
var mime = require('mime');
//cargando las configuraciones
var config = require('./config/config');
//importanto los handlers
var handlers = require('./internals/handlers');
//importo la funcionalidad del servidor estatico
var staticServer = require('./internals/static-server');
//establecer el tema colors
colors.setTheme(config.color_theme);

//creando el server 
var server = http.createServer(function(req, res){
    //logeando la peticion
    console.log(`> Peticion entrante: ${req.url}`.data);
    //variable que almacenara la ruta absoluta de l archico a ser servido 
    //verificando si la url corresponde a un comando de mi API 
    //las rutas se ejecutaran las dos sentencias de handlers.js
    if(typeof(handlers[req.url]) == 'function'){
        //Existe el manejador en mi API
        //Entonces mando a ejecutar el manejador con los parametros que pide
        handlers[req.url](req, res)
    }else{
        //no existe el manejador en mi API
        //entonce intento servir la url
        staticServer.serve(req, res);
    }
});

//Poniendo en ejecucuion el server 
server.listen(config.PORT, config.IP,function(){
    console.log(`>Server escuchando en http://${config.IP}:${config.PORT}`.info)
});
