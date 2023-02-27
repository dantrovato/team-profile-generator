const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const managerQuestions = [
  {
    type: "inputr",
    name: "name",
    message: "Enter team manager's name",
  },
  {
    type: "number",
    name: "id",
    message: "Enter employee's ID",
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

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter engineer's name",
  },
  {
    type: "number",
    name: "id",
    message: "Enter ID",
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

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter intern's name",
  },
  {
    type: "number",
    name: "id",
    message: "Enter ID",
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

const team = [];

start();

async function start() {
  const managerPrompts = await inquirer.prompt(managerQuestions);

  const { name, id, email, officeNumber } = managerPrompts;
  team.push(new Manager(name, id, email, officeNumber));

  let keepAdding =
    managerPrompts.action !== "Finish building the team" ? true : false;

  let engineerPrompts;
  let internPrompts;
  let action = managerPrompts.action;
  while (keepAdding) {
    if (action === "Add an engineer") {
      if (engineerPrompts) engineerPrompts.action = undefined;
      engineerPrompts = await inquirer.prompt(engineerQuestions);
      action = engineerPrompts.action;
      const { name, id, email, gitHub } = engineerPrompts;
      team.push(new Engineer(name, id, email, gitHub));
    } else if (action === "Add an intern") {
      if (internPrompts) internPrompts.action = undefined;
      internPrompts = await inquirer.prompt(internQuestions);

      action = internPrompts.action;
      const { name, id, email, school } = internPrompts;
      team.push(new Engineer(name, id, email, school));
    }

    if (
      (engineerPrompts &&
        engineerPrompts.action === "Finish building the team") ||
      (internPrompts && internPrompts.action === "Finish building the team")
    ) {
      keepAdding = false;
    }
  }

  const htmlDoc = render(team);

  await fs.writeFile(outputPath, htmlDoc, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created successfully.");
  });
}
