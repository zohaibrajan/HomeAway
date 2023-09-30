'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(
        models.ReviewImage, {
          foreignKey: 'reviewId'
        }
      )
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Review;
};
