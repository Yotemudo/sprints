validacionesFront = window.addEventListener('load', function () {
    let btnCompra = document.querySelector('.buttonValidar');
    btnCompra.addEventListener('click', function () {

        // Obtengo el ID por la barra de navegacion //
        let idabuscar = window.location.pathname;
        let cortado = idabuscar.split("/");
        let idServicio = cortado[3];

        // Seteo de posibles servicios solicitados
        var serviciosSolicitados = {
            idServicio: idServicio,
            traslado: false,
            asistente: false,
            embalaje: false,
            cajas: false,
            cintas: false,
            espuma: false,
            depoT: false,
            depoP: false
        };
        // Captura y verificacion de los checkbox de los servi a solicitar 
        traslado = document.querySelector('.traslado');
        asistente = document.querySelector('.asistente');
        embalaje = document.querySelector('.embalaje');
        cajas = document.querySelector('.cajas');
        cintas = document.querySelector('.cintas');
        espuma = document.querySelector('.espuma');
        depoT = document.querySelector('.depoT');
        depoP = document.querySelector('.depoP');
        if (traslado.checked) {
            serviciosSolicitados.traslado = true;
        };
        if (asistente.checked) {
            serviciosSolicitados.asistente = true;
        }
        if (embalaje.checked) {
            serviciosSolicitados.embalaje = true;
        };
        if (cajas.checked) {
            serviciosSolicitados.cajas = true;
        };
        if (cintas.checked) {
            serviciosSolicitados.cintas = true;
        };
        if (espuma.checked) {
            serviciosSolicitados.espuma = true;
        };
        if (depoT.checked) {
            serviciosSolicitados.depoT = true;
        };
        if (depoP.checked) {
            serviciosSolicitados.depoP = true;
        };
        // Seteo y envio del fetch, con los datos de los check en true o false
        let settings = {
            "method": "POST",
            "headers": {
                "content-type": "application/json",

            },
            "body": JSON.stringify(serviciosSolicitados)
        }
        fetch("http://localhost:3000/products/preCompra", settings)
            .then(function (response) {
                return response.json()
            })
            .then(function (info) {
                // console.log(info)
            })
            .catch(function (e) {
                // console.log(e);
            });
    });
})