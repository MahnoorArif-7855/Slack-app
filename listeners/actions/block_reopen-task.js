const { Feedback } = require("../../models");
const { reloadAppHome } = require("../../utilities");

const reopenTaskCallback = async ({ ack, action, client, body }) => {
  await ack();
  Feedback.update({ status: "OPEN" }, { where: { id: action.value } });
  await reloadAppHome(client, body.user.id, body.team.id, "completed");
};

module.exports = {
  reopenTaskCallback,
};
