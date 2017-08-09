const path = require("path");
const fs = require("fs");
const toTitleCase = require("titlecase");

module.exports = { getTemplate, getStyles, getTest, getIndex };

function getTemplate(dir, name, css, templateName) {
  const file = path.join(dir, `${name}.js`);

  const templateLocation = css
    ? `templates/${templateName}-css.js`
    : `templates/${templateName}.js`;

  const body = fs
    .readFileSync(path.join(__dirname, templateLocation), "utf-8")
    .split("Template")
    .join(toTitleCase(name));

  return fs.writeFileSync(file, body);
}

function getStyles(dir) {
  const templateLocation = "templates/style.css";
  const body = fs.readFileSync(path.join(__dirname, templateLocation), "utf-8");
  fs.writeFileSync(path.join(dir, "style.css"), body);
}

function getTest(dir, name) {
  const file = path.join(dir, `${name}.test.js`);
  const templateLocation = "templates/test.js";

  const body = fs
    .readFileSync(path.join(__dirname, templateLocation), "utf-8")
    .split("Template")
    .join(toTitleCase(name))
    .split("template")
    .join(name);

  return fs.writeFileSync(file, body);
}

function getIndex(dir, name) {
  const file = path.join(dir, "index.js");
  const templateLocation = "templates/index.js";

  const body = fs
    .readFileSync(path.join(__dirname, templateLocation), "utf-8")
    .split("Template")
    .join(toTitleCase(name))
    .split("template")
    .join(name);

  return fs.writeFileSync(file, body);
}
