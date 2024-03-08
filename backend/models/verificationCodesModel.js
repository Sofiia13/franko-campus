module.exports = (sequelize, DataTypes) => {
    const verificationCodes = sequelize.define("verificationCodes", {
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }}, {
            timestamps: false
        });

        
        verificationCodes.associate = (models) => {
            verificationCodes.belongsTo(models.users, {
                foreignKey: 'user_id', 
                onDelete: 'CASCADE',
            });
        };


    return verificationCodes;
};