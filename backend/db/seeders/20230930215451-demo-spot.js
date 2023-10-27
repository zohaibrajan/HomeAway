"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "1008 McConnell",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Mountain Meadow Cottage",
          description:
            "Escape to a charming Airbnb in an ancient forest. Cozy cabin, rustic charm, loft bedroom, hot tub, and nature's tranquility await.",
          price: 123,
        },
        {
          ownerId: 2,
          address: "2701 Lovejoy Circle",
          city: "Atlanta",
          state: "Georgia",
          country: "United States of America",
          lat: 32.1234567,
          lng: -150.4732307,
          name: "Lakeside Oasis Retreat",
          description:
            "Escape to a charming Airbnb in an ancient forest. Cozy cabin, rustic charm, loft bedroom, hot tub, and nature's tranquility await.",
          price: 150,
        },
        {
          ownerId: 1,
          address: "1010 Brian Way",
          city: "Augusta",
          state: "Georgia",
          country: "United States of America",
          lat: 32.1233567,
          lng: -150.4732317,
          name: "Serenity Cabin in the Woods",
          description:
            "Escape to a charming Airbnb in an ancient forest. Cozy cabin, rustic charm, loft bedroom, hot tub, and nature's tranquility await.",
          price: 200,
        },
        {
          ownerId: 2,
          address: "11 Pingno Way",
          city: "Dallas",
          state: "Texas",
          country: "United States of America",
          lat: 31.1234567,
          lng: -160.4732307,
          name: "Pineview Wilderness Lodge",
          description:
            "Escape to a charming Airbnb in an ancient forest. Cozy cabin, rustic charm, loft bedroom, hot tub, and nature's tranquility await.",
          price: 150,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        address: { [Op.in]: ["1008 McConnell", "2701 Lovejoy Circle"] },
      },
      {}
    );
  },
};
