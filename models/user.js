module.exports = function(sequelize, DataTypes){

    const User = sequelize.define("user",{
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: True,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: True,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
 });
return User;
};