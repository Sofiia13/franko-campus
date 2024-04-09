const { validate } = require("../controllers/authController");

const formats = ["Онлайн", "Офлайн", "Змішано"];
const cost = ["Безкоштовно", "Платно"];
const types = ["Вебінар", "Змагання", "Факультатив", "Дискусія", "Гурток", "Інше"];

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
            validate: {
                isIn: [formats]
            }
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [cost]
            }
        }, 
        type: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [types]
            }
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