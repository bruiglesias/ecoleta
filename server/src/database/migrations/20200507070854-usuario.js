'use strict';

module.exports = {
 	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('usuario',
		{ 
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			cpf: {
				type: Sequelize.STRING,
				allowNull: false
			},
			telefone: {
				type: Sequelize.STRING,
				allowNull: false
			},
			senha: {
				type: Sequelize.STRING,
				allowNull: false
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			createdAt:{
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt:{
				type: Sequelize.DATE,
				allowNull: false
			},

		});
  	},

	down: (queryInterface, Sequelize) => {
    	return queryInterface.dropTable('usuario');
  	}
};
