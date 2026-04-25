'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('poll_values', [
      { id: 1, description: 'Si', PollId: 1 },
      { id: 2, description: 'No', PollId: 1 },
      { id: 3, description: 'A veces', PollId: 1 },
      { id: 4, description: 'Si', PollId: 2 },
      { id: 5, description: 'No', PollId: 2 },
      { id: 6, description: 'No se', PollId: 2 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('poll_values', {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4, 5, 6],
      },
    }, {});
  }
};
