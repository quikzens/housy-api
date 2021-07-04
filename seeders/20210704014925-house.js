'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'houses',
      [
        {
          name: 'House Astina',
          city_id: 1,
          address: 'Jakarta',
          price: 3000000,
          type_rent: 'year',
          amenities: 'Furnished,Pet Allowed',
          bedroom: 3,
          bathroom: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'House Eggy',
          city_id: 2,
          address: 'Makassar',
          price: 5000000,
          type_rent: 'year',
          amenities: 'Furnished,Pet Allowed,Shared Accomodation',
          bedroom: 4,
          bathroom: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'House Bar-bar',
          city_id: 3,
          address: 'Surabaya',
          price: 4000000,
          type_rent: 'month',
          amenities: 'Furnished',
          bedroom: 2,
          bathroom: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('houses', null, {})
    }
  },
}
