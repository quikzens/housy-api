'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'houses',
      [
        {
          name: 'House Bambang',
          typeRent: 'month',
          price: '2000000',
          area: '1800',
          address: 'Kota Jakarta',
          amenities: 'Furnished',
          bedroom: 3,
          bathroom: 2,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae elementum curabitur vitae nunc sed velit dignissim. Enim ut tellus elementum sagittis vitae et leo duis ut. Sociis natoque penatibus et magnis. Nec feugiat nisl pretium fusce. Purus gravida quis blandit turpis. Id nibh tortor id aliquet lectus proin. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Convallis convallis tellus id interdum velit laoreet id.',
          image: 'home-1.jpg',
          cityId: 1,
          ownerId: 1,
        },
        {
          name: 'House Artina',
          typeRent: 'month',
          price: '3000000',
          area: '400',
          address: 'Kota Makassar',
          amenities: 'Furnished,Pet Allowed',
          bedroom: 2,
          bathroom: 1,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae elementum curabitur vitae nunc sed velit dignissim. Enim ut tellus elementum sagittis vitae et leo duis ut. Sociis natoque penatibus et magnis. Nec feugiat nisl pretium fusce. Purus gravida quis blandit turpis. Id nibh tortor id aliquet lectus proin. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Convallis convallis tellus id interdum velit laoreet id.',
          image: 'home-2.jpg',
          cityId: 2,
          ownerId: 1,
        },
        {
          name: 'House Ballana',
          typeRent: 'year',
          price: '4000000',
          area: '900',
          address: 'Kota Surabaya',
          amenities: 'Furnished,Pet Allowed,Shared Accomodation',
          bedroom: 4,
          bathroom: 3,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae elementum curabitur vitae nunc sed velit dignissim. Enim ut tellus elementum sagittis vitae et leo duis ut. Sociis natoque penatibus et magnis. Nec feugiat nisl pretium fusce. Purus gravida quis blandit turpis. Id nibh tortor id aliquet lectus proin. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Convallis convallis tellus id interdum velit laoreet id.',
          image: 'home-3.jpg',
          cityId: 3,
          ownerId: 1,
        },
        {
          name: 'House Bolana',
          typeRent: 'year',
          price: '5000000',
          area: '800',
          address: 'Kota Yogyakarta',
          amenities: 'Furnished',
          bedroom: 5,
          bathroom: 3,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae elementum curabitur vitae nunc sed velit dignissim. Enim ut tellus elementum sagittis vitae et leo duis ut. Sociis natoque penatibus et magnis. Nec feugiat nisl pretium fusce. Purus gravida quis blandit turpis. Id nibh tortor id aliquet lectus proin. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Convallis convallis tellus id interdum velit laoreet id.',
          image: 'home-4.jpg',
          cityId: 4,
          ownerId: 1,
        },
        {
          name: 'House Lompoa',
          typeRent: 'day',
          price: '6000000',
          area: '600',
          address: 'Kota Semarang',
          amenities: 'Furnished,Pet Allowed',
          bedroom: 5,
          bathroom: 4,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae elementum curabitur vitae nunc sed velit dignissim. Enim ut tellus elementum sagittis vitae et leo duis ut. Sociis natoque penatibus et magnis. Nec feugiat nisl pretium fusce. Purus gravida quis blandit turpis. Id nibh tortor id aliquet lectus proin. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Convallis convallis tellus id interdum velit laoreet id.',
          image: 'home-5.jpg',
          cityId: 5,
          ownerId: 1,
        },
        {
          name: 'House Asgard',
          typeRent: 'day',
          price: '7000000',
          area: '1800',
          address: 'Kota Jakarta',
          amenities: 'Furnished,Pet Allowed,Shared Accomodation',
          bedroom: 2,
          bathroom: 1,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae elementum curabitur vitae nunc sed velit dignissim. Enim ut tellus elementum sagittis vitae et leo duis ut. Sociis natoque penatibus et magnis. Nec feugiat nisl pretium fusce. Purus gravida quis blandit turpis. Id nibh tortor id aliquet lectus proin. Augue neque gravida in fermentum et sollicitudin ac. Vel turpis nunc eget lorem dolor. Convallis convallis tellus id interdum velit laoreet id.',
          image: 'home-6.jpg',
          cityId: 1,
          ownerId: 1,
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('houses', null, {})
  },
}
