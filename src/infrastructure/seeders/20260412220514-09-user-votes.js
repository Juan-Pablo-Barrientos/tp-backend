'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_votes', [
      { pollId: 1, pollValueId: 1, userId: 1 },
      { pollId: 1, pollValueId: 2, userId: 2 },
      { pollId: 1, pollValueId: 1, userId: 3 },
      { pollId: 2, pollValueId: 4, userId: 1 },
      { pollId: 2, pollValueId: 5, userId: 2 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_votes', {
      userId: {
        [Sequelize.Op.in]: [1, 2, 3],
      },
      pollId: {
        [Sequelize.Op.in]: [1, 2],
      },
    }, {});
  }
};
