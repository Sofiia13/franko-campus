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

    eventParticipants.associate = (models) => {
        models.eventParticipants.belongsTo(models.events, {
            foreignKey: 'event_id',
            onDelete: 'CASCADE',
        });
        models.eventParticipants.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    };

    return eventParticipants;
};