module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'Feedbacks',
      'UserId',
      'creatorId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
    await queryInterface.addColumn(
      'Feedbacks',
      'currentAssigneeId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Feedbacks',
      'CurrentAssigneeId',
    );
    await queryInterface.renameColumn(
      'Feedbacks',
      'creatorId',
      'UserId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },
};
