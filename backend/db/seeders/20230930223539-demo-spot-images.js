'use strict';

const { SpotImage } = require('../models');
import { faker } from "@faker-js/faker";
import { spotImages } from "../../utils/seeders";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const seeders = [];

for (let i = 0; i < 25; i++) {
  const img = {};

  img.spotId = faker.number.int({min: 1, max: 25});
  img.url = spotImages[faker.number.int({min: 1, max: 25})];
  img.preview = i % 5 === 0;

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
  //  await SpotImage.bulkCreate(
  //    [
  //      {
  //        spotId: 1,
  //        url: "https://64.media.tumblr.com/a1ea32d4911e3ba9d9434aae294b27fd/de5ac65de8c1f6e0-a6/s1280x1920/9b4fb4ba94eddae57a60bdd6b86654320e0361ed.jpg",
  //        preview: true,
  //      },
  //      {
  //        spotId: 1,
  //        url: "https://64.media.tumblr.com/ef1f2d3af23c7a1be4161a02502fcbac/2c791e5c23e068ab-31/s1280x1920/2980ade5a35e241197131250dbdf0af9473c6f20.jpg",
  //        preview: false,
  //      },
  //      {
  //        spotId: 1,
  //        url: "https://64.media.tumblr.com/a6638d3419f51b59c3de8fa7799a2cff/9cf052d8b545bf09-44/s1280x1920/e68fbe8e5d20fcc90989d068074ebcc82aad7e54.png",
  //        preview: false,
  //      },
  //      {
  //        spotId: 1,
  //        url: "https://64.media.tumblr.com/d5e83c8815d336ceb96cfeed1540a89e/tumblr_ngovifdAxb1tscmnjo1_1280.jpg",
  //        preview: false,
  //      },
  //      {
  //        spotId: 2,
  //        url: "https://photos.zillowstatic.com/fp/0b9a2e88187802bd8dba8b5e50860802-cc_ft_768.webp",
  //        preview: true,
  //      },
  //      {
  //        spotId: 3,
  //        url: "https://parkandrefer.com/wp-content/uploads/2015/03/nice-house.png",
  //        preview: true,
  //      },
  //      {
  //        spotId: 3,
  //        url: "https://freepngimg.com/thumb/house/155703-house-modern-free-png-hq.png",
  //        preview: false,
  //      },
  //      {
  //        spotId: 4,
  //        url: "https://images-ext-2.discordapp.net/external/zMh_bfEYGKb__n4WygR9gHGCOxuyvjAjWHpIhte6YFU/https/hips.hearstapps.com/hmg-prod/images/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg?width=785&height=523",
  //        preview: true,
  //      },
  //      {
  //        spotId: 4,
  //        url: "https://freepngimg.com/thumb/house/155703-house-modern-free-png-hq.png",
  //        preview: false,
  //      },
  //      {
  //        spotId: 4,
  //        url: "https://freepngimg.com/thumb/house/26801-6-house-transparent.png",
  //        preview: false,
  //      },
  //    ],
  //    { validate: true }
  //  );
      await SpotImage.bulkCreate(seeders, { validate: true })
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
      preview: { [Op.in]: [true, false] }
    }, {});
  }
};
