'use strict';

module.exports = {
 	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('item',
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
			title: {
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
    	return queryInterface.dropTable('item');
  	}
};
