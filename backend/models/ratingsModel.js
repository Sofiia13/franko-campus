module.exports = (sequelize, DataTypes) => {
    const ratings = sequelize.define(
        "ratings",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            event_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                }
            },
        },
        {
            timestamps: false,
        }
    );

    ratings.associate = (models) => {
        ratings.belongsTo(models.users, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        }),

        ratings.belongsTo(models.events, {
            foreignKey: "event_id",
            onDelete: "CASCADE",
        });
    };



    return ratings;
};
