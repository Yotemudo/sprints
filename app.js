const express = require('express');

const app = express();

const mainRoutes = require ('./src/routes/mainRoutes');
const productRoutes = require ('./src/routes/productRoutes');

app.set('view engine','ejs');

app.use(express.static('./public'));

app.use('/',mainRoutes);
app.use('/products',productRoutes);

app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo en el puerto 3000');
});




