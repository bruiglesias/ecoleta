const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


class Usuario extends Model{
    static init(sequelize){
        super.init({ 
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
 			cpf: DataTypes.STRING,
            telefone: DataTypes.STRING,
            senha: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
		},
        {
            hooks: {
                beforeCreate: async (usuario, options) => {
                    usuario.senha = await bcrypt.hash(usuario.senha, 10);
                },
              },
            sequelize,
			tableName: 'usuario',
        });
    }

    static associate(models){
       
    }
}

module.exports = Usuario;