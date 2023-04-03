const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Feedback.belongsTo(models.User, { as: "creator" });
      Feedback.belongsTo(models.User, { as: "currentAssignee" });
    }
  }
  Feedback.init(
    {
      // Model attributes are defined here
      title: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["OPEN", "CLOSED"],
        defaultValue: "OPEN",
      },
      dueDate: DataTypes.DATE,
      scheduledMessageId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
