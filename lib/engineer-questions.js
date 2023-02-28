module.exports = function engineerQuestions() {
  return [
    {
      type: "input",
      name: "name",
      message: "Enter engineer's name",
    },
    {
      type: "input",
      name: "email",
      message: "Enter email address",
    },
    {
      type: "input",
      name: "gitHub",
      message: "Enter gitHub username",
    },
    {
      type: "list",
      name: "action",
      message: "Choose from the list",
      choices: ["Add an engineer", "Add an intern", "Finish building the team"],
    },
  ];
};
