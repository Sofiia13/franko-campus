module.exports = (sequelize, DataTypes) => {
    const events = sequelize.define("events", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }}, {
            timestamps: false
        });

    return events;
};