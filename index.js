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

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];

startProgram();

async function startProgram() {
  //

  const number = await inquirer.prompt([
    {
      type: "number",
      name: "numOfEmployees",
      message: "How many employees are we inputting?",
    },
  ]);

  const num = number.numOfEmployees;

  for (let index = 0; index < num; index++) {
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
    ];

    const data = await inquirer.prompt(employeeData);

    const role = data.role;
    let name;
    let message;
    if (role === "Manager") {
      name = "officeNumber";
      message = "What is the manager's office number?";
    } else if (role === "Engineer") {
      name = "gitHub";
      message = "What is the engineer's gitHub?";
    } else if (role === "Intern") {
      name = "school";
      message = `What is the name of employee's school?`;
    }

    const roleSpecificQuestion = await inquirer.prompt([
      {
        type: "input",
        name: name,
        message: message,
      },
    ]);

    data[name] = name;

    if (data.role === "Manager") {
      team.push(new Manager(`${data.name}`, 1, data.email, data.officeNumber));
    } else if (data.role === "Engineer") {
      team.push(new Engineer(`${data.name}`, 1, data.email, data.gitHub));
    } else if (data.role === "Intern") {
      team.push(new Intern(`${data.name}`, 1, data.email, data.school));
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
