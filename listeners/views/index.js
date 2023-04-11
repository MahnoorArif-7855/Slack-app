const {
  newTaskModalCallback,
  createFeedbackDocument,
} = require("./new-task-modal");

module.exports.register = (app) => {
  app.view("new-task-modal", newTaskModalCallback);
  app.view("new-task-modal", createFeedbackDocument);
};
