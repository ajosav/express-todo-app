const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        static associate(models) {
            Todo.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user'
            })
        }
    }
    Todo.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        completedAt: DataTypes.DATE,
        media:  DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'Todo',
        tableName: 'todos'
    });

    return Todo;
}