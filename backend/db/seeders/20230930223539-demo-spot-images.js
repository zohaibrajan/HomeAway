'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await SpotImage.bulkCreate([
    {
      spotId: 2,
      url: 'https://square-realestate.com/properties/1008-mcconnell-drive-decatur-ga-30033-7156284',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://square-realestate.com/properties/2701-lovejoy-circle-duluth-ga-30097-8901220',
      preview: false
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://square-realestate.com/properties/1008-mcconnell-drive-decatur-ga-30033-7156284',
      'https://square-realestate.com/properties/2701-lovejoy-circle-duluth-ga-30097-8901220'] }
    }, {});
  }
};
