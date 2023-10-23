'use strict';

const { Review } = require('../models');

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
   await Review.bulkCreate(
     [
       {
         spotId: 2,
         userId: 1,
         review: "Solid, amazing time",
         stars: 5,
       },
       {
         spotId: 1,
         userId: 3,
         review: "Do not come here",
         stars: 1,
       },
       {
         spotId: 1,
         userId: 2,
         review: "Awesome",
         stars: 5,
       },
     ],
     { validate: true }
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [5, 1] }
    }, {});
  }
};
