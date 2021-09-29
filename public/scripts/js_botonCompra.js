
validarCompra = window.addEventListener('load', function () {
    let boton = document.querySelector('.btn-primary');
    boton.addEventListener('click', function () {
       Swal.fire({
           type: "succes",
           title: "Muchas Gracias JERO Y JULI!!!!!!!",
           text: "Esperamos no haberlos vuelto locos!!!!!"
       });

        let settings = {
            "method": "post",
            "headers": {
                "content-type": "application/json",

            },
            
        }
        fetch("http://www.yotemudo.heroku.com/products/compra", settings)
            .then(function (response) {
                return response.json()
            })
            .then(function (info) {
                console.log(info)
            })
            .catch(function (e) {
                // console.log(e);
            });




    })
})

