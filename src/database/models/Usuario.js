// alias, cols, config

function usuarioData(sequelize,DataTypes){

    alias = 'Usuario';
    cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },

        userAdmin: {type: DataTypes.TINYINT(2)},

        nombre: {type: DataTypes.STRING(20)},

        apellido: {type: DataTypes.STRING(20)},

        email: {type: DataTypes.STRING(20)},

        telefono: {type: DataTypes.INTEGER(20)},

        domicilio: {type: DataTypes.STRING(50)},

        localidad: {type: DataTypes.STRING(50)},

        usuario: {type: DataTypes.STRING(20)},

        claveUsuario: {type: DataTypes.STRING(100)},

        imagen: {type: DataTypes.STRING(10)},
    
    };  
    
    config = {
        timestamps: false,
        tableName: 'usuario'
    };

    const usuario = sequelize.define(alias,cols,config)

    return usuario;

    }

    module.exports = usuarioData;
    