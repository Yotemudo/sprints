renderizarServicios = window.addEventListener('load', function () {
  let valorFinalCarrito = 0;
  let valorPack = parseInt(document.querySelector('.valorPack').innerHTML);
  let valorTraslado = parseInt(document.querySelector('.valorTraslado').innerHTML);
  let valorAsistente = parseInt(document.querySelector('.valorAsistente').innerHTML);
  let valorEmbalaje = parseInt(document.querySelector('.valorEmbalaje').innerHTML);
  let valorCajas = parseInt(document.querySelector('.valorCajas').innerHTML);
  let valorCintas = parseInt(document.querySelector('.valorCintas').innerHTML);
  let valorEspuma = parseInt(document.querySelector('.valorEspuma').innerHTML);
  let valorDepoT = parseInt(document.querySelector('.valorDepoT').innerHTML);
  let valorDepoP = parseInt(document.querySelector('.valorDepoP').innerHTML);

  fetch("http://localhost:3000/apis/")
    .then(response => response.json())
    .then(function (data) {

      if (data.data[0].trasladoDiaFeriado != 1) {
        let traslado = document.querySelector('#traslado');
        traslado.style.display = "none";
      } else {
        valorFinalCarrito += valorTraslado;
      }

      if (data.data[0].asistente != 1) {
        let asistente = document.querySelector('#asistente');
        asistente.style.display = "none";
      } else {

        valorFinalCarrito += valorAsistente;

      }
      if (data.data[0].embalaje != 1) {
        let embalaje = document.querySelector('#embalaje');
        embalaje.style.display = "none";
      } else {
        valorFinalCarrito += valorEmbalaje;
      }
      if (data.data[0].cajas != 1) {
        let cajas = document.querySelector('#cajas');
        cajas.style.display = "none";
      } else {
        valorFinalCarrito += valorCajas;
      }
      if (data.data[0].adhesivo != 1) {
        let cintas = document.querySelector('#cintas');
        cintas.style.display = "none";
      } else {
        valorFinalCarrito += valorCintas;
      }
      if (data.data[0].gomaEspuma != 1) {
        let espuma = document.querySelector('#espuma');
        espuma.style.display = "none";
      } else {
        valorFinalCarrito += valorEspuma;
      }
      if (data.data[0].depositoTemporario != 1) {
        let depositoT = document.querySelector('#depositoT');
        depositoT.style.display = "none";
      } else {
        valorFinalCarrito += valorDepoT;
      }
      if (data.data[0].depositoPermanente != 1) {
        let depositoP = document.querySelector('#depositoP');
        depositoP.style.display = "none";
      } else {
        valorFinalCarrito += valorDepoP;
      }
      let insertValorCarrito = document.querySelector('.servicios');
      insertValorCarrito.innerHTML = valorFinalCarrito;
      let valorFinal = document.querySelector('.valorFinal');
      valorFinal.innerHTML += valorFinalCarrito + valorPack;


    })
    .catch(function (e) {
      console.log(e)
    })
    
})