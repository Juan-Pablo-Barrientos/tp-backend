'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('province', [
      { id: 1, name: 'Buenos Aires' },
      { id: 2, name: 'Cordoba' },
      { id: 3, name: 'Santa Fe' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('province', {
      id: {
        [Sequelize.Op.in]: [1, 2, 3],
      },
    }, {});
  }
};
