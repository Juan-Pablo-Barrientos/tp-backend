'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(200),
      },
      body: {
        type: Sequelize.TEXT,
      },
      requiresSubscription: {
        type: Sequelize.BOOLEAN,
      },
      path_img: {
        type: Sequelize.STRING,
      },
      clicks: {
        type: Sequelize.INTEGER,
      },
      postDate: {
        type: Sequelize.DATE,
      },
      provinceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'province',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      destroyTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};
