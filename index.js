const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/page-template.js");
const managerQuestions = require("./lib/manager-questions.js");
const engineerQuestions = require("./lib/engineer-questions.js");
const internQuestions = require("./lib/intern-questions.js");

const team = [];

// generate unique id
const getID = (() => {
  let id = 0;
  return function () {
    return ++id;
  };
})();

function addManager(prompts) {
  const { name, email, officeNumber } = prompts;
  team.push(new Manager(name, getID(), email, officeNumber));
}

function addEngineer(prompts) {
  const { name, email, gitHub } = prompts;
  team.push(new Engineer(name, getID(), email, gitHub));
}

function addIntern(prompts) {
  const { name, email, school } = prompts;
  team.push(new Intern(name, getID(), email, school));
}

async function start() {
  // collect data for manager and push inside the empty team array
  const managerPrompts = await inquirer.prompt(managerQuestions());
  addManager(managerPrompts);

  // boolean to pass the while loop below to know when to stop the loop
  let keepAdding =
    managerPrompts.action !== "Finish building the team" ? true : false;

  let action = managerPrompts.action;

  while (keepAdding) {
    if (action === "Add an engineer") {
      const engineerPrompts = await inquirer.prompt(engineerQuestions());
      action = engineerPrompts.action;
      addEngineer(engineerPrompts);
    } else if (action === "Add an intern") {
      const internPrompts = await inquirer.prompt(internQuestions());
      action = internPrompts.action;
      addIntern(internPrompts);
    }

    if (action === "Finish building the team") {
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

start();
