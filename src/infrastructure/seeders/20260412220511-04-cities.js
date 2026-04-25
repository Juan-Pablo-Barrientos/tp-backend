'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', [
      { id: 1, name: 'La Plata', provinceId: 1 },
      { id: 2, name: 'Mar del Plata', provinceId: 1 },
      { id: 3, name: 'Cordoba Capital', provinceId: 2 },
      { id: 4, name: 'Rosario', provinceId: 3 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    }, {});
  }
};
