'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subscriptions_prices', {
      effectiveDate: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      destroyTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subscriptions_prices');
  }
};
