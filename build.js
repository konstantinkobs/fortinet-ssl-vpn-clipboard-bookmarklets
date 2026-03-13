const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const scriptsDir = path.join(__dirname, "scripts");
const outputPath = path.join(__dirname, "index.html");
const templatePath = path.join(__dirname, "templates", "index.ejs");

function parseMetadata(source, fallbackName) {
  const firstLine = source.split(/\r?\n/, 1)[0].trim();
  const match = firstLine.match(
    /^\/\/\s*name:\s*(.+?)\s*\|\s*description:\s*(.+)\s*$/
  );

  if (!match) {
    return {
      name: fallbackName,
      description: "Fortinet SSL VPN clipboard helper bookmarklet.",
    };
  }

  return {
    name: match[1].trim(),
    description: match[2].trim(),
  };
}

function stripMetadataComment(source) {
  return source.replace(
    /^\/\/\s*name:\s*.+?\s*\|\s*description:\s*.+(?:\r?\n)?/,
    ""
  );
}

const files = fs
  .readdirSync(scriptsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const bookmarklets = files.map((filename) => {
  const source = fs.readFileSync(path.join(scriptsDir, filename), "utf8");
  const fallbackName = path.basename(filename, ".js");
  const metadata = parseMetadata(source, fallbackName);
  const bookmarkletSource = stripMetadataComment(source);
  const wrapped = `(function(){${bookmarkletSource}\n})();`;
  const href = `javascript:${encodeURIComponent(wrapped)}`;
  return {
    id: fallbackName,
    name: metadata.name,
    description: metadata.description,
    href,
  };
});

const template = fs.readFileSync(templatePath, "utf8");
const html = ejs.render(template, { bookmarklets }, { filename: templatePath });

fs.writeFileSync(outputPath, html, "utf8");
console.log(`Wrote ${outputPath}`);
