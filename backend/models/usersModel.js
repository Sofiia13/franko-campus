module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      university: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      timestamps: false,
    }
  );

        users.associate = (models) => {
            users.hasMany(models.events, {
                foreignKey: 'organizer_id', 
                onDelete: 'CASCADE', 
            }),
            users.hasMany(models.verificationCodes, {
                foreignKey: 'user_id', 
                onDelete: 'CASCADE', 
            }),
            users.hasOne(models.profiles, {
                foreignKey: 'user_id', 
                onDelete: 'CASCADE', 
            }),
            users.belongsToMany(models.events, { 
                as: 'participants',
                through: models.eventParticipants,
                foreignKey: 'user_id',
                otherKey: 'event_id' 
            }),
            users.belongsToMany(models.events, { 
                as: 'bookmarks',
                through: models.userBookmarks,
                foreignKey: 'user_id',
                otherKey: 'event_id' 
            }),

            users.hasMany(models.pendingFriendRequests, {
                foreignKey: 'user_id_1',
                onDelete: 'CASCADE',
            }),
            users.hasMany(models.pendingFriendRequests, {
                foreignKey: 'user_id_2',
                onDelete: 'CASCADE',
            }),
            users.hasMany(models.friends, {
                foreignKey: 'user_id_1',
                onDelete: 'CASCADE',
            }),
            users.hasMany(models.friends, {
                foreignKey: 'user_id_2',
                onDelete: 'CASCADE',
            });

            users.hasMany(models.comments, {
              foreignKey: 'user_id',
              onDelete: 'CASCADE',
          });

          users.hasMany(models.ratings, {
              foreignKey: 'user_id',
              onDelete: 'CASCADE',
          });
        };

  return users;
};
