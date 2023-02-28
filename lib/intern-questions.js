module.exports = function internQuestions() {
  return [
    {
      type: "input",
      name: "name",
      message: "Enter intern's name",
    },
    {
      type: "input",
      name: "email",
      message: "Enter email address",
    },
    {
      type: "input",
      name: "school",
      message: "Enter name of school",
    },
    {
      type: "list",
      name: "action",
      message: "Choose from the list",
      choices: ["Add an engineer", "Add an intern", "Finish building the team"],
    },
  ];
};
