'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.ENUM('Critical', 'High', 'Medium', 'Low'),
        defaultValue: 'Low'
      },
      dueBy: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.ENUM('To-Do', 'Pending', 'Complete'),
        defaultValue: 'To-Do'
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};