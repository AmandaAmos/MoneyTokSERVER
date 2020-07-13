module.exports = function (sequelize, DataTypes) {
    const Article = sequelize.define("Article", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      byline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  
    Article.associate = function (models) {
      Article.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
      Article.belongsTo(models.savedArticles, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Article};