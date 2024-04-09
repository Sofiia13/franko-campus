module.exports = (sequelize, DataTypes) => {
    const userBookmarks = sequelize.define("userBookmarks", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: false
    });

    userBookmarks.associate = (models) => {
        models.userBookmarks.belongsTo(models.events, {
            foreignKey: 'event_id',
            onDelete: 'CASCADE',
        });
        models.userBookmarks.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    };

    return userBookmarks;
};