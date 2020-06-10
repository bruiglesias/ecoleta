'use strict';

module.exports = {
 	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('point_item',
		{ 
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			point_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references:  { model: 'point', key: 'id'},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			item_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references:  { model: 'item', key: 'id'},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
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
    	return queryInterface.dropTable('point_item');
  	}
};