const db = require('../database/models');
const { send } = require('process');
const { localsName } = require('ejs');
const { body } = require('express-validator');
const { time, timeStamp,timeLog,timeEnd } = require('console');
let nroServicio;
const productController = {

    listado: (req, res) => {
        db.Pack.findAll({
                order: [
                    ['numeroPack', 'ASC']

                ]
            })
            .then(function (productos) {
                res.render('products/producto', {
                    products: productos
                });
            })
    },

    carrito: async (req, res) => {
        //TEST //
        let serviciosPedidos = []
        await db.Seleccion.findAll({
                limit: 1,
                where: {
                    'id': 'id'
                },
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(serviciosPedidos => {
                return console.log("Los valores que retorna el find de 1 solo Servicio es : " + (JSON.stringify(serviciosPedidos[0])));
            })
            .catch(function (e) {
                return console.log("El error que tira el findOne de busqueda de servicios en Carrito es: " + e)
            });
        //TERMINA EL TEST//

        await db.Pack.findAll({
                include: [{
                    association: 'servicio_adicional'
                }]
            }, {
                order: [
                    ['numeroPack', 'ASC']
                ]
            })
            .then(function (productos) {

                let precioSer = [];

                for (producto of productos) {
                    let objaux = {
                        trasladoDiaFeriado: producto.servicio_adicional[0].trasladoDiaFeriado,
                        asistente: producto.servicio_adicional[0].asistente,
                        embalaje: producto.servicio_adicional[0].embalaje,
                        cajas: producto.servicio_adicional[0].cajas,
                        adhesivo: producto.servicio_adicional[0].adhesivo,
                        gomaEspuma: producto.servicio_adicional[0].gomaEspuma,
                        depositoTemporal: producto.servicio_adicional[0].depositoTemporal,
                        pack_id: producto.servicio_adicional[0].pack_id,
                        fecha_actualizacion: producto.servicio_adicional[0].fecha_actualizacion,
                    }
                    precioSer.push(objaux);
                }
                let packBuscado = productos[req.params.id - 1];
                res.render('products/carritoConfirm', {
                    packBuscado
                });
            });
    },

    carrito_ok: (req, res) => {
        db.Pack.findByPk(req.params.id)
            .then(function (producto) {
                res.render('products/carrito', {
                    packBuscado: producto
                });
            })
    },

    carga: (req, res) => {
        res.render('products/cargaProducto');
    },

    edicion: (req, res) => {
        db.Pack.findByPk(req.params.id)
            .then(function (producto) {
                res.render('products/edicionProducto', {
                    productoEncontrado: producto
                });
            })
    },

    actualizar: (req, res) => {
        if (req.file == null) {
            var nombreImagen = 'avatar.jpg'
        } else {
            var nombreImagen = req.file.filename
        }
        db.Pack.update({

                numeroPack: req.body.numeroPack,
                radio: req.body.radio,
                precio: req.body.precio,
                superficie: req.body.superficie,
                imagen: nombreImagen

            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(function (update) {

                res.redirect('/products/producto');
            })
    },

    store: (req, res) => {
        if (req.file == null) {
            var nombreImagen = 'avatar.jpg'
        } else {
            var nombreImagen = req.file.filename
        }
        db.Pack.create({
                numeroPack: req.body.numeroDePack,
                radio: req.body.radio,
                imagen: nombreImagen,
                superficie: req.body.superficie,
                precio: req.body.precio
            })
            .then(function (create) {

                res.redirect('/products/producto');
            })
    },

    destroy: (req, res) => {
        db.Pack.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function (update) {
                res.redirect('/products/producto');
            })
    },

    preCompra: async (req, res) => {
        let datosUsuario = req.session.userLogged;
        let idServiciosSolicitado = await db.Servicio_adicional.findOne({
                where: {
                    pack_id: req.body.idServicio
                }
            })
            .then(servicios => {
                // return console.log("Los valores que retorna el find de Servicios es: " + JSON.stringify(servicios.id) +"      " + "y ademas los del body son: " + JSON.stringify(req.body) );
                return servicios;
            })
            .catch(function (e) {
                return console.log("El error que tira el findOne de Servicio Adicional es: " + e)
            });

        let services = await db.Seleccion.create({
            trasladoDiaFeriado: req.body.traslado,
            cajas: req.body.cajas,
            gomaEspuma: req.body.espuma,
            depositoTemporario: req.body.depoT,
            embalaje: req.body.embalaje,
            adhesivo: req.body.cintas,
            depositoPermanente: req.body.depoP,
            asistente: req.body.asistente,
            trasladoDiaFeriado: req.body.traslado
        });

        let idServices = await db.Usuario_producto.create({
            usuario_id: datosUsuario.id,
            servicio_adicional_id: idServiciosSolicitado.id,
            fechaVenta: timeLog,
            vendido: 0,
            precioFinal: 0,
            seleccion_id: services.id
        });

        console.log("El numero de serie de esta nueva seleccion es: " + JSON.stringify(idServices));
        nroServicio = idServices.id
        console.log("LOs datos de usuario que hay almacenados son: " + JSON.stringify(datosUsuario));
        console.log("El numero de pedido es: " + JSON.stringify(nroServicio));
    },
    compra:(req,res) => {
        console.log(nroServicio)
        db.Usuario_producto.update({

                vendido : 1,
            }, {
                where: {
                    id: nroServicio
                }
            })
    }
};

module.exports = productController;