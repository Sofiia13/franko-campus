'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('juncEventImages', {
      eventId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'events',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      eventImageId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'eventImages',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      }
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('juncEventImages');
  }
};
