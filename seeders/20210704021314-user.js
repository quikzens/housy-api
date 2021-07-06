'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashStrenght = 10

    await queryInterface.bulkInsert(
      'users',
      [
        {
          fullname: 'Hulk',
          username: 'hulk',
          email: 'hulk@gmail.com',
          password: await bcrypt.hash('nostairs', hashStrenght),
          list_as: 'owner',
          gender: 'male',
          address: 'Any quiet and calm place',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: 'Iron Man',
          username: 'ironman',
          email: 'ironman@gmail.com',
          password: await bcrypt.hash('loveironman', hashStrenght),
          list_as: 'owner',
          gender: 'male',
          address: 'New York City',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: 'Spiderman',
          username: 'spiderman',
          email: 'spiderman@gmail.com',
          password: await bcrypt.hash('lovespiderman', hashStrenght),
          list_as: 'tenant',
          gender: 'male',
          address: 'Where are you spiderman',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullname: 'Black Widow',
          username: 'blackwidow',
          email: 'blackwidow@gmail.com',
          password: await bcrypt.hash('loveblackwidow', hashStrenght),
          list_as: 'tenant',
          gender: 'female',
          address: 'Jln. Vormir',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {})
    }
  },
}
