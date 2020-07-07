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
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
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
 
 User.associate = function(models) {
     User.hasMany(models.Budget, {
         onDelete: "cascade"
     });
 };
 User.associate = function(models) {
    User.hasMany(models.Transaction, {
        onDelete: "cascade"
    });
};

return User;
};