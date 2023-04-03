module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'Feedbacks',
    'dueDate',
    {
      type: Sequelize.DATE,
      allowNull: true,
    },
  ),

  down: async (queryInterface) => queryInterface.removeColumn(
    'Feedbacks',
    'dueDate',
  ),
};
