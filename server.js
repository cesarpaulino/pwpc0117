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
//establecer el tema colors
colors.setTheme(config.color_theme);

//creando el server 
var server = http.createServer(function(req, res){
    //logeando la peticion
    console.log(`> Peticion entrante: ${req.url}`);
    //variable que almacenara la ruta absoluta de l archico a ser servido 
    var resourcePath;
    if(req.url == "/"){
        //el cliente no espeficica recurso lo enviaremos al index
        resourcePath = './static/index.html';
    }else{
        //el cliente si espeficia el recurso 
        resourcePath = config.STATIC_PATH + req.url;
    }

    //Extrayendo la extension de la url solicitada
    var extName = path.extname(resourcePath);

    //creando la variable content-type
    //exportando la varible mime
    var contentType = mime.lookup(extName);

    //Asignando un content type dependiendo de la url solicitada
    //se quita todo el switch
    // switch (extName) {
    //     case ".js":
    //         contentType = 'text/javascript';
    //         break;
    //     case ".css":
    //         contentType = 'text/css';
    //         break;
    //     case ".html":
    //         contentType = 'text/html';
    //         break;
    //     case ".php":
    //         contentType = 'text/php';
    //         break;
    //     case ".py":
    //         contentType = 'text/python';
    //         break
    //     default:
    //         contentType = 'text/plain';
    //         break;
    // }
    
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
            res.end('<h1>404: Not Found</h1>')
        }
    });
});

//Poniendo en ejecucuion el server 
server.listen(config.PORT, config.IP,function(){
    console.log(`>Server escuchando en http://${config.IP}:${config.PORT}`.info)
});