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
  team.push(new Manager("dan", 1, "test@test.com", 12343));
  team.push(new Engineer("trovas", 1, "test@test.com", "danTrobafasd"));
  team.push(new Intern("dante", 1, "test@test.com", "bananas"));
  team.push(new Intern("dante", 1, "test@test.com", "bananas"));

  let htmlDoc = render(team);

  await fs.writeFile(outputPath, htmlDoc, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created successfully.");
  });
}
