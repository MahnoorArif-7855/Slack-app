const { Modal, Blocks } = require('slack-block-builder');

module.exports = (taskTitle) => Modal({ title: 'Feedback created', callbackId: 'task-created-modal' })
  .blocks(
    Blocks.Section({
      text: `feedback ${taskTitle} created`,
    }),
  ).buildToJSON();
