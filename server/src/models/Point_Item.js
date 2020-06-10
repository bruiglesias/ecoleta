const { Model, DataTypes } = require('sequelize');


class Point_Item extends Model{
    static init(sequelize){
        super.init({ 
            point_id: DataTypes.INTEGER,
            item_id: DataTypes.INTEGER,
		},
        {
            sequelize,
			tableName: 'point_item',
        });
    }

    static associate(models){
       
    }
}

module.exports = Point_Item;