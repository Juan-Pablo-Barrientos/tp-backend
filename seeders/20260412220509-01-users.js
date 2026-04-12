'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'admin@fakenews.local',
        name: 'Admin',
        surname: 'Principal',
        postPermission: true,
        username: 'admin',
        password: 'admin123',
        role: 'Admin',
        phoneNumber: '+540000000001',
        subscribed: true,
        path_img: 'https://picsum.photos/seed/user-admin/400/300',
        bio: 'Administrador del sistema.',
      },
      {
        id: 2,
        email: 'author@fakenews.local',
        name: 'Ana',
        surname: 'Redactora',
        postPermission: true,
        username: 'author',
        password: 'author123',
        role: 'Author',
        phoneNumber: '+540000000002',
        subscribed: true,
        path_img: 'https://picsum.photos/seed/user-author/400/300',
        bio: 'Periodista enfocada en tecnologia y actualidad.',
      },
      {
        id: 3,
        email: 'client@fakenews.local',
        name: 'Carlos',
        surname: 'Lector',
        postPermission: false,
        username: 'client',
        password: 'client123',
        role: 'Client',
        phoneNumber: '+540000000003',
        subscribed: false,
        path_img: 'https://picsum.photos/seed/user-client/400/300',
        bio: null,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      id: {
        [Sequelize.Op.in]: [1, 2, 3],
      },
    }, {});
  }
};
