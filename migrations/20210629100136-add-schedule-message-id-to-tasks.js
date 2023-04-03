module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'Feedbacks',
    'scheduledMessageId',
    {
      type: Sequelize.STRING,
      allowNull: true,
    },
  ),

  down: async (queryInterface) => queryInterface.removeColumn(
    'Feedbacks',
    'scheduledMessageId',
  ),
};
