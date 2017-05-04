//este script sera ejecutado por el cliente (navegador)
function saludar(){
    // alert("Bienvenido a mi Sitio Web");
    /*sweetAlert("Muy Bien..!!!",
    "Tu server funciona :D",
    "success");*/
    swal({
    title: "Hola Profesor Rivalcoba!",
    text: "Estes es Nuestro Servidor Estatico Ingrid Diaz & Cesar Parra",
    imageUrl: "img/linux.png"});
    // imageUrl: "img/linux.png"});
}

function error1() {
    // swal("Not Found...!")
    swal({
        title: "Error 404!",
        text: "Lo sentimos No tenemos el recursos que buscas..",
        timer: 2000,
        showConfirmButton: false
    });
}

function error2() {
    // swal("Not Found...!")
    swal({
        title: "<small> Error 500 </small>!",
        text: "No se puede leer el archivo solicitado..",
        color: ">html<span> message.",
        html: true
    });
}

function error3() {
    // swal("Not Found...!")
    swal({
        title: "<small> Error 200 </small>!",
        text: "Lo sentimos No tenemos el recursos que buscas..",
        color: ">html<span> message.",
        html: true
    });
}
