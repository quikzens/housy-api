'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashStrenght = 10

    await queryInterface.bulkInsert(
      'users',
      [
        {
          fullname: 'Tony Stark',
          username: 'ironman',
          email: 'ironman@gmail.com',
          password: await bcrypt.hash('iron1234', hashStrenght),
          listAs: 'owner',
          gender: 'male',
          phone: '08338982299',
          address: 'Jl Tukad Yeh Aya Gg IX/30, Bali',
          avatar: null,
          profileImage: null,
        },
        {
          fullname: 'Dr. Bruce Banner',
          username: 'hulk',
          email: 'hulk@gmail.com',
          password: await bcrypt.hash('hulk1234', hashStrenght),
          listAs: 'tenant',
          gender: 'male',
          phone: '085073163280',
          address: 'Jl Sultan Alauddin 2127',
          avatar: null,
          profileImage: null,
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  },
}
