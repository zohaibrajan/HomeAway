'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        }
      )
      Spot.hasMany(
        models.SpotImage, {
          foreignKey: 'spotId'
        }
      )
      Spot.hasMany(
        models.Booking, {
          foreignKey: 'spotId'
        }
      )
      Spot.hasMany(
        models.Review, {
          foreignKey: 'spotId'
        }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: -90.0000000,
        max: 90.0000000
      },
      unique: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: -180.0000000,
        max: 180.0000000
      },
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Spot;
};
