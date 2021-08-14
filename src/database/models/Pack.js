// alias, cols, config

function packData(sequelize,DataTypes){

    alias = 'Pack';
    cols = {
        id: {
            type: DataTypes.INTEGER(100),
            primaryKey: true,
            autoIncrement: true
        },

        numeroPack: {type: DataTypes.INTEGER(100)},

        radio: {type: DataTypes.DECIMAL},

        imagen: {type: DataTypes.STRING(20)},

        superficie: {type: DataTypes.INTEGER(4)},

        precio: {type: DataTypes.DECIMAL},
    
    };  
    
    config = {
        timestamps: false,
        tableName: 'pack'
    };

    const pack = sequelize.define(alias,cols,config)

    return pack;

    }

    module.exports = packData;
    