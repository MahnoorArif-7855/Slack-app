const { taskCreated } = require("../index");

test("Returns blocks for the task created modal", () => {
  const expected = {
    title: {
      type: "plain_text",
      text: "Feedback created",
    },
    callback_id: "task-created-modal",
    blocks: [
      {
        text: {
          type: "mrkdwn",
          text: "Feedback Title created",
        },
        type: "section",
      },
    ],
    type: "modal",
  };
  expect(taskCreated("Feedback Title")).toBe(JSON.stringify(expected));
});
