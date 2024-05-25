import dotenv from "dotenv";
import axios from "axios";
import { Command } from "commander";
import fs from "fs";
import path from "path";
dotenv.config();

const program = new Command();
const openaiApiKey: string | undefined = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are a TypeScript conversion assistant. Convert the following JavaScript code to TypeScript. Ensure that all type annotations are correct and that the code is idiomatic TypeScript. Only include the TypeScript code within the backticks in your response.`;

async function convertJsToTs(jsCode: string): Promise<string | null> {
  const userPrompt = jsCode;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const responseText = response.data.choices[0].message.content.trim();
    const match = responseText.match(/```typescript\n([\s\S]*?)\n```/);

    if (match && match[1]) {
      return match[1].trim();
    } else {
      console.error("Error: Could not find TypeScript code in the response.");
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error converting JS to TS:", error.response.data.error);
    } else {
      console.error("Error converting JS to TS:", (error as Error).message);
    }
    return null;
  }
}

function copyDirectory(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules") {
        continue; // Skip node_modules directory
      }
      copyDirectory(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      const jsCode = fs.readFileSync(srcPath, "utf-8");
      convertJsToTs(jsCode).then((tsCode) => {
        if (tsCode) {
          const tsFilePath = destPath.replace(/\.js$/, ".ts");
          fs.writeFileSync(tsFilePath, tsCode, "utf-8");
          console.log(`Converted TypeScript file: ${tsFilePath}`);
        } else {
          console.log(`Conversion failed for file: ${srcPath}`);
        }
      });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

program.version("1.0.0").description("JavaScript to TypeScript Converter");

program
  .command("convert <directory>")
  .description(
    "Recursively convert JavaScript files in a directory to TypeScript"
  )
  .action((directory: string) => {
    const destDirectory = `${directory}_ts`;
    copyDirectory(directory, destDirectory);
  });

program.parse(process.argv);