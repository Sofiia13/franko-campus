module.exports = (sequelize, DataTypes) => {
    const pendingFriendRequests = sequelize.define("pendingFriendRequests", {
        user_id_1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id_2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    pendingFriendRequests.associate = (models) => {
        pendingFriendRequests.belongsTo(models.users, {
            foreignKey: 'user_id_1',
            onDelete: 'CASCADE',
        }),
        pendingFriendRequests.belongsTo(models.users, {
            foreignKey: 'user_id_2',
            onDelete: 'CASCADE',
        })
    }

    return pendingFriendRequests;
};