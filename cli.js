#!/usr/bin/env node
const { Command } = require("commander");
const { exec, execSync } = require("child_process");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { sync } = require("glob");
const { parse } = require("react-docgen-typescript");
const cors = require("cors");
const app = express();
const program = new Command();
app.use(cors());

const outputPath = path.join(__dirname, "react-app", "src");
const outputFile = `${outputPath}/components.json`;

// JS Gen
const jsDocsGen = (input, ignore) => {
  try {
    execSync(
      `yarn react-docgen ${input} ${
        ignore ? `-i ${ignore}` : ""
      } -o ${outputFile}`
    );
  } catch (error) {
    console.error(`Error during analysis of design system: ${error.message}`);
    if (error.stderr) {
      console.log("Error:\n", error.stderr);
    }
    return;
  }
};

// Type gen
const typeDocsGen = async (inputPattern, ignorePattern) => {
  try {
    const options = { nodir: true };
    if (ignorePattern) options.ignore = ignorePattern;

    const files = sync(inputPattern, options);
    const docs = parse(files, {
      savePropValueAsString: true,
    });

    fs.writeFileSync(outputFile, JSON.stringify(docs, null, 2));
  } catch (error) {
    console.error(`Error during analysis of design system: ${error.message}`);
    if (error.stderr) {
      console.log("Error:\n", error.stderr);
    }
    return;
  }
};

program
  .command("start")
  .description("Open personalized LLM Assistant on http://localhost:11192")
  .requiredOption(
    "-i, --input <pattern>",
    "Glob to find your design system components (mandatory)"
  )
  .option("--ignore <pattern>", "Glob to ignore")
  .option(
    "--typescript",
    "Whether to check for typescript (default: javascript)"
  )
  .option("--port", "Custom port to run the LLM assistant")
  .action((options) => {
    const inputPattern = options.input;
    const ignorePattern = options.ignore;
    const isTypescript = options.typescript;
    const customPort = options.port || 11192;

    // Generate components
    if (isTypescript) {
      typeDocsGen(inputPattern, ignorePattern);
    } else {
      jsDocsGen(inputPattern, ignorePattern);
    }

    // Build and serve FE
    exec("yarn build", (err, stdout, stderr) => {
      if (err) {
        console.error(`Error during building the LLM: ${err.message}`, err);
        console.log(stdout)
        console.error(stderr);
        return;
      }
      console.log(stdout)
      console.error(stderr);

      const reactAppPath = path.join(__dirname, "react-app", "build");
      app.use(express.static(reactAppPath));

      app.get("*", (req, res) => {
        res.sendFile(path.join(reactAppPath, "index.html"));
      });

      app.listen(customPort, () => {
        console.log(
          `Your personalized LLM Assistant is now running on http://localhost:${customPort}`
        );
      });
    });
  });

program.parse(process.argv);
