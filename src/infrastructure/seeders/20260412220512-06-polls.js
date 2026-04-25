'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Polls', [
      {
        id: 1,
        description: 'Te gusta leer noticias tecnologicas?',
        pollDate: '2026-04-10',
        categoryId: 3,
      },
      {
        id: 2,
        description: 'Crees que la economia mejorara este ano?',
        pollDate: '2026-04-11',
        categoryId: 2,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Polls', {
      id: {
        [Sequelize.Op.in]: [1, 2],
      },
    }, {});
  }
};
