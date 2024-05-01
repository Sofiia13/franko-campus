module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define(
      "comments",
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        event_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );
  
    comments.associate = (models) => {
      comments.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      }),

    comments.belongsTo(models.events, {
        foreignKey: "event_id",
        onDelete: "CASCADE",
    });
    };


  
    return comments;
  };
  