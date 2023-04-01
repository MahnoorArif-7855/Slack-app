const {
  HomeTab,
  Header,
  Divider,
  Section,
  Actions,
  Elements,
} = require("slack-block-builder");
const pluralize = require("pluralize");

module.exports = (recentlyCompletedTasks) => {
  const homeTab = HomeTab({
    callbackId: "tasks-home",
    privateMetaData: "completed",
  }).blocks(
    Actions({ blockId: "task-creation-actions" }).elements(
      Elements.Button({ text: "All Feedbacks" })
        .value("app-home-nav-open")
        .actionId("app-home-nav-open")
        .primary(true),
      Elements.Button({ text: "Reopen Feedback" })
        .value("app-home-nav-completed")
        .actionId("app-home-nav-completed"),
      Elements.Button({ text: "Write Feedback" })
        .value("app-home-nav-create-a-task")
        .actionId("app-home-nav-create-a-task")
    )
  );

  if (recentlyCompletedTasks.length === 0) {
    homeTab.blocks(
      Header({ text: "No completed tasks" }),
      Divider(),
      Section({ text: "Looks like you've got nothing completed." })
    );
    return homeTab.buildToJSON();
  }

  const completedTaskList = recentlyCompletedTasks.map((task) =>
    Section({ text: `• * ${task.title}  ` }).accessory(
      Elements.Button({ text: "Reopen" })
        .value(`${task.id}`)
        .actionId("reopen-task")
    )
  );

  homeTab.blocks(
    Header({
      text: `You have ${recentlyCompletedTasks.length} recently ${pluralize(
        "Feedback",
        recentlyCompletedTasks.length
      )}`,
    }),
    Divider(),
    completedTaskList
  );

  return homeTab.buildToJSON();
};
