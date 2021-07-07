'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'cities',
      [
        {
          name: 'Jakarta',
        },
        {
          name: 'Makassar',
        },
        {
          name: 'Surabaya',
        },
        {
          name: 'Yogyakarta',
        },
        {
          name: 'Semarang',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('cities', null, {})
    }
  },
}
