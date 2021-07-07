'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashStrenght = 10

    await queryInterface.bulkInsert(
      'users',
      [
        {
          fullname: 'Diah Anggraini',
          username: 'diahaggraini',
          email: 'diahaggraini@gmail.com',
          password: await bcrypt.hash('diah1234', hashStrenght),
          listAs: 'owner',
          gender: 'female',
          phone: '08338982299',
          address: 'Jl Tukad Yeh Aya Gg IX/30, Bali',
          avatar: null,
          profileImage: null,
        },
        {
          fullname: 'Ratna Devi Agusalim',
          username: 'ratnadevi',
          email: 'ratnadevi@gmail.com',
          password: await bcrypt.hash('ratna1234', hashStrenght),
          listAs: 'tenant',
          gender: 'female',
          phone: '085073163280',
          address: 'Jl Sultan Alauddin 2127',
          avatar: null,
          profileImage: null,
        },
        {
          fullname: 'Darma Dwi Widjaja',
          username: 'darmadwi',
          email: 'darmadwi@gmail.com',
          password: await bcrypt.hash('darma1234', hashStrenght),
          listAs: 'tenant',
          gender: 'male',
          phone: '082709898320',
          address: 'Jl Kom L Yos Sudarso',
          avatar: null,
          profileImage: null,
        },
        {
          fullname: 'Bambang Kuwat Hadiman',
          username: 'bambangkuwat',
          email: 'bambangkuwat@gmail.com',
          password: await bcrypt.hash('bambang1234', hashStrenght),
          listAs: 'owner',
          gender: 'male',
          phone: '0872332873',
          address: 'Jl Rancho Indah 35, Dki Jakarta',
          avatar: null,
          profileImage: null,
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
