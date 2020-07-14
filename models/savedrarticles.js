module.exports = function(sequelize, DataTypes){
    const savedArticles = sequelize.define("savedArticles",{
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
 });
 savedArticles.associate = function(models) {
     savedArticles.belongsTo(models.User, {
         foreignKey: {
             allowNull: true
         }
     });
 };
return savedArticles;
};