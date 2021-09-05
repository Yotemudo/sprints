window.addEventListener('load', function(){                      //con esto le pido que primero cargue todo el html
    let formulario = document.querySelector('form.front-js');    // capturo el elemento
    
    formulario.addEventListener('submit', function(e){
       
        let erroresDeAcceso = [];                                 //aquí acumularé errores de validacion en front

        let campoNombre = document.querySelector('input.nombre')

        if (campoNombre.value==""){
            erroresDeAcceso.push("ingresa tu nombre de usuario")
        }

        let password = document.querySelector('input.clave')

        if (password.value==""){
            erroresDeAcceso.push("ingresa tu contraseña")
        }else if(password.value.length<8){
            erroresDeAcceso.push('la contraseña debe contener al menos 8 caracteres')
            }

        if (erroresDeAcceso.length>0){
            e.preventDefault();      // Si el array de errores no está vacio, evito que se submita el formulario
            
            let ulErrores = document.querySelector('div.ul_errores')
            for (let i = 0; i < erroresDeAcceso.length; i++) {  
                ulErrores.innerHTML += "<li>" + erroresDeAcceso[i] + "</li>"
            }
        }
    });
})