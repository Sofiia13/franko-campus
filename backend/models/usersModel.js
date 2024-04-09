module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
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
        is_verified:{
            type: DataTypes.BOOLEAN,  
            allowNull: false,  
            defaultValue: "0"
        }}, {
            timestamps: false
        });


        users.associate = (models) => {
            users.hasMany(models.verificationCodes, {
                foreignKey: 'user_id', 
                onDelete: 'CASCADE', 
            }),
            users.hasOne(models.profiles, {
                foreignKey: 'user_id', 
                onDelete: 'CASCADE', 
            });
        };

        
    return users;
};