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

    return userBookmarks;
};