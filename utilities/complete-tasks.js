const { Op } = require("sequelize");

const { Feedback } = require("../models");

module.exports = async (taskIDs, slackUserID, slackWorkspaceID, client) => {
  Feedback.update({ status: "CLOSED" }, { where: { id: taskIDs } });
  // Find all the tasks provided where we have a scheduled message ID
  const tasksFromDB = await Feedback.findAll({
    where: {
      [Op.and]: [{ id: taskIDs }, { scheduledMessageId: { [Op.not]: null } }],
    },
  });
  // If a reminder is scheduled, cancel it and remove the ID from the datastore
  tasksFromDB.map(async (task) => {
    if (task.scheduledMessageId) {
      try {
        await client.chat.deleteScheduledMessage({
          channel: slackWorkspaceID,
          scheduled_message_id: task.scheduledMessageId,
        });
        Feedback.update(
          { scheduledMessageId: null },
          { where: { id: task.id } }
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  });
};
