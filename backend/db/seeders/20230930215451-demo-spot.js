"use strict";
import { faker } from "@faker-js/faker";
const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const seeders = [];

for (let i = 0; i < 25; i++) {
  const spot = {};

  spot.ownerId = faker.number.int({min: 1, max: 3});
  spot.address = faker.location.streetAddress();
  spot.city = faker.location.city();
  spot.state = faker.location.state();
  spot.country = faker.location.country();
  spot.lat = faker.location.latitude();
  spot.lng = faker.location.longitude();
  spot.description = faker.lorem.words(10);
  spot.price = faker.number.int({ min: 10, max: 100 });

  seeders.push(spot)
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
    // await Spot.bulkCreate(
    //   [
    //     {
    //       ownerId: 1,
    //       address: "1008 McConnell",
    //       city: "San Francisco",
    //       state: "California",
    //       country: "United States of America",
    //       lat: 37.7645358,
    //       lng: -122.4730327,
    //       name: "App Academy",
    //       description:
    //         "Welcome to our enchanting Airbnb nestled in the heart of an ancient forest, where you'll experience nature in its purest form. This cozy cabin offers a magical retreat from the hustle and bustle of everyday life, allowing you to unwind in the serenity of the woods. The interior boasts a rustic charm, with a crackling fireplace, wooden beams, and a spacious loft bedroom that offers panoramic views of the surrounding wilderness. Step outside onto the expansive deck to breathe in the crisp, pine-scented air, and soak in the private hot tub under a blanket of stars. With its tranquil setting and modern amenities, this Airbnb is the perfect escape for those seeking a connection with the natural world while enjoying the comforts of home.",
    //       price: 123,
    //     },
    //     {
    //       ownerId: 2,
    //       address: "2701 Lovejoy Circle",
    //       city: "Atlanta",
    //       state: "Georgia",
    //       country: "United States of America",
    //       lat: 32.1234567,
    //       lng: -150.4732307,
    //       name: "App Academy 2",
    //       description:
    //         "Welcome to our enchanting Airbnb nestled in the heart of an ancient forest, where you'll experience nature in its purest form. This cozy cabin offers a magical retreat from the hustle and bustle of everyday life, allowing you to unwind in the serenity of the woods. The interior boasts a rustic charm, with a crackling fireplace, wooden beams, and a spacious loft bedroom that offers panoramic views of the surrounding wilderness. Step outside onto the expansive deck to breathe in the crisp, pine-scented air, and soak in the private hot tub under a blanket of stars. With its tranquil setting and modern amenities, this Airbnb is the perfect escape for those seeking a connection with the natural world while enjoying the comforts of home.",
    //       price: 150,
    //     },
    //     {
    //       ownerId: 1,
    //       address: "1010 Brian Way",
    //       city: "Augusta",
    //       state: "Georgia",
    //       country: "United States of America",
    //       lat: 32.1233567,
    //       lng: -150.4732317,
    //       name: "Brian",
    //       description:
    //         "Welcome to our enchanting Airbnb nestled in the heart of an ancient forest, where you'll experience nature in its purest form. This cozy cabin offers a magical retreat from the hustle and bustle of everyday life, allowing you to unwind in the serenity of the woods. The interior boasts a rustic charm, with a crackling fireplace, wooden beams, and a spacious loft bedroom that offers panoramic views of the surrounding wilderness. Step outside onto the expansive deck to breathe in the crisp, pine-scented air, and soak in the private hot tub under a blanket of stars. With its tranquil setting and modern amenities, this Airbnb is the perfect escape for those seeking a connection with the natural world while enjoying the comforts of home.",
    //       price: 200,
    //     },
    //     {
    //       ownerId: 2,
    //       address: "11 Pingno Way",
    //       city: "Dallas",
    //       state: "Texas",
    //       country: "United States of America",
    //       lat: 31.1234567,
    //       lng: -160.4732307,
    //       name: "Peang",
    //       description:
    //         "Welcome to our enchanting Airbnb nestled in the heart of an ancient forest, where you'll experience nature in its purest form. This cozy cabin offers a magical retreat from the hustle and bustle of everyday life, allowing you to unwind in the serenity of the woods. The interior boasts a rustic charm, with a crackling fireplace, wooden beams, and a spacious loft bedroom that offers panoramic views of the surrounding wilderness. Step outside onto the expansive deck to breathe in the crisp, pine-scented air, and soak in the private hot tub under a blanket of stars. With its tranquil setting and modern amenities, this Airbnb is the perfect escape for those seeking a connection with the natural world while enjoying the comforts of home.",
    //       price: 150,
    //     },
    //   ],
    //   { validate: true }
    // );
    await Spot.bulkCreate(seeders, { validate: true });
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
        ownerId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
