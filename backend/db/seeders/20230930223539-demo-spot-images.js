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
         url: "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2013/08/26/100987825-121017_EJ_stone_mansion_0014r.1910x1000.jpg",
         preview: false,
       },
       {
         spotId: 1,
         url: "https://64.media.tumblr.com/2af9ae8b98985cf3908cef058c813d0e/tumblr_ml1khmSW6U1r2doe0o1_1280.jpg",
         preview: false,
       },
       {
         spotId: 2,
         url: "https://photos.zillowstatic.com/fp/0b9a2e88187802bd8dba8b5e50860802-cc_ft_768.webp",
         preview: true,
       },
       {
         spotId: 2,
         url: "https://www.villapp.com/wp-content/uploads/2019/05/Buying-A-Villa.jpg",
         preview: false,
       },
       {
         spotId: 3,
         url: "https://parkandrefer.com/wp-content/uploads/2015/03/nice-house.png",
         preview: true,
       },
       {
         spotId: 3,
         url: "https://64.media.tumblr.com/534b961a7a432ba18c43b519c12276c7/tumblr_ndp6icvInF1r2doe0o1_1280.jpg",
         preview: false,
       },
       {
         spotId: 3,
         url: "https://64.media.tumblr.com/e8314ff5c52956ef294bf8d29dfcc8e5/d6422b9bfa7ad7a0-fd/s1280x1920/a3ff7c1a6dfc94509e5a6517f0087b4426b45286.jpg",
         preview: false,
       },
       {
         spotId: 4,
         url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPblRFCXkpclqzOgIVQb5LQ3uBYSJ4Ue_GgAycXjd7&s",
         preview: true,
       },
       {
         spotId: 4,
         url: "https://64.media.tumblr.com/a6638d3419f51b59c3de8fa7799a2cff/9cf052d8b545bf09-44/s1280x1920/e68fbe8e5d20fcc90989d068074ebcc82aad7e54.png",
         preview: false,
       }
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
