const { Modal, Blocks, Elements } = require("slack-block-builder");

module.exports = (prefilledTitle) => {
  const textInput = (taskTitle) => {
    if (taskTitle) {
      return Elements.TextInput({
        placeholder: "Write a feedback",
        actionId: "taskTitle",
        initialValue: taskTitle,
      });
    }
    return Elements.TextInput({
      placeholder: "Write a feedback",
      actionId: "taskTitle",
    });
  };

  return Modal({
    title: "Feedback Sync",
    submit: "Submit",
    callbackId: "new-task-modal",
  })
    .blocks(
      Blocks.Input({ label: "Feedback", blockId: "taskTitle" }).element(
        textInput(prefilledTitle)
      ),
      // Blocks.Input({ label: "Assign user", blockId: "taskAssignUser" }).element(
      //   Elements.UserSelect({
      //     actionId: "taskAssignUser",
      //   }).initialUser(currentUser)
      // ),
      // Blocks.Input({
      //   label: "Due date",
      //   blockId: "taskDueDate",
      //   optional: true,
      // }).element(
      //   Elements.DatePicker({
      //     actionId: "taskDueDate",
      //   })
      // )
      // Blocks.Input({
      //   label: "Time",
      //   blockId: "taskDueTime",
      //   optional: true,
      // }).element(
      //   Elements.TimePicker({
      //     actionId: "taskDueTime",
      //   })
      // )
    )
    .buildToJSON();
};
