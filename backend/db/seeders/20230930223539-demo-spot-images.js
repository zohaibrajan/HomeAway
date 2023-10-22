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
   await SpotImage.bulkCreate(
     [
       {
         spotId: 1,
         url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSIa5VvMwTy4C4FaKW6fx9dq5QbM9Txfaxw8pALAJncCzRjea_",
         preview: true,
       },
       {
         spotId: 1,
         url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSIa5VvMwTy4C4FaKW6fx9dq5QbM9Txfaxw8pALAJncCzRjea_",
         preview: false,
       },
       {
         spotId: 1,
         url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSIa5VvMwTy4C4FaKW6fx9dq5QbM9Txfaxw8pALAJncCzRjea_",
         preview: false,
       },
       {
         spotId: 1,
         url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSIa5VvMwTy4C4FaKW6fx9dq5QbM9Txfaxw8pALAJncCzRjea_",
         preview: false,
       },
       {
         spotId: 1,
         url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSIa5VvMwTy4C4FaKW6fx9dq5QbM9Txfaxw8pALAJncCzRjea_",
         preview: false,
       },
       {
         spotId: 2,
         url: "https://photos.zillowstatic.com/fp/0b9a2e88187802bd8dba8b5e50860802-cc_ft_768.webp",
         preview: true,
       },
       {
         spotId: 3,
         url: "https://parkandrefer.com/wp-content/uploads/2015/03/nice-house.png",
         preview: true,
       },
       {
         spotId: 4,
         url: "https://images-ext-2.discordapp.net/external/zMh_bfEYGKb__n4WygR9gHGCOxuyvjAjWHpIhte6YFU/https/hips.hearstapps.com/hmg-prod/images/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg?width=785&height=523",
         preview: true,
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://square-realestate.com/properties/1008-mcconnell-drive-decatur-ga-30033-7156284',
      'https://square-realestate.com/properties/2701-lovejoy-circle-duluth-ga-30097-8901220'] }
    }, {});
  }
};
