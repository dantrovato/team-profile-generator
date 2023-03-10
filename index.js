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

// the array that will have the employees as objects of the appropriate class. this will be passed to the render function below
const team = [];

// generate unique id
const getID = (() => {
  let id = 0;
  return function () {
    return ++id;
  };
})();

// Capitalize name
function formatName(name) {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase() + n.slice(1))
    .join(" ");
}

function addManager(prompts) {
  const { name, email, officeNumber } = prompts;

  team.push(new Manager(formatName(name), getID(), email, officeNumber));
}

function addEngineer(prompts) {
  const { name, email, gitHub } = prompts;
  team.push(new Engineer(formatName(name), getID(), email, gitHub));
}

function addIntern(prompts) {
  const { name, email, school } = prompts;
  team.push(new Intern(formatName(name), getID(), email, school));
}

async function start() {
  // collect data for manager and push inside the empty team array
  const managerPrompts = await inquirer.prompt(managerQuestions());
  addManager(managerPrompts);

  // boolean to pass the while loop below to know when to stop the loop
  // if the user did not click the 'Finish buinding the team' option the while loop runs and add other employees
  let keepAdding =
    managerPrompts.action !== "Finish building the team" ? true : false;

  // stores either "Finish building the team", "Add an engineer" or "Add an intern" for use in the if else blocks
  let action = managerPrompts.action;

  while (keepAdding) {
    if (action === "Add an engineer") {
      // shows engineer questions
      const engineerPrompts = await inquirer.prompt(engineerQuestions());
      // resets the action to whatever the user chose last
      action = engineerPrompts.action;
      // add engineer to the team array
      addEngineer(engineerPrompts);
    } else if (action === "Add an intern") {
      // shows intern questions
      const internPrompts = await inquirer.prompt(internQuestions());
      // resets the action to whatever the user chose last
      action = internPrompts.action;
      // add intern to the team array
      addIntern(internPrompts);
    }

    // exit while loop if the user picked this option
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
