// Funcionaldidad de servidor estatico
//cargando dependencias
var fs = require('fs'),
    mime = require('mime'),
    path = require('path'),
    config = require('../config/config');

//Exportanto servicio de servidor estatico 
exports.serve = function(req, res){
    var resourcePath;
    if(req.url == "/"){
        //el cliente no espeficica recurso lo enviaremos al index
        resourcePath = path.resolve('./static/index.html');
    }else{
    //obteniendo la ruta del recurso que se desea servir
    resourcePath = path.resolve(config.STATIC_PATH + req.url);
    }
    console.log(`> Recurso solicitado: ${resourcePath}`.data);
    //Extrayendo la extension de la url solicitada
    var extName = path.extname(resourcePath);
    //creando la variable content-type
    //exportando la varible mime
    var contentType = mime.lookup(extName);    
    //todo: verificar la extencia del recurso
    fs.exists(resourcePath, function(exists){
        if (exists){
            console.log('>Recurso existe...'.info);
            //El recurso existe
            // /*res.writeHead(202,{
            //     'ContentType': contentType,
            //     'Server':'ITGAM@0.0.1'*/
            // });
            // res.end('<h1>202: Si existe el recurso</h1>')
            //El recurso existe y se intentara leer
            fs.readFile(resourcePath,function(err, content){
                //verifico si hubi un error en la lectura del archivo
                if(err){
                    console.log('>Error en la lectura'.error);
                    //hubo un error
                    res.writeHead(500,{
                        'Content-Type':'text/html'
                    });
                    res.end('<h1>500: Error Interno</h1>');
                }else{
                    console.log(`> Se despacha recurso ${resourcePath}`.info);
                    //No hubo error se envia el contenido al cliente
                    res.writeHead(200,{
                        'Content-Type':contentType,
                        'Server' :  'ITGAM@0.0.1'
                    });
                    res.end(content,'utf-8');
                }
            });
        }else{
            //El recurso no existe
            console.log('>Recurso solicitado no fue encontrado...'.info);
            res.writeHead(404,{
                'Content-Type': 'text/html',
                'Server':'ITGAM@0.0.1'
            });
            res.end('<br>'+
            '<div align="center"><img src="img/404.jpg"><a href="index.html"><p><button onclick=""> Regresar </button></div>')
        }
    });

}