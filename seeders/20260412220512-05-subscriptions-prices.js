'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subscriptions_prices', [
      { effectiveDate: '2026-01-01 00:00:00', price: 1999.99 },
      { effectiveDate: '2026-06-01 00:00:00', price: 2499.99 },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscriptions_prices', {
      effectiveDate: {
        [Sequelize.Op.in]: ['2026-01-01 00:00:00', '2026-06-01 00:00:00'],
      },
    }, {});
  }
};
