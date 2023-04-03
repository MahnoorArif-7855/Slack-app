module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'Feedbacks',
    'UserId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  ),

  down: async (queryInterface) => queryInterface.removeColumn(
    'Feedbacks',
    'UserID',
  ),
};
