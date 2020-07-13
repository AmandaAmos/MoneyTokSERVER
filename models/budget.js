module.exports = function(sequelize, DataTypes){

    const Budget = sequelize.define("Budget",{
        description: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                notEmpty: true
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            validate: {
                notEmpty: true
            },
    }});

    Budget.associate = function(models) {
        Budget.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };  

    return Budget;
};