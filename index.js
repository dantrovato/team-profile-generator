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

// Returns a function which increases the id by leveraging the closure and an IIFE
const getId = (() => {
  let id = 0;
  return function () {
    return ++id;
  };
})();

const team = [];

startProgram();

async function startProgram() {
  let prompt = await inquirer.prompt([
    {
      type: "number",
      name: "num",
      message: "How many employees are we inputting?",
    },
  ]);

  const numEmployees = prompt.num;

  const employeeData = [
    {
      type: "list",
      name: "role",
      message: "Please choose a role below:",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      name: "name",
      message: "Enter employee's entire name",
    },
    {
      type: "input",
      name: "email",
      message: "Enter employee's email",
    },
    {
      type: "input",
      name: "roleSpecificInfo",
      message:
        "Enter office number for Manager, gitHub for Engineer or school for Intern",
    },
  ];

  for (let index = 0; index < numEmployees; index++) {
    const data = await inquirer.prompt(employeeData);

    if (data.role === "Manager") {
      team.push(
        new Manager(data.name, getId(), data.email, data.roleSpecificInfo)
      );
    } else if (data.role === "Engineer") {
      team.push(
        new Engineer(data.name, getId(), data.email, data.roleSpecificInfo)
      );
    } else if (data.role === "Intern") {
      team.push(
        new Intern(data.name, getId(), data.email, data.roleSpecificInfo)
      );
    }
  }

  let htmlDoc = render(team);

  await fs.writeFile(outputPath, htmlDoc, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created successfully.");
  });
}
