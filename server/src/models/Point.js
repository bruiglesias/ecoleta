const { Model, DataTypes } = require('sequelize');

class Point extends Model{
    static init(sequelize){
        super.init({ 
            image: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
            longitude: DataTypes.DOUBLE,
            latitude: DataTypes.DOUBLE,
            city: DataTypes.STRING,
            uf: DataTypes.STRING,
		},
        {
            sequelize,
			tableName: 'point',
        });
    }

    static associate(models){
        
       Point.belongsToMany(models.Item, {
           through: 'point_item',
           as: 'item',
           foreignKey: 'point_id',
           otherKey: 'item_id'
       });
         
    }
}

module.exports = Point;