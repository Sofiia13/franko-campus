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
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        format: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }, 
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        }

        //!!
        //потрібно змінити allowNull на false після тестування в date/time
        //
        //також потрібно буде перевірити, наскільки легко підтягувати з сайту
        //типи date та time, і, можливо, змінити на просто string/varchar
        //
    });

    events.associate = (models) => {
        events.hasMany(models.eventImages, {
            foreignKey: 'event_id',
            onDelete: 'CASCADE',
        }),
            events.belongsToMany(models.eventParticipants, {
                through: 'eventParticipant',
                foreignKey: 'event_id',
                otherKey: 'user_id'
            }),
            events.belongsToMany(models.userBookmarks, {
                through: 'userBookmark',
                foreignKey: 'event_id',
                otherKey: 'user_id'
            });
    };

    return events;
};