'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(200),
      },
      name: {
        type: Sequelize.STRING(200),
      },
      surname: {
        type: Sequelize.STRING(200),
      },
      postPermission: {
        type: Sequelize.BOOLEAN,
      },
      username: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(45),
      },
      subscribed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      path_img: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      destroyTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
