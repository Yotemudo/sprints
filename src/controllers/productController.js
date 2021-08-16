const db = require('../database/models');

const { send } = require('process');
const { localsName } = require('ejs');

const productController = {
    
    //Para mostrar todo el listado de productos

    listado: (req,res) => {
        db.Pack.findAll({
            order: [
                ['numeroPack','ASC']
                
            ]
        })
            .then(function(productos){
                res.render ('products/producto',{products:productos});
            }
        )},

      carrito: (req,res) => {
        db.Pack.findByPk(req.params.id)
            .then(function(producto){
                res.render('products/carrito',{packBuscado:producto});
            })
    },
    carga: (req,res) => {     //create
        res.render ('products/cargaProducto');
    },

    edicion:  (req,res) => {
        db.Pack.findByPk(req.params.id)
            .then(function(producto){
               
                res.render('products/edicionProducto',{productoEncontrado:producto});
            })
      // *********  Dejo la forma de editar con JSON por si implementamos forma OFFLINE *****
        // let idProductoEditado = req.params;	
        // for(let i=0;i<products.length;i++){
        //     if (products[i].id==idProductoEditado.id){
        //         var productoEncontrado = products[i];
        //     break  
        //     }  
        // }  
        // res.render('products/edicionProducto',{productoEncontrado: productoEncontrado});
     
    },

    actualizar: (req,res) => { 
        // res.send(req.file.filename)
        // if (req.file == null){
        //       products[i].imagen = products[i].imagen;
        //                 }else {
        //                  products[i].imagen =req.file.filename;
        //                }
                    
    
        // res.send(req.file.filename)  
        if (req.file == null){
            var nombreImagen = 'avatar.jpg'
            }else {
            var nombreImagen = req.file.filename
            }

        db.Pack.update({
            
                numeroPack:req.body.numeroPack,  //nombre del campo en BD: "name" del Form
                radio:req.body.radio,
                precio:req.body.precio,
                superficie:req.body.superficie,
                imagen:nombreImagen
                      
                }, {
                    where:{
                    id: req.params.id
                    }
                })
                .then(function(update){
               
                    res.redirect('/products/producto');
                })
    },
    
        // res.render('products/producto', {products:Pack})

        // let idParaCambiar = req.params.id;
        // let ProductoAModificar = req.body;    
		// for(let i=0;i<products.length;i++){
	    //     if (products[i].id == idParaCambiar){
		//   	    products[i].numeroDePack = ProductoAModificar.numeroDePack;
		//   	    products[i].radio = ProductoAModificar.radio;
        //         products[i].superficie = ProductoAModificar.superficie;
        //         products[i].precio = ProductoAModificar.precio;
        //         products[i].superficie = ProductoAModificar.superficie;
        //         if (req.file == null){
        //                 products[i].imagen = products[i].imagen;
        //             }else {
        //                 products[i].imagen =req.file.filename;
        //             }
		//         break;  
        //     }       
        // }
		//  fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
		//  res.render('products/producto', {products:products,users:users})

    store: (req, res) => {
            if (req.file == null){
            var nombreImagen = 'avatar.jpg'
            }else {
            var nombreImagen = req.file.filename
            }
            db.Pack.create({
                numeroPack: req.body.numeroDePack,
                radio: req.body.radio,
                imagen: nombreImagen,
                superficie: req.body.superficie,
                precio: req.body.precio
            })
    .then(function(create){
                   
                        res.redirect('/products/producto');
                    })


        // if (req.file == null){
        //    var nombreImagen = 'avatar.jpg'
        // }else {
        //     var nombreImagen = req.file.filename
        // }
       
		// let idNuevo = products[products.length-1].id + 1;
		// let nuevoObjeto =  Object.assign({id: idNuevo},req.body,{imagen:nombreImagen});
		// products.push(nuevoObjeto);
   	    // fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
        //     res.render('products/producto', {products:products,users:users})
                },

    destroy: (req, res) => {
        db.Pack.destroy({
            where : {
                id:req.params.id
            }
        })
        .then(function(update){
               
            res.redirect('/products/producto');
        })
    }

        //*** */ ESTO LO DEJO POR SI HACEMOS EL OFFLINE ***
		// let idProducto = req.params.id;	
		// for(let i=0;i<products.length;i++){
		// 	if (products[i].id==idProducto){
		// 		var nombreImagen=products[i].imagen;
		// 		products.splice(i,1);
		// 		break;
		// 	}
		// }
		
	    // fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
		// fs.unlinkSync(path.join(__dirname,'../../public/img/camiones/'+nombreImagen));
		// res.render('index');
		// }

};

module.exports = productController; 
