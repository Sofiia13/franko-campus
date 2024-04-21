module.exports = (sequelize, DataTypes) => {
    const friends = sequelize.define("friends", {
        user_id_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    friends.associate = (models) => {
        friends.belongsTo(models.users, {
            foreignKey: 'user_id_1',
            onDelete: 'CASCADE',
        }),
        friends.belongsTo(models.users, {
            foreignKey: 'user_id_2',
            onDelete: 'CASCADE',
        })
    }

    return friends;
};