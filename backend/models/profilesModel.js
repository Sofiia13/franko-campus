module.exports = (sequelize, DataTypes) => {
  const profiles = sequelize.define(
    "profiles",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // university: {
      //     type: DataTypes.STRING,
      //     allowNull: false,
      // },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  profiles.associate = (models) => {
    profiles.belongsTo(models.users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return profiles;
};
