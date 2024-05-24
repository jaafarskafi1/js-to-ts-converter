import dotenv from "dotenv";
import axios from "axios";
import { Command } from "commander";
import fs from "fs";
import path from "path";
import inquirer from "inquirer";

dotenv.config();

const program = new Command();
const openaiApiKey: string | undefined = process.env.OPENAI_API_KEY;

async function convertJsToTs(jsCode: string): Promise<string | null> {
  const prompt = `Convert the following JavaScript code to TypeScript:\n\n${jsCode}`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt4o",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const tsCode = response.data.choices[0].text.trim();
    return tsCode;
  } catch (error) {
    console.error("Error converting JS to TS:", error);
    return null;
  }
}

async function scanAndPromptForFiles(directory: string) {
  const jsFiles: string[] = [];

  function scanDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        scanDir(fullPath);
      } else if (file.endsWith(".js")) {
        jsFiles.push(fullPath);
      }
    }
  }

  scanDir(directory);

  if (jsFiles.length === 0) {
    console.log("No JavaScript files found.");
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      name: "filesToConvert",
      message: "Select JavaScript files to convert to TypeScript:",
      choices: jsFiles,
    },
  ]);

  return answers.filesToConvert;
}

program.version("1.0.0").description("JavaScript to TypeScript Converter");

program
  .command("convert <directory>")
  .description(
    "Scan a directory and convert selected JavaScript files to TypeScript"
  )
  .action(async (directory: string) => {
    const filesToConvert = await scanAndPromptForFiles(directory);
    if (!filesToConvert || filesToConvert.length === 0) {
      console.log("No files selected for conversion.");
      return;
    }

    for (const file of filesToConvert) {
      const jsCode = fs.readFileSync(file, "utf-8");
      const tsCode = await convertJsToTs(jsCode);
      if (tsCode) {
        const tsFilePath = file.replace(/\.js$/, ".ts");
        fs.writeFileSync(tsFilePath, tsCode, "utf-8");
        console.log(`Converted TypeScript file: ${tsFilePath}`);
      } else {
        console.log(`Conversion failed for file: ${file}`);
      }
    }
  });

program.parse(process.argv);
