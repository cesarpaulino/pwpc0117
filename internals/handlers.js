//Archivo que contiene los manejadores correspondientes al "api"" de mi aplicacion


var author = {
    "name": "Cesar Paulino",
    "department": "Informatica",
    "Delegacion": "Cuauhtemoc"
};

// Declaracion de Manejadores 
var getauthorinfo = function (req, res) {
    //Estableciendo el mime apropiado para dar a conocer al 
    //navegador que se enviara un json
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    //Serializar la respuesta
    var jsonResponse = JSON.stringify(author);
    res.end(jsonResponse);
}

var getServerName = function (req, res) {
    console.log('> Respondiendo Nombre del Server...');
    res.end('> Servidor Gogeta');
}

var getservertime = function (req, res) {
    var d = new Date();
    horas = d.getHours(),
    minutos = d.getMinutes(),
    segundos = d.getSeconds();
    hora = `${horas}:${minutos}:${segundos}`;
    console.log('> Respondiendo Nombre del Server...');
    if (horas >= 0 && horas < 12) {
        res.end('<body background="img/dia2.jpeg">'+
        '<br><br><div align="center"><img src="img/dia.jpeg">' + 
        '<center><br>'+ `<h1 style="color:yellow"> --> La Hora Actual ${hora} del Server Good Morning <-- <a href="index.html">`+
        `<p><button onclick=""> Regresar </button></h1></body></div>`);
    }
    else if (horas >= 12 && horas < 18) {
        res.end('<body background="img/tardef.jpeg">'+'<br><br><div align="center"><img src="img/tarde.png">'
        + '<center>'+ `<h1 style="color:blue"> --> La Hora Actual ${hora} del Server Good Afternoon <-- <a href="index.html"><p><button onclick="">`+
        ` Regresar </button></h1></body></div>`);
    } else ( horas >= 18 && horas < 24)
    res.end('<body background="img/noche.jpeg">' + '<br><br><div align="center"><img src="img/noche.jpg">' +'<center>' +
        `<h1 style="color:yellow">--> La Hora Actual ${hora} del Server Goodnight <-- <a href="index.html">`+
        `<p><button onclick=""> Regresar </button></p></h1></body></div>`);
    }

//Exportando Manejadores
var handlers ={};
handlers["/getauthorinfo"] = getauthorinfo;
handlers["/getServerName"] = getServerName;
handlers["/getservertime"] = getservertime;

module.exports = handlers;
//estos son objetos