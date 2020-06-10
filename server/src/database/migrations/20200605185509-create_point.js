'use strict';

module.exports = {
 	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('point',
		{ 
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			image: {
				type: Sequelize.STRING,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			whatsapp: {
				type: Sequelize.STRING,
				allowNull: false
			},
			longitude: {
				type: Sequelize.DOUBLE,
				allowNull: false
			},
			latitude: {
				type: Sequelize.DOUBLE,
				allowNull: false
			},
			city: {
				type: Sequelize.STRING,
				allowNull: false
			},
			uf: {
				type: Sequelize.STRING,
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
    	return queryInterface.dropTable('point');
  	}
};