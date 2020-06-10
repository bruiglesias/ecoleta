const { Model, DataTypes } = require('sequelize');

class Item extends Model{
    static init(sequelize){
        super.init({ 
            image: DataTypes.STRING,
            title: DataTypes.STRING,
		},
        {
            sequelize,
			tableName: 'item',
        });
    }

    static associate(models){
        Item.belongsToMany(models.Point, {
            through: 'point_item',
            as: 'point',
            foreignKey: 'item_id',
            otherKey: 'point_id'
        });
    }
}

module.exports = Item;