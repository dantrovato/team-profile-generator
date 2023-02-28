module.exports = function managerQuestions() {
  return [
    {
      type: "inputr",
      name: "name",
      message: "Enter team manager's name",
    },
    {
      type: "input",
      name: "email",
      message: "Enter email address",
    },
    {
      type: "number",
      name: "officeNumber",
      message: "Enter office number",
    },
    {
      type: "list",
      name: "action",
      message: "Choose from the list",
      choices: ["Add an engineer", "Add an intern", "Finish building the team"],
    },
  ];
};
