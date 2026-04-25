'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Politica' },
      { id: 2, name: 'Economia' },
      { id: 3, name: 'Tecnologia' },
      { id: 4, name: 'Deportes' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    }, {});
  }
};
