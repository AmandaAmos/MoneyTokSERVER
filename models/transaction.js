module.exports = function(sequelize, DataTypes){

    const Transaction = sequelize.define("Transaction",{
        description: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                notEmpty: true
            }
        },
        note: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deposit: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        withdrawal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            validate: {
                notEmpty:true
            }
        }
 });

 Transaction.associate = function(models) {
     Transaction.belongsTo(models.User, {
         foreignKey: {
             allowNull: false
         }
     });
 };

return Transaction;
};