'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        id: 1,
        title: 'Nuevas regulaciones para plataformas digitales',
        body: 'El congreso debate un nuevo marco para plataformas digitales en el pais.',
        requiresSubscription: false,
        path_img: 'https://picsum.photos/seed/post-1/900/500',
        clicks: 120,
        postDate: '2026-04-10 09:00:00',
        provinceId: 1,
        categoryId: 1,
        userId: 2,
      },
      {
        id: 2,
        title: 'Inflacion mensual por debajo de lo esperado',
        body: 'Los ultimos datos mostraron una desaceleracion en los precios minoristas.',
        requiresSubscription: true,
        path_img: 'https://picsum.photos/seed/post-2/900/500',
        clicks: 240,
        postDate: '2026-04-11 11:15:00',
        provinceId: 2,
        categoryId: 2,
        userId: 2,
      },
      {
        id: 3,
        title: 'Empresas locales aceleran proyectos de IA',
        body: 'El ecosistema de software local suma inversiones en inteligencia artificial.',
        requiresSubscription: false,
        path_img: 'https://picsum.photos/seed/post-3/900/500',
        clicks: 310,
        postDate: '2026-04-11 14:30:00',
        provinceId: 3,
        categoryId: 3,
        userId: 2,
      },
      {
        id: 4,
        title: 'Resumen deportivo del fin de semana',
        body: 'Resultados destacados de los principales torneos nacionales.',
        requiresSubscription: false,
        path_img: 'https://picsum.photos/seed/post-4/900/500',
        clicks: 95,
        postDate: '2026-04-12 08:45:00',
        provinceId: 1,
        categoryId: 4,
        userId: 1,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', {
      id: {
        [Sequelize.Op.in]: [1, 2, 3, 4],
      },
    }, {});
  }
};
