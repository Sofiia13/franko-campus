module.exports = (sequelize, DataTypes) => {
    const eventImages = sequelize.define("eventImages", {
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false
    });

    eventImages.associate = (models) => {
        eventImages.belongsTo(models.events, {
            foreignKey: 'event_id', 
            onDelete: 'CASCADE', 
        });
    };

    return eventImages;
};