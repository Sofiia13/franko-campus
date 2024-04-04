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

    // eventParticipants.associate = (models) => {
    //     models.eventParticipants.belongsTo(models.events);
    //     models.eventParticipants.belongsTo(models.users);
    // };

    return eventParticipants;
};