module.exports = (sequelize, DataTypes) => {
    const eventImages = sequelize.define("eventImages", {
        data: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
    });

    return eventImages;
};
