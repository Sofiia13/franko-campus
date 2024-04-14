module.exports = (sequelize, DataTypes) => {
    const eventParticipants = sequelize.define("eventParticipants", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: false
    });

    return eventParticipants;
};